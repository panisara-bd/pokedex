import { PokedexSession } from '~/session.server';
import { authenticatedFetch } from './authenticatedFetch.server';
import { NotificationType, PaginatedResponse, PokemonLikeType } from './types.server';

export const getNotifications = async (session: PokedexSession) => {
  const userId = session.get('user')?.id;
  if (!userId) return [];
  
  const notifications: NotificationType[] = [];

  let nextPage: number | null = 1;
  do {
    const response = await authenticatedFetch({
      url: '/api/notifications',
      session,
      queryString: {
        page: nextPage,
        where: {
          to_user: { equals: userId },
        },
      },
    });

    if (!response.ok) break;
    const result: PaginatedResponse<NotificationType> = await response.json();
    notifications.push(...result.docs);
    nextPage = result.nextPage;
  } while (nextPage !== null);
  return notifications;
};