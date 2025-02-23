import React from "react";

interface ShareModalProps {
  shareLink: string | null;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ shareLink, onClose }) => {
  const handleCopy = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      alert("✅ Link copied to clipboard!");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>🔗 Shareable Link</h2>
        {shareLink ? (
          <>
            <p className="share-link">{shareLink}</p>
            <div className="modal-buttons">
              <button className="btn btn-primary" onClick={handleCopy}>📋 Copy Link</button>
              <button className="btn btn-danger" onClick={onClose}>❌ Close</button>
            </div>
          </>
        ) : (
          <p>⏳ Generating link...</p>
        )}
      </div>
    </div>
  );
};

export default ShareModal;
