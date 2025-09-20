// Head of Department Specific JavaScript
// This file contains functionality specific to the Head of Department role

class HODManager {
    constructor() {
        this.staffId = this.generateStaffId();
        this.initializeHODFeatures();
    }
    
    generateStaffId() {
        // Generate staff ID for HOD
        const prefix = 'HOD';
        const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `${prefix}${randomNum}`;
    }
    
    initializeHODFeatures() {
        this.setupDepartmentOverview();
        this.setupTeacherAssignment();
        this.setupGradeApproval();
        this.setupDepartmentPerformance();
        this.setupTeacherTracking();
        this.setupDepartmentResults();
    }
    
    setupDepartmentOverview() {
        // Initialize department overview
        this.loadDepartmentOverview();
    }
    
    loadDepartmentOverview() {
        // Simulate loading department overview data
        const departmentData = {
            totalTeachers: 15,
            totalSubjects: 8,
            totalStudents: 320,
            averagePerformance: 87
        };
        
        this.displayDepartmentOverview(departmentData);
    }
    
    displayDepartmentOverview(data) {
        const container = document.querySelector('#hod-interface');
        if (!container) return;
        
        // Create department overview section if it doesn't exist
        let overviewSection = container.querySelector('.department-overview');
        if (!overviewSection) {
            overviewSection = document.createElement('div');
            overviewSection.className = 'department-overview';
            overviewSection.innerHTML = `
                <div class="department-card teachers">
                    <div class="department-icon teachers">
                        <i class="fas fa-chalkboard-teacher"></i>
                    </div>
                    <div class="department-number teachers">${data.totalTeachers}</div>
                    <div class="department-label">Total Teachers</div>
                    <div class="department-change positive">+2 this term</div>
                </div>
                <div class="department-card subjects">
                    <div class="department-icon subjects">
                        <i class="fas fa-book"></i>
                    </div>
                    <div class="department-number subjects">${data.totalSubjects}</div>
                    <div class="department-label">Subjects</div>
                    <div class="department-change positive">+1 this year</div>
                </div>
                <div class="department-card students">
                    <div class="department-icon students">
                        <i class="fas fa-user-graduate"></i>
                    </div>
                    <div class="department-number students">${data.totalStudents}</div>
                    <div class="department-label">Students</div>
                    <div class="department-change positive">+15 this term</div>
                </div>
                <div class="department-card performance">
                    <div class="department-icon performance">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="department-number performance">${data.averagePerformance}%</div>
                    <div class="department-label">Avg Performance</div>
                    <div class="department-change positive">+3% this term</div>
                </div>
            `;
            container.appendChild(overviewSection);
        }
    }
    
    setupTeacherAssignment() {
        // Setup teacher assignment
        this.loadTeacherAssignment();
        this.setupTeacherActions();
    }
    
    loadTeacherAssignment() {
        // Simulate loading teacher assignment data
        const teachers = [
            {
                name: 'Mr. Okello',
                subject: 'Mathematics',
                classes: ['S.4 Science A', 'S.4 Science B'],
                workload: 18,
                effectiveness: 95
            },
            {
                name: 'Ms. Nakato',
                subject: 'Physics',
                classes: ['S.4 Science A', 'S.3 Science'],
                workload: 16,
                effectiveness: 92
            },
            {
                name: 'Dr. Mukasa',
                subject: 'Chemistry',
                classes: ['S.4 Science B', 'S.3 Science'],
                workload: 14,
                effectiveness: 88
            }
        ];
        
        this.displayTeacherAssignment(teachers);
    }
    
