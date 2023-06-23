import qs from 'qs';

const BASE_URL = 'http://localhost:3000';

export type User = {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export const getUsers = () => fetch(`${BASE_URL}/api/users`);

export const searchPokemons = (query: string) => {
  const searchQuery = qs.stringify(
    {
      where: {
        or: [{ name: { like: query } }, { id: { equals: query } }],
      },
    },
    { addQueryPrefix: true }
  );

  return fetch(`${BASE_URL}/api/pokemons${searchQuery}`);
};

export const like = (pokemon: number, user: string) =>
  fetch(`${BASE_URL}/api/pokemon_likes`, {
    method: 'post',
    body: JSON.stringify({ pokemon, user }),
    headers: { 'content-type': 'application/json' },
  });

export const unlike = (pokemon: number, user: string) => {
  const searchQuery = qs.stringify(
    {
      where: {
        and: [{ pokemon: { equals: pokemon } }, { user: { equals: user } }],
      },
    },
    { addQueryPrefix: true }
  );

  return fetch(`${BASE_URL}/api/pokemon_likes${searchQuery}`, {
    method: 'delete',
  });
};
