import React from "react";
import { Link } from "react-router-dom";
import "./ApiKeys.css";

// Import Bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const ApiKeys = () => {
  return (
    <div>
      <p style={{ color: "#C6C6C6" }}>
        Manage your API keys carefully. Ensure they are kept secure to prevent
        unauthorized access to your account.
      </p>

      <Form>
        <Form.Group className="mb-3" controlId="groq-api-key">
          <Form.Label>GroqCloud API Key</Form.Label>
          <Form.Control type="text" placeholder="Enter GroqCloud API Key" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="bing-api-key">
          <Form.Label>Bing API Key</Form.Label>
          <Form.Control type="text" placeholder="Enter Bing API Key" />
        </Form.Group>

        <Button variant="primary" type="submit" title="Upload API Keys">
          Upload API Keys
        </Button>
      </Form>

      <p
        style={{
          borderTop: "var(--border-primary) solid 2px",
          marginTop: "15px",
          paddingTop: "15px",
        }}
      >
        If you require additional support seeting up your API keys, please have
        a look at the{" "}
        <Link
          to="/documentation"
          title="Go to Documentation page"
          style={{ color: "var(--color-link) !important" }}
        >
          Documentation page
        </Link>{" "}
        where the set-up process is explained in depth.
      </p>
    </div>
  );
};
