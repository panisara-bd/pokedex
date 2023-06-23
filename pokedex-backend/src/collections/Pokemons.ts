import { CollectionConfig } from 'payload/types';

const Pokemons: CollectionConfig = {
  slug: 'pokemons',
  timestamps: false,
  access: {
    create: () => false,
    read: () => true,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: 'id',
      type: 'number',
    },
    {
      name: 'name',
      type: 'text',
      index: true,
    },
    {
      name: 'image',
      type: 'text',
    },
  ],
};

export default Pokemons;
