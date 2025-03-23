import React, { useState, useEffect } from "react";
import "./About.css";

// Import axios
import axios from "axios";

// Import Bootstrap components
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

// Import icons
import { FaEye, FaStar } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";
const repository = "RafaGomezGuillen/whatsapp-ai-assistant";

export const RepoDetails = () => {
  const [stargazersCount, setStargazersCount] = useState(0);
  const [forksCount, setForksCount] = useState(0);
  const [watchers, setWatchers] = useState(0);

  const details = [
    { title: "Stars", count: stargazersCount, icon: <FaStar /> },
    { title: "Forks", count: forksCount, icon: <FaCodeFork /> },
    { title: "Watchers", count: watchers, icon: <FaEye /> },
  ];

  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${repository}`
        );

        setStargazersCount(response.data.stargazers_count);
        setForksCount(response.data.forks_count);
        setWatchers(response.data.watchers);
      } catch (error) {
        console.error("Error fetching repository details:", error);
      }
    };

    fetchRepoDetails();
  }, []);

  return (
    <Card>
      <Card.Body>
        <Card.Title style={{ color: "var(--color-link)" }}>
          RafaGomezGuillen/whatsapp-ai-assistant
        </Card.Title>
        <Card.Subtitle style={{ marginTop: "10px", marginBottom: "10px" }}>
          GitHub Repository details
        </Card.Subtitle>
        <div>
          <ul>
            {details.map((detail, index) => (
              <li key={index}>
                {detail.icon} {detail.title}: {detail.count}
              </li>
            ))}
          </ul>
        </div>
        <Button
          variant="primary"
          href={`https://github.com/${repository}`}
          title={`Go to whatsapp-gpt-bot GitHub Repository`}
        >
          Go to GitHub Repository
        </Button>
      </Card.Body>
    </Card>
  );
};

const Constributors = () => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${repository}/contributors`
        );
        console.log(response.data);
        setContributors(response.data);
      } catch (error) {
        console.error("Error fetching contributors:", error);
      }
    };

    fetchContributors();
  }, []);

  return (
    <div style={{ marginTop: "25px" }}>
      <h2>Contributors</h2>
      <div className="contributors-container">
        {contributors.map((contributor) => (
          <Card style={{ width: "18rem" }} key={contributor.login}>
            <Card.Img
              variant="top"
              src={contributor.avatar_url}
              alt={contributor.login}
            />
            <Card.Body>
              <Card.Title>{contributor.login}</Card.Title>
              <Card.Text>{contributor.contributions} contributions</Card.Text>
              <Button
                variant="primary"
                href={`https://github.com/${contributor.login}`}
                title={`Go to ${contributor.login} GitHub Profile Account`}
              >
                GitHub Profile
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const About = () => {
  return (
    <div id="about-page">
      <div className="about-info-container">
        <div>
          <h1>About WhatsApp AI Assistant</h1>
          <p>
            Welcome to the <strong>WhatsApp AI Assistant</strong>, a project designed
            to bring the power of AI directly into your WhatsApp conversations.
            Generate a bot that integrates advanced natural language processing
            capabilities with a user-friendly interface to deliver fun,
            creativity, and utility in one package.
          </p>
          <h2>Key Features</h2>
          <ul>
            <li>
              <strong>AI-Powered Chat:</strong> Leverages state-of-the-art GPT
              models for engaging, intelligent responses.
            </li>
            <li>
              <strong>Image Generation:</strong> Use creative commands to
              generate stunning images directly within chats.
            </li>
            <li>
              <strong>Voice Interaction:</strong> Convert text to speech and
              interact with the bot in a more dynamic way.
            </li>
            <li>
              <strong>Customizable Configuration:</strong> Tailor the bot’s
              personality, error messages, and behavior to suit your
              preferences.
            </li>
            <li>
              <strong>Create Commands:</strong> Customize commands to enhance user interaction with general, image, and audio responses.
            </li>
          </ul>
        </div>
        <RepoDetails />
      </div>

      <Constributors />
    </div>
  );
};
