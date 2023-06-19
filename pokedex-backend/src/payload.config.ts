import { buildConfig } from 'payload/config';
import path from 'path';
// import Examples from './collections/Examples';
import Users from './collections/Users';
import Admins from './collections/Admins';
import Pokemons from './collections/Pokemons';

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Admins.slug,
  },
  collections: [
    Users,
    Admins,
    Pokemons
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
})
