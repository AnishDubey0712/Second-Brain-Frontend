import React from "react";
import { Container } from "react-bootstrap";
import Button from "./components/ui/Button";

function App() {
  return (
    <Container className="text-center mt-5">
      {/* Share Brain Button */}
      <Button
        variant="share"
        size="md"
        text="Share Brain"
        onClick={() => console.log("Share Clicked")}
      />
      {/* Add Content Button */}
      <Button
        variant="add"
        size="md"
        text="Add Content"
        onClick={() => console.log("Add Clicked")}
        className="ms-3"
      />
    </Container>
  );
}

export default App;
