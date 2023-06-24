import { V2_MetaFunction, type LoaderArgs, ActionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { invalidParameterError } from '~/backend/errors.server';
import { getLikes } from '~/backend/getLikes.server';
import { like } from '~/backend/like.server';
import { unlike } from '~/backend/unlike.server';
import { getSessionFromRequest } from '~/session.server';

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Pokemon details' },
    { name: 'description', content: 'Selected pokemon details' },
  ];
};

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
  const [pokemon, likes] = await Promise.all([
    fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`),
    getLikes(params.pokemonId!, 'pokemon'),
  ]);

  const likedByUsers = likes.map((like) => like.user.username);
  return { pokemon, likedByUsers };
}

export default function PokemonDetailsRoute() {
  const pokemon = useLoaderData();
  console.log(pokemon);

  if (!pokemon) {
    return <h1>Oops</h1>;
  }
  return <h1>{pokemon.name}</h1>;
}
