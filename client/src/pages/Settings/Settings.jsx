import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import Bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Import toast
import { toast } from "react-toastify";

// Import API
import {
  getEnv,
  updateEnv,
  fetchConfig,
  saveChromePath,
} from "../../api/gpt.api";

const ApiKeys = () => {
  const [groqApiKey, setGroqApiKey] = useState("");
  const [bingApiKey, setBingApiKey] = useState("");

  // Fetch the current env
  useEffect(() => {
    const fetchCurrentEnv = async () => {
      try {
        const env = await getEnv();
        setGroqApiKey(env.GROQ_API_KEY || "");
        setBingApiKey(env.BING_COOKIE || "");
      } catch (error) {
        console.error("Error fetching env:", error);
      }
    };

    fetchCurrentEnv();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateEnv(groqApiKey, bingApiKey);

      // Fetch the updated API keys again after submit
      const updatedConfig = await getEnv();
      setGroqApiKey(updatedConfig.GROQ_API_KEY || "");
      setBingApiKey(updatedConfig.BING_COOKIE || "");

      toast.success("API keys was saved successfully");
    } catch (error) {
      console.error("Error saving API keys configuration:", error);
    }
  };

  return (
    <div>
      <h2>API Keys</h2>

      <p style={{ color: "var(--color-secondary)" }}>
        Manage your API keys carefully. Ensure they are kept secure to prevent
        unauthorized access to your account.
      </p>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="groq-api-key">
          <Form.Label>GroqCloud API Key</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter GroqCloud API Key"
            value={groqApiKey}
            onChange={(e) => setGroqApiKey(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="bing-api-key">
          <Form.Label>Bing API Key</Form.Label>
          <Form.Control
            type="text"
            as={"textarea"}
            placeholder="Enter Bing API Key"
            value={bingApiKey}
            onChange={(e) => setBingApiKey(e.target.value)}
          />
        </Form.Group>

        <Button variant="light" type="submit" title="Upload API Keys">
          Upload API Keys
        </Button>
      </Form>

      <p
        style={{
          marginTop: "15px",
          paddingTop: "15px",
        }}
      >
        If you require additional support seeting up your API keys, please have
        a look at the{" "}
        <Link
          to="/documentation/settings"
          title="Go to Documentation page"
          className="link"
        >
          Documentation page
        </Link>{" "}
        where the set-up process is explained in depth.
      </p>
    </div>
  );
};

const ChromePath = () => {
  const [chromePath, setChromePath] = useState("");

  // Fetch the current configuration
  useEffect(() => {
    const fetchCurrentConfig = async () => {
      try {
        const config = await fetchConfig();
        setChromePath(config.chrome_path || "");
      } catch (error) {
        console.error("Error fetching configuration:", error);
      }
    };

    fetchCurrentConfig();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await saveChromePath(chromePath);

      // Fetch the updated Chrome installation path again after submit
      const updatedConfig = await fetchConfig();
      setChromePath(updatedConfig.chrome_path || "");

      toast.success("Chrome installation path was saved successfully");
    } catch (error) {
      console.error("Error saving Chrome installation path:", error);
    }
  };

  return (
    <div
      style={{
        marginTop: "25px",
        paddingTop: "25px",
        borderTop: "var(--border-primary) solid 2px",
      }}
    >
      <h2 style={{ marginBottom: "15px" }}>Chrome Installation Path</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="chrome-path">
          <Form.Label>Chrome Installation Path</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Chrome Installation Path"
            value={chromePath}
            onChange={(e) => setChromePath(e.target.value)}
          />
        </Form.Group>

        <Button variant="light" type="submit" title="Save Chrome Path">
          Save Chrome Path
        </Button>
      </Form>

      <p
        style={{
          marginTop: "15px",
          paddingTop: "15px",
        }}
      >
        If you require additional support seeting up your Chrome Installation
        Path, please have a look at the{" "}
        <Link
          to="/documentation/settings"
          title="Go to Documentation page"
          className="link"
        >
          Documentation page
        </Link>{" "}
        where the set-up process is explained in depth.
      </p>
    </div>
  );
};

export const Settings = () => {
  return (
    <>
      <ApiKeys />
      <ChromePath />
    </>
  );
};
