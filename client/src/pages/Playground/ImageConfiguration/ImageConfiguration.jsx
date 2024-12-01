import React from "react";

// Import Bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const ImageConfiguration = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="image-prompt-prefix">
        <Form.Label>Image Prompt Prefix</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Image Prompt Prefix"
          min={3}
          max={15}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="system-image-prompt">
        <Form.Label>System Image Prompt</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter System Image Prompt"
        />
      </Form.Group>

      <Button variant="primary" type="submit" title="Save configuration">
        Save configuration
      </Button>
    </Form>
  );
};
