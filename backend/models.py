from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
import uuid

# Admission Enquiry Models
class AdmissionEnquiryCreate(BaseModel):
    student_name: str
    parent_name: str
    email: EmailStr
    phone: str
    grade: str
    previous_school: Optional[str] = ""
    message: Optional[str] = ""

class AdmissionEnquiry(AdmissionEnquiryCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: str = "pending"
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Contact Message Models
class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    subject: str
    message: str

class ContactMessage(ContactMessageCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: str = "unread"
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Photo Models
class PhotoCreate(BaseModel):
    title: str
    description: Optional[str] = ""
    category: str

class Photo(PhotoCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    file_path: str
    file_url: str
    uploaded_by: str = "admin"
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True

# Event Models
class EventCreate(BaseModel):
    title: str
    description: str
    date: str
    time: str
    category: str

class Event(EventCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
