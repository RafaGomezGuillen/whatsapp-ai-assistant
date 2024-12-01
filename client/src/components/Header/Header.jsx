import React from "react";
import "./Header.css";

// Import bootstrap components
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export const Header = () => {
  const configurations = [
    { title: "Main configuration", href: "/" },
    { title: "Image configuration", href: "/image-configuration" },
    { title: "Error configuration", href: "/error-configuration" },
  ];

  const modes = [{ title: "Work in progress", href: "#" }];

  return (
    <Navbar collapseOnSelect expand="lg" id="landing-header">
      <Container fluid>
        <Navbar.Brand>Playground</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <NavDropdown
              id="config-dropdown"
              title="Configuration"
              menuVariant="dark"
            >
              {configurations.map((config, index) => (
                <NavDropdown.Item
                  key={index}
                  href={`/#${config.href}`}
                  title={`Go to ${config.title} page`}
                >
                  {config.title}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <NavDropdown id="modes-config" title="AI Modes" menuVariant="dark">
              {modes.map((mode, index) => (
                <NavDropdown.Item
                  key={index}
                  href={`/#${mode.href}`}
                  title={`Go to ${mode.title} page`}
                >
                  {mode.title}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
