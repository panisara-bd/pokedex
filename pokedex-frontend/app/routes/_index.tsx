import type { V2_MetaFunction } from '@remix-run/node';
import { useState } from 'react';
import { PokemonType } from 'types';
import Card from '~/components/Card';
import SearchBar from '~/components/SearchBar';

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

const likedPokemons = [
  {
    id: 2,
    name: 'ivysaur',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
  },
  {
    id: 1,
    name: 'bulbasaur',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  },
  {
    id: 3,
    name: 'venusaur',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png',
  },
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<PokemonType[]>([]);

  return (
    <main>
      <div className="flex flex-col py-30 items-center">
        <span className="text-center py-10 text-3xl font-bold">
          Hi username!
        </span>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setSearchResults={setSearchResults}
        />
      </div>
      <div className="text-center">
        <div className="text-left inline-grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-10">
          {searchQuery.trim()
            ? searchResults?.map((pokemon) => (
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
