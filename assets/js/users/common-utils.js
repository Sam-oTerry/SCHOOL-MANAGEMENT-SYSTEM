// Common Utility Functions
// Shared utilities for all user types across the application

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
        if (window.auth) {
            window.auth.signOut().then(() => {
                window.location.href = '../../index.html';
            }).catch((error) => {
                console.error('Error signing out:', error);
                window.location.href = '../../index.html';
            });
        } else {
            window.location.href = '../../index.html';
        }
    }
}

// Make functions globally available
window.getUserDepartment = getUserDepartment;
window.getUserName = getUserName;
window.getUserStaffId = getUserStaffId;
window.getUserEmail = getUserEmail;
window.getUserPhone = getUserPhone;
window.updateUserDisplay = updateUserDisplay;
window.showSuccess = showSuccess;
window.showError = showError;
window.setupMobileSidebar = setupMobileSidebar;
window.logout = logout;
