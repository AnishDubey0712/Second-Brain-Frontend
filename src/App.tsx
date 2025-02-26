import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/ui/Sidebar";
import Button from "./components/ui/Button";
import ContentCard from "./components/ui/ContentCard";
import AuthModal from "./components/ui/AuthModal";
import AddContentModal from "./components/ui/AddContentModal";
import SharedContentPage from "./components/SharedContentPage";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAddContentModal, setShowAddContentModal] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [content, setContent] = useState([]);

  // 🔥 Fetch all content initially
  useEffect(() => {
    if (token) {
      fetchContent(selectedCategory);
    }
  }, [selectedCategory, token]);

  // ✅ Fetch content (All or Specific Category)
  const fetchContent = async (category: string | null) => {
    try {
      const url = category
        ? `http://localhost:3000/api/v1/content?type=${category}`
        : `http://localhost:3000/api/v1/content`; // ✅ Fetch all content if no category is selected

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
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

  const handleAuth = async (username: string, password: string) => {
    try {
      const endpoint = authMode === "signin" ? "signin" : "signup";
      const response = await fetch(`http://localhost:3000/api/v1/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(authMode === "signin" ? "Sign In Successful" : "Sign Up Successful");
        if (authMode === "signin") {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          fetchContent(null); // ✅ Fetch all content after login
        }
        setShowAuthModal(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  // ✅ Handle Sidebar Click
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === "all" ? null : category); // ✅ Reset to all content if "All Notes" is selected
  };

  // ✅ Handle Content Addition
  const handleAddContent = async (title: string, link: string, type: string, tags: string[]) => {
    if (!token) {
      alert("Please sign in first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/content", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, link, type, tags }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Content added successfully!");
        setShowAddContentModal(false);
        fetchContent(selectedCategory); // ✅ Fetch updated content
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
    <Router>
      <Routes>
        <Route path="/shared/:hash" element={<SharedContentPage />} />
        <Route
          path="/"
          element={
            <Container fluid className="d-flex p-0">
              {/* ✅ Sidebar for Selecting Categories */}
              <Sidebar onCategorySelect={handleCategorySelect} />

              <Container className="p-4">
                <Row className="justify-content-between align-items-center mb-4">
                  <Col>
                    <h2 className="fw-bold all-notes-title">
                      {selectedCategory ? `${selectedCategory} Notes` : "All Notes"}
                    </h2>
                  </Col>
                  <Col className="text-end">
                    {token ? (
                      <>
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

                {/* ✅ Show All Content by Default, Filter on Sidebar Click */}
                <Row>
                  {content.length > 0 ? (
                    content.map((item, index) => (
                      <Col key={index} md={4} className="mb-4">
                        <ContentCard title={item.title} link={item.link} type={item.type} tags={item.tags} />
                      </Col>
                    ))
                  ) : (
                    <p className="text-center mt-4">No content available.</p>
                  )}
                </Row>
              </Container>

              {showAuthModal && <AuthModal authMode={authMode} handleAuth={handleAuth} onClose={() => setShowAuthModal(false)} />}
              {showAddContentModal && <AddContentModal show={showAddContentModal} onClose={() => setShowAddContentModal(false)} onAddContent={handleAddContent} />}
            </Container>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
