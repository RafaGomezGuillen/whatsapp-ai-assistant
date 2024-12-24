import React from "react";
import "./DocumentationLayout.css";

// Import components
import { NavBar } from "../../components/NavBar/NavBar";
import { DocumentationNavbar } from "../../components/DocumentationNavbar/DocumentationNavbar";

export const DocumentationLayout = ({ titlePage, children }) => {
  return (
    <div>
      <NavBar />
      <main id="documentation-layout">
        <DocumentationNavbar />
        <section style={{ padding: "15px" }}>
          <h2>{titlePage}</h2>
          <div style={{ marginTop: "25px" }}>{children}</div>
        </section>
      </main>
    </div>
  );
};
