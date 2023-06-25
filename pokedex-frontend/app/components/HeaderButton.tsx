import { Link } from '@remix-run/react';
import { MouseEventHandler, PropsWithChildren } from 'react';

type Props =
  | {
      type: 'button' | 'submit';
      onClick?: MouseEventHandler;
    }
  | {
      type: 'link';
      to: string;
    };

export default function HeaderButton(props: PropsWithChildren<Props>) {
  const className =
    'self-end relative mr-5 px-6 py-2.5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700';

  if (props.type === 'button' || props.type === 'submit') {
    return (
      <button className={className} type={props.type} onClick={props.onClick}>
        {props.children}
      </button>
    );
  }

  if (props.type === 'link') {
    return (
      <Link className={className} to={props.to}>
        {props.children}
      </Link>
    );
  }
}
