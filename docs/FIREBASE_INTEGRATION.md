# Firebase Integration for School Management System

## Overview
This document outlines the complete Firebase integration for the School Management System, including authentication, Firestore database, and School Pay Uganda integration.

## Firebase Project Setup

### 1. Firebase Project Configuration
```javascript
// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "school-management-system.firebaseapp.com",
  projectId: "school-management-system",
  storageBucket: "school-management-system.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

export default app;
```

### 2. Firebase Authentication Setup
```javascript
// auth-service.js
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase-config';

class AuthService {
  constructor() {
    this.currentUser = null;
    this.userRole = null;
    this.setupAuthListener();
  }

  // Setup authentication state listener
  setupAuthListener() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.currentUser = user;
        await this.loadUserRole(user.uid);
        this.onAuthStateChange(user);
      } else {
        this.currentUser = null;
        this.userRole = null;
        this.onAuthStateChange(null);
      }
    });
  }

  // Load user role from Firestore
  async loadUserRole(uid) {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        this.userRole = userDoc.data().role;
      }
    } catch (error) {
      console.error('Error loading user role:', error);
    }
  }

  // Sign in with email and password
  async signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Create new user account
  async createUser(userData) {
    try {
      const { email, password, role, personalInfo } = userData;
      
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update user profile
      await updateProfile(user, {
        displayName: personalInfo.fullName
      });
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: email,
        role: role,
        personalInfo: personalInfo,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      return { success: true, user: user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Sign out
  async signOut() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Get user role
  getUserRole() {
    return this.userRole;
  }

  // Check if user has specific role
  hasRole(role) {
    return this.userRole === role;
  }

  // Check if user has any of the specified roles
  hasAnyRole(roles) {
    return roles.includes(this.userRole);
  }

  // Callback for authentication state changes
  onAuthStateChange(user) {
    // Override this method in your application
    if (user) {
      console.log('User signed in:', user.email);
      // Redirect to appropriate dashboard based on role
      this.redirectToDashboard();
    } else {
      console.log('User signed out');
      // Redirect to login page
      window.location.href = '/index.html';
    }
  }

  // Redirect to appropriate dashboard
  redirectToDashboard() {
    const role = this.getUserRole();
    const dashboardMap = {
      'head_teacher': '/users/head-teacher/dashboard.html',
      'system_admin': '/users/system-admin/dashboard.html',
      'dos': '/users/dos/dashboard.html',
      'bursar': '/users/bursar/dashboard.html',
      'class_teacher': '/users/class-teacher/dashboard.html',
      'subject_teacher': '/users/subject-teacher/dashboard.html',
      'hod': '/users/hod/dashboard.html'
    };
    
    const dashboard = dashboardMap[role];
    if (dashboard) {
      window.location.href = dashboard;
    }
  }
}

export const authService = new AuthService();
```

### 3. Firestore Database Service
```javascript
// database-service.js
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  addDoc,
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot,
  writeBatch
} from 'firebase/firestore';
import { db } from './firebase-config';

class DatabaseService {
  constructor() {
    this.db = db;
  }

  // Generic CRUD operations
  async create(collectionName, data, docId = null) {
    try {
      if (docId) {
        await setDoc(doc(this.db, collectionName, docId), {
          ...data,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        return { success: true, id: docId };
      } else {
        const docRef = await addDoc(collection(this.db, collectionName), {
          ...data,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        return { success: true, id: docRef.id };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async read(collectionName, docId) {
    try {
      const docRef = doc(this.db, collectionName, docId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { success: true, data: docSnap.data() };
      } else {
        return { success: false, error: 'Document not found' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async update(collectionName, docId, data) {
    try {
      const docRef = doc(this.db, collectionName, docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date()
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async delete(collectionName, docId) {
    try {
      await deleteDoc(doc(this.db, collectionName, docId));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Query operations
  async query(collectionName, constraints = []) {
    try {
      const q = query(collection(this.db, collectionName), ...constraints);
      const querySnapshot = await getDocs(q);
      const results = [];
      
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      
      return { success: true, data: results };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Real-time listeners
  subscribeToCollection(collectionName, callback, constraints = []) {
    const q = query(collection(this.db, collectionName), ...constraints);
    return onSnapshot(q, (querySnapshot) => {
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      callback(results);
    });
  }

  // Batch operations
  async batchWrite(operations) {
    try {
      const batch = writeBatch(this.db);
      
      operations.forEach(operation => {
        const { type, collection, docId, data } = operation;
        const docRef = doc(this.db, collection, docId);
        
        switch (type) {
          case 'set':
            batch.set(docRef, data);
            break;
          case 'update':
            batch.update(docRef, data);
            break;
          case 'delete':
            batch.delete(docRef);
            break;
        }
      });
      
      await batch.commit();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export const dbService = new DatabaseService();
```

