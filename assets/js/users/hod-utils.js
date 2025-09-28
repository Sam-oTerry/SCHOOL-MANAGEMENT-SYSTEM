// HOD Utility Functions
// Shared utilities for all Head of Department pages

// HOD Utility Functions
console.log('HOD Utils loaded successfully');

// Note: currentUser is declared globally in system-admin-utils.js

// Get Firebase instances from global scope
// Use window.db and window.auth directly to avoid redeclaration issues

// Wait for Firebase to be fully initialized
function waitForFirebase() {
    return new Promise((resolve) => {
        const checkFirebase = () => {
            if (window.firebase && window.firebase.apps && window.firebase.apps.length > 0) {
                resolve();
            } else {
                setTimeout(checkFirebase, 100);
            }
        };
        checkFirebase();
    });
}

// Wait for authentication
function waitForAuth() {
    return new Promise((resolve, reject) => {
        // Wait for Firebase to be initialized
        const checkFirebase = () => {
            if (!window.auth) {
                setTimeout(checkFirebase, 100); // Check again in 100ms
                return;
            }
            
            const unsubscribe = window.auth.onAuthStateChanged((user) => {
                unsubscribe();
                if (user) {
                    window.currentUser = user; // Set global currentUser
                    resolve(user);
                } else {
                    window.location.href = '../../index.html'; // Redirect to login if not authenticated
                    reject(new Error('User not authenticated'));
                }
            });
        };
        
        checkFirebase();
    });
}

// Load HOD user data
async function loadHODUserData(db, currentUser) {
    try {
        console.log('loadHODUserData called with:', { db: !!db, currentUser: !!currentUser });
        
        // Wait for Firebase to be initialized
        await waitForFirebase();
        
        // Ensure db is available
        const database = window.db;
        console.log('Database reference:', { db: !!db, windowDb: !!window.db, database: !!database });
        
        if (!database) {
            throw new Error('Firebase database not initialized');
        }
        
        const userDoc = await database.collection('users').doc(currentUser.uid).get();
        if (!userDoc.exists) {
            return { success: false, error: 'User profile not found. Please contact administrator.' };
        }
        const userData = userDoc.data();
        console.log('User data loaded:', userData);

        if (userData.role !== 'hod') {
            return { success: false, error: 'Access denied. This page is only for Head of Department users.' };
        }

        const departmentId = getUserDepartment(userData);
        console.log('Department ID extracted:', departmentId);
        
        const departmentName = await getUserDepartmentName(database, userData);
        console.log('Department name resolved:', departmentName);

        return {
            success: true,
            userData,
            userName: getUserName(userData),
            staffId: getUserStaffId(userData),
            departmentId: departmentId,
            departmentName: departmentName
        };
    } catch (error) {
        console.error('Error in loadHODUserData:', error);
        return { success: false, error: 'Failed to load user data. Please refresh and try again.' };
    }
}

// Utility function to get user department (can be used across the application)
function getUserDepartment(userData) {
    if (!userData) return null;
    
    // Priority order for department extraction
    return userData.academicInfo?.department || 
           userData.personalInfo?.department || 
           userData.department || 
           userData.departmentId;
}

// Utility function to get user department name (resolves ID to name)
async function getUserDepartmentName(db, userData) {
    if (!userData) return 'Unknown Department';
    
    const departmentId = getUserDepartment(userData);
    if (!departmentId) return 'Unknown Department';
    
    console.log('Resolving department name for ID:', departmentId);
    
    try {
        // Check if it's already a name (not an ID)
        if (departmentId.length < 20 && !departmentId.match(/^[a-zA-Z0-9]{20,}$/)) {
            console.log('Department ID appears to be a name:', departmentId);
            return departmentId; // It's already a name
        }
        
        // It's an ID, resolve it to a name
        const database = window.db;
        if (!database) {
            throw new Error('Firebase database not initialized');
        }
        
        console.log('Fetching department document for ID:', departmentId);
        
        // Test direct query to the specific document
        try {
            const deptDoc = await database.collection('departments').doc(departmentId).get();
            console.log('Department document query result:', { exists: deptDoc.exists, id: deptDoc.id });
            
            if (deptDoc.exists) {
                const deptData = deptDoc.data();
                console.log('Department document found:', deptData);
                const deptName = deptData.name || deptData.code || departmentId;
                console.log('Returning department name:', deptName);
                return deptName;
            } else {
                console.log('Department document not found for ID:', departmentId);
                // Try to get all departments to see what's available
                const allDepts = await database.collection('departments').get();
                console.log('Available departments:', allDepts.docs.map(doc => ({ id: doc.id, data: doc.data() })));
                return departmentId; // Fallback to ID if department not found
            }
        } catch (queryError) {
            console.error('Error querying department document:', queryError);
            return departmentId;
        }
    } catch (error) {
        console.error('Error resolving department name:', error);
        return departmentId; // Fallback to ID
    }
}

// Utility function to get user name (can be used across the application)
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
    
    return userData.staffId || userData.personalInfo?.staffId || 'N/A';
}

// Utility function to get user email
function getUserEmail(userData) {
    if (!userData) return 'N/A';
    
    return userData.email || userData.personalInfo?.email || 'N/A';
}

// Utility function to get user phone
function getUserPhone(userData) {
    if (!userData) return 'N/A';
    
    return userData.personalInfo?.phone || userData.phone || 'N/A';
}

// Utility function to check if user has HOD role
function isHODUser(userData) {
    if (!userData) return false;
    
    return userData.role === 'hod';
}

