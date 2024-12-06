import React, { useState, useEffect } from "react";

// Import Bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Import toast
import { toast } from "react-toastify";

// Import API
import { saveImageConfig, fetchConfig } from "../../../api/gpt.api";

export const ImageConfiguration = () => {
  const [imagePromptPrefix, setImagePromptPrefix] = useState("");
  const [systemImagePrompt, setSystemImagePrompt] = useState("");

  // Fetch the current configuration
  useEffect(() => {
    const fetchCurrentConfig = async () => {
      try {
        const config = await fetchConfig();
        setImagePromptPrefix(config.imagePromptPrefix || "");
        setSystemImagePrompt(config.systemImagePrompt || "");
      } catch (error) {
        console.error("Error fetching configuration:", error);
      }
    };

    fetchCurrentConfig();
  }, []);

  const handleSubmit = async () => {
    try {
      await saveImageConfig(imagePromptPrefix, systemImagePrompt);

      // Fetch the updated config again after submit
      const updatedConfig = await fetchConfig();
      setImagePromptPrefix(updatedConfig.imagePromptPrefix || "");
      setSystemImagePrompt(updatedConfig.systemImagePrompt || "");

      toast.success("Image configuration was saved successfully");
    } catch (error) {
      console.error("Error saving general configuration:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="image-prompt-prefix">
        <Form.Label>Image Prompt Prefix</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Image Prompt Prefix"
          min={3}
          max={15}
          value={imagePromptPrefix}
          onChange={(e) => setImagePromptPrefix(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="system-image-prompt">
        <Form.Label>System Image Prompt</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter System Image Prompt"
          value={systemImagePrompt}
          onChange={(e) => setSystemImagePrompt(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" title="Save configuration">
        Save configuration
      </Button>
    </Form>
  );
};
