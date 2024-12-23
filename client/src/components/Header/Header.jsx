import React from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";

// Import bootstrap components
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

// Import icons
import { GoDependabot } from "react-icons/go";
import { BiSolidCommentError } from "react-icons/bi";

export const Header = () => {
  const location = useLocation();
  const configurations = [
    {
      title: "Main Configuration",
      href: "/playground",
      icon: <GoDependabot />,
    },
    {
      title: "Error Configuration",
      href: "/playground/error-configuration",
      icon: <BiSolidCommentError />,
    },
  ];
  const modes = [{ title: "Work in progress", href: "#" }];

  return (
    <Navbar collapseOnSelect expand="lg" id="playground-landing-header">
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
                  className={location.pathname === config.href ? "active" : ""}
                >
                  {config.icon} {config.title}
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