### 4. School Pay Integration Service
```javascript
// schoolpay-service.js
import { dbService } from './database-service';
import { authService } from './auth-service';

class SchoolPayService {
  constructor() {
    this.db = dbService;
  }

  // Sync payment codes from School Pay Uganda
  async syncPaymentCodes(schoolPayData) {
    try {
      const results = {
        totalCodes: schoolPayData.length,
        successfulMappings: 0,
        failedMappings: 0,
        errors: []
      };

      for (const codeData of schoolPayData) {
        try {
          // Find student by School Pay ID or name
          const student = await this.findStudentBySchoolPayId(codeData.schoolPayStudentId) ||
                         await this.findStudentByName(codeData.studentName);

          if (student) {
            // Update student with School Pay payment code
            await this.updateStudentPaymentCode(student.id, codeData);
            results.successfulMappings++;
          } else {
            results.failedMappings++;
            results.errors.push({
              paymentCode: codeData.paymentCode,
              studentName: codeData.studentName,
              error: 'Student not found in our system'
            });
          }
        } catch (error) {
          results.failedMappings++;
          results.errors.push({
            paymentCode: codeData.paymentCode,
            studentName: codeData.studentName,
            error: error.message
          });
        }
      }

      return results;
    } catch (error) {
      throw new Error(`Failed to sync payment codes: ${error.message}`);
    }
  }

  // Find student by School Pay ID
  async findStudentBySchoolPayId(schoolPayId) {
    const result = await this.db.query('students', [
      where('schoolPayId', '==', schoolPayId)
    ]);
    
    return result.success && result.data.length > 0 ? result.data[0] : null;
  }

  // Find student by name
  async findStudentByName(studentName) {
    const result = await this.db.query('students', [
      where('personalInfo.fullName', '==', studentName)
    ]);
    
    return result.success && result.data.length > 0 ? result.data[0] : null;
  }

  // Update student with School Pay payment code
  async updateStudentPaymentCode(studentId, schoolPayData) {
    const updateData = {
      paymentCode: schoolPayData.paymentCode,
      'schoolPayIntegration.paymentCode': schoolPayData.paymentCode,
      'schoolPayIntegration.paymentInstructions': {
        code: schoolPayData.paymentCode,
        instructions: `Use payment code ${schoolPayData.paymentCode} when making payments via School Pay Uganda`,
        qrCodeUrl: schoolPayData.qrCodeUrl || null
      },
      'schoolPayIntegration.lastSyncDate': new Date(),
      'schoolPayIntegration.syncStatus': 'successful'
    };

    return await this.db.update('students', studentId, updateData);
  }

  // Process School Pay transaction file
  async processTransactionFile(file) {
    try {
      // Parse Excel file (using SheetJS or similar library)
      const workbook = XLSX.readFile(file);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(worksheet);

      const integrationRecord = {
        fileName: file.name,
        importDate: new Date(),
        totalRecords: data.length,
        successfulImports: 0,
        failedImports: 0,
        status: 'processing',
        importedBy: authService.getCurrentUser().uid,
        errors: []
      };

      // Process each transaction
      for (const row of data) {
        try {
          await this.processTransaction(row, integrationRecord);
          integrationRecord.successfulImports++;
        } catch (error) {
          integrationRecord.failedImports++;
          integrationRecord.errors.push({
            row: data.indexOf(row) + 1,
            studentId: row.studentId,
            error: error.message,
            data: row
          });
        }
      }

      // Save integration record
      await this.db.create('school_pay_integrations', integrationRecord);

      return integrationRecord;
    } catch (error) {
      throw new Error(`Failed to process transaction file: ${error.message}`);
    }
  }

  // Process individual transaction
  async processTransaction(row, integrationRecord) {
    // Find student by payment code
    let student = null;
    
    if (row.paymentCode) {
      student = await this.findStudentByPaymentCode(row.paymentCode);
      
      if (!student) {
        throw new Error(`Payment code ${row.paymentCode} not found. Please sync payment codes first.`);
      }
    } else {
      // Fallback: find by School Pay student ID or name
      student = await this.findStudentBySchoolPayId(row.studentId) ||
                await this.findStudentByName(row.studentName);
      
      if (!student) {
        throw new Error(`Student not found: ${row.studentName} (ID: ${row.studentId})`);
      }
    }

    // Create transaction record
    const transaction = {
      schoolPayTransactionId: row.transactionId,
      studentId: student.id,
      type: 'income',
      category: this.mapFeeType(row.feeType),
      amount: parseFloat(row.amount),
      currency: 'UGX',
      paymentMethod: this.mapPaymentMethod(row.paymentMethod),
      description: row.description,
      reference: row.reference,
      schoolPayReference: row.schoolPayReference,
      status: this.mapPaymentStatus(row.status),
      processedBy: authService.getCurrentUser().uid,
      processedAt: new Date(),
      paidDate: new Date(row.paymentDate),
      schoolPayData: {
        originalTransactionId: row.transactionId,
        schoolPayStatus: row.status,
        schoolPayMethod: row.paymentMethod,
        schoolPayReference: row.schoolPayReference,
        parentPhone: row.parentPhone,
        parentName: row.parentName,
        paymentCode: row.paymentCode || student.paymentCode
      }
    };

    // Save transaction
    await this.db.create('financial_transactions', transaction);

    // Update student financial info
    await this.updateStudentFinancialInfo(student.id, transaction);
  }

  // Find student by payment code
  async findStudentByPaymentCode(paymentCode) {
    const result = await this.db.query('students', [
      where('paymentCode', '==', paymentCode)
    ]);
    
    return result.success && result.data.length > 0 ? result.data[0] : null;
  }

  // Update student financial information
  async updateStudentFinancialInfo(studentId, transaction) {
    const student = await this.db.read('students', studentId);
    
    if (student.success) {
      const studentData = student.data;
      const newTotalPaid = (studentData.financialInfo?.totalFeesPaid || 0) + transaction.amount;
      const newBalance = (studentData.financialInfo?.totalFeesOwed || 0) - newTotalPaid;
      
      await this.db.update('students', studentId, {
        'financialInfo.totalFeesPaid': newTotalPaid,
        'financialInfo.currentBalance': newBalance,
        'financialInfo.lastPaymentDate': transaction.paidDate,
        'financialInfo.paymentStatus': newBalance <= 0 ? 'paid' : 'partial',
        'schoolPayIntegration.lastSyncDate': new Date(),
        'schoolPayIntegration.syncStatus': 'successful'
      });
    }
  }

  // Mapping functions
  mapFeeType(schoolPayFeeType) {
    const mapping = {
      'Tuition': 'tuition_fee',
      'Examination': 'examination_fee',
      'Library': 'library_fee',
      'Sports': 'sports_fee',
      'Transport': 'transport_fee',
      'Meals': 'meals_fee',
      'Other': 'other_fee'
    };
    return mapping[schoolPayFeeType] || 'other_fee';
  }

  mapPaymentMethod(schoolPayMethod) {
    const mapping = {
      'Mobile Money': 'mobile_money',
      'Bank Transfer': 'bank_transfer',
      'Cash': 'cash',
      'School Pay': 'school_pay',
      'Card': 'card'
    };
    return mapping[schoolPayMethod] || 'cash';
  }

  mapPaymentStatus(schoolPayStatus) {
    const mapping = {
      'Completed': 'completed',
      'Pending': 'pending',
      'Failed': 'failed',
      'Cancelled': 'cancelled'
    };
    return mapping[schoolPayStatus] || 'pending';
  }
}

export const schoolPayService = new SchoolPayService();
```

