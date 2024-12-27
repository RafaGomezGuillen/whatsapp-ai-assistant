import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./PlaygroundChat.css";

// Import Bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Import icons
import { AiOutlineSend } from "react-icons/ai";
import { IoChatboxOutline } from "react-icons/io5";

// Import API
import { sendMessage } from "../../api/chatSimulator.api";

export const PlaygroundChat = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! AI Assistant tell me something about...", sender: "user" },
    { text: "Generated message from the bot...", sender: "bot" },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = { text: inputMessage, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newMessage]); // Add user's message

    try {
      const response = await sendMessage({ message: inputMessage });
      setInputMessage(""); // Clear the input
      console.log(response);

      if (response.type === "audio") {
        const audioURL = URL.createObjectURL(response.data);
        // Audio response
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Audio generated. Click to listen:",
            sender: "bot",
            audioURL,
          },
        ]);
      } else if (Array.isArray(response.data.response)) {
        // Image response
        setMessages((prevMessages) => [
          ...prevMessages,
          { images: response.data.response, sender: "bot" },
        ]);
      } else {
        // Text response
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: response.data.response || response.data.error,
            sender: "bot",
          },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = { text: "Error processing message.", sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
      setInputMessage(""); // Clear the input
    }
  };

  const handleChange = (e) => {
    setInputMessage(e.target.value);
  };

  return (
    <section id="playground-chat">
      <div>
        <h2>
          <IoChatboxOutline /> Chat Simulator
        </h2>
        <p style={{ color: "var(--color-tertiary)" }}>
          Test your bot's responses in a controlled environment to ensure it's
          working as expected (
          <Link to={"/settings"} title="Settings" className="link">
            You have to set up settings fields to generate AI responses
          </Link>
          ) .
        </p>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === "user"
                ? "user-message"
                : msg.audioURL
                ? "bot-audio-message"
                : msg.images
                ? "bot-image-message"
                : "bot-message"
            }`}
          >
            {msg.audioURL ? (
              <audio controls src={msg.audioURL}>
                Your browser does not support the audio element.
              </audio>
            ) : msg.images ? (
              <div className="image-grid">
                {msg.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    alt={`Generated ${imgIndex + 1}`}
                  />
                ))}
              </div>
            ) : (
              msg.text
            )}
          </div>
        ))}
      </div>
      <Form onSubmit={handleSubmit}>
        <div className="send-message-container">
          <Form.Group controlId="formMessage">
            <Form.Control
              type="text"
              placeholder="Ask me anything..."
              value={inputMessage}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" title="Send Message">
            <AiOutlineSend />
          </Button>
        </div>
      </Form>
    </section>
  );
};
