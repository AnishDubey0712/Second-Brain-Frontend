import React from "react";
import { FaShare, FaTrash } from "react-icons/fa";

interface ContentCardProps {
  type: string;
  title: string;
  link: string;
  tags: string[];
  onShare: () => void;
  onDelete: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ type, title, link, tags, onShare, onDelete }) => {
  return (
    <div className="content-card">
      {/* Type of Content */}
      <h4 className="content-type">{type.toUpperCase()}</h4>

      {/* Title */}
      <h5 className="content-title">{title}</h5>

      {/* Link */}
      <a href={link} target="_blank" rel="noopener noreferrer" className="content-link">
        {link}
      </a>

      {/* Tags */}
      <div className="content-tags">
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            #{tag}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="content-actions">
        <button className="btn btn-blue" onClick={onShare}>
          <FaShare />
        </button>
        <button className="btn btn-blue" onClick={onDelete}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default ContentCard;
