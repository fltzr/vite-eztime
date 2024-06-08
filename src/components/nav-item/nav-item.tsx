import { useLocation } from 'react-router-dom'
import clsx from 'clsx';
import { Link } from 'react-router-dom';


export const NavItem = ({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const route = useLocation();

  return (
    <Link
      to={href}
      className={clsx(
        'flex items-center gap-3 rounded-lg  px-3 py-2 my-[0.5px] text-gray-900  transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50 dark:hover:bg-gray-800',
        {
          'bg-gray-100 dark:bg-gray-800': route.pathname === href
        }
      )}
    >
      {children}
    </Link>
  );
}