// System Admin Utility Functions
// Shared utilities for all System Administrator pages

// Utility function to get user department
function getUserDepartment(userData) {
    if (!userData) return null;
    return userData.academicInfo?.department || 
           userData.personalInfo?.department || 
           userData.department || 
           userData.departmentId;
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

// Centralized System Admin user data loading
async function loadSystemAdminUserData(db, currentUser) {
    try {
        // Use window.currentUser if currentUser parameter is null
        const user = currentUser || window.currentUser;
        if (!user) {
            return { success: false, error: 'No authenticated user found. Please login again.' };
        }

        const userDoc = await db.collection('users').doc(user.uid).get();
        if (!userDoc.exists) {
            return { success: false, error: 'User profile not found. Please contact administrator.' };
        }
        const userData = userDoc.data();

        if (userData.role !== 'system_admin') {
            // Redirect unauthorized users to login page
            console.log('Access denied: User role is', userData.role, 'but system_admin required');
            window.location.href = '../../index.html';
            return { success: false, error: 'Access denied. Redirecting to login page...' };
        }

        const departmentId = getUserDepartment(userData);
        let departmentName = departmentId ? departmentId.charAt(0).toUpperCase() + departmentId.slice(1) : 'Administration';
        
        // Try to get department document for proper name
        if (departmentId) {
            const deptDoc = await db.collection('departments').doc(departmentId).get();
            if (deptDoc.exists) {
                departmentName = deptDoc.data().name || departmentName;
            }
        }

        return {
            success: true,
            userData,
            departmentId,
            departmentName,
            userName: getUserName(userData),
            staffId: getUserStaffId(userData)
        };
    } catch (error) {
        console.error('Error in loadSystemAdminUserData:', error);
        return { success: false, error: 'Failed to load user data. Please refresh and try again.' };
    }
}

// Centralized mobile sidebar functionality
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

// Centralized logout functionality
function logout() {
    if (!window.auth) {
        console.error('Firebase Auth not initialized for logout.');
        window.location.href = '../../index.html';
        return;
    }
    if (confirm('Are you sure you want to logout?')) {
        window.auth.signOut().then(() => {
            console.log('User signed out');
            window.location.href = '../../index.html';
        }).catch((error) => {
            console.error('Logout error:', error);
            window.location.href = '../../index.html';
        });
    }
}

// Centralized authentication waiting logic
function waitForAuth() {
    return new Promise((resolve, reject) => {
        if (!window.auth) {
            reject(new Error('Firebase Auth not initialized.'));
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
    });
}

// Centralized success notification
function showSuccess(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show position-fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.insertBefore(alertDiv, document.body.firstChild);
    setTimeout(() => alertDiv.remove(), 5000);
}

// Centralized error notification
function showError(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-danger alert-dismissible fade show position-fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.insertBefore(alertDiv, document.body.firstChild);
    setTimeout(() => alertDiv.remove(), 5000);
}

// Make Firebase instances globally available (from firebase-init-compat.js)
const db = window.db;
const auth = window.auth;
let currentUser = null; // Global currentUser variable

// Make functions globally available
window.getUserDepartment = getUserDepartment;
window.getUserName = getUserName;
window.getUserStaffId = getUserStaffId;
window.loadSystemAdminUserData = loadSystemAdminUserData;
window.setupMobileSidebar = setupMobileSidebar;
window.logout = logout;
window.waitForAuth = waitForAuth;
window.showSuccess = showSuccess;
window.showError = showError;
window.updateUserDisplay = updateUserDisplay;
