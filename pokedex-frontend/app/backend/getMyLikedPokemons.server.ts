import { PokedexSession } from '~/session.server';
import { authenticatedFetch } from './authenticatedFetch.server';
import { forbiddenError } from './errors.server';
import {
  PaginatedResponse,
  PokemonLikeType,
  PokemonType,
} from './types.server';

export const getMyLikedPokemons = async (session: PokedexSession) => {
  const userId = session.get('user')?.id;
  if (!session.has('token') || !userId) {
    return [];
  }

  const likedPokemons: PokemonType[] = [];
  let hasNextPage = true;
  do {
    const response = await authenticatedFetch({
      url: '/api/pokemon_likes',
      queryString: {
        where: {
          user: { equals: userId },
        },
      },
    });

    const result: PaginatedResponse<PokemonLikeType> = await response.json();
    const pokemons = result.docs.map((like) => like.pokemon);
    likedPokemons.push(...pokemons);

    hasNextPage = result.hasNextPage;
  } while (hasNextPage);

  return likedPokemons;
};
