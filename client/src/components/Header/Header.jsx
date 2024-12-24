import React from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";

// Import bootstrap components
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";


export const Header = () => {
  const location = useLocation();

  const modes = [{ title: "Work in progress", href: "#" }];

  return (
    <Navbar collapseOnSelect expand="lg" id="playground-landing-navbar">
      <Container fluid>
        <Navbar.Brand>Playground</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
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
