import "reflect-metadata";
import fastify, {FastifyRegisterOptions} from 'fastify'
import mercurius, {MercuriusOptions} from 'mercurius'
import {buildSchema} from 'type-graphql';
import cors from '@fastify/cors'

import queryComplexity, {fieldExtensionsEstimator, simpleEstimator} from 'graphql-query-complexity';
import {allResolvers} from "./schemas";
import path from "path";
import dotenv from "dotenv";

const envPath = path.join(__dirname, '../.env');
const sharedEnvPath = path.join(__dirname, '../../.env.local');
const localEnvPath = path.join(__dirname, '../.env.local');

const loadedEnv = dotenv.config({
    path: envPath,
}).parsed ?? {};

const sharedEnv = dotenv.config({
    path: sharedEnvPath,
}).parsed ?? {};

const localEnv = dotenv.config({
    path: localEnvPath,
}).parsed ?? {};

const env = {
    ...process.env,
    ...loadedEnv,
    ...sharedEnv,
    ...localEnv,
};

async function main() {
    const schema = await buildSchema({
        dateScalarMode: "isoDate",
        resolvers: allResolvers,
    });

    const app = fastify(
        {
            logger: {level: 'debug'},
        }
    );

    await app.register(cors, {
        // put your options here
    });

    const opts: FastifyRegisterOptions<MercuriusOptions> = {
        schema,
        graphiql: true,
        cache: false,
        validationRules: ({variables, operationName}) => {
            console.log({
                variables,
                operationName,
            });

            return [
                queryComplexity({
                    maximumComplexity: 100,
                    variables,
                    operationName,
                    estimators: [fieldExtensionsEstimator(), simpleEstimator({defaultComplexity: 1})],
                    onComplete: (complexity: number) => {
                        console.log('Query Complexity:', complexity);
                    },
                }),
            ];
        },
        errorFormatter: (executionResult, context) => {
            console.error({
                executionResult,
                context,
            });

            const log = (context as Partial<typeof context>).reply ? context.reply.log : context.app.log;
            const errors = executionResult.errors.map((error) => {
                error.extensions.exception = error.originalError;
                Object.defineProperty(error, 'extensions', {enumerable: true});
                return error;
            });
            log.info({err: executionResult.errors}, 'Argument Validation Error');
            return {
                statusCode: 201,
                response: {
                    data: executionResult.data,
                    errors,
                }
            }
        }
    }

    app.register(mercurius, opts);

    const port = parseInt(env.PORT ?? '4000');

    console.log(`Starting server on port ${port}...`);

    await app.listen({port: port});
}

main().catch(console.error);
