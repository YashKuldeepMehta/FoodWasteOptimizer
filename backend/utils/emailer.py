import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import os

load_dotenv()

EMAIL_HOST = os.getenv("EMAIL_HOST")
EMAIL_PORT = int(os.getenv("EMAIL_PORT"))
EMAIL_ID = os.getenv("EMAIL_ID")
EMAIL_PW = os.getenv("EMAIL_PW")

def send_email(to, subject, body):
    try:
        msg = MIMEMultipart()
        msg["From"] = EMAIL_ID
        msg["To"] = to
        msg["Subject"] = subject

        msg.attach(MIMEText(body, "plain"))

        server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
        server.starttls()
        server.login(EMAIL_ID, EMAIL_PW)
        server.sendmail(EMAIL_ID, to, msg.as_string())
        server.quit()

        print("Email sent to:", to)

    except Exception as e:
        print("EMAIL ERROR:", e)
