import { HashRouter, Routes, Route } from "react-router-dom";

// Import css
import "bootstrap/dist/css/bootstrap.min.css";

// Import layouts
import { DefaultLayout } from "./layouts/DefaultLayout/DefaultLayout";
import { LandingLayout } from "./layouts/LandingLayout/LandingLayout";
import { NoLayout } from "./layouts/NoLayout/NoLayout";

// Import routes
import { routes } from "./Routes";

function App() {
  const layoutComponents = {
    default: (page, title) => (
      <DefaultLayout titlePage={title}>{page}</DefaultLayout>
    ),
    no: (page) => <NoLayout>{page}</NoLayout>,
    landing: (page) => <LandingLayout>{page}</LandingLayout>,
  };

  return (
    <HashRouter>
      <Routes>
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
    </HashRouter>
  );
}

export default App;
