import React, { useState } from "react";
import { Link } from "react-router-dom";

// Import boostrap components
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// Import Icons
import { CgDanger } from "react-icons/cg";

const EmptyChromePathModal = ({ onHide, ...props }) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      id="empty-chrome-path-modal"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Empty Chrome Path
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Please set the Chrome path in the configurations page. These are one
          of the common paths:
        </p>

        <h4>Windows</h4>
        <ul>
          <li>
            For most installations, the default path is:{" "}
            <code>C:\Program Files\Google\Chrome\Application\chrome.exe</code>
          </li>
          <li>
            If you are using a 32-bit version of Chrome on a 64-bit Windows
            system, the path may be:{" "}
            <code>
              C:\Program Files (x86)\Google\Chrome\Application\chrome.exe
            </code>
          </li>
        </ul>

        <h4>macOS</h4>
        <ul>
          <li>
            The default path for Chrome is:{" "}
            <code>
              /Applications/Google Chrome.app/Contents/MacOS/Google Chrome
            </code>
          </li>
        </ul>

        <h4>Linux</h4>
        <ul>
          <li>
            Common paths for Chrome on Linux include:
            <ul>
              <li>
                <code>/usr/bin/google-chrome</code>
              </li>
              <li>
                <code>/usr/local/bin/google-chrome</code>
              </li>
            </ul>
          </li>
        </ul>

        <h4>Docker</h4>
        <ul>
          <li>
            Use this path if you are running the application in a Docker
            container:
            <ul>
              <li>
                <code>/usr/bin/chromium-browser</code>
              </li>
            </ul>
          </li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Link to="/configurations" title="Go to configurations page">
          <Button variant="primary" onClick={onHide}>
            Go to configurations
          </Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

export const EmptyChromePath = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button
        variant="outline-danger"
        onClick={() => setModalShow(true)}
        style={{ width: "100%" }}
      >
        <CgDanger /> Chrome path is empty!
      </Button>

      <EmptyChromePathModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};
