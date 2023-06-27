import { authenticatedFetch } from './authenticatedFetch.server';

type Response = Array<{
  _id: number;
  count: number;
}>;

export const getPokemonLikes = async () => {
  const response = await authenticatedFetch({
    url: '/api/pokemon_likes/counts',
  });

  if (!response.ok) return {};

  const responseData: Response = await response.json();

  return Object.fromEntries(responseData.map((r) => [r._id, r.count]));
};
