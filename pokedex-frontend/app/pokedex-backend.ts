import qs from 'qs';

const BASE_URL = 'http://localhost:3000';

export type PaginatedResponse<Collection> = {
  docs: Collection[];
  totalDocs: number;
  totalPages: number;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
};

export type User = {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export const getUsers = () => fetch(`${BASE_URL}/api/users`);

export const signIn = (email: string, password: string) =>
  fetch(`${BASE_URL}/api/users/login`, {
    method: 'post',
    body: JSON.stringify({ email, password }),
    headers: { 'content-type': 'application/json' },
  });

type SignUpParams = {
  email: string;
  username: string;
  password: string;
};

export const signUp = (params: SignUpParams) =>
  fetch(`${BASE_URL}/api/users`, {
    method: 'post',
    body: JSON.stringify(params),
    headers: { 'content-type': 'application/json' },
  });

export const searchPokemons = (query: string) => {
  const searchQuery = qs.stringify(
    {
      where: {
        or: [
          { name: { like: query } },
          { id: { equals: query } },
        ],
      },
    },
    { addQueryPrefix: true }
  );
  console.log(searchQuery);
  return fetch(`${BASE_URL}/api/pokemons${searchQuery}`);
};

export const getPokemonById = (id: number) =>
  fetch(`${BASE_URL}/api/pokemons/${id}`);
