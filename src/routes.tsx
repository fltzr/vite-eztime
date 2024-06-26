import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';

import { NotFoundPage } from './pages/404';
import { requireAuthLoader } from './utils/require-auth-loader';

export const routes: RouteObject[] = [
  {
    path: '/',
    lazy: () => import('./components/global-layout/global-layout'),
    errorElement: <NotFoundPage />,
    children: [
      {
        lazy: () => import('./components/app-layout/app-layout'),
        loader: requireAuthLoader,
        errorElement: <NotFoundPage />,
        children: [
          {
            index: true,
            element: <Navigate to="/time" />,
          },
          {
            path: 'time',
            lazy: () => import('./pages/time-log/page'),
            handle: {
              title: 'Time log',
            },
          },
          {
            path: 'settings',
            lazy: () => import('./pages/settings/page'),
            handle: {
              title: 'Settings',
            },
          },
        ],
      },
      {
        path: '/signin',
        lazy: () => import('./pages/auth/signin'),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
