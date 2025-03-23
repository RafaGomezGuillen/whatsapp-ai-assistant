import React, { useState, useEffect } from "react";
import "./Playground.css";
import { Link } from "react-router-dom";

// Import Bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

// Import API
import {
  saveErrorConfig,
  saveGeneralConfig,
  fetchConfig,
  saveCommandsConfig,
} from "../../api/config.api";
import { getEnv } from "../../api/auth.api";

// Import axios
import axios from "axios";

// Import icons
import { FaRobot } from "react-icons/fa";
import { HiMiniCommandLine } from "react-icons/hi2";
import { BiSolidCommentError } from "react-icons/bi";

const AiModels = ({ currentModel, onModelChange }) => {
  const [models, setModels] = useState([]);
  const [groqApiKey, setGroqApiKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the API key first
  useEffect(() => {
    const fetchCurrentEnv = async () => {
      try {
        const env = await getEnv();
        setGroqApiKey(env.GROQ_API_KEY || "");
      } catch (error) {
        console.error("Error fetching env:", error);
        setError("Failed to fetch API key.");
      }
    };

    fetchCurrentEnv();
  }, [currentModel]);

  // Fetch models after the API key is set
  useEffect(() => {
    if (!groqApiKey) return;

    const fetchModels = async () => {
      try {
        const response = await axios.get(
          "https://api.groq.com/openai/v1/models",
          {
            headers: {
              Authorization: `Bearer ${groqApiKey}`,
            },
          }
        );
        setModels(response.data.data);
      } catch (err) {
        console.error("Error fetching AI models:", err);
        setError("Failed to fetch models.");
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, [groqApiKey]);

  // Handle loading and error states
  if (loading)
    return (
      <div className="error-message">
        No GroqCloud API Key have been set. AI models will not be displayed!
      </div>
    );
  if (error) return <div className="error-message">{error}</div>;

  return (
    <Form.Group className="mb-3" controlId="ai-model">
      <Form.Label>AI Models</Form.Label>
      <Form.Select
        aria-label="Default select example"
        value={currentModel}
        onChange={(e) => onModelChange(e.target.value)}
      >
        {models.map((model, index) => (
          <option key={index} value={model.id}>
            {model.id}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

const MainConfiguration = () => {
  const [botName, setBotName] = useState("");
  const [maxTokens, setMaxTokens] = useState(0);
  const [systemPrompt, setSystemPrompt] = useState("");
  const [model, setModel] = useState("");

  // Fetch the current configuration
  useEffect(() => {
    const fetchCurrentConfig = async () => {
      try {
        const config = await fetchConfig();
        setBotName(config.botName || "");
        setMaxTokens(config.max_tokens || "");
        setSystemPrompt(config.systemPrompt || "");
        setModel(config.model || "");
      } catch (error) {
        console.error("Error fetching configuration:", error);
      }
    };

    fetchCurrentConfig();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await saveGeneralConfig(botName, maxTokens, systemPrompt, model);

      // Fetch the updated config again after submit
      const updatedConfig = await fetchConfig();
      setBotName(updatedConfig.botName || "");
      setMaxTokens(updatedConfig.max_tokens || "");
      setSystemPrompt(updatedConfig.systemPrompt || "");
      setModel(updatedConfig.model || "");
    } catch (error) {
      console.error("Error saving general configuration:", error);
    }
  };

  return (
    <section id="main-configuration">
      <h2>
        <FaRobot /> Main Configuration
      </h2>
      <p style={{ color: "var(--color-tertiary)" }}>
        Configure the main settings for the AI model.
      </p>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="bot-name">
          <Form.Label>Bot name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Bot Name"
            minLength={3}
            maxLength={15}
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="max-tokens">
          <Form.Label>Max tokens</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Max tokens"
            min={1}
            max={8192}
            value={maxTokens}
            onChange={(e) => setMaxTokens(e.target.value)}
          />
        </Form.Group>

        <AiModels currentModel={model} onModelChange={setModel} />

        <Form.Group className="mb-3" controlId="system-promp">
          <Form.Label>System prompt</Form.Label>
          <Form.Control
            as="textarea"
            rows={7}
            placeholder="Enter System prompt"
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" title="Save configuration">
          Save configuration
        </Button>
      </Form>
    </section>
  );
};

const CommandConfiguration = () => {
  const [imageCommands, setImageCommands] = useState([]);
  const [audioCommands, setAudioCommands] = useState([]);

  // Fetch the current configuration
  useEffect(() => {
    const fetchCurrentConfig = async () => {
      try {
        const config = await fetchConfig();
        setAudioCommands(config.commands.speak || []);
        setImageCommands(config.commands.image || []);
      } catch (error) {
        console.error("Error fetching configuration:", error);
      }
    };

    fetchCurrentConfig();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await saveCommandsConfig(imageCommands, audioCommands);

      // Fetch the updated config again after submit
      const updatedConfig = await fetchConfig();

      setAudioCommands(updatedConfig.commands.speak || []);
      setImageCommands(updatedConfig.commands.image || []);
    } catch (error) {
      console.error("Error saving general configuration:", error);
    }
  };

  return (
    <section
      id="command-configuration"
      style={{
        marginTop: "25px",
        paddingTop: "25px",
        borderTop: "var(--border-primary) solid 2px",
      }}
    >
      <h2>
        <HiMiniCommandLine /> Command Configuration
      </h2>

      <p style={{ color: "var(--color-tertiary)" }}>
        Set up the commands to manage <strong>audio</strong> and{" "}
        <strong>image</strong> AI content generation.
      </p>

      <Form onSubmit={handleSubmit}>
        <Tabs
          defaultActiveKey="audio-command"
          id="commands-tabs"
          className="mb-3"
          fill
        >
          <Tab eventKey="audio-command" title="Audio commands">
            <p style={{ color: "var(--color-tertiary)" }}>
              You will receive <strong>AI-generated audio</strong> content only
              when you type the following keywords.
            </p>

            {audioCommands.map((command, index) => (
              <Form.Group
                className="mb-3"
                controlId={`audio-command-${index}`}
                key={index}
              >
                <Form.Label>Audio Command {index + 1}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Audio Command"
                  min={3}
                  max={50}
                  value={command}
                  onChange={(e) => {
                    const newCommands = audioCommands.slice();
                    newCommands[index] = e.target.value;
                    setAudioCommands(newCommands);
                  }}
                />
              </Form.Group>
            ))}
          </Tab>
          <Tab eventKey="image-command" title="Image commands">
            <p style={{ color: "var(--color-tertiary)" }}>
              You will receive <strong>AI-generated image</strong> content only
              when you type the following keywords.
            </p>

            {imageCommands.map((command, index) => (
              <Form.Group
                className="mb-3"
                controlId={`image-command-${index}`}
                key={index}
              >
                <Form.Label>Image Command {index + 1}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Image Command"
                  min={3}
                  max={50}
                  value={command}
                  onChange={(e) => {
                    const newCommands = imageCommands.slice();
                    newCommands[index] = e.target.value;
                    setImageCommands(newCommands);
                  }}
                />
              </Form.Group>
            ))}
          </Tab>
        </Tabs>

        <Button variant="primary" type="submit" title="Save configuration">
          Save configuration
        </Button>
      </Form>
    </section>
  );
};

const ErrorConfiguration = () => {
  const [generalErrorMessage, setGeneralErrorMessage] = useState("");
  const [imageErrorMessage, setImageErrorMessage] = useState("");
  const [ttsErrorMessage, setTtsErrorMessage] = useState("");
  const [ttsPrefix, setTtsPrefix] = useState("");

  // Fetch the current configuration
  useEffect(() => {
    const fetchCurrentConfig = async () => {
      try {
        const config = await fetchConfig();
        setGeneralErrorMessage(config.errorMessages.generalError || "");
        setImageErrorMessage(config.errorMessages.imageError || "");
        setTtsErrorMessage(config.errorMessages.ttsError || "");
        setTtsPrefix(config.errorMessages.ttsPrefix || "");
      } catch (error) {
        console.error("Error fetching configuration:", error);
      }
    };

    fetchCurrentConfig();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await saveErrorConfig(
        generalErrorMessage,
        imageErrorMessage,
        ttsErrorMessage,
        ttsPrefix
      );

      // Fetch the updated config again after submit
      const updatedConfig = await fetchConfig();
      setGeneralErrorMessage(updatedConfig.errorMessages.generalError || "");
      setImageErrorMessage(updatedConfig.errorMessages.imageError || "");
      setTtsErrorMessage(updatedConfig.errorMessages.ttsError || "");
      setTtsPrefix(updatedConfig.errorMessages.ttsPrefix || "");
    } catch (error) {
      console.error("Error saving general configuration:", error);
    }
  };

  return (
    <section
      id="error-configuration"
      style={{
        marginTop: "25px",
        paddingTop: "25px",
        borderTop: "var(--border-primary) solid 2px",
      }}
    >
      <h2>
        <BiSolidCommentError /> Error Configuration
      </h2>

      <p style={{ color: "var(--color-tertiary)" }}>
        Configure the error messages for the AI model.
      </p>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="general-error-message">
          <Form.Label>General Error Message</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter General Error Message"
            min={3}
            max={50}
            value={generalErrorMessage}
            onChange={(e) => setGeneralErrorMessage(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="image-error-message">
          <Form.Label>Image Error Message</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Image Error Message"
            min={3}
            max={50}
            value={imageErrorMessage}
            onChange={(e) => setImageErrorMessage(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="tts-error-message">
          <Form.Label>TTS Error Message</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter TTS Error Message"
            min={3}
            max={50}
            value={ttsErrorMessage}
            onChange={(e) => setTtsErrorMessage(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="tts-prefix">
          <Form.Label>TTS Prefix</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter TTS Prefix"
            min={3}
            max={50}
            value={ttsPrefix}
            onChange={(e) => setTtsPrefix(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" title="Save configuration">
          Save configuration
        </Button>
      </Form>

      <p
        style={{
          marginTop: "15px",
          paddingTop: "15px",
        }}
      >
        If you require additional support seeting up your playground
        configuration , please have a look at the{" "}
        <Link
          to="/documentation/playground"
          title="Go to Documentation page"
          className="link"
        >
          Documentation page
        </Link>{" "}
        where the set-up process is explained in depth.
      </p>
    </section>
  );
};

export const Playground = () => {
  return (
    <section id="playground-landing">
      <MainConfiguration />
      <CommandConfiguration />
      <ErrorConfiguration />
    </section>
  );
};
