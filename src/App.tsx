import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./components/ui/Sidebar";
import Button from "./components/ui/Button";
import ContentCard from "./components/ui/ContentCard";
import AuthModal from "./components/ui/AuthModal";
import AddContentModal from "./components/ui/AddContentModal";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAddContentModal, setShowAddContentModal] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [content, setContent] = useState([]);

  // Fetch content when category changes
  useEffect(() => {
    if (token && selectedCategory) {
      fetchContent(selectedCategory);
    }
  }, [selectedCategory, token]);

  // ✅ Fetch Content from Backend
  const fetchContent = async (type: string) => {
    console.log("Fetching content for:", type); // ✅ Debugging Log
    try {
      const response = await fetch(`http://localhost:3000/api/v1/content?type=${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setContent(data);
      } else {
        setContent([]);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  // ✅ Handle Sign In / Sign Up
  const handleAuth = async (username: string, password: string) => {
    try {
      const endpoint = authMode === "signin" ? "signin" : "signup";
      const response = await fetch(`http://localhost:3000/api/v1/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(authMode === "signin" ? "Sign In Successful" : "Sign Up Successful");
        if (authMode === "signin") {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        }
        setShowAuthModal(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  // ✅ Handle Add Content
  const handleAddContent = async (title: string, link: string, type: string) => {
    if (!token) {
      alert("Please sign in first.");
      return;
    }
  
    console.log("Adding Content:", { title, link, type }); // ✅ Debugging Log
    console.log("Token being sent:", token); // ✅ Check if the token is available
  
    try {
      const response = await fetch("http://localhost:3000/api/v1/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,  // ✅ Ensure token is sent correctly
        },
        body: JSON.stringify({ title, link, type }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Content added successfully!");
        setShowAddContentModal(false);
        fetchContent(selectedCategory || "tweets");
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error adding content:", error);
      alert("Failed to add content.");
    }
  };
  

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setContent([]);
  };

  return (
    <Container fluid className="d-flex p-0">
      {/* Sidebar */}
      <Sidebar onCategorySelect={setSelectedCategory} />

      {/* Main Content */}
      <Container className="p-4">
        <Row className="justify-content-between align-items-center mb-4">
          <Col><h2 className="fw-bold" style={{ fontFamily: "Poppins, sans-serif" }}>All Notes</h2></Col>
          <Col className="text-end">
            {token ? (
              <>
                <Button variant="share" size="md" text="Share Brain" onClick={() => console.log("Share Clicked")} className="me-2" />
                <Button variant="add" size="md" text="Add Content" onClick={() => setShowAddContentModal(true)} />
                <button className="btn btn-danger ms-3" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Button variant="share" size="md" text="Sign In" onClick={() => { setAuthMode("signin"); setShowAuthModal(true); }} className="me-2" />
                <Button variant="add" size="md" text="Sign Up" onClick={() => { setAuthMode("signup"); setShowAuthModal(true); }} />
              </>
            )}
          </Col>
        </Row>

        {/* Display Content as Cards */}
        <Row>
          {content.map((item, index) => (
            <Col key={index} md={4} className="mb-4">
              <ContentCard title={item.title} link={item.link} />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Authentication Modal */}
      {showAuthModal && <AuthModal authMode={authMode} handleAuth={handleAuth} onClose={() => setShowAuthModal(false)} />}

      {/* Add Content Modal */}
      {showAddContentModal && (
        <AddContentModal
          show={showAddContentModal}
          onClose={() => setShowAddContentModal(false)}
          onAddContent={handleAddContent}
        />
      )}
    </Container>
  );
};

export default App;
