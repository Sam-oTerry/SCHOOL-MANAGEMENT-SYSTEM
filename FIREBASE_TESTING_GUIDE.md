# 🧪 Firebase Integration Testing Guide

## ✅ **Your Configuration is Ready!**

### **Firebase Project Details:**
- **Project ID:** `ass-sms`
- **API Key:** `AIzaSyC13_vM3RlSSxCDXTiKafekCBPpejtSGWc`
- **App ID:** `1:515388722489:web:21169f130303f48aaa2ce8`

### **API Endpoint:**
- **URL:** `https://school-report-api.onrender.com`

## 🔧 **Step 1: Update Render Environment Variables**

Go to your Render dashboard and add these environment variables:

```env
# Flask Configuration
FLASK_ENV=production
FLASK_DEBUG=false
SECRET_KEY=your-secret-key-here

# Firebase Configuration
FIREBASE_PROJECT_ID=ass-sms
FIREBASE_API_KEY=AIzaSyC13_vM3RlSSxCDXTiKafekCBPpejtSGWc
FIREBASE_AUTH_DOMAIN=ass-sms.firebaseapp.com
FIREBASE_STORAGE_BUCKET=ass-sms.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=515388722489
FIREBASE_APP_ID=1:515388722489:web:21169f130303f48aaa2ce8

# Firebase Service Account (you need to add this)
FIREBASE_CREDENTIALS_JSON={"type":"service_account",...}
```

## 🔐 **Step 2: Get Firebase Service Account**

1. **Go to Firebase Console:** https://console.firebase.google.com
2. **Select project:** `ass-sms`
3. **Project Settings** → **Service Accounts**
4. **Generate new private key**
5. **Download JSON file**
6. **Copy the entire JSON content**
7. **Add to Render as `FIREBASE_CREDENTIALS_JSON`**

## 🧪 **Step 3: Test Your API**

### **Test 1: Basic API Health**
```bash
curl https://school-report-api.onrender.com/api/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-01T10:30:00Z",
  "service": "School Management System API"
}
```

### **Test 2: API with Firebase Info**
```bash
curl https://school-report-api.onrender.com/api/test
```

**Expected Response:**
```json
{
  "message": "Backend API is working!",
  "timestamp": "2025-01-01T10:30:00Z",
  "template_path": "/opt/render/project/src/backend/report_template.docx",
  "template_exists": true,
  "firebase_available": true,
  "firebase_initialized": true,
  "project_id": "ass-sms"
}
```

### **Test 3: Firebase Connection**
```bash
curl https://school-report-api.onrender.com/api/test-firebase
```

**Expected Response (after adding service account):**
```json
{
  "success": true,
  "message": "Firebase connection successful",
  "data": {
    "message": "Firebase connection test",
    "timestamp": "2025-01-01T10:30:00Z",
    "project_id": "ass-sms"
  },
  "project_id": "ass-sms"
}
```

## 🔄 **Step 4: Deploy Updated Backend**

1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Add Firebase integration to backend"
   git push origin main
   ```

2. **Wait for Render to redeploy** (5-10 minutes)

3. **Test the updated endpoints**

## 🎯 **Step 5: Test Frontend Integration**

### **Update your frontend files:**

1. **Open:** `users/dos/report-cards-integrated.html`
2. **Verify the configuration is correct:**
   ```javascript
   const API_BASE_URL = 'https://school-report-api.onrender.com/api';
   const FIREBASE_CONFIG = {
     apiKey: "AIzaSyC13_vM3RlSSxCDXTiKafekCBPpejtSGWc",
     authDomain: "ass-sms.firebaseapp.com",
     projectId: "ass-sms",
     storageBucket: "ass-sms.firebasestorage.app",
     messagingSenderId: "515388722489",
     appId: "1:515388722489:web:21169f130303f48aaa2ce8",
     measurementId: "G-2FVKDJWK5E"
   };
   ```

3. **Test the frontend:**
   - Open the HTML file in your browser
   - Check browser console for Firebase connection
   - Try generating a report card

## 📊 **Step 6: Test Report Generation**

### **Test with Sample Data:**
```bash
curl -X POST https://school-report-api.onrender.com/api/generate-word-report \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": "test-student-001",
    "term": "Term 3",
    "className": "S.4 Science A"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Word document generated successfully",
  "data": {
    "content": "base64-encoded-document-content",
    "filename": "Report_Card_test-student-001_Term_3.docx"
  }
}
```

## 🔍 **Troubleshooting**

### **Issue 1: Firebase Not Initialized**
**Error:** `Firebase not initialized. Check FIREBASE_CREDENTIALS_JSON environment variable.`

**Solution:**
1. Verify you added `FIREBASE_CREDENTIALS_JSON` to Render environment variables
2. Check the JSON format is correct
3. Redeploy the service

### **Issue 2: CORS Errors**
**Error:** `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solution:**
- CORS is already enabled in the backend
- Check if you're calling the correct API URL

### **Issue 3: Template Not Found**
**Error:** `Template not found`

**Solution:**
- The template should be included in the deployment
- Check Render logs for file path issues

## 🎉 **Success Indicators**

You'll know everything is working when:

1. ✅ **API Health Check** returns success
2. ✅ **Firebase Test** returns success with data
3. ✅ **Frontend** loads without console errors
4. ✅ **Report Generation** downloads DOCX file
5. ✅ **Firebase Auth** works in frontend

## 🚀 **Next Steps**

Once everything is working:

1. **Add real student data** to Firestore
2. **Test with actual students** and classes
3. **Implement batch generation** for entire classes
4. **Add error handling** and user feedback
5. **Deploy frontend** to a web server

## 📞 **Need Help?**

If you encounter any issues:

1. **Check Render logs** for backend errors
2. **Check browser console** for frontend errors
3. **Verify environment variables** are set correctly
4. **Test each endpoint** individually

Your Firebase integration should now work perfectly! 🎯
