import React from "react";

interface ShareModalProps {
  shareLink: string | null;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ shareLink, onClose }) => {
  const handleCopy = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Shareable Link</h2>
        {shareLink ? (
          <>
            <p className="share-link">{shareLink}</p>
            <button className="btn btn-primary me-2" onClick={handleCopy}>Copy Link</button>
          </>
        ) : (
          <p>Generating link...</p>
        )}
        <button className="btn btn-danger" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ShareModal;
