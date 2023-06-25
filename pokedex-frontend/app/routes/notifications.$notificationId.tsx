import { ActionArgs } from '@remix-run/node';
import { invalidParameterError } from '~/backend/errors.server';
import { markNotificationSeen } from '~/backend/markNotificationSeen.server';
import { getSessionFromRequest } from '~/session.server';

export async function action({ request, params }: ActionArgs) {
  const session = await getSessionFromRequest(request);
  const notificationId = params.notificationId;
  if (!notificationId)
    throw invalidParameterError('Notification id is required.');
  await markNotificationSeen(notificationId, session);
  return null;
}
