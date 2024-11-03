import { HashRouter, Routes, Route } from "react-router-dom";

// Import css
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Import layouts
import { DefaultLayout } from "./layouts/DefaultLayout/DefaultLayout";
import { NoLayout } from "./layouts/NoLayout/NoLayout";

// Import pages
import { Lading } from "./pages/Lading/Lading";
import { ErrorPage } from "./pages/Error/ErrorPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout>
              <Lading />
            </DefaultLayout>
          }
        ></Route>

        <Route
          path="*"
          element={
            <NoLayout>
              <ErrorPage />
            </NoLayout>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
