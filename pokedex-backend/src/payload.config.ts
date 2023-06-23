import { buildConfig } from 'payload/config';
import path from 'path';
import Users from './collections/Users';
import Admins from './collections/Admins';
import Pokemons from './collections/Pokemons';
import PokemonLikes from './collections/PokemonLikes';

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Admins.slug,
  },
  collections: [
    Users,
    Admins,
    Pokemons,
    PokemonLikes,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  cors: ['http://localhost:3001']
})
