from pydantic import BaseModel, EmailStr
from typing import Literal
from typing import Optional

class Candidate(BaseModel):
    name: str
    email: EmailStr
    job: str
    status: Literal['new candidate', 'call', 'interview', 'accept', 'reject']

    
class EmailRequest(BaseModel):
    username: EmailStr
    passcode: str
    to: EmailStr
    cc: Optional[EmailStr] = None
    subject: str
    body: str