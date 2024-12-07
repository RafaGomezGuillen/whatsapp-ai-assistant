import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import boostrap components
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";

// Import Icons
import { CiWarning } from "react-icons/ci";

// Import QR code
import QRCode from "react-qr-code";

// Import API
import { fetchAuthStatus } from "../../../api/gpt.api";

function NotAuthenticatedModal(props) {
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
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      id="not-authenticated-modal"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Log in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Scan the QR code</h4>
        <QRCode
          value={qrCode}
          title="Scan me with your phone"
          style={{
            width: "100%",
            border: "solid var(--border-primary)",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "8px",
          }}
        />

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
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="light">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export const NotAuthenticated = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button
        variant="outline-warning"
        onClick={() => setModalShow(true)}
        style={{ width: "100%" }}
      >
        <CiWarning style={{ position: "relative", bottom: "1.5px" }} /> Not
        Authentified
      </Button>

      <NotAuthenticatedModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};
