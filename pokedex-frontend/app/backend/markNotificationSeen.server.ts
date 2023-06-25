import { PokedexSession } from '~/session.server';
import { authenticatedFetch } from './authenticatedFetch.server';

export const markNotificationSeen = async (
  notificationId: string,
  session: PokedexSession
) => {
  const response = await authenticatedFetch({
    url: `/api/notifications/${notificationId}/mark-seen`,
    method: 'post',
    session,
  });

  if (!response.ok) {
    const status = response.status;
    const responseText = await response.text();
    console.error(
      `Error marking notification as seen, status=${status}, responseText=${responseText}`
    );
  }
};
