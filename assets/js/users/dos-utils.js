// DOS (Director of Studies) Utility Functions
// This file contains common functions for all DOS pages

// Global variables
let currentUser = null;
let db = null;
let auth = null;

// Initialize Firebase and authentication
function initializeDOSUtils() {
    return new Promise((resolve, reject) => {
        try {
            // Wait for Firebase to be available
            if (typeof firebase !== 'undefined' && firebase.firestore) {
                db = firebase.firestore();
                auth = firebase.auth();
                console.log('✅ DOS Utils: Firebase initialized');
                resolve(true);
            } else {
                console.error('❌ DOS Utils: Firebase not available');
                reject(new Error('Firebase not available'));
            }
        } catch (error) {
            console.error('❌ DOS Utils: Initialization error:', error);
            reject(error);
        }
    });
}

// Wait for authentication
function waitForAuth() {
    return new Promise((resolve, reject) => {
        if (!auth) {
            reject(new Error('Firebase Auth not initialized.'));
            return;
        }
        const unsubscribe = auth.onAuthStateChanged((user) => {
            unsubscribe();
            if (user) {
                window.currentUser = user; // Set global currentUser
                resolve(user);
            } else {
                window.location.href = '../../index.html'; // Redirect to login if not authenticated
                reject(new Error('User not authenticated'));
            }
        });
    });
}

// Load DOS user data and check role
async function loadDOSUserData(db, currentUser) {
    try {
        const userDoc = await db.collection('users').doc(currentUser.uid).get();
        if (!userDoc.exists) {
            return { success: false, error: 'User profile not found. Please contact administrator.' };
        }
        const userData = userDoc.data();

        // Check if user has DOS role
        if (userData.role !== 'dos') {
            // Redirect unauthorized users to login page
            console.log('Access denied: User role is', userData.role, 'but dos required');
            window.location.href = '../../index.html';
            return { success: false, error: 'Access denied. Redirecting to login page...' };
        }

        return {
            success: true,
            userData,
            userName: getUserName(userData),
            staffId: getUserStaffId(userData)
        };
    } catch (error) {
        console.error('Error in loadDOSUserData:', error);
        return { success: false, error: 'Failed to load user data. Please refresh and try again.' };
    }
}

// Utility function to get user name
function getUserName(userData) {
    if (!userData) return 'Unknown User';
    return userData.personalInfo?.fullName || 
           `${userData.personalInfo?.firstName || ''} ${userData.personalInfo?.lastName || ''}`.trim() ||
           userData.fullName ||
           `${userData.firstName || ''} ${userData.lastName || ''}`.trim() ||
           'Unknown User';
}

// Utility function to get user staff ID
function getUserStaffId(userData) {
    if (!userData) return 'N/A';
    return userData.staffId || userData.employmentInfo?.staffId || 'N/A';
}

// Update user display in sidebar and header
function updateUserDisplay(userResult) {
    try {
        // Update the sidebar user info
        const sidebarStaffId = document.getElementById('sidebar-staff-id');
        const currentUserSpan = document.getElementById('current-user');
        
        if (sidebarStaffId) {
            sidebarStaffId.textContent = `Staff ID: ${userResult.staffId || 'DOS-ADMIN'}`;
        }
        
        if (currentUserSpan) {
            currentUserSpan.textContent = userResult.userName || 'Director of Studies';
        }
        
        console.log('DOS user loaded:', {
            name: userResult.userName,
            staffId: userResult.staffId
        });
        
    } catch (error) {
        console.error('Error updating user display:', error);
    }
}

// Load departments from Firestore
async function loadDepartments() {
    try {
        const departmentsSnapshot = await db.collection('departments').orderBy('name').get();
        const departments = [];
        
        departmentsSnapshot.forEach(doc => {
            const deptData = doc.data();
            departments.push({
                id: doc.id,
                ...deptData
            });
        });
        
        console.log(`✅ Loaded ${departments.length} departments from Firestore`);
        return departments;
        
    } catch (error) {
        console.error('Error loading departments:', error);
        return [];
    }
}

// Load subjects from Firestore
async function loadSubjects() {
    try {
        const subjectsSnapshot = await db.collection('subjects').orderBy('name').get();
        const subjects = [];
        
        subjectsSnapshot.forEach(doc => {
            const subjectData = doc.data();
            subjects.push({
                id: doc.id,
                ...subjectData
            });
        });
        
        console.log(`✅ Loaded ${subjects.length} subjects from Firestore`);
        return subjects;
        
    } catch (error) {
        console.error('Error loading subjects:', error);
        return [];
    }
}

