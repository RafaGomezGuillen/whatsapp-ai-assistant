import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./NavBar.css"; // Import your custom CSS

export const NavBar = () => {
  const expand = "md";

  return (
    <Navbar expand={expand} >
      <Container fluid>
        <Navbar.Brand href="#" className="navbar-title">Navbar Offcanvas</Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="custom-nav">
            <section style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#home">Home</Nav.Link>
            </section>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
