import React from "react";

// Import Bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const ErrorConfiguration = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="processing-error-message">
        <Form.Label>Processing Error Message</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Processing Error Message"
          min={3}
          max={50}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="general-error-message">
        <Form.Label>General Error Message</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter General Error Message"
          min={3}
          max={50}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="image-error-message">
        <Form.Label>Image Error Message</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Image Error Message"
          min={3}
          max={50}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="tts-error-message">
        <Form.Label>TTS Error Message</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter TTS Error Message"
          min={3}
          max={50}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="tts-prefix">
        <Form.Label>TTS Prefix</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter TTS Prefix"
          min={3}
          max={50}
        />
      </Form.Group>

      <Button variant="primary" type="submit" title="Save configuration">
        Save configuration
      </Button>
    </Form>
  );
};
