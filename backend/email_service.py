import logging
import os
import resend

logger = logging.getLogger(__name__)

# Resend Configuration
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
# Resend requires a verified domain. If not verified, it might fail for custom 'from' addresses.
# For testing, they can use 'onboarding@resend.dev'
FROM_EMAIL = os.environ.get('FROM_EMAIL', 'onboarding@resend.dev')
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'reyanshschool@gmail.com')

# Initialize resend
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

async def send_email(to_email: str, subject: str, body: str, html_body: str = None):
    """Send email using Resend API"""
    if not RESEND_API_KEY:
        logger.warning("RESEND_API_KEY not configured. Email not sent.")
        logger.info(f"Would have sent email to {to_email}: {subject}")
        return False
    
    logger.info(f"Attempting to send email to {to_email} via Resend API")
    
    try:
        params = {
            "from": FROM_EMAIL,
            "to": to_email,
            "subject": subject,
            "text": body,
        }
        
        if html_body:
            params["html"] = html_body

        # Resend's library is synchronous, but we'll wrap it if needed. 
        # For now, we'll just call it directly as it's a simple HTTPS post.
        r = resend.Emails.send(params)
        
        logger.info(f"Email sent successfully via Resend. ID: {r.get('id')}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email via Resend: {str(e)} (Type: {type(e).__name__})")
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
