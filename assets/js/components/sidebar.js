// Uniform Sidebar Component for All Users
function generateSidebar(userRole, currentPage) {
    const roleConfig = {
        'subject-teacher': {
            title: 'Subject Teacher',
            staffId: 'ST1234',
            links: [
                { icon: 'fas fa-tachometer-alt', text: 'Dashboard', href: 'dashboard.html' },
                { icon: 'fas fa-book', text: 'My Subjects', href: 'my-subjects.html' },
                { icon: 'fas fa-edit', text: 'Grade Entry', href: 'grade-entry.html' },
                { icon: 'fas fa-users', text: 'Student Lists', href: 'student-lists.html' },
                { icon: 'fas fa-project-diagram', text: 'Project Work', href: 'project-work.html' },
                { icon: 'fas fa-chart-line', text: 'Results Analysis', href: 'results-analysis.html' },
                { icon: 'fas fa-bullhorn', text: 'Announcements', href: 'announcements.html' },
                { icon: 'fas fa-calendar', text: 'Timetable', href: 'timetable.html' }
            ]
        },
        'class-teacher': {
            title: 'Class Teacher',
            staffId: 'CT1234',
            links: [
                { icon: 'fas fa-tachometer-alt', text: 'Dashboard', href: 'dashboard.html' },
                { icon: 'fas fa-book', text: 'My Subjects', href: 'my-subjects.html' },
                { icon: 'fas fa-user-graduate', text: 'Student Management', href: 'student-management.html' },
                { icon: 'fas fa-edit', text: 'Grade Entry', href: 'grade-entry.html' },
                { icon: 'fas fa-file-alt', text: 'Report Cards', href: 'report-cards.html' },
                { icon: 'fas fa-chart-line', text: 'Class Performance', href: 'class-performance.html' },
                { icon: 'fas fa-bullhorn', text: 'Announcements', href: 'announcements.html' }
            ]
        },
        'hod': {
            title: 'Head of Department',
            staffId: 'HOD1234',
            links: [
                { icon: 'fas fa-tachometer-alt', text: 'Dashboard', href: 'dashboard.html' },
                { icon: 'fas fa-users', text: 'My Teachers', href: 'my-teachers.html' },
                { icon: 'fas fa-user-plus', text: 'Teacher Assignment', href: 'teacher-assignment.html' },
                { icon: 'fas fa-chart-line', text: 'Department Performance', href: 'department-performance.html' },
                { icon: 'fas fa-check-circle', text: 'Results Approval', href: 'results-approval.html' },
                { icon: 'fas fa-chart-bar', text: 'Department Analytics', href: 'department-analytics.html' },
                { icon: 'fas fa-bullhorn', text: 'Announcements', href: 'announcements.html' }
            ]
        },
        'bursar': {
            title: 'Bursar',
            staffId: 'BUR1234',
            links: [
                { icon: 'fas fa-tachometer-alt', text: 'Dashboard', href: 'dashboard.html' },
                { icon: 'fas fa-chart-pie', text: 'Financial Dashboard', href: 'financial-dashboard.html' },
                { icon: 'fas fa-money-bill-wave', text: 'Fee Collection', href: 'fee-collection.html' },
                { icon: 'fas fa-receipt', text: 'Receipt Management', href: 'receipt-management.html' },
                { icon: 'fas fa-chart-bar', text: 'Financial Reports', href: 'financial-reports.html' },
                { icon: 'fas fa-exchange-alt', text: 'Transaction Tracking', href: 'transaction-tracking.html' },
                { icon: 'fas fa-analytics', text: 'Payment Analysis', href: 'payment-analysis.html' },
                { icon: 'fas fa-users', text: 'Staff Management', href: 'staff-management.html' },
                { icon: 'fas fa-upload', text: 'Payment Upload', href: 'payment-upload.html' }
            ]
        },
        'dos': {
            title: 'Director of Studies',
            staffId: 'DOS1234',
            links: [
                { icon: 'fas fa-tachometer-alt', text: 'Dashboard', href: 'dashboard.html' },
                { icon: 'fas fa-book', text: 'My Subjects', href: 'my-subjects.html' },
                { icon: 'fas fa-chart-line', text: 'Academic Progress', href: 'academic-progress.html' },
                { icon: 'fas fa-file-alt', text: 'Report Cards', href: 'report-cards.html' },
                { icon: 'fas fa-bullhorn', text: 'Announcements', href: 'announcements.html' },
                { icon: 'fas fa-calendar', text: 'Timetable', href: 'timetable.html' },
                { icon: 'fas fa-calendar-alt', text: 'Academic Calendar', href: 'academic-calendar.html' },
                { icon: 'fas fa-id-card', text: 'Student IDs', href: 'student-ids.html' }
            ]
        },
        'head-teacher': {
            title: 'Head Teacher',
            staffId: 'HT1234',
            links: [
                { icon: 'fas fa-tachometer-alt', text: 'Dashboard', href: 'dashboard.html' },
                { icon: 'fas fa-book', text: 'My Subjects', href: 'my-subjects.html' },
                { icon: 'fas fa-users', text: 'Staff Management', href: 'staff-management.html' },
                { icon: 'fas fa-file-alt', text: 'Report Cards', href: 'report-cards.html' },
                { icon: 'fas fa-money-bill-wave', text: 'School Fees', href: 'school-fees.html' },
                { icon: 'fas fa-gift', text: 'Bursaries', href: 'bursaries.html' },
                { icon: 'fas fa-bullhorn', text: 'Announcements', href: 'announcements.html' }
            ]
        },
        'system-admin': {
            title: 'System Administrator',
            staffId: 'SYS1234',
            links: [
                { icon: 'fas fa-tachometer-alt', text: 'System Dashboard', href: 'system-dashboard.html' },
                { icon: 'fas fa-users', text: 'User Management', href: 'user-management.html' },
                { icon: 'fas fa-bullhorn', text: 'Announcements', href: 'announcements.html' },
                { icon: 'fas fa-calendar-alt', text: 'Academic Calendar', href: 'academic-calendar.html' },
                { icon: 'fas fa-user-graduate', text: 'Student Management', href: 'student-management.html' },
                { icon: 'fas fa-chalkboard-teacher', text: 'Staff Management', href: 'staff-management.html' },
                { icon: 'fas fa-cog', text: 'System Settings', href: 'system-settings.html' },
                { icon: 'fas fa-calendar', text: 'Term Management', href: 'term-management.html' }
            ]
        }
    };

    const config = roleConfig[userRole];
    if (!config) return '';

    let sidebarHTML = `
        <nav class="col-md-3 col-lg-2 d-md-block bg-light sidebar" style="z-index: 1000;">
            <div class="position-sticky pt-3">
                <div class="text-center mb-4">
                    <img src="../../assets/images/logo.png" alt="School Logo" class="img-fluid mb-2" style="max-height: 60px;">
                    <h6 class="text-muted">${config.title}</h6>
                    <small class="text-muted">Staff ID: ${config.staffId}</small>
                </div>
                
                <ul class="nav flex-column">
    `;

    config.links.forEach(link => {
        const isActive = currentPage === link.href ? 'active' : '';
        sidebarHTML += `
            <li class="nav-item">
                <a class="nav-link ${isActive}" href="${link.href}">
                    <i class="${link.icon}"></i> ${link.text}
                </a>
            </li>
        `;
    });

    sidebarHTML += `
                </ul>
                
                <div class="mt-auto p-3 text-center">
                    <button class="btn btn-sm btn-outline-light" onclick="logout()">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            </div>
        </nav>
    `;

    return sidebarHTML;
}

