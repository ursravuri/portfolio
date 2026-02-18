from fastapi import APIRouter, HTTPException
from app.models.schemas import ContactMessage, ContactResponse
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/", response_model=ContactResponse)
async def send_contact(message: ContactMessage):
    """
    Handles contact form submissions.
    In production: integrate with SendGrid, Resend, or SMTP.
    """
    try:
        # Log the message (replace with real email sending in production)
        logger.info(f"Contact from {message.name} <{message.email}>: {message.subject}")

        # --- Production email (uncomment & configure): ---
        # import smtplib
        # from email.mime.text import MIMEText
        # msg = MIMEText(f"From: {message.name}\nEmail: {message.email}\n\n{message.message}")
        # msg['Subject'] = f"Portfolio Contact: {message.subject}"
        # msg['From'] = "noreply@yourdomain.com"
        # msg['To'] = "anilkumar80459@gmail.com"
        # with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        #     server.login(os.getenv("SMTP_USER"), os.getenv("SMTP_PASS"))
        #     server.send_message(msg)

        return ContactResponse(
            success=True,
            message=f"Thanks {message.name}! Your message has been received. I'll get back to you soon."
        )
    except Exception as e:
        logger.error(f"Contact form error: {e}")
        raise HTTPException(status_code=500, detail="Failed to send message. Please try again.")
