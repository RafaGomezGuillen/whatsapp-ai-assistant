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
        <p>Please set the Chrome path in the settings page.</p>
      </Modal.Body>
      <Modal.Footer>
        <Link to="/settings" title="Go to settings page">
          <Button variant="primary" onClick={onHide}>
            Settings
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
