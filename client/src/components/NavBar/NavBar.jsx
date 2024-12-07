import React, { useState, useEffect } from "react";
import "./NavBar.css";

// Import components
import { Authenticated } from "../Modals/Authenticated/Authenticated";
import { NotAuthenticated } from "../Modals/NotAuthenticated/NotAuthenticated";

// Import bootstrap components
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// Import React Icons
import { BsTerminal } from "react-icons/bs";
import { CiLock } from "react-icons/ci";
import { IoSettingsOutline, IoDocumentOutline } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";

// Import API
import { fetchAuthStatus } from "../../api/gpt.api";

export const NavBar = () => {
  const [isAuth, setIsAuth] = useState(false);
  const links = [
    { title: "Playground", icon: <BsTerminal />, href: "/" },
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

  // Fetch the current auth status
  useEffect(() => {
    const fetchCurrentAuth = async () => {
      try {
        const response = await fetchAuthStatus();
        setIsAuth(response.is_auth);
      } catch (error) {
        console.error("Error fetching configuration:", error);
      }
    };

    fetchCurrentAuth();
    const intervalId = setInterval(fetchCurrentAuth, 5e3);
    return () => clearInterval(intervalId);
  }, []);

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
                <span
                  style={{
                    position: "relative",
                    top: "10px",
                    textAlign: "center",
                  }}
                >
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

              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "center",
                }}
              >
                {isAuth ? (
                  <Authenticated />
                ) : (
                  <NotAuthenticated />
                )}
              </div>
            </section>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
