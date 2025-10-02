# 🚨 502 Bad Gateway - Quick Fix Guide

## **Immediate Steps:**

### **1. Check Render Logs**
1. Go to https://render.com/dashboard
2. Click on `school-report-api` service
3. Go to "Logs" tab
4. Look for error messages

### **2. Add Essential Environment Variables**
In Render dashboard → Environment tab, add:

```env
FLASK_ENV=production
FLASK_DEBUG=false
SECRET_KEY=your-secret-key-here
FIREBASE_PROJECT_ID=ass-sms
FIREBASE_API_KEY=AIzaSyC13_vM3RlSSxCDXTiKafekCBPpejtSGWc
```

### **3. Deploy Updated Code**
```bash
git add .
git commit -m "Fix 502 error - add graceful Firebase handling"
git push origin main
```

## **Common 502 Causes:**

### **Cause 1: Missing Environment Variables**
- **Symptom:** App crashes on startup
- **Fix:** Add all required environment variables

### **Cause 2: Firebase Initialization Failure**
- **Symptom:** Firebase errors in logs
- **Fix:** App now handles Firebase failures gracefully

### **Cause 3: Import Errors**
- **Symptom:** Python import errors
- **Fix:** Check if all dependencies installed correctly

### **Cause 4: Port Binding Issues**
- **Symptom:** App can't bind to port
- **Fix:** Using Render's PORT environment variable

## **Quick Test:**

After adding environment variables and deploying:

```bash
# Test health endpoint
curl https://school-report-api.onrender.com/api/health

# Expected response:
{
  "status": "healthy",
  "timestamp": "2025-01-01T10:30:00Z",
  "service": "School Management System API"
}
```

## **If Still Getting 502:**

1. **Check logs** for specific error messages
2. **Verify environment variables** are set correctly
3. **Test locally** first:
   ```bash
   pip install -r requirements.txt
   python backend/app.py
   ```

## **Expected Logs After Fix:**

You should see:
```
🚀 Starting School Management System API
📊 Port: 10000
🔧 Debug: False
🔥 Firebase Available: True
🔥 Firebase Initialized: False
📁 Template Path: /opt/render/project/src/backend/report_template.docx
📄 Template Exists: True
```

The app will now start even without Firebase credentials and provide helpful logging information!
