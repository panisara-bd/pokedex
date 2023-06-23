import Pokeball from './Pokeball';
import { Link, useFetcher, useRouteLoaderData } from '@remix-run/react';
import { like, unlike } from '~/backend.server';
import { PokemonType } from '~/backend/types.server';
import { LoaderData as RootLoaderData } from '~/root';

type Props = {
  pokemon: PokemonType;
};

export default function Card({ pokemon }: Props) {
  const { likedPokemons } = useRouteLoaderData('root') as RootLoaderData;
  const { id, image } = pokemon;
  const formattedName = pokemon.name.replace(/-/g, ' ');
  const likeFetcher = useFetcher();
  const isLiked = likedPokemons.some(likedPokemon => likedPokemon.id === id);

  return (
    <div className="flex flex-row flex-wrap w-80 mx-10 sm:mx-0 gap-2 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col flex-1">
        <h1 className="capitalize mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {formattedName}
        </h1>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          #<span className="font-bold">{id}</span>
        </p>
        <Link
          to={`/pokemons/${id}`}
          className="font-light text-xs underline text-blue-400"
        >
          See full details
        </Link>
        <likeFetcher.Form method="post" action={`pokemons/${id}`}>
          <button
            type="submit"
            name="_action"
            value={isLiked ? 'unlike' : 'like'}
            className=" bg-slate-50 hover:bg-blue-300 flex items-center px-3 py-2 mt-4 rounded-lg"
            onClick={() => (isLiked ? like : unlike)}
            disabled={likeFetcher.state === 'loading'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="h-5"
            >
              <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
            </svg>
            <p className="pl-3 text-xs">{isLiked ? 'Unlike' : 'Like'}</p>
          </button>
        </likeFetcher.Form>
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
