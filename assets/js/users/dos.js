// Director of Studies Specific JavaScript
// This file contains functionality specific to the Director of Studies role

class DOSManager {
    constructor() {
        this.staffId = this.generateStaffId();
        this.initializeDOSFeatures();
    }
    
    generateStaffId() {
        // Generate staff ID for DOS
        const prefix = 'DOS';
        const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `${prefix}${randomNum}`;
    }
    
    initializeDOSFeatures() {
        this.setupAcademicPrograms();
        this.setupGradeVerification();
        this.setupPerformanceAnalytics();
        this.setupAcademicProgress();
        this.setupReportCards();
        this.setupAnnouncements();
        this.setupTimetable();
        this.setupAcademicCalendar();
        this.setupStudentIDs();
    }
    
    setupAcademicPrograms() {
        // Initialize academic programs
        this.loadAcademicPrograms();
        this.setupProgramActions();
    }
    
    loadAcademicPrograms() {
        // Simulate loading academic programs
        const programs = [
            {
                name: 'Science Program',
                level: 'O-Level',
                students: 245,
                teachers: 12,
                subjects: 8,
                passRate: 94
            },
            {
                name: 'Arts Program',
                level: 'O-Level',
                students: 180,
                teachers: 8,
                subjects: 6,
                passRate: 89
            },
            {
                name: 'A-Level Sciences',
                level: 'A-Level',
                students: 95,
                teachers: 6,
                subjects: 4,
                passRate: 92
            }
        ];
        
        this.displayAcademicPrograms(programs);
    }
    
    displayAcademicPrograms(programs) {
        const container = document.querySelector('#dos-interface .card-body');
        if (!container) return;
        
        container.innerHTML = '<h5>Academic Programs</h5>';
        
        programs.forEach(program => {
            const programCard = document.createElement('div');
            programCard.className = 'program-card';
            programCard.innerHTML = `
                <div class="program-header">
                    <h6 class="program-title">${program.name}</h6>
                    <span class="program-level">${program.level}</span>
                </div>
                <p class="program-item-classes">${program.subjects} subjects, ${program.teachers} teachers</p>
                <div class="program-stats">
                    <div class="stat-item">
                        <span class="number">${program.students}</span>
                        <span class="label">Students</span>
                    </div>
                    <div class="stat-item">
                        <span class="number">${program.teachers}</span>
                        <span class="label">Teachers</span>
                    </div>
                    <div class="stat-item">
                        <span class="number">${program.passRate}%</span>
                        <span class="label">Pass Rate</span>
                    </div>
                </div>
            `;
            container.appendChild(programCard);
        });
    }
    
