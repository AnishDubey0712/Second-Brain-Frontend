import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContentCard from "./ContentCard";
import { Container, Row, Col } from "react-bootstrap";

const SharedContentPage: React.FC = () => {
  const { hash } = useParams<{ hash: string }>();
  const [sharedContent, setSharedContent] = useState<any[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/brain/${hash}`);
        const data = await response.json();

        if (response.ok) {
          setUsername(data.username);
          setSharedContent(data.content);
        } else {
          setUsername(null);
          setSharedContent([]);
        }
      } catch (error) {
        console.error("Error fetching shared content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSharedContent();
  }, [hash]);

  if (loading) return <p>Loading shared content...</p>;

  return (
    <Container className="p-4">
      <h2 className="fw-bold mb-4">Shared Notes from {username || "Unknown User"}</h2>
      <Row>
        {sharedContent.length > 0 ? (
          sharedContent.map((item, index) => (
            <Col key={index} md={4} className="mb-4">
              <ContentCard title={item.title} link={item.link} type={item.type} tags={item.tags} />
            </Col>
          ))
        ) : (
          <p>No content available.</p>
        )}
      </Row>
    </Container>
  );
};

export default SharedContentPage;
