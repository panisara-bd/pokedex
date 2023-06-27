import { authenticatedFetch } from './authenticatedFetch.server';
import { invalidParameterError } from './errors.server';

export const search = (query: unknown, sort: string) => {
  if (typeof query !== 'string' || !query.trim())
    throw invalidParameterError('Search query is required.');

  return authenticatedFetch({
    url: '/api/pokemons',
    queryString: {
      sort,
      where: {
        or: [{ name: { like: query } }, { id: { equals: query } }],
      },
    },
  });
};
