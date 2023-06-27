import Pokeball from './Pokeball';
import { Link, useFetcher } from '@remix-run/react';
import { PokemonType } from '~/backend/types.server';
import { useRootLoaderData } from '~/root';
import IconHeart from './IconHeart';
import IconHeartFull from './IconHeartFull';
import { formatPokemonName } from '~/formatPokemonName';

type Props = {
  pokemon: PokemonType;
};

export default function Card({ pokemon }: Props) {
  const { likedPokemons, pokemonLikes, user } = useRootLoaderData();
  const { id, image } = pokemon;
  const formattedName = formatPokemonName(pokemon.name);
  const isLiked = likedPokemons.some((likedPokemon) => likedPokemon.id === id);
  const likeActionFetcher = useFetcher();

  return (
    <div className="flex flex-row flex-wrap w-80 mx-10 sm:mx-0 gap-2 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col flex-1">
        <h1 className="capitalize mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {formattedName}
        </h1>
        <p className="mb-1 font-bold text-gray-700 dark:text-gray-400">#{id}</p>
        <Link to={`/pokemons/${id}`} className="text-blue-500 hover:underline text-sm">See more details</Link>

        <p className="text-s mt-4 mb-1.5 dark:text-gray-50">
          <span className="font-bold">{pokemonLikes[pokemon.id] || 0}</span>{' '}
          likes
        </p>

        {user && (
          <likeActionFetcher.Form method="post" action={`pokemons/${id}`}>
            {likeActionFetcher.state !== 'idle' ? (
              <div role="status" className="animate-pulse">
                <div className="h-9 w-16 bg-gray-300 rounded-lg dark:bg-gray-700"></div>
              </div>
            ) : (
              <button
                type="submit"
                name="_action"
                value={isLiked ? 'unlike' : 'like'}
                className="bg-blue-100 hover:bg-yellow-300 dark:bg-blue-800 dark:hover:bg-yellow-900 dark:text-gray-50 flex items-center px-3 py-2 rounded-lg"
              >
                {isLiked ? <IconHeartFull /> : <IconHeart />}
                <p className="pl-3 text-xs">{isLiked ? 'Unlike' : 'Like'}</p>
              </button>
            )}
          </likeActionFetcher.Form>
        )}
      </div>
      {image ? (
        <img
          src={image}
          alt={formattedName}
          className="flex-1 w-1/2 self-end"
        />
      ) : (
        <Pokeball className="flex-1 w-80" />
      )}
    </div>
  );
}
