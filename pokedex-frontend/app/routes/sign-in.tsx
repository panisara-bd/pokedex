import {
  ActionArgs,
  redirect,
  Response,
  type V2_MetaFunction,
} from '@remix-run/node';
import {
  Form,
  useRouteError,
  isRouteErrorResponse,
  useActionData,
  Link,
} from '@remix-run/react';
import { signIn } from '~/backend/auth.server';
import Pokeball from '~/components/Pokeball';
import { commitSession, getSessionFromRequest } from '~/session.server';

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Pokédex • Sign In' },
    {
      name: 'description',
      content:
        'Sign in to your account to keep track of your favorite Pokémons',
    },
  ];
};

export async function action({ request }: ActionArgs) {
  const session = await getSessionFromRequest(request);

  const body = await request.formData();
  const email = body.get('email');
  const password = body.get('password');

  try {
    await signIn(email, password, session);
  } catch (error) {
    if (error instanceof Response && [400, 401].includes(error.status))
      return error;

    throw error;
  }

  return redirect(`/`, {
    headers: {
      'set-cookie': await commitSession(session),
    },
  });
}

export default function SignInRoute() {
  const error = useActionData();

  return (
    <section>
      <div className="relative flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-scroll">
        <Pokeball className="z-0 absolute top-50 w-11/12 sm:w-3/5 fill-blue-400 opacity-10" />
        <a
          href="#"
          className="z-10 flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <p className=" text-black dark:text-white text-5xl font-bold mb-10">
            Welcome back to Pokédex!
          </p>
        </a>
        <div className="z-10 w-full bg-white bg-opacity-80 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:bg-opacity-80 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Sign in to your account
            </h1>
            <Form method="post" className="space-y-4 md:space-y-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email:
              </label>
              <input
                type="text"
                name="email"
                placeholder="name@company.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password:
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <p className="text-gray-900 dark:text-gray-100 block text-center">
                Don't have an account already?{' '}
                <Link
                  className="text-blue-900 dark:text-blue-100 inline underline"
                  to="/sign-up"
                >
                  Sign up here!
                </Link>
                <br />
                Or{' '}
                <Link
                  className="text-blue-900 dark:text-blue-100 inline underline"
                  to="/"
                >
                  try out without an account.
                </Link>
              </p>
              <button
                type="submit"
                className="w-full text-white bg-black hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              {error ? <em className="text-red-500">{error.message}</em> : null}
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
      </div>
    );
  }

  throw error;
}
