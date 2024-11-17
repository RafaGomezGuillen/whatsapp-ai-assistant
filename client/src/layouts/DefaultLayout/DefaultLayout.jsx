import React from "react";
import "./DefaultLayout.css";

// Import components
import { NavBar } from "../../components/NavBar/NavBar";

export const DefaultLayout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main>
        <section>{children}</section>
      </main>
    </div>
  );
};
