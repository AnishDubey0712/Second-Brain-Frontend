import React from "react";
import { Card, Badge } from "react-bootstrap";
import { FaShareAlt, FaTrash } from "react-icons/fa";

interface ContentCardProps {
  id: string;  // ✅ Required for deleting content
  title: string;
  link: string;
  type: string;
  tags?: string[];
  onShare: (id: string) => void;
  onDelete: (id: string) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ id, title, link, type, tags = [], onShare, onDelete }) => {
  return (
    <Card className="shadow-sm position-relative">
      <Card.Body>
        {/* ✅ Content Type on top */}
        <Badge bg="primary" className="position-absolute top-0 start-0 m-2">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Badge>

        {/* ✅ Share & Delete Icons (top-right) */}
        <div className="position-absolute top-0 end-0 m-2">
          <FaShareAlt className="text-success me-3" style={{ cursor: "pointer" }} onClick={() => onShare(id)} />
          <FaTrash className="text-danger" style={{ cursor: "pointer" }} onClick={() => onDelete(id)} />
        </div>

        {/* ✅ Title */}
        <Card.Title className="mt-3">{title}</Card.Title>

        {/* ✅ Link */}
        <Card.Text>
          <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
        </Card.Text>

        {/* ✅ Display Tags */}
        {tags.length > 0 && (
          <div className="mt-2">
            {tags.map((tag, index) => (
              <Badge key={index} bg="secondary" className="me-1">#{tag}</Badge>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ContentCard;
