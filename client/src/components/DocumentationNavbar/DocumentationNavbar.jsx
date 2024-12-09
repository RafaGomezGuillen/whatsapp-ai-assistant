import React from "react";

// Import bootstrap components
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

export const DocumentationNavbar = () => {
  const title = "Documentation";
  const label = "documentation-navbar";

  const links = [
    { title: "Overview", href: "" },
    { title: "Playground", href: "/playground" },
    { title: "API Keys", href: "/api-keys" },
    { title: "Authentication", href: "/authentication" },
  ];

  return (
    <Navbar expand={false}>
      <Container fluid>
        <Navbar.Brand style={{ color: "var(--color-primary)" }}>
          {title}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`${label}-expand-false`} />
        <Navbar.Offcanvas
          id={`${label}-expand-false`}
          aria-labelledby={`off-${label}-expand-false`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`off-${label}-expand-false`}>
              {title}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {links.map((link) => (
                <Nav.Link
                  href={`/#/documentation${link.href}`}
                  title={`Go to ${link.title} documentation page`}
                >
                  {link.title}
                </Nav.Link>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};
