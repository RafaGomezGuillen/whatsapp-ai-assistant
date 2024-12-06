import React, { useState, useEffect } from "react";

// Import Bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Import toast
import { toast } from "react-toastify";

// Import API
import { saveErrorConfig, fetchConfig } from "../../../api/gpt.api";

export const ErrorConfiguration = () => {
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
        setTtsPrefix(config.ttsPrefix || "");
      } catch (error) {
        console.error("Error fetching configuration:", error);
      }
    };

    fetchCurrentConfig();
  }, []);

  const handleSubmit = async () => {
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
      setTtsPrefix(updatedConfig.ttsPrefix || "");

      toast.success("Error configuration was saved successfully");
    } catch (error) {
      console.error("Error saving general configuration:", error);
    }
  };

  return (
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
  );
};
