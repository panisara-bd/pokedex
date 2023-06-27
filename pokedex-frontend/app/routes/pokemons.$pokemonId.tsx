import { type LoaderArgs, ActionArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { invalidParameterError } from '~/backend/errors.server';
import { like } from '~/backend/like.server';
import { unlike } from '~/backend/unlike.server';
import Header from '~/components/Header';
import IconHeart from '~/components/IconHeart';
import IconHeartFull from '~/components/IconHeartFull';
import Pokeball from '~/components/Pokeball';
import { formatPokemonName } from '~/formatPokemonName';
import { useRootLoaderData } from '~/root';
import { getSessionFromRequest } from '~/session.server';

export async function action({ request, params }: ActionArgs) {
  const session = await getSessionFromRequest(request);
  const body = await request.formData();
  const action = body.get('_action');
  const pokemonId = params.pokemonId;
  if (!pokemonId) throw invalidParameterError('Pokemon is required.');

  switch (action) {
    case 'like':
      return await like(pokemonId, session);
    case 'unlike':
      return await unlike(pokemonId, session);
    default:
      throw invalidParameterError('Action is not implemented.');
  }
}

export async function loader({ params }: LoaderArgs) {
  return await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`);
}

type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  sprites: {
    other: {
      'official-artwork'?: {
        front_default?: string;
      };
    };
  };
  stats: Array<{
    stat: {
      name: string;
    };
    effort: number;
    base_stat: number;
  }>;
  types: Array<{
    slot: number;
    type: {
      name: string;
    };
  }>;
};

export default function PokemonRoute() {
  const pokemon = useLoaderData() as Pokemon;
  const formattedName = formatPokemonName(pokemon.name);
  const image = pokemon.sprites.other['official-artwork']?.front_default;
  const { user, pokemonLikes, likedPokemons } = useRootLoaderData();
  const isLiked = likedPokemons.some(
    (likedPokemon) => likedPokemon.id === pokemon.id
  );

  return (
    <section>
      <Header />
      <div className="flex flex-col py-30 items-center">
        <span className="text-center capitalize py-10 text-3xl font-bold text-gray-900 dark:text-gray-50">
          {formattedName}
        </span>
      </div>

      <div className="flex justify-center">
        <div className="w-10/12 bg-white bg-opacity-80 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:bg-opacity-80 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="text-center">
              {image ? (
                <img src={image} alt={formattedName} className="inline w-1/2" />
              ) : (
                <Pokeball className="inline w-1/2" />
              )}
            </div>
            <div className="mt-1">
              {pokemon.types.map(({ type }) => (
                <span className="bg-blue-100 px-3 py-1 mr-2 mt-2 rounded-md">
                  {type.name}
                </span>
              ))}
            </div>
            <p>
              <span className="font-bold">Weight:</span>{' '}
              {(pokemon.weight / 10).toFixed(1)}kg
            </p>
            <p>
              <span className="font-bold">Height:</span>{' '}
              {(pokemon.height / 10).toFixed(1)}m
            </p>

            <p className="text-s mt-4 mb-1.5 dark:text-gray-50">
              <span className="font-bold">{pokemonLikes[pokemon.id] || 0}</span>{' '}
              likes
            </p>

            {user && (
              <Form method="post">
                <button
                  type="submit"
                  name="_action"
                  value={isLiked ? 'unlike' : 'like'}
                  className="bg-blue-100 hover:bg-yellow-300 dark:bg-blue-800 dark:hover:bg-yellow-900 dark:text-gray-50 flex items-center px-3 py-2 rounded-lg"
                >
                  {isLiked ? <IconHeartFull /> : <IconHeart />}
                  <p className="pl-3 text-xs">{isLiked ? 'Unlike' : 'Like'}</p>
                </button>
              </Form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
