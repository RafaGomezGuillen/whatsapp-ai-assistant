import React from "react";

// Import Bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const Landing = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="bot-name">
        <Form.Label>Bot name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Bot Name"
          min={3}
          max={15}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="max-tokens">
        <Form.Label>Max tokens</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Max tokens"
          min={1}
          max={8192}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="system-promp">
        <Form.Label>System promp</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Enter System promp" />
      </Form.Group>

      <Button variant="primary" type="submit" title="Save configuration">
        Save configuration
      </Button>
    </Form>
  );
};
