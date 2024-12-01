import React from "react";
import "./NavBar.css";

// Import bootstrap components
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// Import React Icons
import { BsTerminal } from "react-icons/bs";
import { CiLock } from "react-icons/ci";
import { IoSettingsOutline, IoDocumentOutline } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";

export const NavBar = () => {
  const links = [
    { title: "Playground", icon: <BsTerminal />, href: "/" },
    { title: "Auth", icon: <IoSettingsOutline />, href: "/auth" },
    { title: "API Keys", icon: <CiLock />, href: "/keys" },
    {
      title: "Documentation",
      icon: <IoDocumentOutline />,
      href: "/documentation",
    },
    { title: "Settings", icon: <IoSettingsOutline />, href: "/settings" },
    { title: "About", icon: <IoMdInformationCircleOutline />, href: "/about" },
  ];
  const title = "GPT Bot";
  const expand = "md";

  return (
    <Navbar expand={expand}>
      <Container fluid>
        <Navbar.Brand className="navbar-title">{title}</Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Collapse id="navbar-collapse">
          <Nav className="custom-nav">
            <section
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "100%",
              }}
            >
              <h1
                style={{
                  paddingBottom: "25px",
                  borderBottom: "solid var(--border-primary) 2px",
                }}
              >
                <span style={{ position: "relative", top: "10px", textAlign: "center" }}>
                  {title}
                </span>
              </h1>
              {links.map((link, index) => (
                <Nav.Link
                  key={index}
                  href={`/#${link.href}`}
                  title={`Go to ${link.title} page`}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "12px",
                    padding: "10px",
                    borderRadius: "8px",
                    fontWeight: "500",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      bottom: "2px",
                    }}
                  >
                    {link.icon}
                  </div>
                  <div>{link.title}</div>
                </Nav.Link>
              ))}
            </section>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
