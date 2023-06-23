import { json } from '@remix-run/node';

export const internalServerError = () =>
  json({ message: 'Something went wrong. Try again.' }, { status: 500 });

export const invalidCredentialsError = () =>
  json({ message: 'The email or password is incorrect.' }, { status: 401 });

export const invalidParameterError = (message: string) =>
  json({ message }, { status: 400 });

export const forbiddenError = () =>
  json({ message: 'You are not allowed to do that.' }, { status: 403 });