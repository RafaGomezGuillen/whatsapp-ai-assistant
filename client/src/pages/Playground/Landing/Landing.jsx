import React, { useState, useEffect } from "react";

// Import Bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Import toast
import { toast } from "react-toastify";

// Import API
import { saveGeneralConfig, fetchConfig } from "../../../api/gpt.api";

export const Landing = () => {
  const [botName, setBotName] = useState("");
  const [maxTokens, setMaxTokens] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");

  // Fetch the current configuration
  useEffect(() => {
    const fetchCurrentConfig = async () => {
      try {
        const config = await fetchConfig();
        setBotName(config.botName || "");
        setMaxTokens(config.max_tokens || "");
        setSystemPrompt(config.systemPrompt || "");
      } catch (error) {
        console.error("Error fetching configuration:", error);
      }
    };

    fetchCurrentConfig();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await saveGeneralConfig(botName, maxTokens, systemPrompt);

      // Fetch the updated config again after submit
      const updatedConfig = await fetchConfig();
      setBotName(updatedConfig.botName || "");
      setMaxTokens(updatedConfig.max_tokens || "");
      setSystemPrompt(updatedConfig.systemPrompt || "");

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
  );
};
