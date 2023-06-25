import { ActionArgs, redirect } from '@remix-run/node';
import { signOut } from '~/backend/auth.server';
import { destroySession, getSessionFromRequest } from '~/session.server';

export async function action({ request }: ActionArgs) {
  const session = await getSessionFromRequest(request);
  await signOut(session);
  return redirect(`/`, {
    headers: {
      'set-cookie': await destroySession(session),
    },
  });
}
