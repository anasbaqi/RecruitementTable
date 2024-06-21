import { useState, FormEvent } from 'react';

interface Candidate {
    name: string;
    email: string;
    job: string;
    status: string;
}

interface CandidateFormProps {
    addCandidate: (newCandidate: Omit<Candidate, 'id'>) => void;
}

function CandidateForm({ addCandidate }: CandidateFormProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [job, setJob] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newCandidate = {
            name: name,
            email: email,
            job: job,
            status: 'new candidate'
        };
        addCandidate(newCandidate);
        // Reset form fields
        setName('');
        setEmail('');
        setJob('');
    };

    return (
        <div className="card w-50 mx-auto">
            <div className="card-body">
                <h3 className="card-title text-center mb-4">Add Candidate</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="candidateName" className="form-label">Candidate Name</label>
                        <input type="text" className="form-control" id="candidateName" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="candidateEmail" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="candidateEmail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="jobAppliedFor" className="form-label">Job Applied For</label>
                        <input type="text" className="form-control" id="jobAppliedFor" value={job} onChange={(e) => setJob(e.target.value)} required />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CandidateForm;
