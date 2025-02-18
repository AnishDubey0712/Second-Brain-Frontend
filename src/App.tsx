import React, { useState } from "react";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import Sidebar from "./components/ui/Sidebar";
import CustomButton from "./components/ui/Button"; // Renamed to avoid confusion

const API_URL = "http://localhost:3000/api/v1/content"; // Backend API URL

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    type: "tweets",
  });

  const handleAddContent = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve JWT token

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? token : "", // Send token for authentication
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Content added successfully!");
        setShowModal(false);
      } else {
        alert(`Failed to add content: ${data.message}`);
      }
    } catch (error) {
      console.error("Error adding content:", error);
      alert("Something went wrong. Try again!");
    }
  };

  return (
    <Container fluid className="d-flex p-0">
      {/* Sidebar (Left) */}
      <Sidebar onCategorySelect={setSelectedCategory} />

      {/* Main Content (Right) */}
      <Container className="p-4">
        <Row className="justify-content-between align-items-center">
          <Col>
            <h2 className="fw-bold">All Notes</h2>
          </Col>
          <Col className="text-end">
            <CustomButton
              variant="share"
              size="md"
              text="Share Brain"
              onClick={() => console.log("Share Clicked")}
              className="me-3"
            />
            <CustomButton
              variant="add"
              size="md"
              text="Add Content"
              onClick={() => setShowModal(true)}
            />
          </Col>
        </Row>

        {/* Category Selection Feedback */}
        {selectedCategory && (
          <h4 className="mt-4 text-primary">
            Viewing: {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
          </h4>
        )}

        {/* Add Content Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Content</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Link</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter link"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="tweets">Tweets</option>
                  <option value="videos">Videos</option>
                  <option value="links">Links</option>
                  <option value="documents">Documents</option>
                  <option value="tags">Tags</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddContent}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Container>
  );
}

export default App;
