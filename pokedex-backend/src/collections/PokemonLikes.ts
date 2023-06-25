import { Pokemon, PokemonLike, User } from 'payload/generated-types';
import { CollectionAfterChangeHook, CollectionConfig } from 'payload/types';

const addNotification: CollectionAfterChangeHook<PokemonLike> = async ({
  doc,
  req,
  operation,
}) => {
  if (operation !== 'create') return;
  const likedPokemon = doc.pokemon as Pokemon;
  const likedByUser = doc.user as User;

  let nextPage: number | null = 1;
  do {
    const response = await req.payload.find({
      collection: 'pokemon_likes',
      where: {
        and: [
          { pokemon: { equals: likedPokemon.id } },
          { user: { not_equals: likedByUser.id } },
        ],
      },
      page: nextPage,
    });

    await Promise.all(
      response.docs.map((like) =>
        req.payload.create({
          collection: 'notifications',
          data: {
            to_user: (like.user as User).id,
            from_user: likedByUser.id,
            pokemon: likedPokemon.id,
          },
        })
      )
    );

    nextPage = response.nextPage;
  } while (nextPage !== null);
};

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
  hooks: {
    afterChange: [addNotification],
  },
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