// Uniform Header Component for All Users
function generateHeader(userRole, pageTitle) {
    const roleConfig = {
        'subject-teacher': { badge: 'Subject Teacher', color: 'primary' },
        'class-teacher': { badge: 'Class Teacher', color: 'success' },
        'hod': { badge: 'Head of Department', color: 'info' },
        'bursar': { badge: 'Bursar', color: 'warning' },
        'dos': { badge: 'Director of Studies', color: 'secondary' },
        'head-teacher': { badge: 'Head Teacher', color: 'danger' },
        'system-admin': { badge: 'System Administrator', color: 'dark' }
    };

    const config = roleConfig[userRole];
    if (!config) return '';

    return `
        <div class="header">
            <div>
                <h4>${pageTitle}</h4>
                <span class="role-badge bg-${config.color}">${config.badge}</span>
            </div>
            <div>
                <span id="current-user">John Doe</span>
                <i class="fas fa-user-circle ms-2 text-primary"></i>
            </div>
        </div>
    `;
}

// Common logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = '../../index.html';
    }
}

// Common notification function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}

// Common utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatNumber(number) {
    return new Intl.NumberFormat('en-US').format(number);
}

function formatCurrency(amount, currency = 'UGX') {
    return `${currency} ${formatNumber(amount)}`;
}
