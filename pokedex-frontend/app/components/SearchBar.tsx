import { useState } from 'react';
import { PokemonType } from 'types';
import { searchPokemons } from '~/pokedex-backend';

type Props = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSearchResults: React.Dispatch<React.SetStateAction<PokemonType[]>>;
};

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  setSearchResults,
}: Props) {
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout>();

  const getResult = async (query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await searchPokemons(query);
      const result = (await response.json()).docs;
      setSearchResults(result);
    } catch (error) {
      console.error(error);
    }
  };

  const onSearchChange = async (query: string) => {
    setSearchQuery(query);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => getResult(query), 500);
    setDebounceTimeout(timeout);
  };

  return (
    <div className="relative w-1/2">
      <div className="absolute w-full inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          aria-hidden="true"
          className="w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      <input
        type="search"
        id="search"
        onChange={(e) => {
          onSearchChange(e.target.value);
        }}
        value={searchQuery}
        className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search for Pokeomens i.e. Pikachu..."
      />
    </div>
  );
}
