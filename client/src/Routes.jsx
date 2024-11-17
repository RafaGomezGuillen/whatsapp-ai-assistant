// Import pages
import { Landing } from "./pages/Landing/Landing";
import { ErrorPage } from "./pages/Error/ErrorPage";
import { ApiKeys } from "./pages/ApiKeys/ApiKeys";

export const routes = [
  {
    layout: "default",
    routes: [
      { title: "Index page", path: "/", element: <Landing /> },
      { title: "API Keys", path: "/keys", element: <ApiKeys /> },
    ],
  },
  {
    layout: "no",
    routes: [
      {
        title: "404 | This page could not be found",
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
];
