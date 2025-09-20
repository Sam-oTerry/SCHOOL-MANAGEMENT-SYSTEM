// System Administrator Specific JavaScript
// This file contains functionality specific to the System Administrator role

class SystemAdminManager {
    constructor() {
        this.staffId = this.generateStaffId();
        this.initializeSystemAdminFeatures();
    }
    
    generateStaffId() {
        // Generate staff ID for system admin
        const prefix = 'SA';
        const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `${prefix}${randomNum}`;
    }
    
    initializeSystemAdminFeatures() {
        this.setupUserManagement();
        this.setupSystemSettings();
        this.setupMaintenance();
        this.setupAccountCreation();
        this.setupAnnouncements();
        this.setupAcademicCalendar();
        this.setupStaffManagement();
        this.setupStudentManagement();
        this.setupTermManagement();
    }
    
    setupUserManagement() {
        // Initialize user management
        this.loadUsers();
        this.setupUserActions();
    }
    
    loadUsers() {
        // Simulate loading users
        const users = [
            {
                username: 'j.kamya',
                fullName: 'Juliet Kamya',
                role: 'Class Teacher',
                lastLogin: '2023-10-15 08:42',
                status: 'Active'
            },
            {
                username: 'p.owino',
                fullName: 'Peter Owino',
                role: 'Subject Teacher',
                lastLogin: '2023-10-14 14:30',
                status: 'Active'
            },
            {
                username: 'm.nakato',
                fullName: 'Nakato Mary',
                role: 'Bursar',
                lastLogin: '2023-10-15 09:15',
                status: 'Active'
            }
        ];
        
        this.displayUsers(users);
    }
    
    displayUsers(users) {
        const tbody = document.querySelector('#system-admin-interface .table tbody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.username}</td>
                <td>${user.fullName}</td>
                <td>${user.role}</td>
                <td>${user.lastLogin}</td>
                <td><span class="badge bg-success">${user.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary edit-user" data-username="${user.username}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger delete-user" data-username="${user.username}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
    
    setupUserActions() {
        // Setup user action handlers
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('edit-user') || e.target.closest('.edit-user')) {
                const username = e.target.closest('.edit-user').dataset.username;
                this.editUser(username);
            } else if (e.target.classList.contains('delete-user') || e.target.closest('.delete-user')) {
                const username = e.target.closest('.delete-user').dataset.username;
                this.deleteUser(username);
            }
        });
        
        // Add user button
        const addUserBtn = document.querySelector('#system-admin-interface .btn-primary');
        if (addUserBtn) {
            addUserBtn.addEventListener('click', () => this.addUser());
        }
    }
    
    editUser(username) {
        this.showUserModal(username, 'Edit User');
    }
    
    addUser() {
        this.showUserModal(null, 'Add User');
    }
    
    showUserModal(username, title) {
        const modal = this.createUserModal(username, title);
        this.showModal(modal);
    }
    
    createUserModal(username, title) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="user-form">
                            <div class="mb-3">
                                <label class="form-label">Username</label>
                                <input type="text" class="form-control" id="username" value="${username || ''}" ${username ? 'readonly' : ''}>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Full Name</label>
                                <input type="text" class="form-control" id="fullName" value="${username ? 'Juliet Kamya' : ''}">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" value="${username ? 'j.kamya@school.edu' : ''}">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Role</label>
                                <select class="form-select" id="role">
                                    <option value="head-teacher">Head Teacher</option>
                                    <option value="system-admin">System Administrator</option>
                                    <option value="dos">Director of Studies</option>
                                    <option value="bursar">Bursar</option>
                                    <option value="class-teacher" selected>Class Teacher</option>
                                    <option value="subject-teacher">Subject Teacher</option>
                                    <option value="hod">Head of Department</option>
                                </select>
                            </div>
                            ${!username ? `
                            <div class="mb-3">
                                <label class="form-label">Password</label>
                                <input type="password" class="form-control" id="password">
                            </div>
                            ` : ''}
                            <div class="mb-3">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="active" checked>
                                    <label class="form-check-label" for="active">Active</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" id="save-user">Save User</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add save handler
        modal.querySelector('#save-user').addEventListener('click', () => {
            this.saveUser(modal);
        });
        
