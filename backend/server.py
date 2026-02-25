from fastapi import FastAPI, APIRouter, UploadFile, File, Form, HTTPException
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from pathlib import Path
import os

# Load environment variables before other imports
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import logging
from typing import List, Optional
from datetime import datetime
import uuid
import shutil

from models import (
    AdmissionEnquiryCreate, AdmissionEnquiry,
    ContactMessageCreate, ContactMessage,
    Photo, Event
)
from email_service import send_admission_enquiry_notification, send_contact_message_notification

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create uploads directory
UPLOAD_DIR = ROOT_DIR / "uploads" / "photos"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# Create the main app without a prefix
app = FastAPI()

# Mount uploads directory for serving files
app.mount("/uploads", StaticFiles(directory=str(ROOT_DIR / "uploads")), name="uploads")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")




# ========== ADMISSION ENQUIRIES ==========
@api_router.post("/admissions/enquiry")
async def create_admission_enquiry(enquiry: AdmissionEnquiryCreate):
    try:
        enquiry_obj = AdmissionEnquiry(**enquiry.dict())
        enquiry_dict = enquiry_obj.dict()
        
        # Save to database
        await db.admission_enquiries.insert_one(enquiry_dict)
        
        # Send email notification
        await send_admission_enquiry_notification(enquiry_dict)
        
        logger.info(f"New admission enquiry from {enquiry.parent_name}")
        return {
            "success": True,
            "message": "Admission enquiry submitted successfully! We will contact you soon.",
            "enquiry_id": enquiry_obj.id
        }
    except Exception as e:
        logger.error(f"Error creating admission enquiry: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/admissions/enquiries")
