import { PokedexSession } from '~/session.server';
import { authenticatedFetch } from './authenticatedFetch.server';
import { PaginatedResponse, PokemonLikeType } from './types.server';

export const getLikes = async (id: string, type: 'pokemon' | 'user') => {
  const likes: PokemonLikeType[] = [];

  let nextPage: number | null = 1;
  do {
    const response = await authenticatedFetch({
      url: '/api/pokemon_likes',
      queryString: {
        page: nextPage,
        where: {
          [type]: { equals: id },
        },
      },
    });

    if (!response.ok) break;

    const result: PaginatedResponse<PokemonLikeType> = await response.json();
    likes.push(...result.docs);

    nextPage = result.nextPage;
  } while (nextPage !== null);

  return likes;
};

export const getMyLikedPokemons = async (session: PokedexSession) => {
  const userId = session.get('user')?.id;
  if (!userId) return [];
  const likes = await getLikes(userId, 'user');
  return likes.map((like) => like.pokemon);
};
