import  { useState, useEffect } from 'react';
import CandidateForm from "./components/AddCandidate";
import CandidateTable from "./components/CandidateTable";
import axios from 'axios';
import './App.css';
import EmailPopup from './components/EmailPopup';

interface Candidate {
    id: number; // id will be assigned by the server
    name: string;
    email: string;
    job: string;
    status: string;
}

function App() {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [emailContent, setEmailContent] = useState<string | null>(null); // State for email content

    // Fetch candidates when the component mounts
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
    const addCandidate = async (newCandidate: Omit<Candidate, 'id'>) => { // Omit 'id' from Candidate
        try {
            await axios.post('http://localhost:8000/api/candidate/', newCandidate);
            console.log("post request")
            // After successful post, fetch updated candidate list
            const response = await axios.get<Candidate[]>('http://localhost:8000/api/candidates');
            console.log("fetch request")
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
          console.log(newStatus)
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

  const sendEmail = async (name: string) => {
    try {
      const response  = await axios.get(`http://localhost:8000/api/candidate/email/${name}`);
      setEmailContent(response.data)
      //send the response to EmailPopup and then create a popup there
    } catch (error){
      console.error('Error sending email:', error)
    }

  };

    return (
        
      <div className="container mt-4">
      <h1 className="text-center mb-4">Candidate Recruitement</h1>
      <hr />
      <div className="mb-4">
          <CandidateForm addCandidate={addCandidate} />
      </div>
      <hr />
      <CandidateTable candidates={candidates} updateCandidateStatus={updateCandidateStatus} deleteCandidate={deleteCandidate} sendEmail={sendEmail} />
      {emailContent && <EmailPopup content={emailContent} onClose={() => setEmailContent(null)} />} 
      
    </div>
   
        
    );
}

export default App;
