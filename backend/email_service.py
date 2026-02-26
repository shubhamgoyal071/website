import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import logging

logger = logging.getLogger(__name__)

SMTP_HOST = os.environ.get('SMTP_HOST', '')
SMTP_PORT = int(os.environ.get('SMTP_PORT', '587'))
SMTP_USER = os.environ.get('SMTP_USER', '')
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD', '')
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'reyanshschool@gmail.com')

async def send_email(to_email: str, subject: str, body: str, html_body: str = None):
    """Send email using aiosmtplib"""
    # Skip if SMTP not configured
    if not SMTP_HOST or not SMTP_USER:
        logger.warning(f"SMTP not configured. Host: {SMTP_HOST}, User: {SMTP_USER}. Email not sent.")
        logger.info(f"Would have sent email to {to_email}: {subject}")
        return False
    
    logger.info(f"Attempting to send email to {to_email} via {SMTP_HOST}:{SMTP_PORT} (User: {SMTP_USER})")
    
    try:
        message = MIMEMultipart('alternative')
        message['From'] = SMTP_USER
        message['To'] = to_email
        message['Subject'] = subject
        
        text_part = MIMEText(body, 'plain')
        message.attach(text_part)
        
        if html_body:
            html_part = MIMEText(html_body, 'html')
            message.attach(html_part)
        
        # Use a more manual connection for better debugging
        smtp_client = aiosmtplib.SMTP(
            hostname=SMTP_HOST,
            port=SMTP_PORT,
            use_tls=(SMTP_PORT == 465),
            timeout=30
        )
        
        async with smtp_client:
            if SMTP_PORT == 587:
                await smtp_client.starttls()
            
            await smtp_client.login(SMTP_USER, SMTP_PASSWORD)
            await smtp_client.send_message(message)
        
        logger.info(f"Email sent successfully to {to_email}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)} (Type: {type(e).__name__})")
        return False

async def send_admission_enquiry_notification(enquiry_data: dict):
    """Send notification email for admission enquiry"""
    subject = f"New Admission Enquiry - {enquiry_data['student_name']}"
    
    body = f"""
New Admission Enquiry Received

Student Name: {enquiry_data['student_name']}
Parent Name: {enquiry_data['parent_name']}
Email: {enquiry_data['email']}
Phone: {enquiry_data['phone']}
Grade: {enquiry_data['grade']}
Previous School: {enquiry_data.get('previous_school', 'N/A')}
Message: {enquiry_data.get('message', 'N/A')}

Submitted at: {enquiry_data['created_at']}
    """
    
    html_body = f"""
    <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                <h2 style="color: #3b82f6; border-bottom: 2px solid #fbbf24; padding-bottom: 10px;">New Admission Enquiry</h2>
                <div style="background-color: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
                    <p><strong>Student Name:</strong> {enquiry_data['student_name']}</p>
                    <p><strong>Parent Name:</strong> {enquiry_data['parent_name']}</p>
                    <p><strong>Email:</strong> <a href="mailto:{enquiry_data['email']}">{enquiry_data['email']}</a></p>
                    <p><strong>Phone:</strong> <a href="tel:{enquiry_data['phone']}">{enquiry_data['phone']}</a></p>
                    <p><strong>Grade:</strong> {enquiry_data['grade']}</p>
                    <p><strong>Previous School:</strong> {enquiry_data.get('previous_school', 'N/A')}</p>
                    <p><strong>Message:</strong></p>
                    <p style="background-color: #f3f4f6; padding: 10px; border-radius: 4px;">{enquiry_data.get('message', 'N/A')}</p>
                    <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">Submitted at: {enquiry_data['created_at']}</p>
                </div>
            </div>
        </body>
    </html>
    """
    
    await send_email(ADMIN_EMAIL, subject, body, html_body)

async def send_contact_message_notification(message_data: dict):
    """Send notification email for contact message"""
    subject = f"New Contact Message - {message_data['subject']}"
    
    body = f"""
New Contact Message Received

Name: {message_data['name']}
Email: {message_data['email']}
Phone: {message_data.get('phone', 'N/A')}
Subject: {message_data['subject']}
Message: {message_data['message']}

Submitted at: {message_data['created_at']}
    """
    
    html_body = f"""
    <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                <h2 style="color: #3b82f6; border-bottom: 2px solid #fbbf24; padding-bottom: 10px;">New Contact Message</h2>
                <div style="background-color: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
                    <p><strong>Name:</strong> {message_data['name']}</p>
                    <p><strong>Email:</strong> <a href="mailto:{message_data['email']}">{message_data['email']}</a></p>
                    <p><strong>Phone:</strong> <a href="tel:{message_data.get('phone', 'N/A')}">{message_data.get('phone', 'N/A')}</a></p>
                    <p><strong>Subject:</strong> {message_data['subject']}</p>
                    <p><strong>Message:</strong></p>
                    <p style="background-color: #f3f4f6; padding: 10px; border-radius: 4px;">{message_data['message']}</p>
                    <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">Submitted at: {message_data['created_at']}</p>
                </div>
            </div>
        </body>
    </html>
    """
    
    await send_email(ADMIN_EMAIL, subject, body, html_body)
