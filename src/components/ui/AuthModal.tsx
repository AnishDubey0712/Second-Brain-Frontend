import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
//@ts-ignore
const AuthModal = ({ authMode, handleAuth, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{authMode === "signin" ? "Sign In" : "Sign Up"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="primary" onClick={() => handleAuth(username, password)}>
            {authMode === "signin" ? "Sign In" : "Sign Up"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;
