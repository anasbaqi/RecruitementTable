from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from model import Candidate, EmailRequest
from utils import return_email_response
from utils import send_email
import os
from database import (
    fetch_one_candidate,
    fetch_all_candidates,
    create_candidate,
    update_candidate,
    remove_candidate,
)

#App object
app = FastAPI()

origins = [
    'http://localhost:3000',
    "http://localhost:5173",
    ]

app.add_middleware(
    CORSMiddleware, 
    allow_origins=origins,
    allow_credentials=True, 
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.get("/")
def read_root():
    return {"Hello":"World :)"}

@app.get("/api/candidates")
async def get_candidates():
    response = await fetch_all_candidates()
    return response


@app.get("/api/candidates/{name}", response_model=Candidate)
async def get_candidate_by_name(name):
    response = fetch_one_candidate(name)
    if response:
        return response
    raise HTTPException(404, f"there is no candidate item with given name {name}")


@app.post("/api/candidate/", response_model=Candidate)
async def post_candidate(candidate: Candidate):
    response = await create_candidate(candidate.model_dump())
    if response:
        return response
    raise HTTPException(400, f"Bad request")
    

@app.put("/api/candidate/{name}/", response_model=Candidate)
async def put_candidate(name:str, status:str):
    response = await update_candidate(name, status)
    if response:
        return response
    raise HTTPException(404, f"there is no candidate item with given name {name}")


@app.delete("/api/candidate/{name}")
async def delete_candidate(name):
    response = await remove_candidate(name)
    if response:
        return f"Succesfully deleted candidate item {name}"
    raise HTTPException(404, f"there is no candidate item with given name {name}")


@app.get("/api/candidate/email/{name}")
async def get_email_template(name):
    response = await fetch_one_candidate(name)
    if response:
        return return_email_response(response)
    raise HTTPException(404, f"there is no candidate item with given name {name}")

@app.post("/api/send_email")
async def send_email_request(email_request: EmailRequest):
    send_email(
        username=email_request.username,
        passcode=email_request.passcode,
        to=email_request.to,
        cc=email_request.cc,
        subject=email_request.subject,
        body=email_request.body
    )
    return {"message": "Email sent successfully"}