import React from "react";
import "./Authenticated.css";

// Import boostrap components
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

// Import API
import { logout } from "../../../api/gpt.api";

export const Authenticated = () => {
  const handleClick = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error loging out:", error);
    }
  };

  return (
    <DropdownButton
      variant="light"
      title="Authentified"
      id="authenticated-dropdown"
      drop="up-centered"
      style={{ width: "100%" }}
    >
      <Dropdown.Item onClick={handleClick}>
        <span style={{ color: "#000" }}>Log out</span>
      </Dropdown.Item>
    </DropdownButton>
  );
};
