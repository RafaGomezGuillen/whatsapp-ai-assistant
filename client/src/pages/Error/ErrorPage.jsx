import React from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.css";

export const ErrorPage = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div id="error-page">
      <section>
        <h4>404 Error</h4>
        <h1>Page not found</h1>
        <p>
          Sorry, the page you are looking for could not be found or has been
          removed.
        </p>

        <div className="btn-container">
          <Link
            to="/"
            title="Go to home page"
            style={{ backgroundColor: "var(--bg-secundary)" }}
          >
            Go to home page
          </Link>
          <button onClick={goBack} title="Go back" style={{ backgroundColor: "var(--color-hover)" }}>
            Go back
          </button>
        </div>
      </section>
    </div>
  );
};
