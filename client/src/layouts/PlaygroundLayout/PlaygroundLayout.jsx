import React from "react";
import "./PlaygroundLayout.css";

// Import components
import { NavBar } from "../../components/NavBar/NavBar";
import { PlaygroundHeader } from "../../components/Playground/PlaygroundHeader/PlaygroundHeader";
import { PlaygroundChat } from "../../components/Playground/PlaygroundChat/PlaygroundChat";

export const PlaygroundLayout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main id="playground-layout">
        <PlaygroundHeader />
        <div className="playground-content">
          <section style={{ padding: "15px" }}>{children}</section>
          <PlaygroundChat />
        </div>
      </main>
    </div>
  );
};
