import React from "react";
import "./Header.css";

// Import bootstrap components
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export const Header = () => {
  return (
    <Navbar style={{ padding: "10px" }}>
      <Navbar.Brand href="#home">Playground sin mas</Navbar.Brand>
      <Nav>
        <Nav.Link href="#home">Home</Nav.Link>
        <NavDropdown
          id="nav-dropdown-dark-example"
          title="Modes"
          menuVariant="dark"
        >
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
};
