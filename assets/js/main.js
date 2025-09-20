// Main JavaScript file for School Management System
// This file contains the core functionality for the application

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
    
    // Login form submission
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });
    
    // Logout functionality
    document.getElementById('logout-btn').addEventListener('click', function() {
        handleLogout();
    });
    
    // Initialize navigation
    initializeNavigation();
});

function initializeApp() {
    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    const currentRole = localStorage.getItem('currentRole');
    
    if (currentUser && currentRole) {
        showSystemInterface(currentUser, currentRole);
    } else {
        showLoginInterface();
    }
}

function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    // Simple authentication (in real app, this would be server-side)
    if (username === 'admin' && password === 'password') {
        // Store user session
        localStorage.setItem('currentUser', username);
        localStorage.setItem('currentRole', role);
        
        // Show system interface
        showSystemInterface(username, role);
    } else {
        alert('Invalid credentials. Please use admin/password for demo.');
    }
}

function handleLogout() {
    // Clear user session
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentRole');
    
    // Show login interface
    showLoginInterface();
}

function showLoginInterface() {
    document.getElementById('login-interface').style.display = 'flex';
    document.getElementById('system-interface').style.display = 'none';
}

function showSystemInterface(username, role) {
    // Hide login, show system interface
    document.getElementById('login-interface').style.display = 'none';
    document.getElementById('system-interface').style.display = 'block';
    
    // Set current user and role
    document.getElementById('current-user').textContent = username;
    document.getElementById('current-role').textContent = getRoleDisplayName(role);
    
    // Show the appropriate interface based on role
    showRoleInterface(role);
    
    // Update interface title
    document.getElementById('interface-title').textContent = getRoleDisplayName(role) + " Dashboard";
    
    // Generate appropriate navigation
    generateNavigation(role);
    
    // Load role-specific CSS
    loadRoleCSS(role);
}

