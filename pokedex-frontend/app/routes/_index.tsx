import type { ActionArgs, V2_MetaFunction } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import { useState } from 'react';
import { search } from '~/backend/search.server';
import { PaginatedResponse, PokemonType } from '~/backend/types.server';
import Card from '~/components/Card';
import SearchBar from '~/components/SearchBar';
import { useRootLoaderData } from '~/root';
import Header from '~/components/Header';
import { invalidParameterError } from '~/backend/errors.server';

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Pokédex app by Panisara' },
    { name: 'description', content: 'Welcome to Pokédex app by Panisara!' },
  ];
};

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const query = body.get('query');
  const sortBy = body.get('sortBy');
  const sortOrder = body.get('sortOrder');
  if (sortBy !== 'name' && sortBy !== 'id')
    throw invalidParameterError('You can only sort by name or id')
  const sort = `${sortOrder === 'descending' ? '-' : ''}${sortBy}`;
  return await search(query, sort);
}

export default function Index() {
  const { user, likedPokemons } = useRootLoaderData();
  const [searchQuery, setSearchQuery] = useState('');
  const searchResults = useActionData() as
    | PaginatedResponse<PokemonType>
    | undefined;

  return (
    <main>
      <Header />
      <div className="flex flex-col py-30 items-center">
        <span className="text-center py-10 text-3xl font-bold text-gray-900 dark:text-gray-50">
          Hi{user ? ` ${user.username}` : ''}!
        </span>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <div className="text-center">
        <div className="text-left inline-grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-10">
          {searchQuery.trim()
            ? searchResults?.docs?.map((pokemon) => (
                <Card key={pokemon.id} pokemon={pokemon} />
              ))
            : likedPokemons.map((pokemon) => (
                <Card key={pokemon.id} pokemon={pokemon} />
              ))}
        </div>
      </div>
    </main>
  );
}
