// Firebase Authentication Service
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase-config.js';

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