    displayTeacherAssignment(teachers) {
        const container = document.querySelector('#hod-interface');
        if (!container) return;
        
        // Create teacher assignment section if it doesn't exist
        let assignmentSection = container.querySelector('.teacher-assignment');
        if (!assignmentSection) {
            assignmentSection = document.createElement('div');
            assignmentSection.className = 'teacher-assignment';
            assignmentSection.innerHTML = `
                <div class="assignment-header">
                    <h5 class="assignment-title">Teacher Assignment</h5>
                    <div class="assignment-actions">
                        <button class="assignment-btn">Assign Teacher</button>
                        <button class="assignment-btn secondary">View All</button>
                    </div>
                </div>
                <div class="teachers-grid">
                    ${teachers.map(teacher => `
                        <div class="teacher-card">
                            <div class="teacher-header">
                                <div class="teacher-avatar">${teacher.name.split(' ').map(n => n[0]).join('')}</div>
                                <div class="teacher-info">
                                    <h6>${teacher.name}</h6>
                                    <p>${teacher.subject}</p>
                                </div>
                            </div>
                            <div class="teacher-subjects">
                                <h6>Classes</h6>
                                <div class="subject-tags">
                                    ${teacher.classes.map(cls => `<span class="subject-tag">${cls}</span>`).join('')}
                                </div>
                            </div>
                            <div class="teacher-workload">
                                <div class="workload-stat">
                                    <span class="number">${teacher.workload}</span>
                                    <span class="label">Hours</span>
                                </div>
                                <div class="workload-stat">
                                    <span class="number">${teacher.effectiveness}%</span>
                                    <span class="label">Effectiveness</span>
                                </div>
                                <div class="workload-stat">
                                    <span class="number">4.5</span>
                                    <span class="label">Rating</span>
                                </div>
                            </div>
                            <div class="teacher-actions">
                                <button class="teacher-action-btn">Assign</button>
                                <button class="teacher-action-btn">View</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            container.appendChild(assignmentSection);
        }
    }
    
