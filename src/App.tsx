import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Sidebar from "./components/ui/Sidebar";
import CustomButton from "./components/ui/Button";

const API_URL = "http://localhost:3000/api/v1/content"; // Backend API URL

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [contentList, setContentList] = useState<any[]>([]);

  // Fetch content whenever category changes
  useEffect(() => {
    if (selectedCategory) fetchContent(selectedCategory);
  }, [selectedCategory]);

  // Fetch user content from backend
  const fetchContent = async (type: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}?type=${type}`, {
        headers: { Authorization: token ? token : "" },
      });

      const data = await response.json();
      if (response.ok) setContentList(data);
      else alert("Failed to fetch content");
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  // Handle Delete content
  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: token ? token : "" },
      });

      if (response.ok) {
        alert("Content deleted");
        setContentList(contentList.filter((content) => content._id !== id));
      } else {
        alert("Failed to delete content");
      }
    } catch (error) {
      console.error("Error deleting content:", error);
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
            <CustomButton variant="share" size="md" text="Share Brain" onClick={() => console.log("Share Clicked")} className="me-3" />
            <CustomButton variant="add" size="md" text="Add Content" onClick={() => console.log("Open Add Content Modal")} />
          </Col>
        </Row>

        {/* Category Selection Feedback */}
        {selectedCategory && <h4 className="mt-4 text-primary">Viewing: {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</h4>}

        {/* Content Cards */}
        <Row className="mt-3">
          {contentList.length === 0 ? (
            <p>No content available</p>
          ) : (
            contentList.map((content) => (
              <Col key={content._id} md={4} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>{content.title}</Card.Title>
                    <Card.Text>
                      <a href={content.link} target="_blank" rel="noopener noreferrer">{content.link}</a>
                    </Card.Text>
                    <Button variant="danger" onClick={() => handleDelete(content._id)}>Delete</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </Container>
  );
}

export default App;
