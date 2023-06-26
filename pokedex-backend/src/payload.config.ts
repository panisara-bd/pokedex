import { buildConfig } from 'payload/config';
import path from 'path';
import Users from './collections/Users';
import Pokemons from './collections/Pokemons';
import PokemonLikes from './collections/PokemonLikes';
import Notifications from './collections/Notifications';

export default buildConfig({
  serverURL: process.env.SERVER_URL,
  admin: { disable: true },
  collections: [
    Users,
    Pokemons,
    PokemonLikes,
    Notifications,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: { disable: true },
  cors: ['http://localhost:3001', 'https://pokedex-pani.vercel.app']
})
