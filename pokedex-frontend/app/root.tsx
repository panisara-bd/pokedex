import { json, LoaderArgs, type LinksFunction } from '@remix-run/node';
import styles from './tailwind.css';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { getSessionFromRequest, PokedexSessionUser } from './session.server';
import { PokemonType } from './backend/types.server';
import { getMyLikedPokemons } from './backend/getLikes.server';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export type LoaderData = {
  user: PokedexSessionUser | undefined;
  likedPokemons: PokemonType[];
};

export async function loader({ request }: LoaderArgs) {
  const session = await getSessionFromRequest(request);
  const user = session.get('user');
  const likedPokemons = await getMyLikedPokemons(session);
  return json({ user, likedPokemons });
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
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
