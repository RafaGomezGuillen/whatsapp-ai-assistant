// Import pages

// Import playground pages
import { Landing } from "./pages/Playground/Landing/Landing";
import { ImageConfiguration } from "./pages/Playground/ImageConfiguration/ImageConfiguration";
import { ErrorConfiguration } from "./pages/Playground/ErrorConfiguration/ErrorConfiguration";

import { Auth } from "./pages/Auth/Auth";
import { ErrorPage } from "./pages/Error/ErrorPage";
import { ApiKeys } from "./pages/ApiKeys/ApiKeys";

export const routes = [
  {
    layout: "default",
    routes: [
      { title: "API Keys", path: "/keys", element: <ApiKeys /> },
      { title: "Authentication", path: "/auth", element: <Auth /> },
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
  {
    layout: "playground",
    routes: [
      { title: "Index page", path: "/", element: <Landing /> },
      {
        title: "Image configuration",
        path: "/image-configuration",
        element: <ImageConfiguration />,
      },
      {
        title: "Error configuration",
        path: "/error-configuration",
        element: <ErrorConfiguration />,
      },
    ],
  },
];
