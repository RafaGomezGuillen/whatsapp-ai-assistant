import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

// Import css
import "bootstrap/dist/css/bootstrap.min.css";

// Import toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import layouts
import { DefaultLayout } from "./layouts/DefaultLayout/DefaultLayout";
import { PlaygroundLayout } from "./layouts/PlaygroundLayout/PlaygroundLayout";
import { NoLayout } from "./layouts/NoLayout/NoLayout";
import { DocumentationLayout } from "./layouts/DocumentationLayout/DocumentationLayout";

// Import routes
import { routes } from "./Routes";

// Import components
import { Logger } from "./components/Logger/Logger";

function App() {
  const layoutComponents = {
    default: (page, title) => (
      <DefaultLayout titlePage={title}>{page}</DefaultLayout>
    ),
    no: (page) => <NoLayout>{page}</NoLayout>,
    playground: (page) => <PlaygroundLayout>{page}</PlaygroundLayout>,
    documentation: (page, title) => (
      <DocumentationLayout titlePage={title}>{page}</DocumentationLayout>
    ),
  };

  return (
    <HashRouter>
      <Routes>
        {/* Redirect from `/` to `/playground` */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {routes.map((routeGroup) =>
          routeGroup.routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={layoutComponents[routeGroup.layout](
                route.element,
                route.title
              )}
            />
          ))
        )}
      </Routes>
      
      <Logger />
      <ToastContainer />
    </HashRouter>
  );
}

export default App;
