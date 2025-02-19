import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface AddContentModalProps {
  show: boolean;
  onClose: () => void;
  onAddContent: (title: string, link: string, type: string) => void;
}

const AddContentModal: React.FC<AddContentModalProps> = ({ show, onClose, onAddContent }) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState("tweets");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddContent(title, link, type);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Content</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Link</Form.Label>
            <Form.Control type="text" value={link} onChange={(e) => setLink(e.target.value)} required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Content Type</Form.Label>
            <Form.Control as="select" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="tweets">Tweets</option>
              <option value="videos">Videos</option>
              <option value="links">Links</option>
              <option value="documents">Documents</option>
              <option value="tags">Tags</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Add Content
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddContentModal;
