// Firebase Authentication Service
// Using Firebase CDN - no imports needed

class AuthService {
  constructor() {
    this.currentUser = null;
    this.userRole = null;
    this.isLoggingOut = false;
    this.setupAuthListener();
  }

  // Setup authentication state listener
  setupAuthListener() {
    firebase.auth().onAuthStateChanged(async (user) => {
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
      console.log('🔄 Loading user role for UID:', uid);
      const userDoc = await firebase.firestore().collection('users').doc(uid).get();
      if (userDoc.exists) {
        this.userRole = userDoc.data().role;
        console.log('✅ User role loaded:', this.userRole);
      } else {
        console.warn('⚠️ User document not found in Firestore');
      }
    } catch (error) {
      console.error('❌ Error loading user role:', error);
    }
  }

  // Sign in with email and password
  async signIn(email, password) {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
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
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      
      // Update user profile
      await user.updateProfile({
        displayName: personalInfo.fullName
      });
      
      // Create user document in Firestore
      await firebase.firestore().collection('users').doc(user.uid).set({
        uid: user.uid,
        email: email,
        role: role,
        personalInfo: personalInfo,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      return { success: true, user: user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Sign out
  async signOut() {
    try {
      this.isLoggingOut = true;
      await firebase.auth().signOut();
      this.currentUser = null;
      this.userRole = null;
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

  // Force reload user role
  async reloadUserRole() {
    if (this.currentUser) {
      await this.loadUserRole(this.currentUser.uid);
    }
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
      this.isLoggingOut = false;
      // Don't automatically redirect - let the login function handle it
    } else {
      console.log('User signed out');
      // Only redirect if we're not in the middle of a logout process
      if (!this.isLoggingOut) {
        // Don't automatically redirect - let the logout function handle it
      }
    }
  }

  // Redirect to appropriate dashboard
  redirectToDashboard() {
    const role = this.getUserRole();
    const dashboardMap = {
      'head_teacher': './users/head-teacher/dashboard.html',
      'system_admin': './users/system-admin/dashboard.html',
      'dos': './users/dos/dashboard.html',
      'bursar': './users/bursar/dashboard.html',
      'class_teacher': './users/class-teacher/dashboard.html',
      'subject_teacher': './users/subject-teacher/dashboard.html',
      'hod': './users/hod/dashboard.html'
    };
    
    const dashboard = dashboardMap[role] || './users/subject-teacher/dashboard.html';
    window.location.href = dashboard;
  }
}

const authService = new AuthService();
