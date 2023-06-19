import axios from 'axios';
import payload from 'payload';
import 'dotenv/config';

type PokemonType = {
  name: string;
  url: string;
};

const processBatch = async (batchUrl: string) => {
  console.log('Processing batch ' + batchUrl);

  const response = await axios.get(batchUrl);

  const promises = response.data.results.map(async (pokemon: PokemonType) => {
    const urlParts = pokemon.url.split('/');
    const id = urlParts[urlParts.length - 2];

    try {
      await payload.create({
        collection: 'pokemons',
        data: {
          name: pokemon.name,
          id: id,
        },
      });
    } catch {
      await payload.update({
        collection: 'pokemons',
        id,
        data: {
          name: pokemon.name,
        },
      });
    }
  });

  await Promise.all(promises);
  return response.data.next;
};

const seed = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    local: true,
  });

  let currentBatchUrl = 'https://pokeapi.co/api/v2/pokemon';
  while (currentBatchUrl !== null) {
    currentBatchUrl = await processBatch(currentBatchUrl);
  }

  console.log('Done');
};

seed();
