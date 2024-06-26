from fastapi import HTTPException
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders

# Predefined dictionary to map statuses to template files
template_files = {
    "new candidate": "templates/new_candidate.txt",
    "call": "templates/call.txt",
    "interview": "templates/interview.txt",
    "accept": "templates/accept.txt",
    "reject": "templates/reject.txt",
}

def return_email_response(response):
    name = response['name']
    email = response['email']
    job = response['job']
    status = response['status']
    fp = template_files.get(status)
    if not fp:
        raise HTTPException(status_code=400, detail="Invalid status")
    with open(fp, "r") as file:
        return file.read().strip().replace('{name}', name).replace('{email}', email).replace('{job}', job)

def send_email(username, passcode, to, cc, subject, body):
    msg = MIMEMultipart()
    msg['From'] = username
    msg['To'] = to
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))
        # Send email (replace with your actual SMTP server details)
    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        app_password = "wyyw byht khex ahue"
        server.login(username, passcode)
        text = msg.as_string()
        server.sendmail(username, to, text)