import { useRootLoaderData } from '~/root';
import HeaderButton from './HeaderButton';
import IconBell from './IconBell';
import { useState } from 'react';
import HeaderNotification from './HeaderNotification';

export default function HeaderNotifications() {
  const { user, notifications } = useRootLoaderData();
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleIsExpanded = () =>
    setIsExpanded((previousIsExpanded) => !previousIsExpanded);

  if (!user) {
    return;
  }

  return (
    <>
      <HeaderButton type="button" onClick={toggleIsExpanded}>
        <IconBell />
        {notifications.some((notification) => !notification.seen) && (
          <div className="h-3.5 w-3.5 absolute top-1.5 right-5 bg-red-600 rounded-full"></div>
        )}
      </HeaderButton>

      {isExpanded && (
        <div
          role="tooltip"
          className="absolute z-10 inline-block w-72 top-20 right-5 text-sm text-gray-500 duration-300 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
        >
          <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Notifications
            </h3>
          </div>
          <div className='max-h-96 overflow-auto '>
            {notifications.length === 0 && (
              <p className="px-3 py-2">You don't have any notifications!</p>
            )}

            {notifications.map((notification) => (
              <HeaderNotification
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
