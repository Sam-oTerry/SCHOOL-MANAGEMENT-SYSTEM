# Database Setup Guide

This guide will help you set up the complete Firestore database for your School Management System.

## 🚀 Quick Start

### Option 1: Using the Web Interface (Recommended)

1. **Open the Database Setup Page:**
   ```bash
   # Navigate to your project directory
   cd "D:\STARLET\SCHOOL MANAGEMENT SYSTEM"
   
   # Start a local server
   npm start
   ```

2. **Access the Setup Page:**
   - Open your browser and go to: `http://localhost:3000/database-setup.html`
   - Click "Initialize Database" to set up all collections

### Option 2: Using Node.js Script

1. **Run the Database Setup Script:**
   ```bash
   # Navigate to your project directory
   cd "D:\STARLET\SCHOOL MANAGEMENT SYSTEM"
   
   # Run the setup script
   node run-database-setup.js
   ```

## 📊 What Gets Created

The database setup will create the following collections with sample data:

### 1. **Academic Levels** (`academic_levels`)
- O-Level configuration (S.1 - S.4)
- A-Level configuration (S.5 - S.6)
- Subject requirements for each level

### 2. **Subjects** (`subjects`)
- Mathematics, English, Biology
- Assessment criteria and grading
- Teacher assignments

### 3. **Users** (`users`)
- System Administrator
- Head Teacher
- Role-based permissions
- Authentication data

### 4. **Students** (`students`)
- Sample student records
- Academic history
- Financial information
- Parent/Guardian details
- School Pay integration

### 5. **Classes** (`classes`)
- Class configurations
- Student assignments
- Performance tracking

### 6. **Grades** (`grades`)
- Sample grade records
- Assessment details
- Performance metrics

### 7. **Financial Transactions** (`financial_transactions`)
- Payment records
- School Pay integration data
- Transaction history

### 8. **School Pay Integrations** (`school_pay_integrations`)
- Import history
- Processing results
- Error handling

### 9. **Report Cards** (`report_cards`)
- Academic performance reports
- Subject-wise grades
- Attendance records
- Teacher comments

### 10. **Announcements** (`announcements`)
- School announcements
- Target audience settings
- Priority levels

### 11. **Staff Usernames** (`staff_usernames`)
- Username management
- Access control
- Login tracking

### 12. **Student Subject Selections** (`student_subject_selections`)
- A-Level subject choices
- Approval workflow
- Academic planning

### 13. **Attendance** (`attendance`)
- Daily attendance records
- Status tracking
- Teacher assignments

## 🔧 Configuration

### Firebase Configuration

Make sure your Firebase configuration is set up correctly in `assets/js/firebase-config.js`:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id-here"
};
```

### Firestore Security Rules

The database setup includes comprehensive security rules. Make sure to deploy them to your Firebase project:

```bash
# Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init firestore

# Deploy security rules
firebase deploy --only firestore:rules
```

## 📋 Sample Data Included

### Users
- **System Administrator**: Full access to all features
- **Head Teacher**: Academic and administrative access
- **Class Teachers**: Student management access
- **Subject Teachers**: Grade entry access
- **Bursar**: Financial management access

### Students
- **Jane Smith**: S.4 Science A student
- Complete academic and financial records
- School Pay integration setup
- Parent/Guardian information

### Academic Data
- **Subjects**: Mathematics, English, Biology
- **Classes**: S.4 Science A with 35 students
- **Grades**: Sample grade entries
- **Attendance**: Daily attendance records

### Financial Data
- **Transactions**: Sample payment records
- **School Pay**: Integration with Uganda payment system
- **Fee Structure**: Tuition, examination, library fees

## 🚨 Important Notes

### Before Running Setup

1. **Backup Existing Data**: If you have existing data, back it up first
2. **Firebase Project**: Ensure your Firebase project is properly configured
3. **Authentication**: Make sure Firebase Authentication is enabled
4. **Firestore**: Ensure Firestore is enabled in your Firebase project

### After Setup

1. **Verify Data**: Check that all collections were created successfully
2. **Test Authentication**: Try logging in with the created users
3. **Check Permissions**: Verify that role-based access is working
4. **School Pay**: Configure School Pay Uganda integration if needed

## 🔍 Troubleshooting

### Common Issues

1. **Firebase Configuration Error**
   - Check your Firebase config in `firebase-config.js`
   - Ensure all required fields are filled

2. **Permission Denied**
   - Check Firestore security rules
   - Ensure your Firebase project has the correct permissions

3. **Network Errors**
   - Check your internet connection
   - Verify Firebase project is accessible

4. **Batch Size Errors**
   - Firestore has a limit of 500 operations per batch
   - The setup script handles this automatically

### Getting Help

If you encounter issues:

1. **Check Console Logs**: Look for error messages in the browser console
2. **Firebase Console**: Check your Firebase project console for errors
3. **Network Tab**: Check for failed network requests
4. **Firestore Rules**: Ensure security rules are properly deployed

## 📚 Next Steps

After successful database setup:

1. **Configure School Pay**: Set up School Pay Uganda integration
2. **Add Real Data**: Replace sample data with real school data
3. **User Training**: Train staff on using the system
4. **Backup Strategy**: Implement regular database backups
5. **Monitoring**: Set up monitoring and alerts

## 🎯 Production Deployment

For production deployment:

1. **Environment Variables**: Use environment variables for sensitive data
2. **Security Rules**: Review and customize security rules
3. **Backup Strategy**: Implement automated backups
4. **Monitoring**: Set up Firebase monitoring and alerts
5. **Performance**: Optimize queries and indexes

## 📞 Support

For technical support:

- **Documentation**: Check the complete database design document
- **Firebase Docs**: Refer to Firebase documentation
- **Community**: Join Firebase community forums
- **Issues**: Report issues in the project repository

---

**Happy School Management! 🎓**
