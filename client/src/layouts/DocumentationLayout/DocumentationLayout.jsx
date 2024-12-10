import React from "react";

// Import components
import { NavBar } from "../../components/NavBar/NavBar";
import { DocumentationNavbar } from "../../components/DocumentationNavbar/DocumentationNavbar";

export const DocumentationLayout = ({ titlePage, children }) => {
  return (
    <div>
      <NavBar />
      <main>
        <DocumentationNavbar />
        <section style={{ padding: "15px" }}>
          <h2>{titlePage}</h2>
          {children}
        </section>
      </main>
    </div>
  );
};
