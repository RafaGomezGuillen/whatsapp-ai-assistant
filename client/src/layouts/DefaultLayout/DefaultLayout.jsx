import React from "react";
import "./DefaultLayout.css";

// Import components
import { NavBar } from "../../components/NavBar/NavBar";
import { Header } from "../../components/Header/Header";
import { OffCanvas } from "../../components/OffCanvas/OffCanvas";

export const DefaultLayout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main>
        <Header />
        <section>{children}</section>
      </main>
    </div>
  );
};
