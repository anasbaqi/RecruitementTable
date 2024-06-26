import { useState, useEffect } from 'react';
import CandidateForm from "./components/AddCandidate";
import CandidateTable from "./components/CandidateTable";
import axios from 'axios';
import './App.css';
import EmailPopup from './components/EmailPopup';

interface Candidate {
    id: number;
    name: string;
    email: string;
    job: string;
    status: string;
}

function App() {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [emailContent, setEmailContent] = useState<{ content: string; candidate: Candidate | null }>({ content: '', candidate: null });

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axios.get<Candidate[]>('http://localhost:8000/api/candidates');
                setCandidates(response.data);
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };

        fetchCandidates();
    }, []);

    const addCandidate = async (newCandidate: Omit<Candidate, 'id'>) => {
        try {
            await axios.post('http://localhost:8000/api/candidate/', newCandidate);
            const response = await axios.get<Candidate[]>('http://localhost:8000/api/candidates');
            setCandidates(response.data);
        } catch (error) {
            console.error('Error adding candidate:', error);
        }
    };

    const updateCandidateStatus = async (name: string, newStatus: string) => {
        try {
            await axios.put(`http://localhost:8000/api/candidate/${name}/?status=${newStatus}`);
            setCandidates(prevCandidates =>
                prevCandidates.map(candidate =>
                    candidate.name === name ? { ...candidate, status: newStatus } : candidate
                )
            );
        } catch (error) {
            console.error('Error updating candidate status: ', error);
        }
    };

    const deleteCandidate = async (name: string) => {
        try {
            await axios.delete(`http://localhost:8000/api/candidate/${name}`);
            setCandidates(prevCandidates =>
                prevCandidates.filter(candidate => candidate.name !== name)
            );
        } catch (error) {
            console.error('Error deleting candidate:', error);
        }
    };

    const sendEmail = async (candidate: Candidate) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/candidate/email/${candidate.name}`);
            setEmailContent({ content: response.data, candidate });
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Candidate Recruitment</h1>
            <hr />
            <div className="mb-4">
                <CandidateForm addCandidate={addCandidate} />
            </div>
            <hr />
            <CandidateTable candidates={candidates} updateCandidateStatus={updateCandidateStatus} deleteCandidate={deleteCandidate} sendEmail={sendEmail} />
            {emailContent.content && emailContent.candidate && (
                <EmailPopup content={emailContent.content} candidate={emailContent.candidate} onClose={() => setEmailContent({ content: '', candidate: null })} />
            )}
        </div>
    );
}

export default App;
