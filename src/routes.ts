import { RouteObject, createBrowserRouter } from "react-router-dom";
import { requireAuthLoader } from "./utils/require-auth-loader";

export const routes: RouteObject[] = [
  {
    path: "/",
    lazy: () => import("./components/global-layout/global-layout"),
    children: [
      {
        lazy: () => import("./components/app-layout/app-layout"),
        loader: requireAuthLoader,
        children: [
          {
            index: true,
            lazy: () => import("./pages/home/page"),
            handle: {
              title: "Home",
            },
          },
          {
            path: "time",
            lazy: () => import("./pages/time-log/page"),
            handle: {
              title: "Time log",
            },
          },
        ],
      },
      {
        path: "/signin",
        lazy: () => import("./pages/auth/signin"),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
