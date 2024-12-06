import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

// Import boostrap components
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

// Import toast
import { toast } from "react-toastify";

// Import API
import { fetchAuthStatus, logout } from "../../api/gpt.api";

// Import QR code
import QRCode from "react-qr-code";

const Authenticated = () => {
  const handleClick = async () => {
    try {
      await logout();
      window.location.reload();
      toast.success("Log out was made successfully");
    } catch (error) {
      console.error("Error loging out:", error);
    }
  };

  return (
    <div>
      <Alert variant="success">You are authenticated</Alert>
      <Button variant="primary" title="Logout" onClick={handleClick}>
        Logut
      </Button>
    </div>
  );
};

const NotAuhtenticated = () => {
  const [qrCode, setQrCode] = useState("");

  // Fetch the current auth status
  useEffect(() => {
    const fetchCurrentAuth = async () => {
      try {
        const response = await fetchAuthStatus();
        setQrCode(response.qr_code);
      } catch (error) {
        console.error("Error fetching configuration:", error);
      }
    };

    fetchCurrentAuth();
  }, []);

  return (
    <div className="not-auhtenticated">
      <div>
        <div>
          <QRCode
            value={qrCode}
            title="QR Code"
            style={{
              width: "100%",
              border: "solid var(--border-primary)",
              marginBottom: "25px",
              padding: "10px",
              borderRadius: "8px",
            }}
          />
        </div>
        <Alert variant="warning">You are not Authentified</Alert>
      </div>
      <div>
        <Card style={{height: "256px"}}>
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
    <div id="auth">{isAuth ? <Authenticated /> : <NotAuhtenticated />}</div>
  );
};
