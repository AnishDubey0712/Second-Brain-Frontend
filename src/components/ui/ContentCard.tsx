import React from "react";
import { Card } from "react-bootstrap";

const ContentCard = ({ title, link }) => {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ContentCard;
