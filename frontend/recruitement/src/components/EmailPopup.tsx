import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface EmailPopupProps {
    content: string;
    onClose: () => void; // Function to handle closing the popup
}

interface EmailRequest {
    username: string;
    passcode: string;
    to: string;
    cc: string;
    subject: string;
    body: string;
}

const EmailPopup: React.FC<EmailPopupProps> = ({ content, onClose }) => {
    const [editableContent, setEditableContent] = useState(content);
    const [emailSubject, setEmailSubject] = useState('');

    useEffect(() => {
        const contentLines = editableContent.split('\n');
        const firstLine = contentLines[0];
        setEmailSubject(firstLine);
        setEditableContent(contentLines.slice(1).join('\n'));
    }, [content]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newContent = event.target.value;
        setEditableContent(newContent); // Update the state with textarea value
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(editableContent)
            .then(() => {
                alert('Email content copied to clipboard!');
            })
            .catch((error) => console.error('Failed to copy:', error));
    };

    const handleSend = async (emailReq: EmailRequest) => {
        await axios.post('http://localhost:8000/api/send_email/', emailReq)
            .then(() => {
                alert('Email sent!');
            })
            .catch((error) => console.error('Failed to send email:', error));
    };

    const handleSendClick = () => {
        const emailReq: EmailRequest = {
            username: "X",
            passcode: "X",
            to: 'X', // Replace with actual email
            cc: 'X',
            subject: emailSubject,
            body: editableContent,
        };
        handleSend(emailReq);
    };

    return (
        <div className="modal show" style={{ display: 'block' }} aria-modal="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{emailSubject}</h5>
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
                        <button type="button" className="btn btn-success" onClick={handleSendClick}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailPopup;