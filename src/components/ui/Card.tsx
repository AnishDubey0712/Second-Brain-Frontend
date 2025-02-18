import React from "react";
import { Card } from "react-bootstrap";

export interface CardProps {
  title: string;
  link: string;
  category: string;
}

const ContentCard: React.FC<CardProps> = ({ title, link, category }) => {
  return (
    <Card className="mb-4 shadow-sm content-card">
      <Card.Body>
        {/* Card Title (Dynamic Based on Category) */}
        <Card.Title className="text-primary text-lg font-bold">{category}</Card.Title>

        {/* Content Title */}
        <Card.Text className="text-dark fw-semibold">{title}</Card.Text>

        {/* Link (Clickable) */}
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
          View Content
        </a>
      </Card.Body>
    </Card>
  );
};

export default ContentCard;
