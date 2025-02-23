import React from "react";
import { FaShareAlt, FaTrash } from "react-icons/fa";

interface ContentCardProps {
  title: string;
  link: string;
  type: string;
  tags: string[];
  onDelete: () => void;
  onShare: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ title, link, type, tags, onDelete, onShare }) => {
  return (
    <div className="content-card">
      {/* Top Section with Type and Actions */}
      <div className="card-header">
        <h5 className="content-type">{type.toUpperCase()}</h5>
        <div className="card-actions">
          <button className="share-btn" onClick={onShare}>
            <FaShareAlt />
          </button>
          <button className="delete-btn" onClick={onDelete}>
            <FaTrash />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <h3 className="content-title">{title}</h3>
      <p>
        <a href={link} target="_blank" rel="noopener noreferrer">
          {link}
        </a>
      </p>

      {/* Tags Section */}
      <div className="tags">
        {tags.map((tag, index) => (
          <span key={index} className="tag">#{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default ContentCard;
