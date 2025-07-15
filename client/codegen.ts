import { CodegenConfig } from '@graphql-codegen/cli';
const config: CodegenConfig = {
    schema: "http://10.80.16.143:4000/api",
    documents: ['src/**/*.{ts,tsx}'],
    generates: {
        './src/types/': {
            preset: 'client',
            plugins: ['typescript'],
            presetConfig: {
                gqlTagName: 'gql',
            }
        }
    },
    ignoreNoDocuments: true,
};

export default config;