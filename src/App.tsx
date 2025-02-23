import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/ui/Sidebar";
import Button from "./components/ui/Button";
import ContentCard from "./components/ui/ContentCard";
import AuthModal from "./components/ui/AuthModal";
import AddContentModal from "./components/ui/AddContentModal";
import ShareModal from "./components/ui/ShareModal";
import SharedContentPage from "./components/SharedContentPage";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAddContentModal, setShowAddContentModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [content, setContent] = useState([]);
  const [shareLink, setShareLink] = useState<string | null>(null);

  useEffect(() => {
    if (token && selectedCategory) {
      fetchContent(selectedCategory);
    }
  }, [selectedCategory, token]);

  const fetchContent = async (type: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/content?type=${type}`, {
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
        }
        setShowAuthModal(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

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
        fetchContent(selectedCategory || "tweets");
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error adding content:", error);
      alert("Failed to add content.");
    }
  };

  const handleShareContent = async (contentId: string) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/brain/share", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ share: true, contentId }),
      });
  
      const data = await response.json();
      if (response.ok && data.hash) {
        setShareLink(`http://localhost:5173/shared/${data.hash}`);
        setShowShareModal(true);
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error generating share link:", error);
      alert("Failed to generate share link.");
    }
  };
  

  const handleDeleteContent = async (contentId: string) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/content", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ contentId }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Content deleted successfully!");
        fetchContent(selectedCategory || "tweets");
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error deleting content:", error);
      alert("Failed to delete content.");
    }
  };

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
              <Sidebar onCategorySelect={setSelectedCategory} />

              <Container className="p-4">
                <Row className="justify-content-between align-items-center mb-4">
                  <Col>
                    <h2 className="fw-bold" style={{ fontFamily: "Poppins, sans-serif" }}>
                      All Notes
                    </h2>
                  </Col>
                  <Col className="text-end">
                    {token ? (
                      <>
                        <Button variant="share" size="md" text="Share Brain" onClick={() => handleShareContent("")} className="me-2" />
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

                <Row>
                  {content.map((item, index) => (
                    <Col key={index} md={4} className="mb-4">
                      <ContentCard
                        title={item.title}
                        link={item.link}
                        type={item.type}
                        tags={item.tags}
                        onDelete={() => handleDeleteContent(item._id)}
                        onShare={() => handleShareContent(item._id)}
                      />
                    </Col>
                  ))}
                </Row>
              </Container>

              {showAuthModal && <AuthModal authMode={authMode} handleAuth={handleAuth} onClose={() => setShowAuthModal(false)} />}
              {showAddContentModal && <AddContentModal show={showAddContentModal} onClose={() => setShowAddContentModal(false)} onAddContent={handleAddContent} />}
              {showShareModal && <ShareModal shareLink={shareLink} onClose={() => setShowShareModal(false)} />}
            </Container>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