// Load classes from Firestore
async function loadClasses() {
    try {
        const classesSnapshot = await db.collection('classes').orderBy('name').get();
        const classes = [];
        
        classesSnapshot.forEach(doc => {
            const classData = doc.data();
            classes.push({
                id: doc.id,
                ...classData
            });
        });
        
        console.log(`✅ Loaded ${classes.length} classes from Firestore`);
        return classes;
        
    } catch (error) {
        console.error('Error loading classes:', error);
        return [];
    }
}

// Load terms from Firestore
async function loadTerms() {
    try {
        const termsSnapshot = await db.collection('terms').orderBy('startDate').get();
        const terms = [];
        
        termsSnapshot.forEach(doc => {
            const termData = doc.data();
            terms.push({
                id: doc.id,
                ...termData
            });
        });
        
        console.log(`✅ Loaded ${terms.length} terms from Firestore`);
        return terms;
        
    } catch (error) {
        console.error('Error loading terms:', error);
        return [];
    }
}

// Load events from Firestore
async function loadEvents() {
    try {
        const eventsSnapshot = await db.collection('events').orderBy('startDate').get();
        const events = [];
        
        eventsSnapshot.forEach(doc => {
            const eventData = doc.data();
            events.push({
                id: doc.id,
                ...eventData
            });
        });
        
        console.log(`✅ Loaded ${events.length} events from Firestore`);
        return events;
        
    } catch (error) {
        console.error('Error loading events:', error);
        return [];
    }
}

// Create new event
async function createEvent(eventData) {
    try {
        const eventDoc = {
            ...eventData,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: currentUser.uid,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        const docRef = await db.collection('events').add(eventDoc);
        console.log('✅ Event created with ID:', docRef.id);
        
        return {
            success: true,
            id: docRef.id,
            data: eventDoc
        };
        
    } catch (error) {
        console.error('Error creating event:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Update event
async function updateEvent(eventId, eventData) {
    try {
        const updateData = {
            ...eventData,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedBy: currentUser.uid
        };
        
        await db.collection('events').doc(eventId).update(updateData);
        console.log('✅ Event updated:', eventId);
        
        return {
            success: true,
            data: updateData
        };
        
    } catch (error) {
        console.error('Error updating event:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Delete event
async function deleteEvent(eventId) {
    try {
        await db.collection('events').doc(eventId).delete();
        console.log('✅ Event deleted:', eventId);
        
        return {
            success: true
        };
        
    } catch (error) {
        console.error('Error deleting event:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Show success message
function showSuccess(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show position-fixed';
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alertDiv);
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Show error message
function showError(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-danger alert-dismissible fade show position-fixed';
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alertDiv);
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Show loading message
function showLoading(message = 'Loading...') {
    hideLoading(); // Remove any existing loading messages
    
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-message';
    loadingDiv.className = 'alert alert-info alert-dismissible fade show position-fixed';
    loadingDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    loadingDiv.innerHTML = `
        <div class="d-flex align-items-center">
            <div class="spinner-border spinner-border-sm me-2" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            ${message}
        </div>
    `;
    document.body.appendChild(loadingDiv);
}

// Hide loading message
function hideLoading() {
    const loadingDiv = document.getElementById('loading-message');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

// Format date for display
function formatDate(dateString) {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// Format date and time for display
function formatDateTime(dateString, timeString) {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    let formatted = date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
    
    if (timeString) {
        formatted += ` at ${timeString}`;
    }
    
    return formatted;
}

// Logout function
function logout() {
    if (!auth) {
        console.error('Firebase Auth not initialized for logout.');
        window.location.href = '../../index.html';
        return;
    }
    if (confirm('Are you sure you want to logout?')) {
        auth.signOut().then(() => {
            console.log('User signed out');
            window.location.href = '../../index.html';
        }).catch((error) => {
            console.error('Logout error:', error);
            window.location.href = '../../index.html';
        });
    }
}

// Export functions for global use
window.DOSUtils = {
    initializeDOSUtils,
    waitForAuth,
    loadDOSUserData,
    getUserName,
    getUserStaffId,
    updateUserDisplay,
    loadDepartments,
    loadSubjects,
    loadClasses,
    loadTerms,
    loadEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    showSuccess,
    showError,
    showLoading,
    hideLoading,
    formatDate,
    formatDateTime,
    logout
};
