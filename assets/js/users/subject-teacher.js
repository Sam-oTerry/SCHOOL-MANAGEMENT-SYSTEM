// Subject Teacher Specific JavaScript
// This file contains functionality specific to the Subject Teacher role

class SubjectTeacherManager {
    constructor() {
        this.staffId = this.generateStaffId();
        this.initializeSubjectTeacherFeatures();
    }
    
    generateStaffId() {
        // Generate staff ID for subject teacher
        const prefix = 'ST';
        const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `${prefix}${randomNum}`;
    }
    
    initializeSubjectTeacherFeatures() {
        this.setupSubjectOverview();
        this.setupMySubjects();
        this.setupGradeEntry();
        this.setupSubjectReports();
        this.setupStudentLists();
        this.setupAnnouncements();
        this.setupTimetable();
        this.setupProjectWork();
    }
    
    setupSubjectOverview() {
        // Initialize subject overview
        this.loadSubjectOverview();
    }
    
    loadSubjectOverview() {
        // Simulate loading subject overview data
        const subjectData = {
            mathematics: { classes: 3, students: 120, averageGrade: 85 },
            physics: { classes: 2, students: 80, averageGrade: 78 },
            chemistry: { classes: 2, students: 75, averageGrade: 82 }
        };
        
        this.displaySubjectOverview(subjectData);
    }
    
