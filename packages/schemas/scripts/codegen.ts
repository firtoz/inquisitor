import { CodegenConfig } from '@graphql-codegen/cli'
import path from "path";

const queriesPath = path.join(__dirname, '../src/gql');
const schemaPath = path.join(__dirname, '../src/generated/gql/schema.gql');

const documentsGlob = `${queriesPath}/*.gql`;

const config: CodegenConfig = {
    schema: schemaPath,
    documents: [documentsGlob],
    config: {
        strictScalars: true,
        scalars: {
            DateTime: {
                input: 'Date',
                output: 'Date',
            },
            Int64: 'BigInt'
        }
    },
    generates: {
        [path.join(__dirname, '../src/generated/generates.ts')]: {
            overwrite: true,
            plugins: [
                'typescript-react-query',
                'typescript-operations',
                'typescript',
            ],
            config: {
                immutableTypes: true,
                fetcher: {
                    func: '../fetcher#useFetchData',
                    isReactHook: true,
                },
                errorType: 'Error',
                dedupeFragments: true,
                inlineFragmentTypes: 'combine',
            }
        }
    },
    hooks: {
        afterOneFileWrite: ['prettier --write']
    },
    ignoreNoDocuments: true
}
export default config
