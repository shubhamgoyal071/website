# 📧 Step-by-Step Email Configuration Guide
## Reyansh School Website - Gmail Integration

---

## ✅ **What This Will Do:**
When someone fills out:
- **Admission Enquiry Form** (on /admissions page)
- **Contact Form** (on /contact page)

You will receive an **automatic email** at: **reyanshschool@gmail.com**

---

## 🔧 **Step 1: Generate Gmail App Password**

### 1.1 Go to Your Gmail Account
- Open: https://myaccount.google.com/
- Sign in with: **reyanshschool@gmail.com**

### 1.2 Enable 2-Step Verification (if not already enabled)
1. Go to: **Security** (left sidebar)
2. Find: **2-Step Verification**
3. Click: **Get Started**
4. Follow the steps to set it up (you'll need your phone)

### 1.3 Generate App Password
1. Go back to: **Security**
2. Find: **App passwords** (under "Signing in to Google")
3. Click: **App passwords**
4. You may need to sign in again
5. Select app: **Mail**
6. Select device: **Other (Custom name)**
7. Enter name: **Reyansh School Website**
8. Click: **Generate**
9. **COPY THE 16-CHARACTER PASSWORD** (it will look like: `abcd efgh ijkl mnop`)
10. Save it somewhere safe - you won't see it again!

---

## 🔧 **Step 2: Update Backend Configuration**

### 2.1 Open the Backend Environment File
```bash
# Connect to your server/computer where the website is running
# Then open the file:
nano /app/backend/.env
```

Or if you're using a file editor, open: `/app/backend/.env`

### 2.2 Add These Lines to the File
```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=reyanshschool@gmail.com
SMTP_PASSWORD=your_app_password_here
ADMIN_EMAIL=reyanshschool@gmail.com
```

**IMPORTANT:** Replace `your_app_password_here` with the 16-character password from Step 1.3

**Example:**
```env
SMTP_PASSWORD=abcd efgh ijkl mnop
```

### 2.3 Save the File
- If using nano: Press `Ctrl+X`, then `Y`, then `Enter`
- If using other editor: Just save and close

---

## 🔧 **Step 3: Restart the Backend Server**

Run this command:
```bash
sudo supervisorctl restart backend
```

Wait 5 seconds, then check if it restarted successfully:
```bash
sudo supervisorctl status backend
```

You should see: `backend    RUNNING`

---

## ✅ **Step 4: Test the Email System**

### 4.1 Test Admission Enquiry
1. Go to: http://localhost:3000/admissions (or your website URL)
2. Scroll to: **Admission Enquiry Form**
3. Fill out the form with test data
4. Click: **Submit Enquiry**
5. Check: **reyanshschool@gmail.com** inbox

### 4.2 Test Contact Form
1. Go to: http://localhost:3000/contact
2. Scroll to: **Send Us a Message**
3. Fill out the form
4. Click: **Send Message**
5. Check: **reyanshschool@gmail.com** inbox

---

## 📧 **What the Emails Will Look Like:**

### For Admission Enquiries:
```
Subject: New Admission Enquiry - [Student Name]

Student Name: John Doe
Parent Name: Jane Doe
Email: parent@email.com
Phone: +91-9876543210
Grade: Class 1
Previous School: ABC School
Message: We are interested in admission...

Submitted at: 2026-02-13 10:30:00
```

### For Contact Messages:
```
Subject: New Contact Message - [Subject]

Name: John Doe
Email: john@email.com
Phone: +91-9876543210
Subject: School Tour Request
Message: I would like to schedule a tour...

Submitted at: 2026-02-13 10:30:00
```

---

## 🔍 **Troubleshooting**

### Issue: Not receiving emails?

**Check 1: Verify credentials**
```bash
# Check if environment variables are loaded
cd /app/backend
grep SMTP .env
```

**Check 2: Check backend logs**
```bash
tail -n 50 /var/log/supervisor/backend.err.log
```

Look for lines like:
- ✅ `Email sent successfully to reyanshschool@gmail.com`
- ❌ `Failed to send email: Invalid credentials`

**Check 3: Gmail spam folder**
Sometimes emails go to spam initially. Mark them as "Not Spam" to train Gmail.

**Check 4: App password is correct**
- App password should be 16 characters
- No spaces when entering in .env file
- Format: `abcdefghijklmnop` (no spaces)

---

## 🔒 **Security Notes**

1. **Never share your App Password** - It's like your Gmail password
2. **Keep .env file private** - Don't commit it to GitHub
3. **Revoke App Password** if compromised:
   - Go to: https://myaccount.google.com/security
   - Find: App passwords
   - Remove the "Reyansh School Website" entry
   - Generate a new one

---

## 📝 **Quick Reference**

**File to edit:** `/app/backend/.env`

**Required variables:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=reyanshschool@gmail.com
SMTP_PASSWORD=your_16_char_app_password
ADMIN_EMAIL=reyanshschool@gmail.com
```

**Restart command:** `sudo supervisorctl restart backend`

**Test URLs:**
- Admission Form: http://localhost:3000/admissions
- Contact Form: http://localhost:3000/contact

---

## ✅ **That's It!**

Once configured, every form submission will automatically email you at **reyanshschool@gmail.com** with all the details!

**Need Help?** Check the backend logs:
```bash
tail -f /var/log/supervisor/backend.err.log
```
