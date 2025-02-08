import React from "react";
import  Button  from "./components/ui/Button";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container className="text-center mt-5">
      <h1 className="text-primary">Hello, Bootstrap Works! 🚀</h1>
      <Button
        variant="primary"
        size="sm"  // Small button
        text="Click Me"
        start={<span>🚀</span>}
        end={<span>+</span>}
        onClick={() => console.log("Button Clicked")}
      />
    </Container>
  );
}

export default App;
