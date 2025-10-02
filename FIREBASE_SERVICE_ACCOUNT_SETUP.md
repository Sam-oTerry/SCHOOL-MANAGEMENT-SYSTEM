# Firebase Service Account Setup for Backend API

## 🔐 **Setting Up Firebase Service Account**

Your backend API needs a service account to access Firestore. Here's how to set it up:

### **Step 1: Generate Service Account Key**

1. **Go to Firebase Console:** https://console.firebase.google.com
2. **Select your project:** `ass-sms`
3. **Click the gear icon** → **Project Settings**
4. **Go to "Service Accounts" tab**
5. **Click "Generate new private key"**
6. **Download the JSON file** (keep it secure!)

### **Step 2: Add to Render Environment Variables**

Instead of uploading the file, add the JSON content as an environment variable:

1. **Go to Render Dashboard:** https://render.com/dashboard
2. **Click on:** `school-report-api` service
3. **Go to:** Environment tab
4. **Add this variable:**

```env
FIREBASE_CREDENTIALS_JSON={"type":"service_account","project_id":"ass-sms","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"..."}
```

### **Step 3: Update Backend Code**

Update your `backend/app.py` to use the service account:

```python
import json
import os
from firebase_admin import credentials, initialize_app, firestore

# Initialize Firebase Admin SDK
def initialize_firebase():
    try:
        # Get credentials from environment variable
        creds_json = os.getenv('FIREBASE_CREDENTIALS_JSON')
        if creds_json:
            creds_dict = json.loads(creds_json)
            cred = credentials.Certificate(creds_dict)
            initialize_app(cred)
            print("✅ Firebase Admin SDK initialized successfully")
        else:
            print("❌ FIREBASE_CREDENTIALS_JSON not found in environment variables")
    except Exception as e:
        print(f"❌ Firebase initialization failed: {e}")

# Initialize Firebase when the app starts
initialize_firebase()

# Get Firestore instance
db = firestore.client()
```

### **Step 4: Test Firebase Connection**

Add this test endpoint to your `backend/app.py`:

```python
@app.route('/api/test-firebase', methods=['GET'])
def test_firebase():
    """Test Firebase connection"""
    try:
        # Test Firestore connection
        doc_ref = db.collection('test').document('connection')
        doc_ref.set({
            'message': 'Firebase connection test',
            'timestamp': datetime.now().isoformat()
        })
        
        # Read it back
        doc = doc_ref.get()
        if doc.exists:
            return jsonify({
                'success': True,
                'message': 'Firebase connection successful',
                'data': doc.to_dict()
            })
        else:
            return jsonify({
                'success': False,
                'message': 'Firebase connection failed'
            })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Firebase error: {str(e)}'
        }), 500
```

## 🧪 **Testing the Integration**

### **1. Test Firebase Connection:**
```bash
curl https://school-report-api.onrender.com/api/test-firebase
```

### **2. Test with Real Data:**
```bash
curl -X POST https://school-report-api.onrender.com/api/generate-word-report \
  -H "Content-Type: application/json" \
  -d '{"studentId": "your-student-id", "term": "Term 3", "className": "S.4"}'
```

## 🔒 **Firestore Security Rules**

Update your Firestore rules to allow access:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write for authenticated users
    match /students/{studentId} {
      allow read, write: if request.auth != null;
    }
    
    match /report_cards/{reportId} {
      allow read, write: if request.auth != null;
    }
    
    // Allow all access for testing (change in production)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

## 📊 **Complete Environment Variables for Render**

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

# Firebase Service Account (JSON content)
FIREBASE_CREDENTIALS_JSON={"type":"service_account",...}
```

## 🎯 **Next Steps**

1. **Generate service account key** from Firebase Console
2. **Add FIREBASE_CREDENTIALS_JSON** to Render environment variables
3. **Update backend code** with Firebase Admin SDK
4. **Test the connection** with the test endpoint
5. **Deploy and test** report generation

## 🚨 **Security Notes**

- **Never commit** the service account JSON file to your repository
- **Use environment variables** to store sensitive data
- **Rotate keys** regularly in production
- **Limit permissions** to only what's needed

Your Firebase integration should now work perfectly with your deployed API! 🚀
