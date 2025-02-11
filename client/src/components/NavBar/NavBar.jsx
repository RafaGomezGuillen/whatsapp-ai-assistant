import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./NavBar.css";

// Import components
import { NotAuthenticated } from "../Modals/NotAuthenticated/NotAuthenticated";
import { EmptyChromePath } from "../Modals/EmptyChromePath/EmptyChromePath";

// Import bootstrap components
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Alert from "react-bootstrap/Alert";

// Import React Icons
import { BsTerminal } from "react-icons/bs";
import { CiCircleCheck } from "react-icons/ci";
import { IoDocumentOutline, IoSettingsOutline } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { BsWhatsapp } from "react-icons/bs";
import { FaRegFileLines } from "react-icons/fa6";

// Import API
import { fetchAuthStatus } from "../../api/auth.api";
import { fetchConfig } from "../../api/config.api";

export const NavBar = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [chromePath, setChromePath] = useState("");
  const location = useLocation();

  const links = [
    { title: "Playground", icon: <BsTerminal />, href: "/playground" },
    { title: "Settings", icon: <IoSettingsOutline />, href: "/settings" },
    { title: "Logs", icon: <FaRegFileLines />, href: "/logs" },
    {
      title: "Documentation",
      icon: <IoDocumentOutline />,
      href: "/documentation",
    },
    { title: "About", icon: <IoMdInformationCircleOutline />, href: "/about" },
  ];
  const title = "AI Assistant";
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

  // Fetch the current auth status
  useEffect(() => {
    const fetchChromePath = async () => {
      try {
        const response = await fetchConfig();
        setChromePath(response.chrome_path);
      } catch (error) {
        console.error("Error fetching chrome path:", error);
      }
    };

    fetchChromePath();
    const intervalId = setInterval(fetchChromePath, 5e3);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Navbar expand={expand} id="playground-navbar">
      <Container fluid>
        <Navbar.Brand
          className="navbar-title"
          href="/#/"
          title="Go to Home page"
        >
         <BsWhatsapp /> {title}
        </Navbar.Brand>
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
              <h1 className="navbar-title">
                <Link to={"/"} title="Go to Home page" style={{
                  backgroundColor: "transparent",
                  color: "var(--color-link) !important",
                }}>
                  <BsWhatsapp /> {title}
                </Link>
              </h1>
              {links.map((link, index) => (
                <Nav.Link
                  key={index}
                  href={`/#${link.href}`}
                  title={`Go to ${link.title} page`}
                  className={
                    location.pathname.startsWith(link.href) ? "active" : ""
                  }
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "8px",
                    padding: "10px",
                    borderRadius: "8px",
                    fontWeight: "500",
                  }}
                >
                  <div>{link.icon}</div>
                  <div>{link.title}</div>
                </Nav.Link>
              ))}

              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "end",
                  justifyContent: "end",
                  gap: "10px",
                  paddingBottom: "10px",
                }}
              >
                {chromePath.trim() === "" && <EmptyChromePath />}
                {isAuth ? (
                  <Alert variant="success" style={{ width: "100%" }}>
                    <CiCircleCheck /> Authenticated
                  </Alert>
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