async def get_admission_enquiries():
    try:
        enquiries = await db.admission_enquiries.find().sort("created_at", -1).to_list(1000)
        return {"enquiries": enquiries}
    except Exception as e:
        logger.error(f"Error fetching enquiries: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# ========== CONTACT MESSAGES ==========
@api_router.post("/contact/message")
async def create_contact_message(message: ContactMessageCreate):
    try:
        message_obj = ContactMessage(**message.dict())
        message_dict = message_obj.dict()
        
        # Save to database
        await db.contact_messages.insert_one(message_dict)
        
        # Send email notification
        await send_contact_message_notification(message_dict)
        
        logger.info(f"New contact message from {message.name}")
        return {
            "success": True,
            "message": "Message sent successfully! We will get back to you soon."
        }
    except Exception as e:
        logger.error(f"Error creating contact message: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/contact/messages")
async def get_contact_messages():
    try:
        messages = await db.contact_messages.find().sort("created_at", -1).to_list(1000)
        return {"messages": messages}
    except Exception as e:
        logger.error(f"Error fetching messages: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# ========== PHOTO GALLERY ==========
@api_router.post("/photos/upload")
async def upload_photo(
    file: UploadFile = File(...),
    title: str = Form(...),
    description: Optional[str] = Form(""),
    category: str = Form(...)
):
    try:
        # Validate file type
        allowed_types = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
        if file.content_type not in allowed_types:
            raise HTTPException(status_code=400, detail="Invalid file type. Only JPG, PNG, and WebP are allowed.")
        
        # Validate file size (5MB)
        file_size = 0
        chunk_size = 1024 * 1024  # 1MB
        temp_file = f"/tmp/{file.filename}"
        
        with open(temp_file, "wb") as buffer:
            while chunk := await file.read(chunk_size):
                file_size += len(chunk)
                if file_size > 5 * 1024 * 1024:  # 5MB
                    os.remove(temp_file)
                    raise HTTPException(status_code=400, detail="File size exceeds 5MB limit.")
                buffer.write(chunk)
        
        # Generate unique filename
        file_ext = Path(file.filename).suffix
        unique_filename = f"{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}_{uuid.uuid4().hex[:8]}{file_ext}"
        file_path = UPLOAD_DIR / unique_filename
        
        # Move file to uploads directory
        shutil.move(temp_file, str(file_path))
        
        # Create photo object
        file_url = f"/uploads/photos/{unique_filename}"
        photo = Photo(
            title=title,
            description=description,
            category=category,
            file_path=str(file_path),
            file_url=file_url
        )
        
        # Save to database
        await db.school_photos.insert_one(photo.dict())
        
        logger.info(f"Photo uploaded: {title}")
        return {
            "success": True,
            "photo_id": photo.id,
            "url": file_url,
            "message": "Photo uploaded successfully!"
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error uploading photo: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/photos")
async def get_photos(category: Optional[str] = None):
    try:
        query = {"is_active": True}
        if category:
            query["category"] = category
        
        photos = await db.school_photos.find(query).sort("uploaded_at", -1).to_list(1000)
        return {"photos": photos}
    except Exception as e:
        logger.error(f"Error fetching photos: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/photos/{photo_id}")
async def get_photo(photo_id: str):
    try:
        photo = await db.school_photos.find_one({"id": photo_id, "is_active": True})
        if not photo:
            raise HTTPException(status_code=404, detail="Photo not found")
        return {"photo": photo}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching photo: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.delete("/photos/{photo_id}")
async def delete_photo(photo_id: str):
    try:
        result = await db.school_photos.update_one(
            {"id": photo_id},
            {"$set": {"is_active": False}}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Photo not found")
        
        logger.info(f"Photo deleted: {photo_id}")
        return {"success": True, "message": "Photo deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting photo: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# ========== EVENTS ==========
@api_router.get("/events")
async def get_events():
    try:
        events = await db.events.find().sort("date", 1).to_list(1000)
        return {"events": events}
    except Exception as e:
        logger.error(f"Error fetching events: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Health check
@api_router.get("/")
async def root():
    return {"message": "Reyansh School API is running"}

# Admission Enquiry Endpoints
@api_router.post("/admission-enquiry", response_model=AdmissionEnquiry)
async def create_admission_enquiry(enquiry: AdmissionEnquiryCreate):
    """Create a new admission enquiry"""
    try:
        enquiry_dict = enquiry.model_dump()
        enquiry_obj = AdmissionEnquiry(**enquiry_dict)
        
        # Convert to dict for MongoDB
        doc = enquiry_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        
        # Insert into database
        _ = await db.admission_enquiries.insert_one(doc)
        logger.info(f"Created admission enquiry with ID: {enquiry_obj.id}")
        
        # Send notification email
        await send_admission_enquiry_notification(doc)
        
        return enquiry_obj
    except Exception as e:
        logger.error(f"Error creating admission enquiry: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create admission enquiry")

@api_router.get("/admission-enquiry", response_model=List[AdmissionEnquiry])
async def get_admission_enquiries():
    """Get all admission enquiries"""
    try:
        enquiries = await db.admission_enquiries.find({}, {"_id": 0}).to_list(1000)
        
        # Convert ISO string timestamps back to datetime objects
        for enquiry in enquiries:
            if isinstance(enquiry['created_at'], str):
                enquiry['created_at'] = datetime.fromisoformat(enquiry['created_at'])
        
        return enquiries
    except Exception as e:
        logger.error(f"Error fetching admission enquiries: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch admission enquiries")

# Contact Message Endpoints
@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(message: ContactMessageCreate):
    """Create a new contact message"""
    try:
        message_dict = message.model_dump()
        message_obj = ContactMessage(**message_dict)
        
        # Convert to dict for MongoDB
        doc = message_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        
        # Insert into database
        _ = await db.contact_messages.insert_one(doc)
        logger.info(f"Created contact message with ID: {message_obj.id}")
        
        # Send notification email
        await send_contact_message_notification(doc)
        
        return message_obj
    except Exception as e:
        logger.error(f"Error creating contact message: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create contact message")

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    """Get all contact messages"""
    try:
        messages = await db.contact_messages.find({}, {"_id": 0}).to_list(1000)
        
        # Convert ISO string timestamps back to datetime objects
        for message in messages:
            if isinstance(message['created_at'], str):
                message['created_at'] = datetime.fromisoformat(message['created_at'])
        
        return messages
    except Exception as e:
        logger.error(f"Error fetching contact messages: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch contact messages")

# Photo Gallery Endpoints
@api_router.post("/photos/upload")
async def upload_photo(
    file: UploadFile = File(...),
    title: str = Form(...),
    description: str = Form(""),
    category: str = Form(...)
):
    """Upload a new photo to the gallery"""
    try:
        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Generate unique filename
        file_extension = file.filename.split('.')[-1]
        unique_filename = f"{uuid.uuid4()}.{file_extension}"
        file_path = UPLOAD_DIR / unique_filename
        
        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Create photo object
        photo_data = {
            "title": title,
            "description": description,
            "category": category,
            "file_path": str(file_path),
            "file_url": f"/uploads/photos/{unique_filename}"
        }
        
        photo_obj = Photo(**photo_data)
        
        # Convert to dict for MongoDB
        doc = photo_obj.model_dump()
        doc['uploaded_at'] = doc['uploaded_at'].isoformat()
        
        # Insert into database
        _ = await db.photos.insert_one(doc)
        logger.info(f"Uploaded photo with ID: {photo_obj.id}")
        
        return photo_obj
    except Exception as e:
        logger.error(f"Error uploading photo: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to upload photo")

@api_router.get("/photos", response_model=List[Photo])
async def get_photos(category: Optional[str] = None):
    """Get all photos or photos by category"""
    try:
        query = {"is_active": True}
        if category:
            query["category"] = category
        
        photos = await db.photos.find(query, {"_id": 0}).to_list(1000)
        
        # Convert ISO string timestamps back to datetime objects
        for photo in photos:
            if isinstance(photo['uploaded_at'], str):
                photo['uploaded_at'] = datetime.fromisoformat(photo['uploaded_at'])
        
        return photos
    except Exception as e:
        logger.error(f"Error fetching photos: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch photos")

@api_router.delete("/photos/{photo_id}")
async def delete_photo(photo_id: str):
    """Delete a photo from the gallery"""
    try:
        # Find the photo
        photo = await db.photos.find_one({"id": photo_id}, {"_id": 0})
        if not photo:
            raise HTTPException(status_code=404, detail="Photo not found")
        
        # Mark as inactive instead of deleting
        result = await db.photos.update_one(
            {"id": photo_id},
            {"$set": {"is_active": False}}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Photo not found")
        
        logger.info(f"Deleted photo with ID: {photo_id}")
        return {"message": "Photo deleted successfully"}
    except Exception as e:
        logger.error(f"Error deleting photo: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete photo")

# Events Endpoints
@api_router.post("/events", response_model=Event)
async def create_event(event: Event):
    """Create a new event"""
    try:
        # Convert to dict for MongoDB
        doc = event.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        
        # Insert into database
        _ = await db.events.insert_one(doc)
        logger.info(f"Created event with ID: {event.id}")
        
        return event
    except Exception as e:
        logger.error(f"Error creating event: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create event")

@api_router.get("/events", response_model=List[Event])
async def get_events():
    """Get all events"""
    try:
        events = await db.events.find({}, {"_id": 0}).to_list(1000)
        
        # Convert ISO string timestamps back to datetime objects
        for event in events:
            if isinstance(event['created_at'], str):
                event['created_at'] = datetime.fromisoformat(event['created_at'])
        
        return events
    except Exception as e:
        logger.error(f"Error fetching events: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch events")

@api_router.put("/events/{event_id}", response_model=Event)
async def update_event(event_id: str, event_update: Event):
    """Update an existing event"""
    try:
        # Convert to dict for MongoDB
        doc = event_update.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        
        # Update in database
        result = await db.events.update_one(
            {"id": event_id},
            {"$set": doc}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Event not found")
        
        logger.info(f"Updated event with ID: {event_id}")
        return event_update
    except Exception as e:
        logger.error(f"Error updating event: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update event")

@api_router.delete("/events/{event_id}")
async def delete_event(event_id: str):
    """Delete an event"""
    try:
        result = await db.events.delete_one({"id": event_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Event not found")
        
        logger.info(f"Deleted event with ID: {event_id}")
        return {"message": "Event deleted successfully"}
    except Exception as e:
        logger.error(f"Error deleting event: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete event")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()