// Utility function to load user data with proper error handling
async function loadHODUserData(db, currentUser) {
    try {
        const userDoc = await db.collection('users').doc(currentUser.uid).get();
        if (userDoc.exists) {
            const userData = userDoc.data();
            
            console.log('User data loaded:', userData);
            
            // Check if user has HOD role
            if (!isHODUser(userData)) {
                throw new Error('Access denied. This page is only for Head of Department users.');
            }
            
            // Get department from user data using utility function
            const departmentId = getUserDepartment(userData);
            
            console.log('Department ID found:', departmentId);
            console.log('Academic Info:', userData.academicInfo);
            console.log('Personal Info:', userData.personalInfo);
            
            // Store full user data for use throughout the application
            window.currentUserData = userData;
            
            if (!departmentId) {
                throw new Error('No department assigned. Please contact administrator to assign you to a department.');
            }
            
            // Get department name from Firestore
            console.log('About to call getUserDepartmentName with:', { db: !!db, userData: userData });
            const departmentName = await getUserDepartmentName(db, userData);
            console.log('Department name resolved to:', departmentName);
            
            return {
                success: true,
                userData: userData,
                departmentId: departmentId,
                departmentName: departmentName,
                userName: getUserName(userData),
                staffId: getUserStaffId(userData)
            };
        } else {
            throw new Error('User profile not found. Please contact administrator.');
        }
    } catch (error) {
        console.error('Error loading user data:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Utility function to get department name from Firestore
async function getDepartmentName(db, departmentId) {
    try {
        const database = window.db;
        if (!database) {
            throw new Error('Firebase database not initialized');
        }
        const deptDoc = await database.collection('departments').doc(departmentId).get();
        if (deptDoc.exists) {
            return deptDoc.data().name || departmentId.charAt(0).toUpperCase() + departmentId.slice(1);
        } else {
            return departmentId.charAt(0).toUpperCase() + departmentId.slice(1);
        }
    } catch (error) {
        console.error('Error loading department name:', error);
        return departmentId.charAt(0).toUpperCase() + departmentId.slice(1);
    }
}

// Utility function to show success message
function showSuccess(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-dismissible fade show position-fixed';
    alert.style.top = '20px';
    alert.style.right = '20px';
    alert.style.zIndex = '9999';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// Utility function to show error message
function showError(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-danger alert-dismissible fade show position-fixed';
    alert.style.top = '20px';
    alert.style.right = '20px';
    alert.style.zIndex = '9999';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// Standardized function to update user display across all pages
function updateUserDisplay(userResult) {
    try {
        // Update current user display in header
        const currentUserEl = document.getElementById('current-user');
        if (currentUserEl) {
            currentUserEl.textContent = userResult.userName;
        }
        
        // Update sidebar staff ID - try multiple selectors for compatibility
        let staffIdEl = document.getElementById('sidebar-staff-id');
        if (!staffIdEl) {
            staffIdEl = document.querySelector('.sidebar small');
        }
        if (!staffIdEl) {
            staffIdEl = document.querySelector('.sidebar .text-muted');
        }
        if (!staffIdEl) {
            // Look for any small element in sidebar that might contain staff ID
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                staffIdEl = sidebar.querySelector('small');
            }
        }
        
        if (staffIdEl) {
            // Check if it already has "Staff ID:" prefix
            if (staffIdEl.textContent.includes('Staff ID:')) {
                staffIdEl.textContent = `Staff ID: ${userResult.staffId}`;
            } else {
                staffIdEl.textContent = userResult.staffId;
            }
        }
        
        console.log('User display updated:', {
            name: userResult.userName,
            staffId: userResult.staffId,
            department: userResult.departmentName || userResult.departmentId
        });
    } catch (error) {
        console.error('Error updating user display:', error);
    }
}

// Utility function to setup mobile sidebar
function setupMobileSidebar() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    if (mobileMenuToggle && sidebar && sidebarOverlay) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
            sidebarOverlay.classList.toggle('show');
        });
        
        sidebarOverlay.addEventListener('click', function() {
            sidebar.classList.remove('show');
            sidebarOverlay.classList.remove('show');
        });
        
        const navLinks = document.querySelectorAll('.sidebar .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('show');
                    sidebarOverlay.classList.remove('show');
                }
            });
        });
        
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                sidebar.classList.remove('show');
                sidebarOverlay.classList.remove('show');
            }
        });
    }
}

// Utility function for logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        const authInstance = window.auth;
        if (authInstance) {
            authInstance.signOut().then(() => {
                window.location.href = '../../index.html';
            }).catch((error) => {
                console.error('Error signing out:', error);
                window.location.href = '../../index.html';
            });
        } else {
            console.error('Firebase Auth not available');
            window.location.href = '../../index.html';
        }
    }
}

// Make functions globally available
console.log('Exporting loadHODUserData to global scope');
window.waitForAuth = waitForAuth;
window.waitForFirebase = waitForFirebase;
window.loadHODUserData = loadHODUserData;
window.getUserDepartment = getUserDepartment;
window.getUserDepartmentName = getUserDepartmentName;
window.getUserName = getUserName;
window.getUserStaffId = getUserStaffId;
window.getUserEmail = getUserEmail;
window.getUserPhone = getUserPhone;
window.isHODUser = isHODUser;
window.getDepartmentName = getDepartmentName;
window.showSuccess = showSuccess;
window.showError = showError;
window.setupMobileSidebar = setupMobileSidebar;
window.logout = logout;
window.updateUserDisplay = updateUserDisplay;