    setupProgramActions() {
        // Setup program action handlers
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('program-card')) {
                this.showProgramDetails(e.target);
            }
        });
    }
    
    showProgramDetails(programCard) {
        const programName = programCard.querySelector('.program-title').textContent;
        const modal = this.createProgramDetailsModal(programName);
        this.showModal(modal);
    }
    
    createProgramDetailsModal(programName) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${programName} Details</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h6>Program Statistics</h6>
                                <div class="table-responsive">
                                    <table class="table table-sm">
                                        <tr>
                                            <td>Total Students</td>
                                            <td><strong>245</strong></td>
                                        </tr>
                                        <tr>
                                            <td>Teaching Staff</td>
                                            <td><strong>12</strong></td>
                                        </tr>
                                        <tr>
                                            <td>Subjects Offered</td>
                                            <td><strong>8</strong></td>
                                        </tr>
                                        <tr>
                                            <td>Pass Rate</td>
                                            <td><strong>94%</strong></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <h6>Recent Performance</h6>
                                <div class="progress mb-2">
                                    <div class="progress-bar" style="width: 94%">94%</div>
                                </div>
                                <p class="small text-muted">Overall pass rate for last term</p>
                                
                                <h6>Subject Breakdown</h6>
                                <div class="list-group list-group-flush">
                                    <div class="list-group-item d-flex justify-content-between">
                                        <span>Mathematics</span>
                                        <span class="badge bg-success">96%</span>
                                    </div>
                                    <div class="list-group-item d-flex justify-content-between">
                                        <span>Physics</span>
                                        <span class="badge bg-success">92%</span>
                                    </div>
                                    <div class="list-group-item d-flex justify-content-between">
                                        <span>Chemistry</span>
                                        <span class="badge bg-success">94%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Generate Report</button>
                    </div>
                </div>
            </div>
        `;
        
        return modal;
    }
    
    setupGradeVerification() {
        // Setup grade verification
        this.loadGradeVerification();
        this.setupVerificationActions();
    }
    
    loadGradeVerification() {
        // Simulate loading grade verification data
        const verificationData = {
            pending: 15,
            approved: 120,
            rejected: 3
        };
        
        this.displayGradeVerification(verificationData);
    }
    
    displayGradeVerification(data) {
        const container = document.querySelector('#dos-interface');
        if (!container) return;
        
        // Create grade verification section if it doesn't exist
        let verificationSection = container.querySelector('.grade-verification');
        if (!verificationSection) {
            verificationSection = document.createElement('div');
            verificationSection.className = 'grade-verification';
            verificationSection.innerHTML = `
                <div class="verification-header">
                    <h5 class="verification-title">Grade Verification</h5>
                    <div class="verification-stats">
                        <div class="verification-stat">
                            <span class="number">${data.pending}</span>
                            <span class="label">Pending</span>
                        </div>
                        <div class="verification-stat">
                            <span class="number">${data.approved}</span>
                            <span class="label">Approved</span>
                        </div>
                        <div class="verification-stat">
                            <span class="number">${data.rejected}</span>
                            <span class="label">Rejected</span>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table grade-table">
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
                                    <div class="subject-grade">
                                        <div class="subject-icon">M</div>
                                        <div>
                                            <strong>Mathematics</strong>
                                            <br><small class="text-muted">S.4 Science</small>
                                        </div>
                                    </div>
                                </td>
                                <td>S.4 Science</td>
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
                        </tbody>
                    </table>
                </div>
            `;
            container.appendChild(verificationSection);
        }
    }
    
    setupVerificationActions() {
        // Setup verification action handlers
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
        this.updateGradeStatus(id, action);
    }
    
    updateGradeStatus(id, action) {
        // Update the grade status in the UI
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
    
    setupPerformanceAnalytics() {
        // Setup performance analytics
        this.loadPerformanceAnalytics();
    }
    
    loadPerformanceAnalytics() {
        // Simulate loading performance analytics
        const analytics = {
            overallPerformance: 92,
            subjectPerformance: 88,
            teacherEffectiveness: 95,
            studentEngagement: 87
        };
        
        this.displayPerformanceAnalytics(analytics);
    }
    
    displayPerformanceAnalytics(analytics) {
        const container = document.querySelector('#dos-interface');
        if (!container) return;
        
        // Create performance analytics section if it doesn't exist
        let analyticsSection = container.querySelector('.performance-analytics');
        if (!analyticsSection) {
            analyticsSection = document.createElement('div');
            analyticsSection.className = 'performance-analytics';
            analyticsSection.innerHTML = `
                <div class="analytics-header">
                    <h5 class="analytics-title">Performance Analytics</h5>
                </div>
                <div class="performance-metrics">
                    <div class="performance-metric">
                        <div class="performance-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="performance-value">${analytics.overallPerformance}%</div>
                        <div class="performance-label">Overall Performance</div>
                        <div class="performance-trend positive">+5% from last term</div>
                    </div>
                    <div class="performance-metric">
                        <div class="performance-icon">
                            <i class="fas fa-book"></i>
                        </div>
                        <div class="performance-value">${analytics.subjectPerformance}%</div>
                        <div class="performance-label">Subject Performance</div>
                        <div class="performance-trend positive">+3% from last term</div>
                    </div>
                    <div class="performance-metric">
                        <div class="performance-icon">
                            <i class="fas fa-chalkboard-teacher"></i>
                        </div>
                        <div class="performance-value">${analytics.teacherEffectiveness}%</div>
                        <div class="performance-label">Teacher Effectiveness</div>
                        <div class="performance-trend positive">+2% from last term</div>
                    </div>
                    <div class="performance-metric">
                        <div class="performance-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="performance-value">${analytics.studentEngagement}%</div>
                        <div class="performance-label">Student Engagement</div>
                        <div class="performance-trend positive">+4% from last term</div>
                    </div>
                </div>
            `;
            container.appendChild(analyticsSection);
        }
    }
    
    setupAcademicProgress() {
        // Setup academic progress tracking
        this.loadAcademicProgress();
    }
    
    loadAcademicProgress() {
        // Load academic progress data
        const progress = {
            totalStudents: 1200,
            averagePerformance: 78.5,
            passRate: 85.2,
            classPerformance: [
                { class: 'S.4 Science A', average: 82.3, passRate: 90.1 },
                { class: 'S.4 Science B', average: 79.8, passRate: 87.5 },
                { class: 'S.3 Science', average: 76.2, passRate: 83.3 },
                { class: 'S.2 Science', average: 74.1, passRate: 80.0 }
            ],
            subjectPerformance: [
                { subject: 'Mathematics', average: 81.2, passRate: 88.5 },
                { subject: 'Physics', average: 77.8, passRate: 84.2 },
                { subject: 'Chemistry', average: 79.5, passRate: 86.1 },
                { subject: 'Biology', average: 75.3, passRate: 82.7 }
            ]
        };
        
        this.displayAcademicProgress(progress);
    }
    
    displayAcademicProgress(progress) {
        const container = document.querySelector('#dos-interface');
        if (!container) return;
        
        // Create academic progress section if it doesn't exist
        let progressSection = container.querySelector('.academic-progress');
        if (!progressSection) {
            progressSection = document.createElement('div');
            progressSection.className = 'academic-progress';
            progressSection.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h5>Academic Progress Tracking</h5>
                        <button class="btn btn-sm btn-primary">Export Progress Report</button>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="card bg-light">
                                    <div class="card-body text-center">
                                        <h3 class="text-primary">${progress.totalStudents}</h3>
                                        <p class="mb-0">Total Students</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card bg-light">
                                    <div class="card-body text-center">
                                        <h3 class="text-success">${progress.averagePerformance}%</h3>
                                        <p class="mb-0">Average Performance</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card bg-light">
                                    <div class="card-body text-center">
                                        <h3 class="text-info">${progress.passRate}%</h3>
                                        <p class="mb-0">Pass Rate</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card bg-light">
                                    <div class="card-body text-center">
                                        <h3 class="text-warning">15</h3>
                                        <p class="mb-0">Classes</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row mt-4">
                            <div class="col-md-6">
                                <h6>Class Performance</h6>
                                <div class="table-responsive">
                                    <table class="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>Class</th>
                                                <th>Average</th>
                                                <th>Pass Rate</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${progress.classPerformance.map(cls => `
                                                <tr>
                                                    <td>${cls.class}</td>
                                                    <td>${cls.average}%</td>
                                                    <td>${cls.passRate}%</td>
                                                </tr>
                                            `).join('')}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
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
                                            ${progress.subjectPerformance.map(subject => `
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
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(progressSection);
        }
    }
    
    setupReportCards() {
        // Setup report card printing
        this.loadReportCards();
    }
    
    loadReportCards() {
        // Load report cards for printing
        const reportCards = [
            {
                studentId: 'S00123',
                studentName: 'Mukasa John',
                class: 'S.4 Science A',
                term: 'First Term 2023',
                status: 'Ready for Printing',
                subjects: [
                    { subject: 'Mathematics', grade: 'A', score: 85 },
                    { subject: 'Physics', grade: 'B', score: 78 },
                    { subject: 'Chemistry', grade: 'A', score: 82 }
                ]
            },
            {
                studentId: 'S00124',
                studentName: 'Nakato Mary',
                class: 'S.4 Science A',
                term: 'First Term 2023',
                status: 'Ready for Printing',
                subjects: [
                    { subject: 'Mathematics', grade: 'B', score: 75 },
                    { subject: 'Physics', grade: 'A', score: 88 },
                    { subject: 'Chemistry', grade: 'B', score: 76 }
                ]
            }
        ];
        
        this.displayReportCards(reportCards);
    }
    
    displayReportCards(reportCards) {
        const container = document.querySelector('#dos-interface');
        if (!container) return;
        
        // Create report cards section if it doesn't exist
        let reportCardSection = container.querySelector('.report-cards');
        if (!reportCardSection) {
            reportCardSection = document.createElement('div');
            reportCardSection.className = 'report-cards';
            reportCardSection.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h5>Report Card Management</h5>
                        <div class="btn-group">
                            <button class="btn btn-sm btn-primary">Print All</button>
                            <button class="btn btn-sm btn-success">Print Selected</button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" id="select-all">
                                        </th>
                                        <th>Student</th>
                                        <th>Class</th>
                                        <th>Term</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${reportCards.map(card => `
                                        <tr>
                                            <td>
                                                <input type="checkbox" class="report-card-checkbox" value="${card.studentId}">
                                            </td>
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <div class="student-avatar me-2">${card.studentName.split(' ').map(n => n[0]).join('')}</div>
                                                    <div>
                                                        <strong>${card.studentName}</strong><br>
                                                        <small class="text-muted">${card.studentId}</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>${card.class}</td>
                                            <td>${card.term}</td>
                                            <td><span class="badge bg-success">${card.status}</span></td>
                                            <td>
                                                <button class="btn btn-sm btn-primary" onclick="printReportCard('${card.studentId}')">
                                                    <i class="fas fa-print"></i> Print
                                                </button>
                                                <button class="btn btn-sm btn-info" onclick="viewReportCard('${card.studentId}')">
                                                    <i class="fas fa-eye"></i> View
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
            container.appendChild(reportCardSection);
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
                title: 'Mathematics Test Schedule',
                content: 'Mathematics test will be held on Friday, 20th October 2023 at 9:00 AM',
                date: '2023-10-15',
                author: 'Director of Studies',
                status: 'Active'
            },
            {
                id: 'ANN002',
                title: 'Grade Entry Deadline',
                content: 'All grades must be entered by 25th October 2023. Late submissions will not be accepted.',
                date: '2023-10-10',
                author: 'Director of Studies',
                status: 'Active'
            },
            {
                id: 'ANN003',
                title: 'Parent-Teacher Meeting',
                content: 'Parent-Teacher meeting scheduled for 30th October 2023 at 2:00 PM in the main hall.',
                date: '2023-10-12',
                author: 'Director of Studies',
                status: 'Active'
            }
        ];
        
        this.displayAnnouncements(announcements);
    }
    
    displayAnnouncements(announcements) {
        const container = document.querySelector('#dos-interface');
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
    
    setupTimetable() {
        // Setup timetable management
        this.loadTimetable();
    }
    
    loadTimetable() {
        // Load timetable data
        const timetable = {
            monday: [
                { time: '08:00-09:00', subject: 'Mathematics', class: 'S.4 Science A', teacher: 'Mr. Okello' },
                { time: '09:00-10:00', subject: 'Physics', class: 'S.4 Science A', teacher: 'Ms. Nakato' },
                { time: '10:00-11:00', subject: 'Chemistry', class: 'S.4 Science A', teacher: 'Dr. Mukasa' }
            ],
            tuesday: [
                { time: '08:00-09:00', subject: 'Mathematics', class: 'S.4 Science B', teacher: 'Mr. Okello' },
                { time: '09:00-10:00', subject: 'Physics', class: 'S.4 Science B', teacher: 'Ms. Nakato' }
            ],
            wednesday: [
                { time: '08:00-09:00', subject: 'Biology', class: 'S.3 Science', teacher: 'Dr. Namukasa' },
                { time: '09:00-10:00', subject: 'Mathematics', class: 'S.3 Science', teacher: 'Mr. Okello' }
            ]
        };
        
        this.displayTimetable(timetable);
    }
    
    displayTimetable(timetable) {
        const container = document.querySelector('#dos-interface');
        if (!container) return;
        
        // Create timetable section if it doesn't exist
        let timetableSection = container.querySelector('.timetable');
        if (!timetableSection) {
            timetableSection = document.createElement('div');
            timetableSection.className = 'timetable';
            timetableSection.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h5>Teaching Timetable Management</h5>
                        <button class="btn btn-sm btn-primary" onclick="editTimetable()">
                            <i class="fas fa-edit"></i> Edit Timetable
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Day</th>
                                        <th>Time</th>
                                        <th>Subject</th>
                                        <th>Class</th>
                                        <th>Teacher</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${Object.entries(timetable).map(([day, classes]) => 
                                        classes.map((cls, index) => `
                                            <tr>
                                                ${index === 0 ? `<td rowspan="${classes.length}">${day.charAt(0).toUpperCase() + day.slice(1)}</td>` : ''}
                                                <td>${cls.time}</td>
                                                <td>${cls.subject}</td>
                                                <td>${cls.class}</td>
                                                <td>${cls.teacher}</td>
                                                <td>
                                                    <button class="btn btn-sm btn-warning" onclick="editTimetableSlot('${day}', '${cls.time}')">
                                                        <i class="fas fa-edit"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        `).join('')
                                    ).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(timetableSection);
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
        const container = document.querySelector('#dos-interface');
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
    
    setupStudentIDs() {
        // Setup student ID management
        this.loadStudentIDs();
    }
    
    loadStudentIDs() {
        // Load student IDs for printing
        const students = [
            {
                id: 'S00123',
                name: 'Mukasa John',
                class: 'S.4 Science A',
                photo: 'placeholder.jpg',
                status: 'Active'
            },
            {
                id: 'S00124',
                name: 'Nakato Mary',
                class: 'S.4 Science A',
                photo: 'placeholder.jpg',
                status: 'Active'
            },
            {
                id: 'S00125',
                name: 'Okot David',
                class: 'S.3 Science',
                photo: 'placeholder.jpg',
                status: 'Active'
            }
        ];
        
        this.displayStudentIDs(students);
    }
    
    displayStudentIDs(students) {
        const container = document.querySelector('#dos-interface');
        if (!container) return;
        
        // Create student IDs section if it doesn't exist
        let studentIDSection = container.querySelector('.student-ids');
        if (!studentIDSection) {
            studentIDSection = document.createElement('div');
            studentIDSection.className = 'student-ids';
            studentIDSection.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h5>Student ID Management</h5>
                        <div class="btn-group">
                            <button class="btn btn-sm btn-primary" onclick="printAllStudentIDs()">
                                <i class="fas fa-print"></i> Print All
                            </button>
                            <button class="btn btn-sm btn-success" onclick="printSelectedStudentIDs()">
                                <i class="fas fa-print"></i> Print Selected
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" id="select-all-ids">
                                        </th>
                                        <th>Student ID</th>
                                        <th>Name</th>
                                        <th>Class</th>
                                        <th>Photo</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${students.map(student => `
                                        <tr>
                                            <td>
                                                <input type="checkbox" class="student-id-checkbox" value="${student.id}">
                                            </td>
                                            <td><strong>${student.id}</strong></td>
                                            <td>${student.name}</td>
                                            <td>${student.class}</td>
                                            <td>
                                                <img src="assets/images/${student.photo}" alt="Student Photo" class="rounded" style="width: 40px; height: 40px;">
                                            </td>
                                            <td><span class="badge bg-success">${student.status}</span></td>
                                            <td>
                                                <button class="btn btn-sm btn-primary" onclick="printStudentID('${student.id}')">
                                                    <i class="fas fa-print"></i> Print
                                                </button>
                                                <button class="btn btn-sm btn-info" onclick="viewStudentID('${student.id}')">
                                                    <i class="fas fa-eye"></i> View
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
            container.appendChild(studentIDSection);
        }
    }
    
    setDeadline(activity, deadline) {
        // Set deadline for activities
        console.log(`Setting deadline for ${activity}: ${deadline}`);
        
        // Simulate setting deadline
        SchoolManagement.showNotification(`Deadline set for ${activity}: ${deadline}`, 'success');
        
        // Update UI
        this.updateDeadline(activity, deadline);
    }
    
    updateDeadline(activity, deadline) {
        // Update deadline in UI
        const deadlineElement = document.querySelector(`[data-activity="${activity}"]`);
        if (deadlineElement) {
            deadlineElement.textContent = deadline;
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

// Initialize DOS Manager when the interface is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're in the DOS interface
    const dosInterface = document.getElementById('dos-interface');
    if (dosInterface && dosInterface.classList.contains('active')) {
        window.dosManager = new DOSManager();
    }
});

// Export for use in other modules
window.DOSManager = DOSManager;
