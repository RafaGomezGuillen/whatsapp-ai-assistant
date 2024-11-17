import React from "react";
import "./DefaultLayout.css";

// Import components
import { NavBar } from "../../components/NavBar/NavBar";
import { Jumbotron } from "../../components/Jumbotron/Jumbotron";

export const DefaultLayout = ({ titlePage, children }) => {
  return (
    <div>
      <NavBar />
      <main>
        <Jumbotron title={titlePage} />
        <section>{children}</section>
      </main>
    </div>
  );
};
