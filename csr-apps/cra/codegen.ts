import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3001/graphql',
  documents: '**/*.graphql',
  generates: {
    './src/types.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node']
    }
  }
};

export default config;