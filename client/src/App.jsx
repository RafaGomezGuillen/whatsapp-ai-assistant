import { HashRouter, Routes, Route } from "react-router-dom";

// Import css
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Import layouts
import { DefaultLayout } from "./layouts/DefaultLayout/DefaultLayout";
import { NoLayout } from "./layouts/NoLayout/NoLayout";

// Import routes
import { routes } from "./Routes";

function App() {
  const layoutComponents = {
    default: (page) => <DefaultLayout>{page}</DefaultLayout>,
    no: (page) => <NoLayout>{page}</NoLayout>,
  };

  return (
    <HashRouter>
      <Routes>
        {routes.map((routeGroup) =>
          routeGroup.routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={layoutComponents[routeGroup.layout](route.element)}
            />
          ))
        )}
      </Routes>
    </HashRouter>
  );
}

export default App;
