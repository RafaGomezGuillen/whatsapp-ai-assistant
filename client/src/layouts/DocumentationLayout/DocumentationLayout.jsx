import React from "react";

// Import components
import { NavBar } from "../../components/NavBar/NavBar";
import { DocumentationNavbar } from "../../components/DocumentationNavbar/DocumentationNavbar";

export const DocumentationLayout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main>
        <DocumentationNavbar />
        <section style={{ padding: "15px" }}>{children}</section>
      </main>
    </div>
  );
};
