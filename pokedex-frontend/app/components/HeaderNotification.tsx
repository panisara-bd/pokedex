import { useEffect } from 'react';
import { formatPokemonName } from '~/formatPokemonName';
import Pokeball from './Pokeball';
import { useFetcher } from '@remix-run/react';
import { NotificationType } from '~/backend/types.server';

type Props = {
  notification: NotificationType;
};

export default function HeaderNotification({ notification }: Props) {
  const seenActionFetcher = useFetcher();

  useEffect(() => {
    seenActionFetcher.submit(
      {},
      { method: 'post', action: `/notifications/${notification.id}` }
    );
  }, []);

  return (
    <div className="px-3 py-2 bg-gray-100 dark:bg-gray-800">
      {notification.pokemon.image ? (
        <img src={notification.pokemon.image} className="inline w-8" />
      ) : (
        <Pokeball className="inline w-8 p-1" />
      )}{' '}
      <strong>{notification.from_user.username}</strong> also likes{' '}
      <strong className="capitalize">
        {formatPokemonName(notification.pokemon.name)}
      </strong>
      !
    </div>
  );
}
