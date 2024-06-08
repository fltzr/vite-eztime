import { RouteObject, createBrowserRouter } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: '/',
    lazy: () => import('./components/app-layout/app-layout'),
    children: [
      {
        index: true,
        lazy: () => import('./pages/home/page'),
        handle: {
          title: 'Home'
        }
      },
      {
        path: 'time',
        lazy: () => import('./pages/time-log/page'),
        handle: {
          title: 'Time log'
        }
      }
    ]
  }
];

export const router = createBrowserRouter(routes);