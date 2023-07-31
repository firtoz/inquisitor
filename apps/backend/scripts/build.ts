import "reflect-metadata";
import {buildSchema} from 'type-graphql';

import path from "path";
import {allResolvers} from "../src/schemas";

async function main() {
    console.log('Building GQL Schema...');

    // build TypeGraphQL executable schema
    const schemaOutput = path.join(__dirname, '../../../packages/schemas/src/generated/gql/schema.gql');

    await buildSchema({
        resolvers: allResolvers,
        dateScalarMode: "isoDate",
        emitSchemaFile: schemaOutput,
    });

    console.log(`Outputs generated: ${schemaOutput}!`);
}

main().catch(console.error);
