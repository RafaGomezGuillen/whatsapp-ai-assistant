import React from "react";

// Import components
import { NavBar } from "../../components/NavBar/NavBar";
import { Header } from "../../components/Header/Header";

export const PlaygroundLayout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main>
        <Header />
        <section style={{ padding: "15px" }}>{children}</section>
      </main>
    </div>
  );
};