### 5. Firebase Security Rules
```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Students - role-based access
    match /students/{studentId} {
      allow read: if request.auth != null && 
        (hasRole(['head_teacher', 'system_admin', 'dos', 'class_teacher', 'bursar']) ||
         resource.data.studentId == request.auth.uid);
      allow write: if request.auth != null && 
        hasRole(['head_teacher', 'system_admin', 'dos', 'bursar']);
    }
    
    // Grades - teachers can write, students can read their own
    match /grades/{gradeId} {
      allow read: if request.auth != null && 
        (resource.data.studentId == request.auth.uid || 
         hasRole(['head_teacher', 'system_admin', 'dos', 'class_teacher', 'subject_teacher', 'hod']));
      allow write: if request.auth != null && 
        hasRole(['subject_teacher', 'class_teacher', 'dos', 'head_teacher', 'system_admin']);
    }
    
    // Financial data - only bursar and above
    match /financial_transactions/{transactionId} {
      allow read, write: if request.auth != null && 
        hasRole(['bursar', 'head_teacher', 'system_admin']);
    }
    
    // School Pay integrations - only bursar and above
    match /school_pay_integrations/{integrationId} {
      allow read, write: if request.auth != null && 
        hasRole(['bursar', 'head_teacher', 'system_admin']);
    }
    
    // Announcements - role-based access
    match /announcements/{announcementId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        hasRole(['head_teacher', 'system_admin', 'dos']);
    }
    
    // Helper function to check user roles
    function hasRole(roles) {
      return request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in roles;
    }
  }
}
```

