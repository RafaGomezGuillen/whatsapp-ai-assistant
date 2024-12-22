import React from "react";
import "./Landing.css";

// Import Bootstrap components
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  return (
    <Navbar expand="lg" className="header" sticky="top">
      <Container className="header-container">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="landing-navbar">
          <Nav>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#services">Services</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#faq">FAQ</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const Hero = () => {
  return (
    <section id="ho" className="hero section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="hero-content">
              <h1 className="mb-4">
                Build Your Own <br />
                WhatsApp <br />
                <span className="accent-text">AI Assistant</span>
              </h1>

              <p className="mb-4 mb-md-5">
                Create a personalized chatbot powered by GPT for seamless
                messaging on WhatsApp. Automate responses, handle queries, and
                enhance conversations—all with your custom AI bot.
              </p>

              <div className="hero-buttons">
                <a href="#about" className="btn btn-primary me-0 me-sm-2 mx-1">
                  Get Started
                </a>
                <a
                  href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                  className="btn btn-link mt-2 mt-sm-0 glightbox"
                >
                  <i className="bi bi-play-circle me-1"></i>
                  See how it works
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="hero-image">
              <img
                src="assets/img/illustration-1.webp"
                alt="Hero Image"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Landing = () => {
  return (
    <div id="landing">
      <Header />

      <main>
        <Hero />
      </main>
    </div>
  );
};
