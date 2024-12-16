import React from "react";
import "./DocLanding.css";
import { Link } from "react-router-dom";

// Import Bootstrap components
import Card from "react-bootstrap/Card";

// Import icons
import { FaCode, FaGithub } from "react-icons/fa";
import { BsBing } from "react-icons/bs";

export const DocLanding = () => {
  const links = [
    { title: "Playground", href: "/playground" },
    { title: "Settings", href: "/settings" },
  ];

  const devResources = [
    {
      title: "GroqCloud",
      desc: "Generate a GroqCloud API Key",
      link: "https://console.groq.com/login",
      icon: <FaCode />,
    },
    {
      title: "Bing",
      desc: "Generate a Bing API Key",
      link: "https://www.bing.com/",
      icon: <BsBing />,
    },
    {
      title: "WhatsApp GPT Bot",
      desc: "For more information navigate to the GitHub repository",
      link: "https://github.com/malvads/whatsapp-gpt-bot",
      icon: <FaGithub />,
    },
  ];

  return (
    <section id="documentation-landing">
      <p>
        Here you will find all the necessary information to get started with the WhatsApp GPT Bot
      </p>

      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <Link to={`/documentation${link.href}`} title={`Go to ${link.title} page`} className="link">
              {link.title}
            </Link>
          </li>
        ))}
      </ul>

      <h3>Developer Resources</h3>

      <p>
        Essential links to accelerate your set up process and maximize
        productivity
      </p>

      <div className="dev-resources">
        {devResources.map((resource, index) => (
          <Card key={index}>
            <Card.Body>
              <Link
                to={resource.link}
                title={`Go to ${resource.title} page`}
                className="link"
              >
                <Card.Title>
                  <span
                    style={{
                      paddingRight: "5px",
                    }}
                  >
                    {resource.icon}
                  </span>
                  {resource.title}
                </Card.Title>
              </Link>

              <Card.Text>{resource.desc}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </section>
  );
};
