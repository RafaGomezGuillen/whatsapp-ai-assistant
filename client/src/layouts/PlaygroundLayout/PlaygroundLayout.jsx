import React from "react";
import "./PlaygroundLayout.css";

// Import components
import { NavBar } from "../../components/NavBar/NavBar";
import { Header } from "../../components/Header/Header";
import { PlaygroundChat } from "../../components/PlaygroundChat/PlaygroundChat";

export const PlaygroundLayout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main id="playground-layout">
        <Header />
        <div className="playground-content">
          <section style={{ padding: "15px" }}>{children}</section>
          <PlaygroundChat />
        </div>
      </main>
    </div>
  );
};