function showRoleInterface(role) {
    // Hide all interfaces
    document.querySelectorAll('.interface-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the appropriate interface
    const targetInterface = document.getElementById(`${role}-interface`);
    if (targetInterface) {
        targetInterface.classList.add('active');
    }
}

function getRoleDisplayName(role) {
    const roleNames = {
        'head-teacher': 'Head Teacher',
        'system-admin': 'System Administrator',
        'dos': 'Director of Studies',
        'bursar': 'Bursar',
        'class-teacher': 'Class Teacher',
        'subject-teacher': 'Subject Teacher',
        'hod': 'Head of Department'
    };
    
    return roleNames[role] || role;
}

function generateNavigation(role) {
    const nav = document.getElementById('role-nav');
    nav.innerHTML = '';
    
    const commonLinks = [
        { icon: 'fas fa-tachometer-alt', text: 'Dashboard', section: 'dashboard' },
        { icon: 'fas fa-user', text: 'Profile', section: 'profile' },
        { icon: 'fas fa-cog', text: 'Settings', section: 'settings' }
    ];
    
    const roleSpecificLinks = {
        'head-teacher': [
            { icon: 'fas fa-chart-bar', text: 'Reports', section: 'reports' },
            { icon: 'fas fa-check-circle', text: 'Approvals', section: 'approvals' },
            { icon: 'fas fa-download', text: 'EMIS Export', section: 'emis' }
        ],
        'system-admin': [
            { icon: 'fas fa-users-cog', text: 'User Management', section: 'users' },
            { icon: 'fas fa-sliders-h', text: 'System Settings', section: 'system-settings' },
            { icon: 'fas fa-database', text: 'Database', section: 'database' }
        ],
        'dos': [
            { icon: 'fas fa-book', text: 'Academic Programs', section: 'programs' },
            { icon: 'fas fa-check-double', text: 'Verify Grades', section: 'verify-grades' },
            { icon: 'fas fa-chart-line', text: 'Performance', section: 'performance' }
        ],
        'bursar': [
            { icon: 'fas fa-money-bill', text: 'Fee Collection', section: 'fees' },
            { icon: 'fas fa-receipt', text: 'Receipts', section: 'receipts' },
            { icon: 'fas fa-file-invoice-dollar', text: 'Financial Reports', section: 'finance-reports' }
        ],
        'class-teacher': [
            { icon: 'fas fa-user-graduate', text: 'My Class', section: 'my-class' },
            { icon: 'fas fa-clipboard-list', text: 'Attendance', section: 'attendance' },
            { icon: 'fas fa-comment', text: 'Report Comments', section: 'comments' }
        ],
        'subject-teacher': [
            { icon: 'fas fa-book-open', text: 'My Subjects', section: 'my-subjects' },
            { icon: 'fas fa-pen', text: 'Enter Grades', section: 'enter-grades' },
            { icon: 'fas fa-chart-pie', text: 'Subject Reports', section: 'subject-reports' }
        ],
        'hod': [
            { icon: 'fas fa-chalkboard-teacher', text: 'Assign Teachers', section: 'assign-teachers' },
            { icon: 'fas fa-check-square', text: 'Approve Grades', section: 'approve-grades' },
            { icon: 'fas fa-chart-bar', text: 'Dept. Performance', section: 'dept-performance' }
        ]
    };
    
    // Add common links
    commonLinks.forEach(link => {
        const li = document.createElement('li');
        li.className = 'nav-item';
        li.innerHTML = `
            <a class="nav-link" href="#" data-section="${link.section}">
                <i class="${link.icon}"></i> ${link.text}
            </a>
        `;
        nav.appendChild(li);
    });
    
    // Add role-specific links
    if (roleSpecificLinks[role]) {
        roleSpecificLinks[role].forEach(link => {
            const li = document.createElement('li');
            li.className = 'nav-item';
            li.innerHTML = `
                <a class="nav-link" href="#" data-section="${link.section}">
                    <i class="${link.icon}"></i> ${link.text}
                </a>
            `;
            nav.appendChild(li);
        });
    }
    
    // Add click handlers to navigation links
    nav.addEventListener('click', function(e) {
        e.preventDefault();
        const section = e.target.closest('a').dataset.section;
        if (section) {
            handleNavigation(section);
        }
    });
}

function handleNavigation(section) {
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    event.target.closest('a').classList.add('active');
    
    // Handle section-specific actions
    switch(section) {
        case 'dashboard':
            // Already showing dashboard
            break;
        case 'profile':
            showProfileModal();
            break;
        case 'settings':
            showSettingsModal();
            break;
        default:
            // Handle role-specific sections
            handleRoleSpecificNavigation(section);
    }
}

function handleRoleSpecificNavigation(section) {
    const currentRole = localStorage.getItem('currentRole');
    
    // This would be expanded based on specific role requirements
    console.log(`Navigating to ${section} for role ${currentRole}`);
    
    // Show appropriate interface or modal
    // Implementation would depend on specific requirements
}

function loadRoleCSS(role) {
    // Remove existing role-specific CSS
    const existingRoleCSS = document.getElementById('role-specific-css');
    if (existingRoleCSS) {
        existingRoleCSS.remove();
    }
    
    // Add role-specific CSS
    const link = document.createElement('link');
    link.id = 'role-specific-css';
    link.rel = 'stylesheet';
    link.href = `assets/css/users/${role}.css`;
    document.head.appendChild(link);
}

function showProfileModal() {
    // Create and show profile modal
    const modal = createModal('Profile', `
        <div class="row">
            <div class="col-md-4 text-center">
                <img src="assets/images/logo.png" alt="Profile" class="rounded-circle mb-3" style="width: 100px; height: 100px;">
                <h5>${localStorage.getItem('currentUser')}</h5>
                <span class="badge bg-primary">${getRoleDisplayName(localStorage.getItem('currentRole'))}</span>
            </div>
            <div class="col-md-8">
                <form>
                    <div class="mb-3">
                        <label class="form-label">Full Name</label>
                        <input type="text" class="form-control" value="${localStorage.getItem('currentUser')}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control" value="${localStorage.getItem('currentUser')}@school.edu">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Phone</label>
                        <input type="tel" class="form-control" value="+256 700 000 000">
                    </div>
                    <button type="submit" class="btn btn-primary">Update Profile</button>
                </form>
            </div>
        </div>
    `);
    
    showModal(modal);
}

function showSettingsModal() {
    // Create and show settings modal
    const modal = createModal('Settings', `
        <div class="row">
            <div class="col-md-6">
                <h6>Account Settings</h6>
                <div class="form-check form-switch mb-3">
                    <input class="form-check-input" type="checkbox" id="notifications" checked>
                    <label class="form-check-label" for="notifications">Email Notifications</label>
                </div>
                <div class="form-check form-switch mb-3">
                    <input class="form-check-input" type="checkbox" id="darkMode">
                    <label class="form-check-label" for="darkMode">Dark Mode</label>
                </div>
            </div>
            <div class="col-md-6">
                <h6>Security</h6>
                <button class="btn btn-outline-primary mb-2 w-100">Change Password</button>
                <button class="btn btn-outline-secondary w-100">Two-Factor Authentication</button>
            </div>
        </div>
    `);
    
    showModal(modal);
}

function createModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save Changes</button>
                </div>
            </div>
        </div>
    `;
    
    return modal;
}

function showModal(modal) {
    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    
    // Remove modal from DOM when hidden
    modal.addEventListener('hidden.bs.modal', function() {
        modal.remove();
    });
}

function initializeNavigation() {
    // Initialize any navigation-specific functionality
    console.log('Navigation initialized');
}

// Utility functions
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-UG', {
        style: 'currency',
        currency: 'UGX'
    }).format(amount);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Export functions for use in other modules
window.SchoolManagement = {
    showNotification,
    formatDate,
    formatCurrency,
    handleLogin,
    handleLogout
};