### 6. Firebase Storage Rules
```javascript
// storage.rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // User profile images
    match /users/{userId}/profile/{fileName} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Student documents
    match /students/{studentId}/documents/{fileName} {
      allow read, write: if request.auth != null && 
        hasRole(['head_teacher', 'system_admin', 'dos', 'bursar']);
    }
    
    // School Pay files
    match /schoolpay/{fileName} {
      allow read, write: if request.auth != null && 
        hasRole(['bursar', 'head_teacher', 'system_admin']);
    }
    
    // Helper function to check user roles
    function hasRole(roles) {
      return request.auth != null && 
        firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.role in roles;
    }
  }
}
```

### 7. Firebase Functions (Optional)
```javascript
// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Function to send payment notifications
exports.sendPaymentNotification = functions.firestore
  .document('financial_transactions/{transactionId}')
  .onCreate(async (snap, context) => {
    const transaction = snap.data();
    
    // Get student data
    const studentDoc = await admin.firestore()
      .collection('students')
      .doc(transaction.studentId)
      .get();
    
    if (studentDoc.exists) {
      const student = studentDoc.data();
      
      // Send notification to parent
      // Implementation depends on your notification service
      console.log(`Payment notification sent for ${student.personalInfo.fullName}`);
    }
  });

// Function to generate payment codes
exports.generatePaymentCodes = functions.https.onCall(async (data, context) => {
  // Verify user has permission
  if (!context.auth || !context.auth.token.role || 
      !['bursar', 'head_teacher', 'system_admin'].includes(context.auth.token.role)) {
    throw new functions.https.HttpsError('permission-denied', 'Insufficient permissions');
  }
  
  // Generate payment codes logic
  // This would integrate with School Pay Uganda API
  return { success: true, message: 'Payment codes generated successfully' };
});
```

## Implementation Steps

### 1. Firebase Project Setup
1. Create Firebase project at https://console.firebase.google.com
2. Enable Authentication, Firestore, Storage, and Functions
3. Configure authentication providers (Email/Password)
4. Set up Firestore database with security rules
5. Configure Firebase Storage with security rules

### 2. Frontend Integration
1. Install Firebase SDK: `npm install firebase`
2. Add Firebase configuration to your project
3. Implement authentication service
4. Integrate Firestore database service
5. Add School Pay integration service

### 3. Database Initialization
1. Create initial collections and documents
2. Set up indexes for optimal query performance
3. Configure security rules
4. Test database operations

### 4. Testing and Deployment
1. Test authentication flows
2. Test database operations
3. Test School Pay integration
4. Deploy to production

This Firebase integration provides a complete backend solution for your School Management System with real-time capabilities, secure authentication, and seamless School Pay Uganda integration.
