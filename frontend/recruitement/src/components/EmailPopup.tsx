import React, { useState } from 'react';

interface EmailPopupProps {
    content: string;
    onClose: () => void; // Function to handle closing the popup
}

const EmailPopup: React.FC<EmailPopupProps> = ({ content, onClose }) => {
    const [editableContent, setEditableContent] = useState(content);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditableContent(event.target.value); // Update the state with textarea value
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(editableContent)
            .then(() => alert('Email content copied to clipboard!'))
            .catch((error) => console.error('Failed to copy:', error));
    };

    return (
        <div className="modal show" style={{ display: 'block' }} aria-modal="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Email Template</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <textarea
                            value={editableContent}
                            onChange={handleChange}
                            rows={6} // Adjust rows as needed
                            cols={50} // Adjust cols as needed
                            style={{ width: '100%', minHeight: '200px', padding: '10px', fontSize: '16px' }} // Example styles
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleCopy}>Copy</button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailPopup;
