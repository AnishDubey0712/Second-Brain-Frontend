import React from "react";
import { FaBrain, FaTwitter, FaVideo, FaLink, FaFileAlt, FaTags } from "react-icons/fa";

const Sidebar = ({ onCategorySelect }) => {
  return (
    <div className="w-64 h-screen text-black flex flex-col items-start p-5" style={{ backgroundColor: "#CBC3E3" }}>
      {/* Logo & Name */}
      <div className="flex items-center text-lg font-bold mb-5">
        <FaBrain className="mr-2 text-2xl" /> Second Brain
      </div>

      {/* Sidebar Items */}
      <button className="sidebar-item" onClick={() => onCategorySelect("tweets")}>
        <FaTwitter className="mr-2" /> Tweets
      </button>
      <button className="sidebar-item" onClick={() => onCategorySelect("videos")}>
        <FaVideo className="mr-2" /> Videos
      </button>
      <button className="sidebar-item" onClick={() => onCategorySelect("links")}>
        <FaLink className="mr-2" /> Links
      </button>
      <button className="sidebar-item" onClick={() => onCategorySelect("documents")}>
        <FaFileAlt className="mr-2" /> Documents
      </button>
      <button className="sidebar-item" onClick={() => onCategorySelect("tags")}>
        <FaTags className="mr-2" /> Tags
      </button>
    </div>
  );
};

export default Sidebar;