        return modal;
    }
    
    saveUser(modal) {
        const form = modal.querySelector('#user-form');
        const formData = new FormData(form);
        
        // Validate form
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        // Simulate saving user
        console.log('Saving user:', Object.fromEntries(formData));
        
        // Show success message
        SchoolManagement.showNotification('User saved successfully', 'success');
        
        // Close modal
        const bsModal = bootstrap.Modal.getInstance(modal);
        bsModal.hide();
        
        // Refresh user list
        this.loadUsers();
    }
    
    deleteUser(username) {
        if (confirm(`Are you sure you want to delete user ${username}?`)) {
            // Simulate deleting user
            console.log('Deleting user:', username);
            
            // Show success message
            SchoolManagement.showNotification('User deleted successfully', 'success');
            
            // Refresh user list
            this.loadUsers();
        }
    }
    
    setupSystemSettings() {
        // Setup system settings
        this.loadSystemSettings();
        this.setupSettingsActions();
    }
    
    loadSystemSettings() {
        // Load current system settings
        const settings = {
            academicYear: '2023',
            term: 'Third Term',
            allowGradeEntry: true
        };
        
        this.displaySystemSettings(settings);
    }
    
    displaySystemSettings(settings) {
        // Update settings form
        const academicYearInput = document.querySelector('#system-admin-interface input[type="text"]');
        if (academicYearInput) {
            academicYearInput.value = settings.academicYear;
        }
        
        const termSelect = document.querySelector('#system-admin-interface select');
        if (termSelect) {
            termSelect.value = settings.term;
        }
        
        const gradeEntrySwitch = document.querySelector('#system-admin-interface input[type="checkbox"]');
        if (gradeEntrySwitch) {
            gradeEntrySwitch.checked = settings.allowGradeEntry;
        }
    }
    
    setupSettingsActions() {
        // Setup settings save handler
        const saveSettingsBtn = document.querySelector('#system-admin-interface .btn-primary');
        if (saveSettingsBtn && saveSettingsBtn.textContent.includes('Save')) {
            saveSettingsBtn.addEventListener('click', () => this.saveSystemSettings());
        }
    }
    
    saveSystemSettings() {
        // Get settings from form
        const academicYear = document.querySelector('#system-admin-interface input[type="text"]').value;
        const term = document.querySelector('#system-admin-interface select').value;
        const allowGradeEntry = document.querySelector('#system-admin-interface input[type="checkbox"]').checked;
        
        // Simulate saving settings
        console.log('Saving system settings:', { academicYear, term, allowGradeEntry });
        
        // Show success message
        SchoolManagement.showNotification('System settings saved successfully', 'success');
    }
    
    setupMaintenance() {
        // Setup maintenance actions
        this.setupMaintenanceActions();
    }
    
    setupMaintenanceActions() {
        // Setup maintenance button handlers
        document.addEventListener('click', (e) => {
            if (e.target.textContent.includes('Backup Database')) {
                this.backupDatabase();
            } else if (e.target.textContent.includes('Clear Cache')) {
                this.clearCache();
            } else if (e.target.textContent.includes('View System Logs')) {
                this.viewSystemLogs();
            } else if (e.target.textContent.includes('Emergency Shutdown')) {
                this.emergencyShutdown();
            }
        });
    }
    
    backupDatabase() {
        if (confirm('Are you sure you want to backup the database? This may take a few minutes.')) {
            // Simulate backup process
            SchoolManagement.showNotification('Database backup started...', 'info');
            
            setTimeout(() => {
                SchoolManagement.showNotification('Database backup completed successfully', 'success');
            }, 3000);
        }
    }
    
    clearCache() {
        if (confirm('Are you sure you want to clear the system cache?')) {
            // Simulate cache clearing
            SchoolManagement.showNotification('System cache cleared successfully', 'success');
        }
    }
    
    viewSystemLogs() {
        this.showSystemLogsModal();
    }
    
    showSystemLogsModal() {
        const modal = this.createSystemLogsModal();
        this.showModal(modal);
    }
    
    createSystemLogsModal() {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">System Logs</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="table-responsive">
                            <table class="table table-sm">
                                <thead>
                                    <tr>
                                        <th>Timestamp</th>
                                        <th>Level</th>
                                        <th>Message</th>
                                        <th>User</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>2023-10-15 10:30:15</td>
                                        <td><span class="badge bg-info">INFO</span></td>
                                        <td>User login successful</td>
                                        <td>j.kamya</td>
                                    </tr>
                                    <tr>
                                        <td>2023-10-15 10:25:42</td>
                                        <td><span class="badge bg-warning">WARN</span></td>
                                        <td>Failed login attempt</td>
                                        <td>unknown</td>
                                    </tr>
                                    <tr>
                                        <td>2023-10-15 10:20:18</td>
                                        <td><span class="badge bg-success">SUCCESS</span></td>
                                        <td>Database backup completed</td>
                                        <td>system</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Export Logs</button>
                    </div>
                </div>
            </div>
        `;
        
        return modal;
    }
    
    emergencyShutdown() {
        if (confirm('Are you sure you want to perform an emergency shutdown? This will log out all users and may cause data loss.')) {
            if (confirm('This action cannot be undone. Are you absolutely sure?')) {
                // Simulate emergency shutdown
                SchoolManagement.showNotification('Emergency shutdown initiated...', 'danger');
                
                setTimeout(() => {
                    SchoolManagement.showNotification('System shutdown complete', 'danger');
                    // In a real application, this would redirect to a maintenance page
                }, 2000);
            }
        }
    }
    
    setupAccountCreation() {
        // Setup account creation for staff
        this.loadAccountCreation();
    }
    
    loadAccountCreation() {
        // Load account creation interface
        const container = document.querySelector('#system-admin-interface');
        if (!container) return;
        
        // Create account creation section if it doesn't exist
        let accountSection = container.querySelector('.account-creation');
        if (!accountSection) {
            accountSection = document.createElement('div');
            accountSection.className = 'account-creation';
            accountSection.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h5>Account Creation for Staff</h5>
                        <button class="btn btn-sm btn-primary" onclick="createStaffAccount()">
                            <i class="fas fa-plus"></i> Create Account
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h6>Create New Staff Account</h6>
                                <form id="create-account-form">
                                    <div class="mb-3">
                                        <label class="form-label">Full Name</label>
                                        <input type="text" class="form-control" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Username</label>
                                        <input type="text" class="form-control" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Email</label>
                                        <input type="email" class="form-control" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Role</label>
                                        <select class="form-select" required>
                                            <option value="">Select Role</option>
                                            <option value="head-teacher">Head Teacher</option>
                                            <option value="system-admin">System Administrator</option>
                                            <option value="dos">Director of Studies</option>
                                            <option value="bursar">Bursar</option>
                                            <option value="class-teacher">Class Teacher</option>
                                            <option value="subject-teacher">Subject Teacher</option>
                                            <option value="hod">Head of Department</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Department</label>
                                        <select class="form-select">
                                            <option value="">Select Department</option>
                                            <option value="mathematics">Mathematics</option>
                                            <option value="physics">Physics</option>
                                            <option value="chemistry">Chemistry</option>
                                            <option value="biology">Biology</option>
                                            <option value="english">English</option>
                                            <option value="administration">Administration</option>
                                        </select>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Create Account</button>
                                </form>
                            </div>
                            <div class="col-md-6">
                                <h6>Account Creation Guidelines</h6>
                                <ul class="list-unstyled">
                                    <li><i class="fas fa-check text-success"></i> Username must be unique</li>
                                    <li><i class="fas fa-check text-success"></i> Email must be valid</li>
                                    <li><i class="fas fa-check text-success"></i> Role determines access level</li>
                                    <li><i class="fas fa-check text-success"></i> Department assignment is optional</li>
                                    <li><i class="fas fa-check text-success"></i> Default password will be generated</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(accountSection);
        }
    }
    
    setupAnnouncements() {
        // Setup announcements management
        this.loadAnnouncements();
    }
    
    loadAnnouncements() {
        // Load announcements
        const announcements = [
            {
                id: 'ANN001',
                title: 'System Maintenance',
                content: 'System maintenance scheduled for Sunday, 22nd October 2023 from 2:00 AM to 4:00 AM',
                date: '2023-10-15',
                author: 'System Administrator',
                status: 'Active'
            },
            {
                id: 'ANN002',
                title: 'New Features Available',
                content: 'New features have been added to the system. Please check the updates section.',
                date: '2023-10-14',
                author: 'System Administrator',
                status: 'Active'
            }
        ];
        
        this.displayAnnouncements(announcements);
    }
    
    displayAnnouncements(announcements) {
        const container = document.querySelector('#system-admin-interface');
        if (!container) return;
        
        // Create announcements section if it doesn't exist
        let announcementSection = container.querySelector('.announcements');
        if (!announcementSection) {
            announcementSection = document.createElement('div');
            announcementSection.className = 'announcements';
            announcementSection.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h5>Announcements Management</h5>
                        <button class="btn btn-sm btn-primary" onclick="createAnnouncement()">
                            <i class="fas fa-plus"></i> Create Announcement
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Content</th>
                                        <th>Date</th>
                                        <th>Author</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${announcements.map(announcement => `
                                        <tr>
                                            <td><strong>${announcement.title}</strong></td>
                                            <td>${announcement.content.substring(0, 50)}...</td>
                                            <td>${announcement.date}</td>
                                            <td>${announcement.author}</td>
                                            <td><span class="badge bg-success">${announcement.status}</span></td>
                                            <td>
                                                <button class="btn btn-sm btn-primary" onclick="editAnnouncement('${announcement.id}')">
                                                    <i class="fas fa-edit"></i> Edit
                                                </button>
                                                <button class="btn btn-sm btn-danger" onclick="deleteAnnouncement('${announcement.id}')">
                                                    <i class="fas fa-trash"></i> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(announcementSection);
        }
    }
    
    setupAcademicCalendar() {
        // Setup academic calendar management
        this.loadAcademicCalendar();
    }
    
    loadAcademicCalendar() {
        // Load academic calendar data
        const calendar = [
            {
                date: '2023-10-15',
                event: 'Mathematics Test',
                description: 'S.4 Mathematics test',
                type: 'Academic'
            },
            {
                date: '2023-10-20',
                event: 'Parent-Teacher Meeting',
                description: 'Quarterly parent-teacher meeting',
                type: 'Administrative'
            },
            {
                date: '2023-10-25',
                event: 'Grade Entry Deadline',
                description: 'Deadline for entering all grades',
                type: 'Administrative'
            },
            {
                date: '2023-11-01',
                event: 'Mid-term Break',
                description: 'Mid-term break for students',
                type: 'Holiday'
            }
        ];
        
        this.displayAcademicCalendar(calendar);
    }
    
    displayAcademicCalendar(calendar) {
        const container = document.querySelector('#system-admin-interface');
        if (!container) return;
        
        // Create academic calendar section if it doesn't exist
        let calendarSection = container.querySelector('.academic-calendar');
        if (!calendarSection) {
            calendarSection = document.createElement('div');
            calendarSection.className = 'academic-calendar';
            calendarSection.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h5>Academic Calendar Management</h5>
                        <button class="btn btn-sm btn-primary" onclick="addCalendarEvent()">
                            <i class="fas fa-plus"></i> Add Event
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Event</th>
                                        <th>Description</th>
                                        <th>Type</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${calendar.map(event => `
                                        <tr>
                                            <td>${event.date}</td>
                                            <td><strong>${event.event}</strong></td>
                                            <td>${event.description}</td>
                                            <td><span class="badge ${event.type === 'Academic' ? 'bg-primary' : event.type === 'Administrative' ? 'bg-warning' : 'bg-info'}">${event.type}</span></td>
                                            <td>
                                                <button class="btn btn-sm btn-primary" onclick="editCalendarEvent('${event.date}')">
                                                    <i class="fas fa-edit"></i> Edit
                                                </button>
                                                <button class="btn btn-sm btn-danger" onclick="deleteCalendarEvent('${event.date}')">
                                                    <i class="fas fa-trash"></i> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(calendarSection);
        }
    }
    
    setupStaffManagement() {
        // Setup staff management
        this.loadStaffManagement();
    }
    
    loadStaffManagement() {
        // Load staff management data
        const staff = [
            {
                id: 'ST001',
                name: 'John Mukasa',
                role: 'Teacher',
                department: 'Mathematics',
                email: 'john.mukasa@school.edu',
                phone: '+256 700 123 456',
                status: 'Active'
            },
            {
                id: 'ST002',
                name: 'Mary Nakato',
                role: 'Teacher',
                department: 'Physics',
                email: 'mary.nakato@school.edu',
                phone: '+256 700 123 457',
                status: 'Active'
            },
            {
                id: 'ST003',
                name: 'David Okello',
                role: 'Support Staff',
                department: 'Maintenance',
                email: 'david.okello@school.edu',
                phone: '+256 700 123 458',
                status: 'Active'
            }
        ];
        
        this.displayStaffManagement(staff);
    }
    
    displayStaffManagement(staff) {
        const container = document.querySelector('#system-admin-interface');
        if (!container) return;
        
        // Create staff management section if it doesn't exist
        let staffSection = container.querySelector('.staff-management');
        if (!staffSection) {
            staffSection = document.createElement('div');
            staffSection.className = 'staff-management';
            staffSection.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h5>Staff Management</h5>
                        <button class="btn btn-sm btn-primary" onclick="addStaff()">
                            <i class="fas fa-plus"></i> Add Staff
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Staff ID</th>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Department</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${staff.map(member => `
                                        <tr>
                                            <td><strong>${member.id}</strong></td>
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <div class="staff-avatar me-2">${member.name.split(' ').map(n => n[0]).join('')}</div>
                                                    <div>
                                                        <strong>${member.name}</strong>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>${member.role}</td>
                                            <td>${member.department}</td>
                                            <td>${member.email}</td>
                                            <td>${member.phone}</td>
                                            <td><span class="badge bg-success">${member.status}</span></td>
                                            <td>
                                                <button class="btn btn-sm btn-primary" onclick="viewStaffDetails('${member.id}')">
                                                    <i class="fas fa-eye"></i> View
                                                </button>
                                                <button class="btn btn-sm btn-warning" onclick="editStaff('${member.id}')">
                                                    <i class="fas fa-edit"></i> Edit
                                                </button>
                                                <button class="btn btn-sm btn-danger" onclick="deleteStaff('${member.id}')">
                                                    <i class="fas fa-trash"></i> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(staffSection);
        }
    }
    
    setupStudentManagement() {
        // Setup student management
        this.loadStudentManagement();
    }
    
    loadStudentManagement() {
        // Load student management data
        const students = [
            {
                id: 'S00123',
                name: 'Mukasa John',
                class: 'S.4 Science A',
                email: 'mukasa.john@student.edu',
                phone: '+256 700 123 459',
                status: 'Active'
            },
            {
                id: 'S00124',
                name: 'Nakato Mary',
                class: 'S.4 Science A',
                email: 'nakato.mary@student.edu',
                phone: '+256 700 123 460',
                status: 'Active'
            },
            {
                id: 'S00125',
                name: 'Okot David',
                class: 'S.3 Science',
                email: 'okot.david@student.edu',
                phone: '+256 700 123 461',
                status: 'Active'
            }
        ];
        
        this.displayStudentManagement(students);
    }
    
    displayStudentManagement(students) {
        const container = document.querySelector('#system-admin-interface');
        if (!container) return;
        
        // Create student management section if it doesn't exist
        let studentSection = container.querySelector('.student-management');
        if (!studentSection) {
            studentSection = document.createElement('div');
            studentSection.className = 'student-management';
            studentSection.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h5>Student Management</h5>
                        <button class="btn btn-sm btn-primary" onclick="addStudent()">
                            <i class="fas fa-plus"></i> Add Student
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Student ID</th>
                                        <th>Name</th>
                                        <th>Class</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${students.map(student => `
                                        <tr>
                                            <td><strong>${student.id}</strong></td>
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <div class="student-avatar me-2">${student.name.split(' ').map(n => n[0]).join('')}</div>
                                                    <div>
                                                        <strong>${student.name}</strong>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>${student.class}</td>
                                            <td>${student.email}</td>
                                            <td>${student.phone}</td>
                                            <td><span class="badge bg-success">${student.status}</span></td>
                                            <td>
                                                <button class="btn btn-sm btn-primary" onclick="viewStudentDetails('${student.id}')">
                                                    <i class="fas fa-eye"></i> View
                                                </button>
                                                <button class="btn btn-sm btn-warning" onclick="editStudent('${student.id}')">
                                                    <i class="fas fa-edit"></i> Edit
                                                </button>
                                                <button class="btn btn-sm btn-danger" onclick="deleteStudent('${student.id}')">
                                                    <i class="fas fa-trash"></i> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(studentSection);
        }
    }
    
    setupTermManagement() {
        // Setup term management
        this.loadTermManagement();
    }
    
    loadTermManagement() {
        // Load term management data
        const terms = [
            {
                id: 'T001',
                name: 'First Term 2023',
                startDate: '2023-01-15',
                endDate: '2023-04-15',
                status: 'Completed'
            },
            {
                id: 'T002',
                name: 'Second Term 2023',
                startDate: '2023-05-15',
                endDate: '2023-08-15',
                status: 'Completed'
            },
            {
                id: 'T003',
                name: 'Third Term 2023',
                startDate: '2023-09-15',
                endDate: '2023-12-15',
                status: 'Active'
            }
        ];
        
        this.displayTermManagement(terms);
    }
    
    displayTermManagement(terms) {
        const container = document.querySelector('#system-admin-interface');
        if (!container) return;
        
        // Create term management section if it doesn't exist
        let termSection = container.querySelector('.term-management');
        if (!termSection) {
            termSection = document.createElement('div');
            termSection.className = 'term-management';
            termSection.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h5>Term Management</h5>
                        <button class="btn btn-sm btn-primary" onclick="addTerm()">
                            <i class="fas fa-plus"></i> Add Term
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Term ID</th>
                                        <th>Name</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${terms.map(term => `
                                        <tr>
                                            <td><strong>${term.id}</strong></td>
                                            <td>${term.name}</td>
                                            <td>${term.startDate}</td>
                                            <td>${term.endDate}</td>
                                            <td><span class="badge ${term.status === 'Active' ? 'bg-success' : 'bg-secondary'}">${term.status}</span></td>
                                            <td>
                                                <button class="btn btn-sm btn-primary" onclick="viewTermDetails('${term.id}')">
                                                    <i class="fas fa-eye"></i> View
                                                </button>
                                                <button class="btn btn-sm btn-warning" onclick="editTerm('${term.id}')">
                                                    <i class="fas fa-edit"></i> Edit
                                                </button>
                                                ${term.status === 'Active' ? `
                                                    <button class="btn btn-sm btn-danger" onclick="endTerm('${term.id}')">
                                                        <i class="fas fa-stop"></i> End Term
                                                    </button>
                                                ` : ''}
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(termSection);
        }
    }
    
    setTermDates(startDate, endDate) {
        // Set term start and end dates
        console.log(`Setting term dates: ${startDate} to ${endDate}`);
        
        // Simulate setting term dates
        SchoolManagement.showNotification(`Term dates set: ${startDate} to ${endDate}`, 'success');
        
        // Update UI
        this.updateTermDates(startDate, endDate);
    }
    
    updateTermDates(startDate, endDate) {
        // Update term dates in UI
        const startElement = document.querySelector('[data-term="start-date"]');
        const endElement = document.querySelector('[data-term="end-date"]');
        
        if (startElement) {
            startElement.textContent = startDate;
        }
        if (endElement) {
            endElement.textContent = endDate;
        }
    }
    
    showModal(modal) {
        document.body.appendChild(modal);
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
        
        // Remove modal from DOM when hidden
        modal.addEventListener('hidden.bs.modal', function() {
            modal.remove();
        });
    }
}

// Initialize System Admin Manager when the interface is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're in the system admin interface
    const systemAdminInterface = document.getElementById('system-admin-interface');
    if (systemAdminInterface && systemAdminInterface.classList.contains('active')) {
        window.systemAdminManager = new SystemAdminManager();
    }
});

// Export for use in other modules
window.SystemAdminManager = SystemAdminManager;
