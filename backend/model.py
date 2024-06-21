from pydantic import BaseModel, EmailStr
from typing import Literal

class Candidate(BaseModel):
    name: str
    email: EmailStr
    job: str
    status: Literal['new candidate', 'call', 'interview', 'accept', 'reject']

    