    setupTeacherActions() {
        // Setup teacher action handlers
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('teacher-action-btn')) {
                const action = e.target.textContent.toLowerCase();
                if (action === 'assign') {
                    this.assignTeacher(e.target.closest('.teacher-card'));
                } else if (action === 'view') {
                    this.viewTeacherDetails(e.target.closest('.teacher-card'));
                }
            }
        });
    }
    
    assignTeacher(teacherCard) {
        const teacherName = teacherCard.querySelector('.teacher-info h6').textContent;
        const modal = this.createAssignTeacherModal(teacherName);
        this.showModal(modal);
    }
    
    viewTeacherDetails(teacherCard) {
        const teacherName = teacherCard.querySelector('.teacher-info h6').textContent;
        const modal = this.createTeacherDetailsModal(teacherName);
        this.showModal(modal);
    }
    
    createAssignTeacherModal(teacherName) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Assign Teacher - ${teacherName}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label class="form-label">Subject</label>
                                <select class="form-select">
                                    <option>Mathematics</option>
                                    <option>Physics</option>
                                    <option>Chemistry</option>
                                    <option>Biology</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Class</label>
                                <select class="form-select">
                                    <option>S.4 Science A</option>
                                    <option>S.4 Science B</option>
                                    <option>S.3 Science</option>
                                    <option>S.2 Science</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Hours per Week</label>
                                <input type="number" class="form-control" value="6" min="1" max="20">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Start Date</label>
                                <input type="date" class="form-control" value="${new Date().toISOString().split('T')[0]}">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">End Date</label>
                                <input type="date" class="form-control" value="${new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Notes</label>
                                <textarea class="form-control" rows="3" placeholder="Optional notes about the assignment"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary">Assign Teacher</button>
                    </div>
                </div>
            </div>
        `;
        
        return modal;
    }
    
    createTeacherDetailsModal(teacherName) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Teacher Details - ${teacherName}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-4 text-center">
                                <div class="teacher-avatar" style="width: 80px; height: 80px; margin: 0 auto 15px;">
                                    ${teacherName.split(' ').map(n => n[0]).join('')}
                                </div>
                                <h5>${teacherName}</h5>
                                <p class="text-muted">Mathematics Teacher</p>
                            </div>
                            <div class="col-md-8">
                                <div class="row">
                                    <div class="col-md-6">
                                        <h6>Teacher Information</h6>
                                        <table class="table table-sm">
                                            <tr>
                                                <td><strong>Name:</strong></td>
                                                <td>${teacherName}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Subject:</strong></td>
                                                <td>Mathematics</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Experience:</strong></td>
                                                <td>5 years</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Workload:</strong></td>
                                                <td>18 hours/week</td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="col-md-6">
                                        <h6>Performance Metrics</h6>
                                        <div class="progress mb-2">
                                            <div class="progress-bar" style="width: 95%">95%</div>
                                        </div>
                                        <p class="small text-muted">Effectiveness</p>
                                        
                                        <div class="progress mb-2">
                                            <div class="progress-bar bg-success" style="width: 88%">88%</div>
                                        </div>
                                        <p class="small text-muted">Student Satisfaction</p>
                                        
                                        <div class="progress mb-2">
                                            <div class="progress-bar bg-info" style="width: 92%">92%</div>
                                        </div>
                                        <p class="small text-muted">Attendance Rate</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-3">
                            <h6>Current Assignments</h6>
                            <div class="table-responsive">
                                <table class="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Class</th>
                                            <th>Subject</th>
                                            <th>Hours/Week</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>S.4 Science A</td>
                                            <td>Mathematics</td>
                                            <td>6</td>
                                            <td><span class="badge bg-success">Active</span></td>
                                        </tr>
                                        <tr>
                                            <td>S.4 Science B</td>
                                            <td>Mathematics</td>
                                            <td>6</td>
                                            <td><span class="badge bg-success">Active</span></td>
                                        </tr>
                                        <tr>
                                            <td>S.3 Science</td>
                                            <td>Mathematics</td>
                                            <td>6</td>
                                            <td><span class="badge bg-success">Active</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Edit Teacher</button>
                    </div>
                </div>
            </div>
        `;
        
        return modal;
    }
    
    setupGradeApproval() {
        // Setup grade approval
        this.loadGradeApproval();
        this.setupApprovalActions();
    }
    
    loadGradeApproval() {
        // Simulate loading grade approval data
        const approvalData = {
            pending: 8,
            approved: 45,
            rejected: 2
        };
        
        this.displayGradeApproval(approvalData);
    }
    
    displayGradeApproval(data) {
        const container = document.querySelector('#hod-interface');
        if (!container) return;
        
        // Create grade approval section if it doesn't exist
        let approvalSection = container.querySelector('.grade-approval');
        if (!approvalSection) {
            approvalSection = document.createElement('div');
            approvalSection.className = 'grade-approval';
            approvalSection.innerHTML = `
                <div class="approval-header">
                    <h5 class="approval-title">Grade Approval</h5>
                    <div class="approval-filters">
                        <div class="approval-filter">
                            <label class="approval-filter-label">Subject</label>
                            <select class="approval-filter-select">
                                <option>All Subjects</option>
                                <option>Mathematics</option>
                                <option>Physics</option>
                                <option>Chemistry</option>
                            </select>
                        </div>
                        <div class="approval-filter">
                            <label class="approval-filter-label">Class</label>
                            <select class="approval-filter-select">
                                <option>All Classes</option>
                                <option>S.4 Science A</option>
                                <option>S.4 Science B</option>
                                <option>S.3 Science</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table approval-table">
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Class</th>
                                <th>Teacher</th>
                                <th>Average Grade</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="approval-info">
                                        <div class="approval-avatar">M</div>
                                        <div class="approval-details">
                                            <h6>Mathematics</h6>
                                            <p>S.4 Science A</p>
                                        </div>
                                    </div>
                                </td>
                                <td>S.4 Science A</td>
                                <td>Mr. Okello</td>
                                <td>
                                    <div class="grade-summary">
                                        <span class="grade-average">B+</span>
                                        <span class="grade-count">(85%)</span>
                                    </div>
                                </td>
                                <td><span class="approval-status pending">Pending</span></td>
                                <td>
                                    <div class="approval-actions">
                                        <button class="approval-action-btn approve" data-id="1">
                                            <i class="fas fa-check"></i>
                                        </button>
                                        <button class="approval-action-btn reject" data-id="1">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="approval-info">
                                        <div class="approval-avatar">P</div>
                                        <div class="approval-details">
                                            <h6>Physics</h6>
                                            <p>S.4 Science B</p>
                                        </div>
                                    </div>
                                </td>
                                <td>S.4 Science B</td>
                                <td>Ms. Nakato</td>
                                <td>
                                    <div class="grade-summary">
                                        <span class="grade-average">A-</span>
                                        <span class="grade-count">(88%)</span>
                                    </div>
                                </td>
                                <td><span class="approval-status pending">Pending</span></td>
                                <td>
                                    <div class="approval-actions">
                                        <button class="approval-action-btn approve" data-id="2">
                                            <i class="fas fa-check"></i>
                                        </button>
                                        <button class="approval-action-btn reject" data-id="2">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
            container.appendChild(approvalSection);
        }
    }
    
    setupApprovalActions() {
        // Setup approval action handlers
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('approve') || e.target.closest('.approve')) {
                const id = e.target.closest('.approve').dataset.id;
                this.handleGradeApproval(id, 'approve');
            } else if (e.target.classList.contains('reject') || e.target.closest('.reject')) {
                const id = e.target.closest('.reject').dataset.id;
                this.handleGradeApproval(id, 'reject');
            }
        });
    }
    
    handleGradeApproval(id, action) {
        // Handle grade approval
        console.log(`Handling ${action} for grade ID: ${id}`);
        
        // Show notification
        const message = action === 'approve' ? 'Grade approved successfully' : 'Grade rejected';
        SchoolManagement.showNotification(message, 'success');
        
        // Update UI
        this.updateGradeApprovalStatus(id, action);
    }
    
    updateGradeApprovalStatus(id, action) {
        // Update the grade approval status in the UI
        const row = document.querySelector(`[data-id="${id}"]`).closest('tr');
        if (row) {
            const statusCell = row.querySelector('.approval-status');
            if (statusCell) {
                statusCell.textContent = action === 'approve' ? 'Approved' : 'Rejected';
                statusCell.className = `approval-status ${action === 'approve' ? 'approved' : 'rejected'}`;
            }
            
            // Hide action buttons
            const actionCell = row.querySelector('.approval-actions');
            if (actionCell) {
                actionCell.innerHTML = '<span class="text-muted">Completed</span>';
            }
        }
    }
    
    setupDepartmentPerformance() {
        // Setup department performance
        this.loadDepartmentPerformance();
    }
    
    loadDepartmentPerformance() {
        // Simulate loading department performance data
        const performanceData = {
            overallPerformance: 87,
            subjectPerformance: 85,
            teacherEffectiveness: 92,
            studentSatisfaction: 89
        };
        
        this.displayDepartmentPerformance(performanceData);
    }
    
    displayDepartmentPerformance(data) {
        const container = document.querySelector('#hod-interface');
        if (!container) return;
        
        // Create department performance section if it doesn't exist
        let performanceSection = container.querySelector('.department-performance');
        if (!performanceSection) {
            performanceSection = document.createElement('div');
            performanceSection.className = 'department-performance';
            performanceSection.innerHTML = `
                <div class="performance-header">
                    <h5 class="performance-title">Department Performance</h5>
                </div>
                <div class="performance-metrics">
                    <div class="performance-metric">
                        <div class="performance-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="performance-value">${data.overallPerformance}%</div>
                        <div class="performance-label">Overall Performance</div>
                        <div class="performance-trend positive">+5% from last term</div>
                    </div>
                    <div class="performance-metric">
                        <div class="performance-icon">
                            <i class="fas fa-book"></i>
                        </div>
                        <div class="performance-value">${data.subjectPerformance}%</div>
                        <div class="performance-label">Subject Performance</div>
                        <div class="performance-trend positive">+3% from last term</div>
                    </div>
                    <div class="performance-metric">
                        <div class="performance-icon">
                            <i class="fas fa-chalkboard-teacher"></i>
                        </div>
                        <div class="performance-value">${data.teacherEffectiveness}%</div>
                        <div class="performance-label">Teacher Effectiveness</div>
                        <div class="performance-trend positive">+2% from last term</div>
                    </div>
                    <div class="performance-metric">
                       div class="performance-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="performance-value">${data.studentSatisfaction}%</div>
                        <div class="performance-label">Student Satisfaction</div>
                        <div class="performance-trend positive">+4% from last term</div>
                    </div>
                </div>
            `;
            container.appendChild(performanceSection);
        }
    }
    
    setupTeacherTracking() {
        // Setup teacher tracking and monitoring
        this.loadTeacherTracking();
    }
    
    loadTeacherTracking() {
        // Load teacher tracking data
        const teachers = [
            {
                id: 'T001',
                name: 'Mr. Okello',
                subject: 'Mathematics',
                classes: ['S.4 Science A', 'S.4 Science B'],
                performance: 95,
                attendance: 98,
                workload: 18,
                status: 'Active'
            },
            {
                id: 'T002',
                name: 'Ms. Nakato',
                subject: 'Physics',
                classes: ['S.4 Science A', 'S.3 Science'],
                performance: 92,
                attendance: 96,
                workload: 16,
                status: 'Active'
            },
            {
                id: 'T003',
                name: 'Dr. Mukasa',
                subject: 'Chemistry',
                classes: ['S.4 Science B', 'S.3 Science'],
                performance: 88,
                attendance: 94,
                workload: 14,
                status: 'Active'
            }
        ];
        
        this.displayTeacherTracking(teachers);
    }
    
    displayTeacherTracking(teachers) {
        const container = document.querySelector('#hod-interface');
        if (!container) return;
        
        // Create teacher tracking section if it doesn't exist
        let trackingSection = container.querySelector('.teacher-tracking');
        if (!trackingSection) {
            trackingSection = document.createElement('div');
            trackingSection.className = 'teacher-tracking';
            trackingSection.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h5>Teacher Tracking & Monitoring</h5>
                        <small class="text-muted">Monitor teacher performance and workload</small>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Teacher</th>
                                        <th>Subject</th>
                                        <th>Classes</th>
                                        <th>Performance</th>
                                        <th>Attendance</th>
                                        <th>Workload</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${teachers.map(teacher => `
                                        <tr>
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <div class="teacher-avatar me-2">${teacher.name.split(' ').map(n => n[0]).join('')}</div>
                                                    <div>
                                                        <strong>${teacher.name}</strong><br>
                                                        <small class="text-muted">${teacher.id}</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>${teacher.subject}</td>
                                            <td>${teacher.classes.join(', ')}</td>
                                            <td>
                                                <div class="progress" style="width: 60px; height: 20px;">
                                                    <div class="progress-bar" style="width: ${teacher.performance}%">${teacher.performance}%</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="progress" style="width: 60px; height: 20px;">
                                                    <div class="progress-bar bg-success" style="width: ${teacher.attendance}%">${teacher.attendance}%</div>
                                                </div>
                                            </td>
                                            <td>${teacher.workload} hrs/week</td>
                                            <td><span class="badge bg-success">${teacher.status}</span></td>
                                            <td>
                                                <button class="btn btn-sm btn-primary" onclick="viewTeacherDetails('${teacher.id}')">
                                                    View Details
                                                </button>
                                                <button class="btn btn-sm btn-warning" onclick="editTeacherAssignment('${teacher.id}')">
                                                    Edit Assignment
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
            container.appendChild(trackingSection);
        }
    }
    
    setupDepartmentResults() {
        // Setup department results analysis
        this.loadDepartmentResults();
    }
    
    loadDepartmentResults() {
        // Load department results for analysis
        const results = {
            totalStudents: 120,
            averageScore: 82.5,
            passRate: 88.3,
            subjectPerformance: [
                { subject: 'Mathematics', average: 85.2, passRate: 92.1 },
                { subject: 'Physics', average: 78.9, passRate: 86.7 },
                { subject: 'Chemistry', average: 81.4, passRate: 89.2 }
            ],
            gradeDistribution: {
                'A': 25,
                'B': 35,
                'C': 28,
                'D': 15,
                'E': 12,
                'F': 5
            }
        };
        
        this.displayDepartmentResults(results);
    }
    
    displayDepartmentResults(results) {
        const container = document.querySelector('#hod-interface');
        if (!container) return;
        
        // Create department results section if it doesn't exist
        let resultsSection = container.querySelector('.department-results');
        if (!resultsSection) {
            resultsSection = document.createElement('div');
            resultsSection.className = 'department-results';
            resultsSection.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h5>Department Results Analysis</h5>
                        <button class="btn btn-sm btn-primary">Export Results</button>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="card bg-light">
                                    <div class="card-body text-center">
                                        <h3 class="text-primary">${results.totalStudents}</h3>
                                        <p class="mb-0">Total Students</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card bg-light">
                                    <div class="card-body text-center">
                                        <h3 class="text-success">${results.averageScore}%</h3>
                                        <p class="mb-0">Average Score</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card bg-light">
                                    <div class="card-body text-center">
                                        <h3 class="text-info">${results.passRate}%</h3>
                                        <p class="mb-0">Pass Rate</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row mt-4">
                            <div class="col-md-6">
                                <h6>Subject Performance</h6>
                                <div class="table-responsive">
                                    <table class="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>Subject</th>
                                                <th>Average</th>
                                                <th>Pass Rate</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${results.subjectPerformance.map(subject => `
                                                <tr>
                                                    <td>${subject.subject}</td>
                                                    <td>${subject.average}%</td>
                                                    <td>${subject.passRate}%</td>
                                                </tr>
                                            `).join('')}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <h6>Grade Distribution</h6>
                                <div class="table-responsive">
                                    <table class="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>Grade</th>
                                                <th>Count</th>
                                                <th>Percentage</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${Object.entries(results.gradeDistribution).map(([grade, count]) => `
                                                <tr>
                                                    <td><strong>${grade}</strong></td>
                                                    <td>${count}</td>
                                                    <td>${((count / results.totalStudents) * 100).toFixed(1)}%</td>
                                                </tr>
                                            `).join('')}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(resultsSection);
        }
    }
    
    assignClassToTeacher(teacherId, classId, subjectId) {
        // Assign class to subject teacher
        console.log(`Assigning class ${classId} to teacher ${teacherId} for subject ${subjectId}`);
        
        // Simulate assignment
        SchoolManagement.showNotification('Class assigned successfully', 'success');
        
        // Update UI
        this.updateTeacherAssignment(teacherId, classId, subjectId);
    }
    
    updateTeacherAssignment(teacherId, classId, subjectId) {
        // Update teacher assignment in UI
        const teacherRow = document.querySelector(`[onclick="viewTeacherDetails('${teacherId}')"]`).closest('tr');
        if (teacherRow) {
            const classesCell = teacherRow.querySelector('td:nth-child(3)');
            if (classesCell) {
                const currentClasses = classesCell.textContent.split(', ');
                if (!currentClasses.includes(classId)) {
                    classesCell.textContent = [...currentClasses, classId].join(', ');
                }
            }
        }
    }
    
    approveResults() {
        // Approve department results
        if (confirm('Are you sure you want to approve all department results? This will make them visible to class teachers.')) {
            // Simulate approval
            SchoolManagement.showNotification('Department results approved successfully', 'success');
            
            // Update UI
            this.updateResultsStatus('Approved');
        }
    }
    
    updateResultsStatus(status) {
        // Update results status in UI
        const statusElements = document.querySelectorAll('.department-results .badge');
        statusElements.forEach(element => {
            element.textContent = status;
            element.className = `badge ${status === 'Approved' ? 'bg-success' : 'bg-warning'}`;
        });
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

// Initialize HOD Manager when the interface is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're in the HOD interface
    const hodInterface = document.getElementById('hod-interface');
    if (hodInterface && hodInterface.classList.contains('active')) {
        window.hodManager = new HODManager();
    }
});

// Export for use in other modules
window.HODManager = HODManager;
