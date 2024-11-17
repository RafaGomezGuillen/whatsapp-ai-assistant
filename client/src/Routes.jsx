// Import pages
import { Landing } from "./pages/Landing/Landing";
import { ErrorPage } from "./pages/Error/ErrorPage";
import { ApiKeys } from "./pages/ApiKeys/ApiKeys";

export const routes = [
  {
    layout: "default",
    routes: [
      { path: "/", element: <Landing /> },
      { path: "/keys", element: <ApiKeys /> },
    ],
  },
  {
    layout: "no",
    routes: [{ path: "*", element: <ErrorPage /> }],
  },
];