    displaySubjectOverview(data) {
        const container = document.querySelector('#subject-teacher-interface');
        if (!container) return;
        
        // Create subject overview section if it doesn't exist
        let overviewSection = container.querySelector('.subject-overview');
        if (!overviewSection) {
            overviewSection = document.createElement('div');
            overviewSection.className = 'subject-overview';
            overviewSection.innerHTML = `
                <div class="subject-card math">
                    <div class="subject-icon math">
                        <i class="fas fa-calculator"></i>
                    </div>
                    <div class="subject-name">Mathematics</div>
                    <div class="subject-classes">3 classes, 120 students</div>
                    <div class="subject-stats">
                        <div class="subject-stat">
                            <span class="number">85%</span>
                            <span class="label">Avg Grade</span>
                        </div>
                        <div class="subject-stat">
                            <span class="number">92%</span>
                            <span class="label">Pass Rate</span>
                        </div>
                    </div>
                </div>
                <div class="subject-card physics">
                    <div class="subject-icon physics">
                        <i class="fas fa-atom"></i>
                    </div>
                    <div class="subject-name">Physics</div>
                    <div class="subject-classes">2 classes, 80 students</div>
                    <div class="subject-stats">
                        <div class="subject-stat">
                            <span class="number">78%</span>
                            <span class="label">Avg Grade</span>
                        </div>
                        <div class="subject-stat">
                            <span class="number">88%</span>
                            <span class="label">Pass Rate</span>
                        </div>
                    </div>
                </div>
                <div class="subject-card chemistry">
                    <div class="subject-icon chemistry">
                        <i class="fas fa-flask"></i>
                    </div>
                    <div class="subject-name">Chemistry</div>
                    <div class="subject-classes">2 classes, 75 students</div>
                    <div class="subject-stats">
                        <div class="subject-stat">
                            <span class="number">82%</span>
                            <span class="label">Avg Grade</span>
                        </div>
                        <div class="subject-stat">
                            <span class="number">90%</span>
                            <span class="label">Pass Rate</span>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(overviewSection);
        }
    }
    
    setupMySubjects() {
        // Setup my subjects
        this.loadMySubjects();
        this.setupSubjectActions();
    }
    
    loadMySubjects() {
        // Simulate loading my subjects
        const subjects = [
            {
                name: 'Mathematics',
                level: 'S.4',
                classes: ['S.4 Science A', 'S.4 Science B', 'S.4 Arts'],
                students: 120,
                assignments: 8,
                exams: 3
            },
            {
                name: 'Physics',
                level: 'S.4',
                classes: ['S.4 Science A', 'S.4 Science B'],
                students: 80,
                assignments: 6,
                exams: 2
            },
            {
                name: 'Chemistry',
                level: 'S.4',
                classes: ['S.4 Science A', 'S.4 Science B'],
                students: 75,
                assignments: 7,
                exams: 2
            }
        ];
        
        this.displayMySubjects(subjects);
    }
    
    displayMySubjects(subjects) {
        const container = document.querySelector('#subject-teacher-interface');
        if (!container) return;
        
        // Create my subjects section if it doesn't exist
        let subjectsSection = container.querySelector('.my-subjects');
        if (!subjectsSection) {
            subjectsSection = document.createElement('div');
            subjectsSection.className = 'my-subjects';
            subjectsSection.innerHTML = `
                <div class="subjects-header">
                    <h5 class="subjects-title">My Subjects</h5>
                    <div class="subjects-actions">
                        <button class="subjects-btn">Add Subject</button>
                        <button class="subjects-btn secondary">View All</button>
                    </div>
                </div>
                <div class="subjects-grid">
                    ${subjects.map(subject => `
                        <div class="subject-item">
                            <div class="subject-item-header">
                                <h6 class="subject-item-title">${subject.name}</h6>
                                <span class="subject-item-level">${subject.level}</span>
                            </div>
                            <p class="subject-item-classes">${subject.classes.join(', ')}</p>
                            <div class="subject-item-stats">
                                <div class="subject-item-stat">
                                    <span class="number">${subject.students}</span>
                                    <span class="label">Students</span>
                                </div>
                                <div class="subject-item-stat">
                                    <span class="number">${subject.assignments}</span>
                                    <span class="label">Assignments</span>
                                </div>
                                <div class="subject-item-stat">
                                    <span class="number">${subject.exams}</span>
                                    <span class="label">Exams</span>
                                </div>
                            </div>
                            <div class="subject-item-actions">
                                <button class="subject-item-btn">View Details</button>
                                <button class="subject-item-btn">Enter Grades</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            container.appendChild(subjectsSection);
        }
    }
    
    setupSubjectActions() {
        // Setup subject action handlers
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('subject-item-btn')) {
                const action = e.target.textContent.toLowerCase();
                if (action.includes('view details')) {
                    this.viewSubjectDetails(e.target.closest('.subject-item'));
                } else if (action.includes('enter grades')) {
                    this.enterGrades(e.target.closest('.subject-item'));
                }
            }
        });
    }
    
    viewSubjectDetails(subjectItem) {
        const subjectName = subjectItem.querySelector('.subject-item-title').textContent;
        const modal = this.createSubjectDetailsModal(subjectName);
        this.showModal(modal);
    }
    
    enterGrades(subjectItem) {
        const subjectName = subjectItem.querySelector('.subject-item-title').textContent;
        this.showGradeEntryInterface(subjectName);
    }
    
    createSubjectDetailsModal(subjectName) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${subjectName} Details</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h6>Subject Information</h6>
                                <table class="table table-sm">
                                    <tr>
                                        <td><strong>Subject:</strong></td>
                                        <td>${subjectName}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Level:</strong></td>
                                        <td>S.4</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Classes:</strong></td>
                                        <td>3</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Total Students:</strong></td>
                                        <td>120</td>
                                    </tr>
                                </table>
                            </div>
                            <div class="col-md-6">
                                <h6>Performance Statistics</h6>
                                <div class="progress mb-2">
                                    <div class="progress-bar" style="width: 85%">85%</div>
                                </div>
                                <p class="small text-muted">Average Grade</p>
                                
                                <div class="progress mb-2">
                                    <div class="progress-bar bg-success" style="width: 92%">92%</div>
                                </div>
                                <p class="small text-muted">Pass Rate</p>
                                
                                <div class="progress mb-2">
                                    <div class="progress-bar bg-info" style="width: 78%">78%</div>
                                </div>
                                <p class="small text-muted">Attendance Rate</p>
                            </div>
                        </div>
                        <div class="mt-3">
                            <h6>Recent Assignments</h6>
                            <div class="table-responsive">
                                <table class="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Assignment</th>
                                            <th>Due Date</th>
                                            <th>Status</th>
                                            <th>Average Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Algebra Test</td>
                                            <td>2023-10-20</td>
                                            <td><span class="badge bg-success">Completed</span></td>
                                            <td>85%</td>
                                        </tr>
                                        <tr>
                                            <td>Geometry Assignment</td>
                                            <td>2023-10-25</td>
                                            <td><span class="badge bg-warning">Pending</span></td>
                                            <td>-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Enter Grades</button>
                    </div>
                </div>
            </div>
        `;
        
        return modal;
    }
    
    showGradeEntryInterface(subjectName) {
        const modal = this.createGradeEntryModal(subjectName);
        this.showModal(modal);
    }
    
    createGradeEntryModal(subjectName) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Enter Grades - ${subjectName}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="grade-filters mb-3">
                            <div class="grade-filter">
                                <label class="grade-filter-label">Class</label>
                                <select class="grade-filter-select">
                                    <option>S.4 Science A</option>
                                    <option>S.4 Science B</option>
                                    <option>S.4 Arts</option>
                                </select>
                            </div>
                            <div class="grade-filter">
                                <label class="grade-filter-label">Assignment</label>
                                <select class="grade-filter-select">
                                    <option>Algebra Test</option>
                                    <option>Geometry Assignment</option>
                                    <option>Trigonometry Quiz</option>
                                </select>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table grade-table">
                                <thead>
                                    <tr>
                                        <th>Student</th>
                                        <th>Student ID</th>
                                        <th>Grade</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="student-grade-info">
                                                <div class="student-grade-avatar">MJ</div>
                                                <div class="student-grade-details">
                                                    <h6>Mukasa John</h6>
                                                    <p>S.4 Science A</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>S00123</td>
                                        <td>
                                            <input type="number" class="grade-input" value="85" min="0" max="100">
                                        </td>
                                        <td>
                                            <div class="grade-actions">
                                                <button class="grade-action-btn save" data-id="1">
                                                    <i class="fas fa-save"></i>
                                                </button>
                                                <button class="grade-action-btn edit" data-id="1">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="student-grade-info">
                                                <div class="student-grade-avatar">NM</div>
                                                <div class="student-grade-details">
                                                    <h6>Nakato Mary</h6>
                                                    <p>S.4 Science A</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>S00124</td>
                                        <td>
                                            <input type="number" class="grade-input" value="92" min="0" max="100">
                                        </td>
                                        <td>
                                            <div class="grade-actions">
                                                <button class="grade-action-btn save" data-id="2">
                                                    <i class="fas fa-save"></i>
                                                </button>
                                                <button class="grade-action-btn edit" data-id="2">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary">Save All Grades</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add grade action handlers
        modal.querySelectorAll('.grade-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.closest('.grade-action-btn').classList.contains('save') ? 'save' : 'edit';
                const id = e.target.closest('.grade-action-btn').dataset.id;
                this.handleGradeAction(action, id);
            });
        });
        
