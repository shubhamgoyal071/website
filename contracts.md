# Backend Integration Contracts - Reyansh School Website

## Database Models

### 1. AdmissionEnquiry
```python
{
    _id: ObjectId,
    student_name: str,
    parent_name: str,
    email: str,
    phone: str,
    grade: str,
    previous_school: str (optional),
    message: str (optional),
    status: str (default: "pending"), # pending, contacted, processed
    created_at: datetime
}
```

### 2. ContactMessage
```python
{
    _id: ObjectId,
    name: str,
    email: str,
    phone: str (optional),
    subject: str,
    message: str,
    status: str (default: "unread"), # unread, read, responded
    created_at: datetime
}
```

### 3. SchoolPhoto
```python
{
    _id: ObjectId,
    title: str,
    description: str (optional),
    category: str, # classroom, events, facilities, sports, etc.
    file_path: str,
    file_url: str,
    uploaded_by: str,
    uploaded_at: datetime,
    is_active: bool (default: True)
}
```

### 4. Event
```python
{
    _id: ObjectId,
    title: str,
    description: str,
    date: str,
    time: str,
    category: str, # academic, cultural, sports, admission
    created_at: datetime
}
```

## API Endpoints

### Admission Enquiries
- `POST /api/admissions/enquiry` - Submit admission enquiry form
  - Request Body: {student_name, parent_name, email, phone, grade, previous_school, message}
  - Response: {success: bool, message: str, enquiry_id: str}
  - Action: Save to DB + Send email notification

- `GET /api/admissions/enquiries` - Get all enquiries (admin only)
  - Response: {enquiries: []}

### Contact Messages
- `POST /api/contact/message` - Submit contact form
  - Request Body: {name, email, phone, subject, message}
  - Response: {success: bool, message: str}
  - Action: Save to DB + Send email notification

- `GET /api/contact/messages` - Get all messages (admin only)
  - Response: {messages: []}

### Photo Gallery
- `POST /api/photos/upload` - Upload school photos
  - Request: multipart/form-data with file, title, description, category
  - Response: {success: bool, photo_id: str, url: str}
  - Action: Save file to /uploads folder + Save metadata to DB

- `GET /api/photos` - Get all active photos
  - Query params: category (optional)
  - Response: {photos: []}

- `GET /api/photos/:id` - Get single photo
  - Response: {photo: {}}

- `DELETE /api/photos/:id` - Delete photo (soft delete)
  - Response: {success: bool}

### Events
- `GET /api/events` - Get all upcoming events
  - Response: {events: []}

## Email Integration

### Email Notifications
- Service: Send email notifications for enquiries and contact forms
- SMTP Configuration needed from user (or use a service like SendGrid/Mailgun)
- Templates:
  1. Admission Enquiry Notification (to school admin)
  2. Contact Form Notification (to school admin)
  3. Acknowledgment email (to user who submitted)

## Frontend-Backend Integration Points

### 1. Admissions Page (`/app/frontend/src/pages/Admissions.jsx`)
- Remove mock submission in handleSubmit
- Add API call to `/api/admissions/enquiry`
- Update success/error handling with toast notifications

### 2. Contact Page (`/app/frontend/src/pages/Contact.jsx`)
- Remove mock submission in handleSubmit
- Add API call to `/api/contact/message`
- Update success/error handling with toast notifications

### 3. Photo Gallery Component (New)
- Create Gallery page or add to Home page
- Fetch photos from `/api/photos`
- Display with categories

### 4. Photo Upload Portal (Admin - New)
- Create admin route `/admin/photos`
- File upload with preview
- Form fields: title, description, category
- Upload to `/api/photos/upload`

## Mock Data to be Removed
- Admission form submission (currently console.log)
- Contact form submission (currently console.log)
- All gallery images currently hardcoded

## Environment Variables Needed (.env files)

### Backend (.env)
```
MONGO_URL=<existing>
DB_NAME=<existing>
SMTP_HOST=<to be provided by user>
SMTP_PORT=<to be provided by user>
SMTP_USER=<to be provided by user>
SMTP_PASSWORD=<to be provided by user>
ADMIN_EMAIL=reyanshschool@gmail.com
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=<existing>
```

## File Upload Configuration
- Storage location: `/app/backend/uploads/photos/`
- Allowed formats: jpg, jpeg, png, webp
- Max file size: 5MB per file
- File naming: timestamp + random string + original extension

## Security Considerations
- CORS: Already configured
- File upload validation: Check file type and size
- Admin routes: Optional simple authentication (password protected)
- Input validation: Validate all form inputs on backend
