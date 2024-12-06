import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

// Import boostrap components
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

// Import toast
import { toast } from "react-toastify";

// Import API
import { fetchAuthStatus } from "../../api/gpt.api";

export const Auth = () => {
  const [isAuth, setIsAuth] = useState(false);

  // Fetch the current auth status
  useEffect(() => {
    const fetchCurrentAuth = async () => {
      try {
        const response = await fetchAuthStatus();
        setIsAuth(response.is_auth);
      } catch (error) {
        console.error("Error fetching configuration:", error);
      }
    };

    fetchCurrentAuth();
  }, []);

  return (
    <div id="auth">
      <div>
        <div
          style={{ width: "100%", height: "300px", background: "#fff" }}
        ></div>
        {isAuth ? (
          <Alert variant="success">You are authenticated</Alert>
        ) : (
          <Alert variant="warning">You are not Authentified</Alert>
        )}
      </div>

      <div>
        <Card>
          <Card.Body>
            <Card.Title>Instructions</Card.Title>
            <Card.Text>
              1. Authenticate your WhatsApp Number: Open WhatsApp on your phone,
              navigate to Settings {"->"} Linked Devices, and scan the QR code
              displayed here to connect your WhatsApp account.
            </Card.Text>

            <Card.Text>
              2. Configure Your Settings: Adjust the configuration settings to
              your preference, then click on Save Configuration to apply the
              changes.
            </Card.Text>

            <Card.Text>
              For further details, please refer to the{" "}
              <Link
                to="/documentation"
                title="Go to documentation page"
                className="link"
              >
                documentation
              </Link>{" "}
              page.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
