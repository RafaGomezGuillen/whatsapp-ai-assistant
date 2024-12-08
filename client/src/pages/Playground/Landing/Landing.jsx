import React, { useState, useEffect } from "react";

// Import Bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Import toast
import { toast } from "react-toastify";

// Import API
import { saveGeneralConfig, fetchConfig, getEnv } from "../../../api/gpt.api";

// Import axios
import axios from "axios";

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

export const Landing = () => {
  const [botName, setBotName] = useState("");
  const [maxTokens, setMaxTokens] = useState("");
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

      <Button variant="light" type="submit" title="Save configuration">
        Save configuration
      </Button>
    </Form>
  );
};
