import { Access, CollectionConfig } from 'payload/types';

const PokemonLikes: CollectionConfig = {
  slug: 'pokemon_likes',
  timestamps: false,
  access: {
    create: ({ req: { user }, data }) => Boolean(user) && data.user === user.id,
    read: () => true,
    update: () => false,
    delete: ({ req: { user } }) =>
      Boolean(user) && { user: { equals: user.id } },
  },
  indexes: [
    {
      fields: { user: 1, pokemon: 1 },
      options: { unique: true },
    },
  ],
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
    },
    {
      name: 'pokemon',
      type: 'relationship',
      relationTo: 'pokemons',
      hasMany: false,
      index: true,
    },
  ],
};

export default PokemonLikes;
