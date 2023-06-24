import { PokedexSession } from '~/session.server';
import { authenticatedFetch } from './authenticatedFetch.server';
import { forbiddenError } from './errors.server';

export const like = (pokemonId: string, session: PokedexSession) => {
  const userId = session.get('user')?.id;
  if (!session.has('token') || !userId) {
    throw forbiddenError();
  }

  return authenticatedFetch({
    url: '/api/pokemon_likes',
    method: 'post',
    session,
    body: {
      pokemon: pokemonId,
      user: userId,
    },
  });
};
