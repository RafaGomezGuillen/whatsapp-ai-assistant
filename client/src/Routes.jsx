// Import pages

// Import playground pages
import { Landing } from "./pages/Playground/Landing/Landing";
import { ImageConfiguration } from "./pages/Playground/ImageConfiguration/ImageConfiguration";
import { ErrorConfiguration } from "./pages/Playground/ErrorConfiguration/ErrorConfiguration";

import { ErrorPage } from "./pages/Error/ErrorPage";
import { ApiKeys } from "./pages/ApiKeys/ApiKeys";
import { Settings } from "./pages/Settings/Settings";
import { DocLanding } from "./pages/Documentation/DocLanding/DocLanding";
import { About } from "./pages/About/About";

export const routes = [
  {
    layout: "default",
    routes: [
      { title: "API Keys", path: "/keys", element: <ApiKeys /> },
      { title: "Settings", path: "/settings", element: <Settings /> },
      { title: "Documentation", path: "/documentation", element: <DocLanding /> },
      { title: "About", path: "/about", element: <About /> },
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
