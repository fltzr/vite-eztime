import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

export const NavItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const route = useLocation();

  return (
    <Link
      to={href}
      className={clsx(
        'flex items-center gap-3 rounded-lg  px-3 py-2 my-[0.5px] hover:text-black hover:bg-muted/90',
        {
          'bg-muted/90 text-black/80': route.pathname === href,
        }
      )}
    >
      {children}
    </Link>
  );
};
