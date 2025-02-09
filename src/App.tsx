import React from "react";
import  Button  from "./components/ui/Button";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container className="text-center mt-5">
      <h1 className="text-primary">Hello, Bootstrap Works! 🚀</h1>

      {/* Share Brain Button */}
      <Button
        variant="primary"
        size="md"
        text="Share Brain"
        icon="bi-share" // Bootstrap "Share" Icon
        onClick={() => console.log("Share Brain Clicked")}
      />

      {/* Add Content Button */}
      <Button
        variant="success"
        size="md"
        text="Add Content"
        icon="bi-plus-lg" // Bootstrap "Plus" Icon
        onClick={() => console.log("Add Content Clicked")}
      />
    </Container>
  );
}

export default App;
