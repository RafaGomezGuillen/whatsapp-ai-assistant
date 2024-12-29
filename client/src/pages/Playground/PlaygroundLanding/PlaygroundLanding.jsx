import React, { useState, useEffect } from "react";
import "./PlaygroundLanding.css";
import { Link } from "react-router-dom";

// Import Bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Import toast
import { toast } from "react-toastify";

// Import API
import {
  saveErrorConfig,
  saveGeneralConfig,
  fetchConfig,
} from "../../../api/config.api";
import { getEnv } from "../../../api/auth.api";

// Import axios
import axios from "axios";

// Import icons
import { FaRobot } from "react-icons/fa";
import { HiMiniCommandLine } from "react-icons/hi2";
import { BiSolidCommentError } from "react-icons/bi";

export const AiModels = ({ currentModel, onModelChange }) => {
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
  if (loading) return <div>Loading AI models...</div>;
  if (error) return <div>{error}</div>;

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

      toast.success("Main configuration was saved successfully");
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

      <p
        style={{
          marginTop: "15px",
          paddingTop: "15px",
        }}
      >
        If you require additional support seeting up your main configuration
        fields, please have a look at the{" "}
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

const CommandConfiguration = () => {
  const [processingErrorMessage, setProcessingErrorMessage] = useState("");
  const [generalErrorMessage, setGeneralErrorMessage] = useState("");
  const [imageErrorMessage, setImageErrorMessage] = useState("");
  const [ttsErrorMessage, setTtsErrorMessage] = useState("");
  const [ttsPrefix, setTtsPrefix] = useState("");

  // Fetch the current configuration
  useEffect(() => {
    const fetchCurrentConfig = async () => {
      try {
        const config = await fetchConfig();
        setProcessingErrorMessage(config.errorMessages.processing || "");
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
        processingErrorMessage,
        generalErrorMessage,
        imageErrorMessage,
        ttsErrorMessage,
        ttsPrefix
      );

      // Fetch the updated config again after submit
      const updatedConfig = await fetchConfig();
      setProcessingErrorMessage(updatedConfig.errorMessages.processing || "");
      setGeneralErrorMessage(updatedConfig.errorMessages.generalError || "");
      setImageErrorMessage(updatedConfig.errorMessages.imageError || "");
      setTtsErrorMessage(updatedConfig.errorMessages.ttsError || "");
      setTtsPrefix(updatedConfig.errorMessages.ttsPrefix || "");

      toast.success("Error configuration was saved successfully");
    } catch (error) {
      console.error("Error saving general configuration:", error);
    }
  };

  return (
    <section
      id="commands-configuration"
      style={{
        marginTop: "25px",
        paddingTop: "25px",
        borderTop: "var(--border-primary) solid 2px",
      }}
    >
      <h2>
        <HiMiniCommandLine /> Commands Configuration
      </h2>

      <p style={{ color: "var(--color-tertiary)" }}>
        Configure the error messages for the AI model.
      </p>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="processing-error-message">
          <Form.Label>Processing Error Message</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Processing Error Message"
            min={3}
            max={50}
            value={processingErrorMessage}
            onChange={(e) => setProcessingErrorMessage(e.target.value)}
          />
        </Form.Group>

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
        If you require additional support seeting up your error configuration
        messages, please have a look at the{" "}
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

const ErrorConfiguration = () => {
  const [processingErrorMessage, setProcessingErrorMessage] = useState("");
  const [generalErrorMessage, setGeneralErrorMessage] = useState("");
  const [imageErrorMessage, setImageErrorMessage] = useState("");
  const [ttsErrorMessage, setTtsErrorMessage] = useState("");
  const [ttsPrefix, setTtsPrefix] = useState("");

  // Fetch the current configuration
  useEffect(() => {
    const fetchCurrentConfig = async () => {
      try {
        const config = await fetchConfig();
        setProcessingErrorMessage(config.errorMessages.processing || "");
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
        processingErrorMessage,
        generalErrorMessage,
        imageErrorMessage,
        ttsErrorMessage,
        ttsPrefix
      );

      // Fetch the updated config again after submit
      const updatedConfig = await fetchConfig();
      setProcessingErrorMessage(updatedConfig.errorMessages.processing || "");
      setGeneralErrorMessage(updatedConfig.errorMessages.generalError || "");
      setImageErrorMessage(updatedConfig.errorMessages.imageError || "");
      setTtsErrorMessage(updatedConfig.errorMessages.ttsError || "");
      setTtsPrefix(updatedConfig.errorMessages.ttsPrefix || "");

      toast.success("Error configuration was saved successfully");
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
        <Form.Group className="mb-3" controlId="processing-error-message">
          <Form.Label>Processing Error Message</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Processing Error Message"
            min={3}
            max={50}
            value={processingErrorMessage}
            onChange={(e) => setProcessingErrorMessage(e.target.value)}
          />
        </Form.Group>

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
        If you require additional support seeting up your error configuration
        messages, please have a look at the{" "}
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

export const PlaygroundLanding = () => {
  return (
    <section id="playground-landing">
      <MainConfiguration />
      <CommandConfiguration />
      <ErrorConfiguration />
    </section>
  );
};
