import { CollectionConfig } from 'payload/types';

const Pokemons: CollectionConfig = {
  slug: 'pokemons',
  access: {
    read: () => true,
  },
  fields: [
    {
        name: 'id',
        type: 'number'
    },
    {
        name: 'name', 
        type: 'text',
        index: true,
    },
    {
      name: 'image',
      type: 'text',
    }
  ],
};

export default Pokemons;