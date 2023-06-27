import { json, LoaderArgs, type LinksFunction } from '@remix-run/node';
import styles from './tailwind.css';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from '@remix-run/react';
import {
  commitSession,
  getSessionFromRequest,
  PokedexSessionUser,
} from './session.server';
import { NotificationType, PokemonType } from './backend/types.server';
import { getMyLikedPokemons } from './backend/getMyLikedPokemons.server';
import { getNotifications } from './backend/getNotifications.server';
import { getPokemonLikes } from './backend/getPokemonLikes.server';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export type LoaderData = {
  user: PokedexSessionUser | undefined;
  likedPokemons: PokemonType[];
  pokemonLikes: Record<string, number>;
  notifications: NotificationType[];
};

export async function loader({ request }: LoaderArgs) {
  const session = await getSessionFromRequest(request);
  const user = session.get('user');
  const [likedPokemons, notifications, pokemonLikes] = await Promise.all([
    getMyLikedPokemons(session),
    getNotifications(session),
    getPokemonLikes(),
  ]);
  return json(
    { user, likedPokemons, pokemonLikes, notifications },
    {
      headers: {
        'set-cookie': await commitSession(session),
      },
    }
  );
}

export function useRootLoaderData() {
  return useRouteLoaderData('root') as LoaderData;
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-50 dark:bg-gray-900">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
