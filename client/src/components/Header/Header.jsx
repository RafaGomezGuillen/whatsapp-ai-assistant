import React from "react";
import "./Header.css";

// Import bootstrap components
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

// Import icons
import { FaRobot } from "react-icons/fa";
import { HiMiniCommandLine } from "react-icons/hi2";
import { BiSolidCommentError } from "react-icons/bi";
import { IoChatboxOutline } from "react-icons/io5";

export const Header = () => {
  const links = [
    { title: "Main Configuration", href: "#main-configuration", icon: <FaRobot /> },
    {
      title: "Commands Configuration",
      href: "#commands-configuration",
      icon: <HiMiniCommandLine />,
    },
    {
      title: "Error Configuration",
      href: "#error-configuration",
      icon: <BiSolidCommentError />,
    },
    {
      title: "Playground Chat",
      href: "#playground-chat",
      icon: <IoChatboxOutline />,
    },
  ];

  const modes = [{ title: "Work in progress", href: "#" }];

  return (
    <Navbar collapseOnSelect expand="lg" id="playground-landing-navbar" sticky="top">
      <Container fluid>
        <Navbar.Brand>Playground</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <NavDropdown
              id="config-selector"
              title="Configurations"
              menuVariant="dark"
            >
              {links.map((link, index) => (
                <NavDropdown.Item
                  key={index}
                  title={`Go to ${link.title} section`}
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.querySelector(
                      link.href.replace("/#/playground", "")
                    );

                    if (section) {
                      const yOffset = -100;
                      const y =
                        section.getBoundingClientRect().top +
                        window.pageYOffset +
                        yOffset;

                      window.scrollTo({ top: y, behavior: "smooth" });
                    }
                  }}
                >
                  {link.icon} {link.title}
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
