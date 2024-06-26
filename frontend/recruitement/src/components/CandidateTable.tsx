import React from 'react';

interface Candidate {
    id: number;
    name: string;
    email: string;
    job: string;
    status: string;
}

interface CandidateTableProps {
    candidates: Candidate[];
    updateCandidateStatus: (name: string, newStatus: string) => void;
    deleteCandidate: (name: string) => void;
    sendEmail: (candidate: Candidate) => void;
}

const CandidateTable: React.FC<CandidateTableProps> = ({ candidates, updateCandidateStatus, deleteCandidate, sendEmail }) => {
    const handleStatusChange = async (name: string, newStatus: string) => {
        try {
            updateCandidateStatus(name, newStatus);
        } catch (error) {
            console.error('Error updating candidate status:', error);
        }
    };

    const handleDelete = async (name: string) => {
        try {
            deleteCandidate(name);
        } catch (error) {
            console.error('Error deleting candidate:', error);
        }
    };

    const handleEmail = async (candidate: Candidate) => {
        try {
            sendEmail(candidate);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    const renderCandidatesByStatus = (status: string) => {
        const filteredCandidates = candidates.filter(candidate => candidate.status === status);
        return (
            <div className="col-sm" key={status}>
                <h2 className='text-center mb-4'>{status}</h2>
                {filteredCandidates.map(candidate => (
                    <div key={candidate.id} className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{candidate.name}</h5>
                            <p className="card-text">Email: {candidate.email}</p>
                            <p className="card-text">Job Applied: {candidate.job}</p>
                            <div className="form-group">
                                <select
                                    className="form-control"
                                    value={candidate.status}
                                    onChange={(e) => handleStatusChange(candidate.name, e.target.value)}
                                >
                                    <option value="new candidate">New Candidate</option>
                                    <option value="call">Call</option>
                                    <option value="interview">Interview</option>
                                    <option value="accept">Accept</option>
                                    <option value="reject">Reject</option>
                                </select>
                            </div>
                            <button
                                className="btn btn-danger"
                                onClick={() => handleDelete(candidate.name)}
                            >
                                Delete
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={() => handleEmail(candidate)}
                            >
                                Send Email
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="container">
            <div className="row">
                {renderCandidatesByStatus('new candidate')}
                {renderCandidatesByStatus('call')}
                {renderCandidatesByStatus('interview')}
                {renderCandidatesByStatus('accept')}
                {renderCandidatesByStatus('reject')}
            </div>
        </div>
    );
};

export default CandidateTable;
