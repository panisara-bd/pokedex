import { Session, createCookieSessionStorage } from '@remix-run/node';

type SessionData = {
  user: {
    id: string;
    username: string;
  };
  token: string;
  exp: number;
};

type SessionFlashData = never;

export type PokedexSession = Session<SessionData, SessionFlashData>;
export type PokedexSessionUser = SessionData['user'];

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: 'pokedex-auth',
      httpOnly: true,
    },
  });

const getSessionFromRequest = (request: Request) =>
  getSession(request.headers.get('Cookie'));

export { getSession, getSessionFromRequest, commitSession, destroySession };
