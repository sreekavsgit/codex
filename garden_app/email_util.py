import os
import smtplib
from email.message import EmailMessage

SMTP_SERVER = os.getenv('SMTP_SERVER', 'localhost')
SMTP_PORT = int(os.getenv('SMTP_PORT', '25'))
SMTP_USER = os.getenv('SMTP_USER')
SMTP_PASS = os.getenv('SMTP_PASS')

def send_email(to_email: str, subject: str, body: str, simulate: bool = False) -> None:
    """Send an email or print it in simulate mode."""
    msg = EmailMessage()
    msg['From'] = SMTP_USER or 'garden-app@example.com'
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.set_content(body)

    if simulate:
        print('--- Simulated email ---')
        print('To:', to_email)
        print('Subject:', subject)
        print(body)
        print('-----------------------')
        return

    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        if SMTP_USER and SMTP_PASS:
            server.login(SMTP_USER, SMTP_PASS)
        server.send_message(msg)
