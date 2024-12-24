import React from "react";
import "./PlaygroundLayout.css";

// Import components
import { NavBar } from "../../components/NavBar/NavBar";
import { Header } from "../../components/Header/Header";

export const PlaygroundLayout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main id="playground-layout">
        <Header />
        <section style={{ padding: "15px" }}>{children}</section>
      </main>
    </div>
  );
};
