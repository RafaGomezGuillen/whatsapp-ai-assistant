// Import pages

// Import default pages
import { Landing } from "./pages/Landing/Landing";

import { Playground } from "./pages/Playground/Playground";
import { ErrorPage } from "./pages/Error/ErrorPage";
import { Configurations } from "./pages/Configurations/Configurations";
import { About } from "./pages/About/About";
import { LogsViewer } from "./pages/LogsViewer/LogsViewer";

// Import documentation pages
import { DocLanding } from "./pages/Documentation/DocLanding/DocLanding";
import { DocConfigurations } from "./pages/Documentation/DocConfigurations/DocConfigurations";
import { DocPlayground } from "./pages/Documentation/DocPlayground/DocPlayground";

export const routes = [
  {
    layout: "default",
    routes: [
      { title: "Configurations", path: "/configurations", element: <Configurations /> },
      { title: "About", path: "/about", element: <About /> },
      { title: "Logs", path: "/logs", element: <LogsViewer /> },
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
      { title: "Playground", path: "/playground", element: <Playground /> },
    ],
  },
  {
    layout: "documentation",
    routes: [
      {
        title: "Welcome to the WhatsApp AI Assitant page documentation",
        path: "/documentation",
        element: <DocLanding />,
      },
      {
        title: "Playground Documentation",
        path: "/documentation/playground",
        element: <DocPlayground />,
      },
      {
        title: "Configurations Documentation",
        path: "/documentation/configurations",
        element: <DocConfigurations />,
      },
    ],
  },
];
