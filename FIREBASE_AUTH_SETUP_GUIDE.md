# Firebase Authentication Setup Guide

## 🔧 Fix Firebase Authentication Issues

The error `auth/operation-not-allowed` means that **Email/Password authentication is not enabled** in your Firebase project.

### Step 1: Enable Email/Password Authentication

1. **Go to Firebase Console:**
   - Visit: https://console.firebase.google.com/
   - Select your project: `ass-sms`

2. **Enable Authentication:**
   - In the left sidebar, click **"Authentication"**
   - Click **"Get started"** (if not already done)
   - Go to **"Sign-in method"** tab
   - Click **"Email/Password"**
   - Toggle **"Enable"** to ON
   - Click **"Save"**

### Step 2: Create Test Users

1. **Go to Authentication > Users tab**
2. **Click "Add user"**
3. **Create test users:**

#### Test User 1: System Administrator
- **Email:** `admin@school.edu`
- **Password:** `admin123`
- **Display Name:** `System Administrator`

#### Test User 2: Head Teacher
- **Email:** `headteacher@school.edu`
- **Password:** `teacher123`
- **Display Name:** `Head Teacher`

### Step 3: Update Firestore Security Rules

1. **Go to Firestore Database > Rules**
2. **Update rules to allow authentication:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to authenticated users
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Users can read their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. **Click "Publish"**

### Step 4: Test Authentication

1. **Open your application:**
   - `http://localhost:3000/index.html`

2. **Test with created users:**
   - Email: `admin@school.edu`
   - Password: `admin123`

3. **Check browser console** for authentication logs

## 🔍 Troubleshooting

### Common Issues:

1. **"auth/operation-not-allowed"**
   - **Solution:** Enable Email/Password authentication in Firebase Console

2. **"auth/user-not-found"**
   - **Solution:** Create the user in Firebase Console first

3. **"auth/wrong-password"**
   - **Solution:** Check password in Firebase Console

4. **"auth/invalid-email"**
   - **Solution:** Use a valid email format

5. **"auth/too-many-requests"**
   - **Solution:** Wait a few minutes before trying again

### Testing Steps:

1. **Check Firebase Console:**
   - Authentication > Users (should show created users)
   - Authentication > Sign-in method (Email/Password should be enabled)

2. **Check Browser Console:**
   - Look for Firebase initialization logs
   - Check for authentication errors

3. **Test Login:**
   - Try logging in with created credentials
   - Check for successful authentication

## 📊 Expected Results

After setup, you should see:

```
✅ Firebase services initialized
✅ Auth Service: [object Object]
✅ Database Service: [object Object]
🔐 Attempting Firebase authentication...
📧 Email: admin@school.edu
✅ Firebase authentication successful
👤 User Role: system_admin
🚀 Redirecting to: users/system-admin/dashboard.html
```

## 🚀 Next Steps

1. **Enable Authentication** in Firebase Console
2. **Create test users** with proper credentials
3. **Update security rules** for Firestore
4. **Test login** with created users
5. **Verify dashboard redirects** work properly

Your Firebase authentication should work perfectly after these steps! 🎉
