// Import pages

// Import playground pages
import { Landing } from "./pages/Playground/Landing/Landing";
import { ImageConfiguration } from "./pages/Playground/ImageConfiguration/ImageConfiguration";
import { ErrorConfiguration } from "./pages/Playground/ErrorConfiguration/ErrorConfiguration";

import { ErrorPage } from "./pages/Error/ErrorPage";
import { Settings } from "./pages/Settings/Settings";
import { About } from "./pages/About/About";

// Import documentation pages
import { DocLanding } from "./pages/Documentation/DocLanding/DocLanding";
import { DocSettings } from "./pages/Documentation/DocSettings/DocSettings";

export const routes = [
  {
    layout: "default",
    routes: [
      { title: "Settings", path: "/settings", element: <Settings /> },
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
  {
    layout: "documentation",
    routes: [
      {
        title: "Welcome to the WhatsApp GPT Bot page documentation",
        path: "/documentation",
        element: <DocLanding />,
      },
      {
        title: "Settings Documentation",
        path: "/documentation/settings",
        element: <DocSettings />,
      },
    ],
  },
];
