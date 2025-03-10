import React from "react";
import "./DocLanding.css";
import { Link } from "react-router-dom";

// Import Bootstrap components
import Card from "react-bootstrap/Card";

// Import icons
import { FaCode, FaGithub, FaWhatsapp } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";

export const DocLanding = () => {
  const links = [
    { title: "Playground", href: "/playground" },
    { title: "Configurations", href: "/configurations" },
  ];

  const devResources = [
    {
      title: "GroqCloud",
      desc: "Generate a GroqCloud API Key and start generating responses!",
      link: "https://console.groq.com/login",
      icon: <FaCode />,
    },
    {
      title: "Unsplash",
      desc: "Generate an Unsplash API Key and start generating images!",
      link: "https://unsplash.com/developers",
      icon: <FaImage />,
    },
    {
      title: "WhatsApp Web",
      desc: "Access WhatsApp Web to check messages and AI responses",
      link: "https://web.whatsapp.com/",
      icon: <FaWhatsapp />,
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
