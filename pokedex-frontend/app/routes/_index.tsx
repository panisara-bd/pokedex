import type { ActionArgs, V2_MetaFunction } from '@remix-run/node';
import { useActionData, useRouteLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { search } from '~/backend/search.server';
import { PaginatedResponse, PokemonType } from '~/backend/types.server';
import Card from '~/components/Card';
import SearchBar from '~/components/SearchBar';
import { LoaderData as RootLoaderData } from '~/root';

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Pokedex app by Panisara' },
    { name: 'description', content: 'Welcome to Pokedex app by Panisara!' },
  ];
};

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const query = body.get('query');
  return await search(query);
}

export default function Index() {
  const { user, likedPokemons } = useRouteLoaderData('root') as RootLoaderData;
  const [searchQuery, setSearchQuery] = useState('');
  const searchResults = useActionData() as
    | PaginatedResponse<PokemonType>
    | undefined;

  return (
    <main>
      <div className="flex flex-col py-30 items-center">
        <span className="text-center py-10 text-3xl font-bold">
          Hi {user?.username || 'Guest'}!
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
