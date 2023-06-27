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
  endpoints: [
    {
      path: '/counts',
      method: 'get',
      handler: async (req, res) => {
        const model = req.payload.collections.pokemon_likes.Model;
        const result = await model.aggregate([
          { $project: { _id: 1, pokemon: 1 } },
          { $unwind: '$pokemon' },
          { $group: { _id: '$pokemon', count: { $sum: 1 } } },
        ]);

        res.status(200).send(result);
      },
    },
    {
      path: '/pokemon/:id/like',
      method: 'post',
      handler: async (req, res) => {
        const user = req.user;
        const pokemonId = req.params.id;
        if (!user) {
          res
            .status(401)
            .send({
              message: 'You need to be logged in in order to like a Pokemon.',
            });
          return;
        }

        await req.payload.create({
          collection: 'pokemon_likes',
          data: {
            pokemon: pokemonId,
            user: user.id,
          },
        });

        res.sendStatus(201);
      },
    },
    {
      path: '/pokemon/:id/like',
      method: 'delete',
      handler: async (req, res) => {
        const user = req.user;
        const pokemonId = req.params.id;
        if (!user) {
          res
            .status(401)
            .send({
              message: 'You need to be logged in in order to like a Pokemon.',
            });
          return;
        }

        await req.payload.delete({
          collection: 'pokemon_likes',
          where: {
            pokemon: { equals: parseInt(pokemonId) },
            user: { equals: user.id },
          },
        });

        res.sendStatus(204);
      },
    },
  ],
};

export default PokemonLikes;
