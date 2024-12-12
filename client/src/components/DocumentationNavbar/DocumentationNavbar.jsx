import React from "react";

// Import bootstrap components
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

// Import icons
import { FaHome } from "react-icons/fa";
import { BsTerminal } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";

export const DocumentationNavbar = () => {
  const title = "Documentation";
  const label = "documentation-navbar";

  const links = [
    { title: "Overview", href: "", icon: <FaHome /> },
    { title: "Playground", href: "/playground", icon: <BsTerminal /> },
    { title: "Settings", href: "/settings", icon: <IoMdSettings /> },
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
              {links.map((link, index) => (
                <Nav.Link
                  key={index}
                  href={`/#/documentation${link.href}`}
                  title={`Go to ${link.title} documentation page`}
                >
                  <span
                    style={{
                      position: "relative",
                      bottom: "1.5px",
                      paddingRight: "5px",
                    }}
                  >
                    {link.icon}
                  </span>
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
