import { type LoaderArgs, ActionArgs } from '@remix-run/node';
import { invalidParameterError } from '~/backend/errors.server';
import { like } from '~/backend/like.server';
import { unlike } from '~/backend/unlike.server';
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
