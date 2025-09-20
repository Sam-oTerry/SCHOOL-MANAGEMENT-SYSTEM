# Firebase Setup Guide for School Management System

## Prerequisites
- Node.js (version 14 or higher)
- Firebase account
- Git (optional but recommended)

## Step 1: Create Firebase Project

1. **Go to Firebase Console**
   - Visit [https://console.firebase.google.com](https://console.firebase.google.com)
   - Click "Create a project" or "Add project"

2. **Project Configuration**
   - Project name: `school-management-system`
   - Enable Google Analytics: Yes (recommended)
   - Analytics account: Create new or use existing

3. **Wait for Project Creation**
   - Firebase will create your project (usually takes 1-2 minutes)

## Step 2: Enable Firebase Services

### Authentication Setup
1. **Go to Authentication**
   - In Firebase Console, click "Authentication" in the left sidebar
   - Click "Get started"

2. **Enable Sign-in Methods**
   - Click "Sign-in method" tab
   - Enable "Email/Password"
   - Enable "Anonymous" (optional)
   - Click "Save"

### Firestore Database Setup
1. **Go to Firestore Database**
   - Click "Firestore Database" in the left sidebar
   - Click "Create database"

2. **Security Rules**
   - Choose "Start in test mode" (for development)
   - Click "Next"
   - Choose a location (closest to your users)
   - Click "Done"

3. **Update Security Rules**
   - Go to "Rules" tab in Firestore
   - Replace the default rules with the rules from `docs/COMPLETE_FIRESTORE_DATABASE.md`

### Storage Setup
1. **Go to Storage**
   - Click "Storage" in the left sidebar
   - Click "Get started"

2. **Security Rules**
   - Choose "Start in test mode" (for development)
   - Click "Next"
   - Choose a location (same as Firestore)
   - Click "Done"

3. **Update Storage Rules**
   - Go to "Rules" tab in Storage
   - Replace with the rules from `docs/FIREBASE_INTEGRATION.md`

## Step 3: Get Firebase Configuration

1. **Go to Project Settings**
   - Click the gear icon (⚙️) next to "Project Overview"
   - Click "Project settings"

2. **Add Web App**
   - Scroll down to "Your apps" section
   - Click the web icon (</>) to add a web app
   - App nickname: `school-management-system-web`
   - Check "Also set up Firebase Hosting" (optional)
   - Click "Register app"

3. **Copy Configuration**
   - Copy the Firebase configuration object
   - It will look like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "school-management-system.firebaseapp.com",
     projectId: "school-management-system",
     storageBucket: "school-management-system.appspot.com",
     messagingSenderId: "123456789",
     appId: "your-app-id"
   };
   ```

## Step 4: Update Firebase Configuration

1. **Update firebase-config.js**
   - Open `assets/js/firebase-config.js`
   - Replace the placeholder values with your actual Firebase configuration

2. **Example Configuration**
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyC...", // Your actual API key
     authDomain: "school-management-system.firebaseapp.com",
     projectId: "school-management-system",
     storageBucket: "school-management-system.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef123456"
   };
   ```

## Step 5: Install Dependencies

1. **Install Node.js Dependencies**
   ```bash
   npm install
   ```

2. **Install Firebase CLI (Optional)**
   ```bash
   npm install -g firebase-tools
   ```

3. **Login to Firebase CLI**
   ```bash
   firebase login
   ```

## Step 6: Initialize Database

### Create Initial Collections
1. **Users Collection**
   - Create a test user in Firebase Authentication
   - Add a corresponding document in Firestore `users` collection

2. **Sample User Document**
   ```javascript
   // Document ID: Firebase Auth UID
   {
     uid: "firebase-auth-uid",
     email: "admin@school.edu",
     role: "system_admin",
     personalInfo: {
       firstName: "Admin",
       lastName: "User",
       fullName: "Admin User",
       phone: "+256 700 123 456"
     },
     accountStatus: "active",
     createdAt: new Date(),
     updatedAt: new Date()
   }
   ```

### Create Database Indexes
1. **Go to Firestore Database**
   - Click "Indexes" tab
   - Click "Create index"

2. **Add Required Indexes**
   - Follow the indexes from `docs/COMPLETE_FIRESTORE_DATABASE.md`
   - Create composite indexes for optimal query performance

## Step 7: Test Firebase Integration

### Test Authentication
1. **Open your application**
   - Navigate to `index.html`
   - Try logging in with test credentials

2. **Check Firebase Console**
   - Go to Authentication > Users
   - Verify user creation

### Test Firestore
1. **Check Firestore Database**
   - Go to Firestore Database
   - Verify data is being written correctly

2. **Test Security Rules**
   - Try accessing data with different user roles
   - Verify security rules are working

## Step 8: Deploy to Production

### Firebase Hosting (Optional)
1. **Initialize Firebase Hosting**
   ```bash
   firebase init hosting
   ```

2. **Configure Hosting**
   - Public directory: `.` (current directory)
   - Single-page app: No
   - Overwrite index.html: No

3. **Deploy**
   ```bash
   firebase deploy
   ```

### Environment Configuration
1. **Production Firebase Project**
   - Create a separate Firebase project for production
   - Update configuration in `firebase-config.js`

2. **Security Rules**
   - Update security rules for production
   - Test thoroughly before going live

## Step 9: Monitor and Maintain

### Firebase Console Monitoring
1. **Authentication**
   - Monitor user sign-ins
   - Check for suspicious activity

2. **Firestore**
   - Monitor database usage
   - Check for errors in console

3. **Storage**
   - Monitor file uploads
   - Check storage usage

### Performance Optimization
1. **Database Indexes**
   - Monitor query performance
   - Add indexes as needed

2. **Security Rules**
   - Regularly review and update
   - Test with different user roles

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Check Firebase configuration
   - Verify API keys are correct
   - Check browser console for errors

2. **Firestore Permission Errors**
   - Verify security rules
   - Check user authentication status
   - Test with different user roles

3. **Storage Upload Errors**
   - Check storage rules
   - Verify file size limits
   - Check network connectivity

### Debug Mode
1. **Enable Debug Logging**
   ```javascript
   // Add to your JavaScript
   console.log('Firebase initialized:', app);
   ```

2. **Check Network Tab**
   - Open browser developer tools
   - Check Network tab for failed requests

## Security Best Practices

1. **API Keys**
   - Never commit API keys to version control
   - Use environment variables in production
   - Rotate keys regularly

2. **Security Rules**
   - Test rules thoroughly
   - Use principle of least privilege
   - Regular security audits

3. **User Data**
   - Encrypt sensitive data
   - Implement data retention policies
   - Regular backups

## Support and Resources

- **Firebase Documentation**: [https://firebase.google.com/docs](https://firebase.google.com/docs)
- **Firestore Security Rules**: [https://firebase.google.com/docs/firestore/security/get-started](https://firebase.google.com/docs/firestore/security/get-started)
- **Firebase Console**: [https://console.firebase.google.com](https://console.firebase.google.com)

## Next Steps

1. **Set up School Pay Integration**
   - Follow `docs/SCHOOL_PAY_INTEGRATION.md`
   - Test with sample transaction files

2. **Implement User Management**
   - Create user registration forms
   - Implement role-based access

3. **Add Real-time Features**
   - Live notifications
   - Real-time data updates
   - Collaborative features

Your Firebase integration is now ready for development and testing!
