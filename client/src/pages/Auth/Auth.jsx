import React from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

// Import boostrap components
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

export const Auth = () => {
  return (
    <div id="auth">
      <div>
        <div
          style={{ width: "100%", height: "300px", background: "#fff" }}
        ></div>
        <Alert variant="success">Authentified!</Alert>
        <Alert variant="warning">Not Authentified!</Alert>
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
