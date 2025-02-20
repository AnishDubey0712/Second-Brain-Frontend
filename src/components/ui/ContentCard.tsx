import React from "react";
import { Card, Badge } from "react-bootstrap";

interface ContentCardProps {
  title: string;
  link: string;
  tags?: string[]; // ✅ Added tags
}

const ContentCard: React.FC<ContentCardProps> = ({ title, link, tags = [] }) => {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
        </Card.Text>

        {/* ✅ Display Tags */}
        {tags.length > 0 && (
          <div className="mt-2">
            {tags.map((tag, index) => (
              <Badge key={index} bg="secondary" className="me-1">{tag}</Badge>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ContentCard;
