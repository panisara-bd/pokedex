import { CollectionConfig } from 'payload/types';

const Pokemons: CollectionConfig = {
  slug: 'pokemons',
  access: {
    read: () => true,
  },
  fields: [
    {
        name: 'name', 
        type: 'text'
    },
    {
        name: 'id',
        type: 'number'
    }
  ],
};

export default Pokemons;