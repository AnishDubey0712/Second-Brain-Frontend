import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface AddContentModalProps {
  show: boolean;
  onClose: () => void;
  onAddContent: (title: string, link: string, type: string, tags: string[]) => void;
}

const AddContentModal: React.FC<AddContentModalProps> = ({ show, onClose, onAddContent }) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState("tweets");
  const [tags, setTags] = useState<string[]>([]); // Tags as array

  // ✅ Handle tag input (comma-separated)
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value.split(",").map(tag => tag.trim()));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddContent(title, link, type, tags);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Content</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Link</Form.Label>
            <Form.Control type="text" value={link} onChange={(e) => setLink(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="tweets">Tweets</option>
              <option value="videos">Videos</option>
              <option value="links">Links</option>
              <option value="documents">Documents</option>
            </Form.Select>
          </Form.Group>

          {/* ✅ Tag Input Field */}
          <Form.Group className="mb-3">
            <Form.Label>Tags (comma-separated)</Form.Label>
            <Form.Control type="text" placeholder="Enter tags..." onChange={handleTagsChange} />
          </Form.Group>

          <Button variant="primary" type="submit">Add Content</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddContentModal;
