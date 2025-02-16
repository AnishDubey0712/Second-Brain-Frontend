import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./components/ui/Sidebar";
import Button from "./components/ui/Button";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <Container fluid className="d-flex p-0">
      {/* Sidebar (Left) */}
      <Sidebar onCategorySelect={setSelectedCategory} />

      {/* Main Content (Right) */}
      <Container className="p-4">
        {/* Top Bar */}
        <Row className="align-items-center mb-4">
          <Col>
            {/* "All Notes" on the Left */}
            <h2 className="m-0 all-notes-title">All Notes</h2>
          </Col>
          <Col className="text-end">
            {/* Buttons on the Right */}
            <Button
              variant="share"
              size="md"
              text="Share Brain"
              onClick={() => console.log("Share Clicked")}
              className="me-3"
            />
            <Button
              variant="add"
              size="md"
              text="Add Content"
              onClick={() => console.log("Add Clicked")}
            />
          </Col>
        </Row>

        {/* Category Selection Feedback */}
        {selectedCategory && (
          <h4 className="mt-4 text-primary">
            Viewing: {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
          </h4>
        )}
      </Container>
    </Container>
  );
}

export default App;
