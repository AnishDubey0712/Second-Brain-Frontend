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
      <Container className="p-4 text-center">
        <h2 className="mb-4">All Notes</h2>

        {/* Share & Add Content Buttons */}
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
