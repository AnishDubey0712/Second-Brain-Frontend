import React from "react";
import { FaBrain, FaTwitter, FaVideo, FaLink, FaFileAlt, FaTags } from "react-icons/fa";
//@ts-ignore
const Sidebar = ({ onCategorySelect }) => {
  return (
    <div
      className="fixed left-0 top-0 h-screen w-30% flex flex-col p-12 text-white"
      style={{ backgroundColor: "#5D3FD3", minHeight: "100vh" }} // Sidebar covers 6 columns (1/3 of screen)
    >
      {/* Logo & Name (Much Bigger) */}
      <div className="flex items-center text-10xl font-extrabold mb-12 sidebar-items">
        <FaBrain className="mr-5 text-8xl" /> <span className="text-xl font-montserrat tracking-wide">Second Brain</span>
      </div>

      {/* Sidebar Items (Slightly Smaller) */}
      <div className="flex flex-col gap-6 flex-grow">
        <button className="sidebar-item" onClick={() => onCategorySelect("tweets")}>
          <FaTwitter className="mr-4 text-2xl" /> <span className="text-xl">Tweets</span>
        </button>
        <button className="sidebar-item" onClick={() => onCategorySelect("videos")}>
          <FaVideo className="mr-4 text-2xl" /> <span className="text-xl">Videos</span>
        </button>
        <button className="sidebar-item" onClick={() => onCategorySelect("links")}>
          <FaLink className="mr-4 text-2xl" /> <span className="text-xl">Links</span>
        </button>
        <button className="sidebar-item" onClick={() => onCategorySelect("documents")}>
          <FaFileAlt className="mr-4 text-2xl" /> <span className="text-xl">Documents</span>
        </button>
        <button className="sidebar-item" onClick={() => onCategorySelect("tags")}>
          <FaTags className="mr-4 text-2xl" /> <span className="text-xl">Tags</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
