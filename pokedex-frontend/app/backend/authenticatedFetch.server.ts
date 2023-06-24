import qs from 'qs';
import { BASE_URL } from './constants.server';
import { Headers } from '@remix-run/node';
import { PokedexSession } from '~/session.server';
import { internalServerError } from './errors.server';

const refreshToken = async (session: PokedexSession) => {
  const token = session.get('token');
  const exp = session.get('exp');
  if (!token || !exp) return;

  const expireDiff = exp * 1000 - new Date().getTime();
  const ONE_HOUR = 60 * 60 * 1000;
  if (expireDiff > ONE_HOUR || expireDiff < 0) return;

  const response = await fetch(`${BASE_URL}/api/users/refresh-token`, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
      authorization: `JWT ${token}`,
    },
  });

  if (!response.ok) {
    const status = response.status;
    const responseText = await response.text();
    console.error(
      `Error refreshing token, status=${status}, responseText=${responseText}`
    );
    throw internalServerError();
  }

  const responseData = await response.json();
  session.set('token', responseData.refreshedToken);
  session.set('exp', responseData.exp);
};

type AuthenticatedFetchParams = {
  url: string;
  method?: 'get' | 'post' | 'delete';
  queryString?: unknown;
  body?: unknown;
  session?: PokedexSession;
};

export const authenticatedFetch = async ({
  url,
  method = 'get',
  queryString,
  body,
  session,
}: AuthenticatedFetchParams) => {
  const finalUrl =
    BASE_URL +
    url +
    (queryString ? qs.stringify(queryString, { addQueryPrefix: true }) : '');

  const headers = new Headers();
  headers.set('content-type', 'application/json');
  if (session && session.has('token')) {
    await refreshToken(session);
    headers.set('authorization', `JWT ${session.get('token')}`);
  }

  return await fetch(finalUrl, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers,
  });
};
