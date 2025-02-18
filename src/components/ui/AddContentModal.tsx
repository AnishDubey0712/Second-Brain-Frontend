import React, { useState } from "react";
//@ts-ignore
const AddContentModal = ({ onClose, onAdd }) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState("tweets"); // Default category

  const handleSubmit = async () => {
    if (!title || !link) return alert("Please fill all fields");

    const response = await fetch("http://localhost:3000/api/v1/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, link, type }),
    });

    if (response.ok) {
      onAdd();
      onClose();
    } else {
      alert("Failed to add content");
    }
  };

  return (
    <div className="modal">
      <h3>Add New Content</h3>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Link" value={link} onChange={(e) => setLink(e.target.value)} />

      {/* Category Dropdown */}
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="tweets">Tweet</option>
        <option value="videos">Video</option>
        <option value="links">Link</option>
        <option value="documents">Document</option>
      </select>

      <button onClick={handleSubmit}>Add Content</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AddContentModal;
