import { useRootLoaderData } from '~/root';
import HeaderButton from './HeaderButton';
import IconBell from './IconBell';
import { Form } from '@remix-run/react';
import HeaderNotifications from './HeaderNotifications';

export default function Header() {
  const { user } = useRootLoaderData();

  return (
    <div className="flex flex-row justify-end mb-2 pt-5">
      <HeaderNotifications />

      {user ? (
        <Form method="post" action="/sign-out">
          <HeaderButton type="submit">Sign out</HeaderButton>
        </Form>
      ) : (
        <HeaderButton type="link" to="/sign-in">
          Sign in
        </HeaderButton>
      )}
    </div>
  );
}
