import { type V2_MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { PaginatedResponse, User, getUsers } from '~/pokedex-backend';

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Users' },
    { name: 'description', content: 'A list of users' },
  ];
};

export const loader = async () => {
  const users = await getUsers();
  return users;
};

export default function UsersRoute() {
  const { docs: users } = useLoaderData<PaginatedResponse<User>>();

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
}
