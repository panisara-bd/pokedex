import {
    ActionArgs,
    json,
    redirect,
    type V2_MetaFunction,
  } from '@remix-run/node';
  import {
    Form,
    useRouteError,
    isRouteErrorResponse,
    useActionData,
  } from '@remix-run/react';
  import { signUp } from '~/pokedex-backend.server';
  
  export const meta: V2_MetaFunction = () => {
    return [{ title: 'Sign Up' }, { name: 'description', content: 'Sign Up' }];
  };
  
  export async function action({ request }: ActionArgs) {
    const body = await request.formData();
    const email = body.get('email') as string;
    const username = body.get('username') as string;
    const password = body.get('password') as string;
    // TODO add validation
    const response = await signUp({email, username, password});
  
    if (!response.ok) {
      throw json('Something went wrong. Try again.', { status: 500 });
    }
  
    return redirect(`/`);
  }
  
  export default function SignUpRoute() {
    const error = useActionData();
  
    return (
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <p className=" text-black" >
              Welcome to Pokedex!
            </p>    
        </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Create an account
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
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username:
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="yourname"
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
                <button
                  type="submit"
                  className="w-full text-black bg-purple-300 hover:bg-purple-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
Create an account
                </button>
                {error ? <em>{error.message}</em> : null}
              </Form>
            </div>
          </div>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/261.svg" width={200} className='animate-bounce'/>
        </div>
      </section>
    );
  }
  
  export function ErrorBoundary() {
    const error = useRouteError();
    console.log('hi', isRouteErrorResponse(error), error);
  
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
  