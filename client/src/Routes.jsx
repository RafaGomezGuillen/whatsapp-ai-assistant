// Import pages

// Import default pages
import { Landing } from "./pages/Landing/Landing";

// Import playground pages
import { PlaygroundLanding } from "./pages/Playground/PlaygroundLanding/PlaygroundLanding";
import { ImageConfiguration } from "./pages/Playground/ImageConfiguration/ImageConfiguration";
import { ErrorConfiguration } from "./pages/Playground/ErrorConfiguration/ErrorConfiguration";

import { ErrorPage } from "./pages/Error/ErrorPage";
import { Settings } from "./pages/Settings/Settings";
import { About } from "./pages/About/About";

// Import documentation pages
import { DocLanding } from "./pages/Documentation/DocLanding/DocLanding";
import { DocSettings } from "./pages/Documentation/DocSettings/DocSettings";
import { DocPlayground } from "./pages/Documentation/DocPlayground/DocPlayground";

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
      {
        title: "Home page",
        path: "/home",
        element: <Landing />,
      },
    ],
  },
  {
    layout: "playground",
    routes: [
      { title: "Playground", path: "/playground", element: <PlaygroundLanding /> },
      {
        title: "Image configuration",
        path: "/playground/image-configuration",
        element: <ImageConfiguration />,
      },
      {
        title: "Error configuration",
        path: "/playground/error-configuration",
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
        title: "Playground Documentation",
        path: "/documentation/playground",
        element: <DocPlayground />,
      },
      {
        title: "Settings Documentation",
        path: "/documentation/settings",
        element: <DocSettings />,
      },
    ],
  },
];
