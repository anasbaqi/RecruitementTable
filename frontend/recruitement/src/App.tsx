import  { useState } from 'react';
import CandidateForm from "./components/AddCandidate";
import CandidateTable from "./components/CandidateTable";
import axios from 'axios';
import './App.css';

interface Candidate {
    id: number; // id will be assigned by the server
    name: string;
    email: string;
    job: string;
    status: string;
}

function App() {
    const [candidates, setCandidates] = useState<Candidate[]>([]);


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

    return (
        
      <div className="container mt-4">
      <h1 className="text-center mb-4">Candidate Recruitement</h1>
      <hr />
      <div className="mb-4">
          <CandidateForm addCandidate={addCandidate} />
      </div>
      <hr />
      <CandidateTable candidates={candidates} updateCandidateStatus={updateCandidateStatus} deleteCandidate={deleteCandidate} />
    </div>
        
    );
}

export default App;
