import { BASE_URL } from './constants.server';
import {
  internalServerError,
  invalidCredentialsError,
  invalidParameterError,
} from './errors.server';
import { PokedexSession } from '~/session.server';

type SignInResponseData = {
  user: {
    id: string;
    username: string;
    email: string;
  };
  token: string;
  exp: number;
};

export const signIn = async (
  email: unknown,
  password: unknown,
  session: PokedexSession
): Promise<void> => {
  if (typeof email !== 'string' || !email.trim())
    throw invalidParameterError('Email is required.');
  if (typeof password !== 'string' || !password.trim())
    throw invalidParameterError('Password is required.');

  const response = await fetch(`${BASE_URL}/api/users/login`, {
    method: 'post',
    body: JSON.stringify({ email, password }),
    headers: { 'content-type': 'application/json' },
  });

  if (response.status === 401) throw invalidCredentialsError();
  if (!response.ok) {
    const status = response.status;
    const responseText = await response.text();
    console.error(`Error logging in, status=${status}, responseText=${responseText}`)
    throw internalServerError();
  }

  const responseData: SignInResponseData = await response.json();

  session.set('token', responseData.token);
  session.set('exp', responseData.exp);
  session.set('user', {
    id: responseData.user.id,
    username: responseData.user.username,
  });
};

type SignUpParams = {
  email: unknown;
  username: unknown;
  password: unknown;
};

export const signUp = async (params: SignUpParams) => {
  if (typeof params.email !== 'string' || !params.email.trim())
    throw invalidParameterError('Email is required.');
  if (typeof params.username !== 'string' || !params.username.trim())
    throw invalidParameterError('Username is required.');
  if (typeof params.password !== 'string' || !params.password.trim())
    throw invalidParameterError('Password is required.');

  const response = await fetch(`${BASE_URL}/api/users`, {
    method: 'post',
    body: JSON.stringify(params),
    headers: { 'content-type': 'application/json' },
  });

  if (!response.ok) {
    const status = response.status;
    const responseText = await response.text();
    console.error(`Error signing up, status=${status}, responseText=${responseText}`)
    throw internalServerError();
  }
};