        return modal;
    }
    
    handleGradeAction(action, id) {
        if (action === 'save') {
            this.saveGrade(id);
        } else if (action === 'edit') {
            this.editGrade(id);
        }
    }
    
    saveGrade(id) {
        // Simulate saving grade
        SchoolManagement.showNotification('Grade saved successfully', 'success');
        
        // Update grade input to show it's saved
        const gradeInput = document.querySelector(`[data-id="${id}"]`).closest('tr').querySelector('.grade-input');
        if (gradeInput) {
            gradeInput.style.borderColor = '#28a745';
            setTimeout(() => {
                gradeInput.style.borderColor = '';
            }, 2000);
        }
    }
    
    editGrade(id) {
        // Enable editing for the grade input
        const gradeInput = document.querySelector(`[data-id="${id}"]`).closest('tr').querySelector('.grade-input');
        if (gradeInput) {
            gradeInput.focus();
            gradeInput.select();
        }
    }
    
    setupGradeEntry() {
        // Setup grade entry functionality with new curriculum grading
        this.setupGradeEntryActions();
        this.setupGradingSystem();
    }
    
    setupGradingSystem() {
        // Use centralized grading system
        this.gradingScale = window.GradingSystem.gradingScale;
    }
    
    calculateGrade(score) {
        return window.GradingSystem.calculateGrade(score);
    }
    
    calculateFinalGrade(midTerm, endTerm) {
        return window.GradingSystem.calculateFinalGrade(midTerm, endTerm);
    }
    
    setupGradeEntryActions() {
        // Setup grade entry action handlers
        document.addEventListener('click', (e) => {
            if (e.target.textContent === 'Save All Grades') {
                this.saveAllGrades();
            }
        });
    }
    
    saveAllGrades() {
        // Simulate saving all grades
        SchoolManagement.showNotification('All grades saved successfully', 'success');
        
        // Close modal
        const modal = document.querySelector('.modal.show');
        if (modal) {
            const bsModal = bootstrap.Modal.getInstance(modal);
            bsModal.hide();
        }
    }
    
    setupSubjectReports() {
        // Setup subject reports
        this.loadSubjectReports();
    }
    
    loadSubjectReports() {
        // Simulate loading subject reports
        const reports = [
            {
                title: 'Performance Report',
                description: 'Detailed analysis of student performance in your subjects',
                icon: 'fas fa-chart-line'
            },
            {
                title: 'Grade Distribution',
                description: 'Visual breakdown of grade distribution across classes',
                icon: 'fas fa-chart-pie'
            },
            {
                title: 'Attendance Report',
                description: 'Student attendance patterns and trends',
                icon: 'fas fa-clipboard-check'
            },
            {
                title: 'Assignment Analysis',
                description: 'Analysis of assignment completion and performance',
                icon: 'fas fa-tasks'
            }
        ];
        
        this.displaySubjectReports(reports);
    }
    
    displaySubjectReports(reports) {
        const container = document.querySelector('#subject-teacher-interface');
        if (!container) return;
        
        // Create subject reports section if it doesn't exist
        let reportsSection = container.querySelector('.subject-reports');
        if (!reportsSection) {
            reportsSection = document.createElement('div');
            reportsSection.className = 'subject-reports';
            reportsSection.innerHTML = `
                <div class="reports-header">
                    <h5 class="reports-title">Subject Reports</h5>
                </div>
                <div class="reports-grid">
                    ${reports.map(report => `
                        <div class="report-card">
                            <div class="report-icon">
                                <i class="${report.icon}"></i>
                            </div>
                            <div class="report-title">${report.title}</div>
                            <div class="report-description">${report.description}</div>
                        </div>
                    `).join('')}
                </div>
            `;
            container.appendChild(reportsSection);
        }
    }
    
    setupStudentLists() {
        // Setup student lists for assigned subjects
        this.loadStudentLists();
    }
    
    loadStudentLists() {
        // Load students for assigned subjects
        const students = [
            {
                id: 'S00123',
                name: 'Mukasa John',
                class: 'S.4 Science A',
                subject: 'Mathematics',
                midTerm: 85,
                endTerm: 90,
                finalGrade: 'A'
            },
            {
                id: 'S00124',
                name: 'Nakato Mary',
                class: 'S.4 Science A',
                subject: 'Mathematics',
                midTerm: 78,
                endTerm: 82,
                finalGrade: 'B'
            }
        ];
        
        this.displayStudentLists(students);
    }
    
    displayStudentLists(students) {
        const container = document.querySelector('#subject-teacher-interface');
        if (!container) return;
        
        // Create student lists section if it doesn't exist
        let studentSection = container.querySelector('.student-lists');
        if (!studentSection) {
            studentSection = document.createElement('div');
            studentSection.className = 'student-lists';
            studentSection.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h5>Student Lists for Assigned Subjects</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Student ID</th>
                                        <th>Name</th>
                                        <th>Class</th>
                                        <th>Subject</th>
                                        <th>Mid Term (20%)</th>
                                        <th>End Term (80%)</th>
                                        <th>Final Grade</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${students.map(student => `
                                        <tr>
                                            <td>${student.id}</td>
                                            <td>${student.name}</td>
                                            <td>${student.class}</td>
                                            <td>${student.subject}</td>
                                            <td>${student.midTerm}</td>
                                            <td>${student.endTerm}</td>
                                            <td><span class="badge bg-primary">${student.finalGrade}</span></td>
                                            <td>
                                                <button class="btn btn-sm btn-primary" onclick="editStudentMarks('${student.id}')">
                                                    Edit Marks
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
    
    setupAnnouncements() {
        // Setup announcements viewing (read-only)
        this.loadAnnouncements();
    }
    
    loadAnnouncements() {
        // Load announcements (subject teacher can only view)
        const announcements = [
            {
                title: 'Mathematics Test Schedule',
                content: 'Mathematics test will be held on Friday, 20th October 2023',
                date: '2023-10-15',
                author: 'Director of Studies'
            },
            {
                title: 'Grade Entry Deadline',
                content: 'All grades must be entered by 25th October 2023',
                date: '2023-10-10',
                author: 'System Administrator'
            }
        ];
        
        this.displayAnnouncements(announcements);
    }
    
    displayAnnouncements(announcements) {
        const container = document.querySelector('#subject-teacher-interface');
        if (!container) return;
        
        // Create announcements section if it doesn't exist
        let announcementSection = container.querySelector('.announcements');
        if (!announcementSection) {
            announcementSection = document.createElement('div');
            announcementSection.className = 'announcements';
            announcementSection.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h5>Announcements</h5>
                        <small class="text-muted">Read-only access</small>
                    </div>
                    <div class="card-body">
                        ${announcements.map(announcement => `
                            <div class="alert alert-info">
                                <h6>${announcement.title}</h6>
                                <p>${announcement.content}</p>
                                <small class="text-muted">By ${announcement.author} on ${announcement.date}</small>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            container.appendChild(announcementSection);
        }
    }
    
    setupTimetable() {
        // Setup timetable and school calendar viewing
        this.loadTimetable();
    }
    
    loadTimetable() {
        // Load timetable for subject teacher
        const timetable = {
            monday: [
                { time: '08:00-09:00', subject: 'Mathematics', class: 'S.4 Science A' },
                { time: '09:00-10:00', subject: 'Mathematics', class: 'S.4 Science B' },
                { time: '10:00-11:00', subject: 'Mathematics', class: 'S.3 Science' }
            ],
            tuesday: [
                { time: '08:00-09:00', subject: 'Mathematics', class: 'S.4 Science A' },
                { time: '09:00-10:00', subject: 'Mathematics', class: 'S.4 Science B' }
            ]
        };
        
        this.displayTimetable(timetable);
    }
    
    displayTimetable(timetable) {
        const container = document.querySelector('#subject-teacher-interface');
        if (!container) return;
        
        // Create timetable section if it doesn't exist
        let timetableSection = container.querySelector('.timetable');
        if (!timetableSection) {
            timetableSection = document.createElement('div');
            timetableSection.className = 'timetable';
            timetableSection.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h5>Teaching Timetable</h5>
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
    
    setupProjectWork() {
        // Setup project work management
        this.loadProjectWork();
    }
    
    loadProjectWork() {
        // Load project work assignments
        const projects = [
            {
                id: 'P001',
                title: 'Algebra Project',
                subject: 'Mathematics',
                class: 'S.4 Science A',
                dueDate: '2023-11-15',
                status: 'Active'
            },
            {
                id: 'P002',
                title: 'Geometry Assignment',
                subject: 'Mathematics',
                class: 'S.4 Science B',
                dueDate: '2023-11-20',
                status: 'Active'
            }
        ];
        
        this.displayProjectWork(projects);
    }
    
    displayProjectWork(projects) {
        const container = document.querySelector('#subject-teacher-interface');
        if (!container) return;
        
        // Create project work section if it doesn't exist
        let projectSection = container.querySelector('.project-work');
        if (!projectSection) {
            projectSection = document.createElement('div');
            projectSection.className = 'project-work';
            projectSection.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h5>Project Work Management</h5>
                        <button class="btn btn-sm btn-primary">Add Project</button>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Project ID</th>
                                        <th>Title</th>
                                        <th>Subject</th>
                                        <th>Class</th>
                                        <th>Due Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${projects.map(project => `
                                        <tr>
                                            <td>${project.id}</td>
                                            <td>${project.title}</td>
                                            <td>${project.subject}</td>
                                            <td>${project.class}</td>
                                            <td>${project.dueDate}</td>
                                            <td><span class="badge bg-success">${project.status}</span></td>
                                            <td>
                                                <button class="btn btn-sm btn-primary">Edit</button>
                                                <button class="btn btn-sm btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(projectSection);
        }
    }
    
    analyzeResults() {
        // Analyze subject results
        const analysis = {
            totalStudents: 45,
            averageScore: 78.5,
            passRate: 85.2,
            gradeDistribution: {
                'A': 8,
                'B': 15,
                'C': 12,
                'D': 6,
                'E': 3,
                'F': 1
            }
        };
        
        this.displayAnalysis(analysis);
    }
    
    displayAnalysis(analysis) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Subject Results Analysis</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h6>Overall Statistics</h6>
                                <table class="table table-sm">
                                    <tr>
                                        <td><strong>Total Students:</strong></td>
                                        <td>${analysis.totalStudents}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Average Score:</strong></td>
                                        <td>${analysis.averageScore}%</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Pass Rate:</strong></td>
                                        <td>${analysis.passRate}%</td>
                                    </tr>
                                </table>
                            </div>
                            <div class="col-md-6">
                                <h6>Grade Distribution</h6>
                                <table class="table table-sm">
                                    ${Object.entries(analysis.gradeDistribution).map(([grade, count]) => `
                                        <tr>
                                            <td><strong>Grade ${grade}:</strong></td>
                                            <td>${count} students</td>
                                        </tr>
                                    `).join('')}
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Export Analysis</button>
                    </div>
                </div>
            </div>
        `;
        
        this.showModal(modal);
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

// Initialize Subject Teacher Manager when the interface is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're in the subject teacher interface
    const subjectTeacherInterface = document.getElementById('subject-teacher-interface');
    if (subjectTeacherInterface && subjectTeacherInterface.classList.contains('active')) {
        window.subjectTeacherManager = new SubjectTeacherManager();
    }
});

// Export for use in other modules
window.SubjectTeacherManager = SubjectTeacherManager;
