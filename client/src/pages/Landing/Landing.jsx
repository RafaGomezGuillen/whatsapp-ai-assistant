import React, { useEffect, useState } from "react";
import "./Landing.css";

// Import Bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";

// Import images
import heroImage from "../../assets/img/hero.webp";
import aboutImage from "../../assets/img/about.webp";

// Import icons
import { FaCheck } from "react-icons/fa6";
import { GrConfigure } from "react-icons/gr";
import { IoSettings } from "react-icons/io5";
import { FaBook } from "react-icons/fa";
import { GrTest } from "react-icons/gr";

const Header = () => {
  const title = "WhatsApp AI Assistant";
  const links = [
    { name: "Home", href: "#hero" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
  ];

  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map((link) => document.querySelector(link.href));

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();

          if (rect.top <= 150 && rect.bottom >= 100) {
            setActiveLink(links[i].href);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [links]);

  return (
    <Navbar id="landing-navbar" expand="lg" sticky="top">
      <Container className="landing-navbar-container">
        <Navbar.Brand href="/#/">{title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="landing-navbar-links">
          <Nav>
            {links.map((link, index) => (
              <Nav.Link
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.querySelector(
                    link.href.replace("/#/home", "")
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
                title={`Go to ${link.name} section`}
                className={activeLink === link.href ? "active" : ""}
              >
                {link.name}
              </Nav.Link>
            ))}
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="/#/playground" title="Go to playground page">
              Playground
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const Hero = () => {
  return (
    <section id="hero">
      <Container>
        <Row className="align-items-center">
          <div className="col-lg-6">
            <div className="hero-content">
              <h1 className="mb-4">
                Build Your Own <br />
                WhatsApp <br />
                <span
                  style={{
                    color: "var(--color-link)",
                  }}
                >
                  AI Assistant
                </span>
              </h1>

              <p className="mb-4 mb-md-5">
                Create a personalized chatbot powered by GPT for interactive
                messaging on WhatsApp. Automate responses, queries, and
                enhance conversations with your custom AI bot.
              </p>

              <div className="hero-buttons">
                <Button
                  href="#about"
                  variant="primary"
                  title="Get started with your own AI assistant"
                >
                  Get Started
                </Button>
                <Button
                  href="pepe"
                  variant="secondary"
                  title="See how it works"
                >
                  See how it works
                </Button>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="hero-image">
              <img src={heroImage} alt="Hero Image" className="img-fluid" />
            </div>
          </div>
        </Row>
      </Container>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Main Configuration",
      description:
        "Set up your bot's core features, including its name, maximum tokens, and main prompt (personality). As well as, error and fallback responses to ensure a reliable bot performance with your WhatsApp account.",
      href: "/playground",
      icon: <GrConfigure />,
    },
    {
      title: "Settings",
      description:
        "Easily configure your external API key integrations and other settings in just a few clicks to set up your application as fast as possible.",
      href: "/settings",
      icon: <IoSettings />,
    },
    {
      title: "Testing Environment",
      description:
        "You can test your bot's responses in a controlled environment to ensure it's working as expected before deploying it to your WhatsApp account.",
      href: "/documentation",
      icon: <GrTest />,
    },
    {
      title: "Comprehensive Documentation",
      description:
        "Access detailed documentation to guide you through every step of setting up, customizing, and troubleshooting your bot.",
      href: "/documentation",
      icon: <FaBook />,
    },
  ];

  return (
    <section id="services">
      <Container>
        <div className="section-title">
          <h2>Services</h2>
          <p>
            Explore a range of services designed to streamline your bot's
            setup and operation.
          </p>
        </div>
      </Container>

      <Container>
        <Row className="g-4">
          {services.map((service, index) => (
            <div className="col-lg-6" key={index}>
              <div className="service-card d-flex">
                <div className="icon flex-shrink-0">{service.icon}</div>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Button
                    href={`/#${service.href}`}
                    title={`Go to ${service.title} page`}
                    variant="primary"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Row>
      </Container>
    </section>
  );
};

const About = () => {
  const aboutUser = [
    "Fully open-source on GitHub",
    "Powered by React Vite.js and Express.js",
    "Open to community contributions",
  ];

  return (
    <section id="about">
      <Container>
        <Row>
          <div className="col-xl-6">
            <span
              style={{
                color: "var(--color-link)",
                fontWeight: "600",
                marginBottom: "1rem",
                display: "inline-block",
              }}
            >
              MORE ABOUT US
            </span>
            <h2>An Open Source Project</h2>
            <p>
              This is an open-source project hosted on GitHub,
              inviting everyone to contribute and collaborate.
            </p>
            <Row>
              <ul style={{ listStyle: "none" }}>
                {aboutUser.map((feature, index) => (
                  <li key={index}>
                    <FaCheck /> {feature}
                  </li>
                ))}
              </ul>
            </Row>
          </div>

          <div className="col-xl-6">
            <img
              src={aboutImage}
              alt="About Image"
              className="img-fluid rounded-4"
            />
          </div>
        </Row>
      </Container>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "Does this app read or store my WhatsApp chats?",
      answer:
        "No, this app does not read or store your WhatsApp chats. All data stays private and secure on your device.",
    },
    {
      question: "Does the bot respond to every message?",
      answer:
        "No, the bot only responds when its name is mentioned in a WhatsApp chat. This ensures it does not interfere unnecessarily in conversations.",
    },
    {
      question: "Is the bot linked to multiple WhatsApp numbers?",
      answer:
        "No, the bot is associated with a single WhatsApp number and can respond to messages in every chat linked to that number.",
    },
    {
      question: "Do I need to download an AI model locally to use this bot?",
      answer:
        "No, the bot generates responses using API keys (like GPT and Bing). There's no need to download any AI model locally.",
    },
    {
      question: "Can I modify or monetize this project?",
      answer:
        "Yes, this project is open-source and available on GitHub. You are free to modify it and even monetize your version.",
    },
  ];
  return (
    <section id="faq">
      <Container>
        <Row>
          <div className="col-lg-5">
            <h2>Have a question? Check out the FAQ</h2>
            <p className="faq-description">
              Find answers to common questions about the WhatsApp bot and how it
              works.
            </p>
          </div>

          <div className="col-lg-7">
            <Accordion defaultActiveKey={["0"]} alwaysOpen>
              {faqs.map((faq, index) => (
                <Accordion.Item key={index} eventKey={index.toString()}>
                  <Accordion.Header>{faq.question}</Accordion.Header>
                  <Accordion.Body>{faq.answer}</Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </Row>
      </Container>
    </section>
  );
};

export const Landing = () => {
  return (
    <div id="landing">
      <Header />

      <main
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <Hero />
        <Services />
        <About />
        <FAQ />
      </main>
    </div>
  );
};
