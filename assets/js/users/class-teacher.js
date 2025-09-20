// Class Teacher Specific JavaScript
// This file contains functionality specific to the Class Teacher role

class ClassTeacherManager {
    constructor() {
        this.staffId = this.generateStaffId();
        this.initializeClassTeacherFeatures();
    }
    
    generateStaffId() {
        // Generate staff ID for class teacher
        const prefix = 'CT';
        const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `${prefix}${randomNum}`;
    }
    
    initializeClassTeacherFeatures() {
        this.setupClassOverview();
        this.setupMyClassStudents();
        this.setupAttendanceManagement();
        this.setupReportComments();
        this.setupStudentManagement();
        this.setupReportCardApproval();
    }
    
    setupClassOverview() {
        // Initialize class overview
        this.loadClassOverview();
    }
    
    loadClassOverview() {
        // Simulate loading class overview data
        const classData = {
            totalStudents: 45,
            attendanceRate: 92,
            averageGrade: 78,
            behaviorIssues: 3
        };
        
        this.displayClassOverview(classData);
    }
    
    displayClassOverview(data) {
        const container = document.querySelector('#class-teacher-interface');
        if (!container) return;
        
        // Create class overview section if it doesn't exist
        let overviewSection = container.querySelector('.class-overview');
        if (!overviewSection) {
            overviewSection = document.createElement('div');
            overviewSection.className = 'class-overview';
            overviewSection.innerHTML = `
                <div class="class-card students">
                    <div class="class-icon students">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="class-number students">${data.totalStudents}</div>
                    <div class="class-label">Total Students</div>
                    <div class="class-change positive">+2 this month</div>
                </div>
                <div class="class-card attendance">
                    <div class="class-icon attendance">
                        <i class="fas fa-clipboard-check"></i>
                    </div>
                    <div class="class-number attendance">${data.attendanceRate}%</div>
                    <div class="class-label">Attendance Rate</div>
                    <div class="class-change positive">+3% this week</div>
                </div>
                <div class="class-card grades">
                    <div class="class-icon grades">
                        <i class="fas fa-graduation-cap"></i>
                    </div>
                    <div class="class-number grades">${data.averageGrade}%</div>
                    <div class="class-label">Average Grade</div>
                    <div class="class-change positive">+5% this term</div>
                </div>
                <div class="class-card behavior">
                    <div class="class-icon behavior">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <div class="class-number behavior">${data.behaviorIssues}</div>
                    <div class="class-label">Behavior Issues</div>
                    <div class="class-change negative">-1 this week</div>
                </div>
            `;
            container.appendChild(overviewSection);
        }
    }
    
    setupMyClassStudents() {
        // Setup my class students
        this.loadMyClassStudents();
        this.setupStudentActions();
    }
    
    loadMyClassStudents() {
        // Simulate loading class students
        const students = [
            {
                id: 'S00123',
                name: 'Mukasa John',
                class: 'S.4 Science',
                attendance: 'Present',
                lastGrade: 'A',
                behavior: 'Good'
            },
            {
                id: 'S00124',
                name: 'Nakato Mary',
                class: 'S.4 Science',
                attendance: 'Present',
                lastGrade: 'B+',
                behavior: 'Excellent'
            },
            {
                id: 'S00125',
                name: 'Okot David',
                class: 'S.4 Science',
                attendance: 'Absent',
                lastGrade: 'C',
                behavior: 'Needs Improvement'
            }
        ];
        
        this.displayMyClassStudents(students);
    }
    
    displayMyClassStudents(students) {
        const container = document.querySelector('#class-teacher-interface');
        if (!container) return;
        
        // Create my class students section if it doesn't exist
        let studentsSection = container.querySelector('.my-class-students');
        if (!studentsSection) {
            studentsSection = document.createElement('div');
            studentsSection.className = 'my-class-students';
            studentsSection.innerHTML = `
                <div class="students-header">
                    <h5 class="students-title">My Class Students</h5>
                    <div class="students-actions">
                        <button class="students-btn">Add Student</button>
                        <button class="students-btn secondary">Export List</button>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table students-table">
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Class</th>
                                <th>Attendance</th>
                                <th>Last Grade</th>
                                <th>Behavior</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${students.map(student => `
                                <tr>
                                    <td>
                                        <div class="student-info">
                                            <div class="student-avatar">${student.name.split(' ').map(n => n[0]).join('')}</div>
                                            <div class="student-details">
                                                <h6>${student.name}</h6>
                                                <p>${student.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>${student.class}</td>
                                    <td><span class="attendance-status ${student.attendance.toLowerCase()}">${student.attendance}</span></td>
                                    <td><span class="badge bg-primary">${student.lastGrade}</span></td>
                                    <td><span class="badge ${this.getBehaviorBadgeClass(student.behavior)}">${student.behavior}</span></td>
                                    <td>
                                        <div class="student-actions">
                                            <button class="student-action-btn view" data-id="${student.id}">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                            <button class="student-action-btn edit" data-id="${student.id}">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            container.appendChild(studentsSection);
        }
    }
    
    getBehaviorBadgeClass(behavior) {
        switch(behavior) {
            case 'Excellent': return 'bg-success';
            case 'Good': return 'bg-primary';
            case 'Needs Improvement': return 'bg-warning';
            default: return 'bg-secondary';
        }
    }
    
    setupStudentActions() {
        // Setup student action handlers
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('student-action-btn') || e.target.closest('.student-action-btn')) {
                const action = e.target.closest('.student-action-btn').classList.contains('view') ? 'view' : 'edit';
                const studentId = e.target.closest('.student-action-btn').dataset.id;
                this.handleStudentAction(action, studentId);
            }
        });
    }
    
    handleStudentAction(action, studentId) {
        if (action === 'view') {
            this.viewStudentDetails(studentId);
        } else if (action === 'edit') {
            this.editStudent(studentId);
        }
    }
    
    viewStudentDetails(studentId) {
        const modal = this.createStudentDetailsModal(studentId);
        this.showModal(modal);
    }
    
    editStudent(studentId) {
        const modal = this.createEditStudentModal(studentId);
        this.showModal(modal);
    }
    
    createStudentDetailsModal(studentId) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Student Details - ${studentId}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-4 text-center">
                                <div class="student-avatar" style="width: 80px; height: 80px; margin: 0 auto 15px;">
                                    MJ
                                </div>
                                <h5>Mukasa John</h5>
                                <p class="text-muted">S.4 Science</p>
                            </div>
                            <div class="col-md-8">
                                <div class="row">
                                    <div class="col-md-6">
                                        <h6>Academic Information</h6>
                                        <table class="table table-sm">
                                            <tr>
                                                <td><strong>Student ID:</strong></td>
                                                <td>${studentId}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Class:</strong></td>
                                                <td>S.4 Science</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Average Grade:</strong></td>
                                                <td><span class="badge bg-success">A</span></td>
                                            </tr>
                                            <tr>
                                                <td><strong>Attendance Rate:</strong></td>
                                                <td>95%</td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="col-md-6">
                                        <h6>Recent Performance</h6>
                                        <div class="progress mb-2">
                                            <div class="progress-bar" style="width: 85%">85%</div>
                                        </div>
                                        <p class="small text-muted">Mathematics</p>
                                        
                                        <div class="progress mb-2">
                                            <div class="progress-bar bg-success" style="width: 92%">92%</div>
                                        </div>
                                        <p class="small text-muted">Physics</p>
                                        
                                        <div class="progress mb-2">
                                            <div class="progress-bar bg-info" style="width: 78%">78%</div>
                                        </div>
                                        <p class="small text-muted">Chemistry</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Edit Student</button>
                    </div>
                </div>
            </div>
        `;
        
        return modal;
    }
    
    createEditStudentModal(studentId) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Student - ${studentId}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label class="form-label">Full Name</label>
                                <input type="text" class="form-control" value="Mukasa John">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Class</label>
                                <select class="form-select">
                                    <option>S.4 Science</option>
                                    <option>S.3 Science</option>
                                    <option>S.2 Science</option>
                                    <option>S.1 Science</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Parent/Guardian</label>
                                <input type="text" class="form-control" value="John Mukasa Sr.">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Contact</label>
                                <input type="tel" class="form-control" value="+256 700 000 000">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Address</label>
                                <textarea class="form-control" rows="3">Kampala, Uganda</textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary">Save Changes</button>
                    </div>
                </div>
            </div>
        `;
        
        return modal;
    }
    
    setupAttendanceManagement() {
        // Setup attendance management
        this.loadAttendanceManagement();
        this.setupAttendanceActions();
    }
    
    loadAttendanceManagement() {
        // Simulate loading attendance data
        const attendanceData = {
            present: 42,
            absent: 3,
            late: 2,
            total: 47
        };
        
        this.displayAttendanceManagement(attendanceData);
    }
    
    displayAttendanceManagement(data) {
        const container = document.querySelector('#class-teacher-interface');
        if (!container) return;
        
        // Create attendance management section if it doesn't exist
        let attendanceSection = container.querySelector('.attendance-management');
        if (!attendanceSection) {
            attendanceSection = document.createElement('div');
            attendanceSection.className = 'attendance-management';
            attendanceSection.innerHTML = `
                <div class="attendance-header">
                    <h5 class="attendance-title">Attendance Management</h5>
                    <div class="attendance-date">
                        <label class="form-label">Date:</label>
                        <input type="date" class="date-picker" value="${new Date().toISOString().split('T')[0]}">
                    </div>
                </div>
                <div class="attendance-stats">
                    <div class="attendance-stat">
                        <span class="number">${data.present}</span>
                        <span class="label">Present</span>
                    </div>
                    <div class="attendance-stat">
                        <span class="number">${data.absent}</span>
                        <span class="label">Absent</span>
                    </div>
                    <div class="attendance-stat">
                        <span class="number">${data.late}</span>
                        <span class="label">Late</span>
                    </div>
                    <div class="attendance-stat">
                        <span class="number">${data.total}</span>
                        <span class="label">Total</span>
                    </div>
                </div>
                <div class="attendance-form">
                    <h6>Mark Attendance</h6>
                    <div class="attendance-options">
                        <div class="attendance-option">
                            <input type="radio" name="attendance" value="present" id="present">
                            <label for="present">Present</label>
                        </div>
                        <div class="attendance-option">
                            <input type="radio" name="attendance" value="absent" id="absent">
                            <label for="absent">Absent</label>
                        </div>
                        <div class="attendance-option">
                            <input type="radio" name="attendance" value="late" id="late">
                            <label for="late">Late</label>
                        </div>
                    </div>
                    <button class="btn btn-primary w-100 mt-3">Save Attendance</button>
                </div>
            `;
            container.appendChild(attendanceSection);
        }
    }
    
    setupAttendanceActions() {
        // Setup attendance action handlers
        document.addEventListener('click', (e) => {
            if (e.target.textContent === 'Save Attendance') {
                this.saveAttendance();
            }
        });
    }
    
    saveAttendance() {
        // Simulate saving attendance
        SchoolManagement.showNotification('Attendance saved successfully', 'success');
        
        // Update attendance stats
        this.updateAttendanceStats();
    }
    
    updateAttendanceStats() {
        // Simulate updating attendance statistics
        const stats = document.querySelectorAll('.attendance-stat .number');
        if (stats.length >= 4) {
            stats[0].textContent = Math.floor(Math.random() * 5) + 40; // Present
            stats[1].textContent = Math.floor(Math.random() * 3) + 1;  // Absent
            stats[2].textContent = Math.floor(Math.random() * 2) + 1;  // Late
            stats[3].textContent = parseInt(stats[0].textContent) + parseInt(stats[1].textContent) + parseInt(stats[2].textContent); // Total
        }
    }
    
    setupReportComments() {
        // Setup report comments
        this.loadReportComments();
        this.setupCommentActions();
    }
    
    loadReportComments() {
        // Simulate loading report comments
        const comments = [
            {
                student: 'Mukasa John',
                date: '2023-10-15',
                content: 'Excellent performance this term. Shows great improvement in mathematics and physics.',
                status: 'Draft'
            },
            {
                student: 'Nakato Mary',
                date: '2023-10-14',
                content: 'Good student with consistent performance. Needs to work on chemistry.',
                status: 'Submitted'
            },
            {
                student: 'Okot David',
                date: '2023-10-13',
                content: 'Shows potential but needs to focus more on studies. Attendance could be better.',
                status: 'Draft'
            }
        ];
        
        this.displayReportComments(comments);
    }
    
    displayReportComments(comments) {
        const container = document.querySelector('#class-teacher-interface');
        if (!container) return;
        
        // Create report comments section if it doesn't exist
        let commentsSection = container.querySelector('.report-comments');
        if (!commentsSection) {
            commentsSection = document.createElement('div');
            commentsSection.className = 'report-comments';
            commentsSection.innerHTML = `
                <div class="comments-header">
                    <h5 class="comments-title">Report Comments</h5>
                </div>
                <div class="comments-list">
                    ${comments.map(comment => `
                        <div class="comment-item">
                            <div class="comment-header">
                                <h6 class="comment-student">${comment.student}</h6>
                                <span class="comment-date">${comment.date}</span>
                            </div>
                            <p class="comment-content">${comment.content}</p>
                            <div class="comment-actions">
                                <button class="comment-btn">Edit</button>
                                <button class="comment-btn secondary">Delete</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            container.appendChild(commentsSection);
        }
    }
    
    setupCommentActions() {
        // Setup comment action handlers
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('comment-btn')) {
                const action = e.target.textContent.toLowerCase();
                if (action === 'edit') {
                    this.editComment(e.target.closest('.comment-item'));
                } else if (action === 'delete') {
                    this.deleteComment(e.target.closest('.comment-item'));
                }
            }
        });
    }
    
    editComment(commentItem) {
        const student = commentItem.querySelector('.comment-student').textContent;
        const content = commentItem.querySelector('.comment-content').textContent;
        
        const modal = this.createEditCommentModal(student, content);
        this.showModal(modal);
    }
    
    deleteComment(commentItem) {
        if (confirm('Are you sure you want to delete this comment?')) {
            commentItem.remove();
            SchoolManagement.showNotification('Comment deleted successfully', 'success');
        }
    }
    
    createEditCommentModal(student, content) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Comment - ${student}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label class="form-label">Comment</label>
                                <textarea class="form-control" rows="5" placeholder="Enter your comment here...">${content}</textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Status</label>
                                <select class="form-select">
                                    <option>Draft</option>
                                    <option>Submitted</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary">Save Comment</button>
                    </div>
                </div>
            </div>
        `;
        
        return modal;
    }
    
    setupStudentManagement() {
        // Setup student management (add/edit students)
        this.loadStudentManagement();
    }
    
    loadStudentManagement() {
        // Load student management interface
        this.setupStudentActions();
    }
    
    setupStudentActions() {
        // Setup student action handlers
        document.addEventListener('click', (e) => {
            if (e.target.textContent === 'Add Student') {
                this.addStudent();
            } else if (e.target.textContent === 'Edit Student') {
                this.editStudent(e.target.dataset.id);
            }
        });
    }
    
    addStudent() {
        const modal = this.createAddStudentModal();
        this.showModal(modal);
    }
    
    createAddStudentModal() {
        const studentId = this.generateStudentId();
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add Student to Class</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="add-student-form">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Student ID (Auto-generated)</label>
                                        <input type="text" class="form-control" value="${studentId}" readonly>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">First Name</label>
                                        <input type="text" class="form-control" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Last Name</label>
                                        <input type="text" class="form-control" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Date of Birth</label>
                                        <input type="date" class="form-control" required>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Class</label>
                                        <select class="form-select" required>
                                            <option>S.4 Science A</option>
                                            <option>S.4 Science B</option>
                                            <option>S.3 Science</option>
                                            <option>S.2 Science</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Parent/Guardian Name</label>
                                        <input type="text" class="form-control" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Parent/Guardian Phone</label>
                                        <input type="tel" class="form-control" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Address</label>
                                        <textarea class="form-control" rows="3"></textarea>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="saveStudent()">Add Student</button>
                    </div>
                </div>
            </div>
        `;
        
        return modal;
    }
    
    generateStudentId() {
        // Generate student ID automatically
        const prefix = 'S';
        const randomNum = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
        return `${prefix}${randomNum}`;
    }
    
    setupReportCardApproval() {
        // Setup report card approval
        this.loadReportCardApproval();
    }
    
    loadReportCardApproval() {
        // Load report cards for approval
        const reportCards = [
            {
                studentId: 'S00123',
                studentName: 'Mukasa John',
                class: 'S.4 Science A',
                term: 'First Term 2023',
                status: 'Pending Approval',
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
                status: 'Pending Approval',
                subjects: [
                    { subject: 'Mathematics', grade: 'B', score: 75 },
                    { subject: 'Physics', grade: 'A', score: 88 },
                    { subject: 'Chemistry', grade: 'B', score: 76 }
                ]
            }
        ];
        
        this.displayReportCardApproval(reportCards);
    }
    
    displayReportCardApproval(reportCards) {
        const container = document.querySelector('#class-teacher-interface');
        if (!container) return;
        
        // Create report card approval section if it doesn't exist
        let reportCardSection = container.querySelector('.report-card-approval');
        if (!reportCardSection) {
            reportCardSection = document.createElement('div');
            reportCardSection.className = 'report-card-approval';
            reportCardSection.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h5>Report Card Approval</h5>
                        <small class="text-muted">Approve report cards for your class</small>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
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
                                            <td><span class="badge bg-warning">${card.status}</span></td>
                                            <td>
                                                <button class="btn btn-sm btn-primary" onclick="viewReportCard('${card.studentId}')">
                                                    View Report
                                                </button>
                                                <button class="btn btn-sm btn-success" onclick="approveReportCard('${card.studentId}')">
                                                    Approve
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
    
    viewReportCard(studentId) {
        const modal = this.createReportCardModal(studentId);
        this.showModal(modal);
    }
    
    createReportCardModal(studentId) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Report Card - ${studentId}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h6>Student Information</h6>
                                <table class="table table-sm">
                                    <tr>
                                        <td><strong>Name:</strong></td>
                                        <td>Mukasa John</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Student ID:</strong></td>
                                        <td>${studentId}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Class:</strong></td>
                                        <td>S.4 Science A</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Term:</strong></td>
                                        <td>First Term 2023</td>
                                    </tr>
                                </table>
                            </div>
                            <div class="col-md-6">
                                <h6>Academic Performance</h6>
                                <table class="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Subject</th>
                                            <th>Grade</th>
                                            <th>Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Mathematics</td>
                                            <td><span class="badge bg-success">A</span></td>
                                            <td>85</td>
                                        </tr>
                                        <tr>
                                            <td>Physics</td>
                                            <td><span class="badge bg-primary">B</span></td>
                                            <td>78</td>
                                        </tr>
                                        <tr>
                                            <td>Chemistry</td>
                                            <td><span class="badge bg-success">A</span></td>
                                            <td>82</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="mt-3">
                            <h6>Class Teacher Comments</h6>
                            <textarea class="form-control" rows="4" placeholder="Enter your comments for this student..."></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save Comments</button>
                        <button type="button" class="btn btn-success">Approve Report Card</button>
                    </div>
                </div>
            </div>
        `;
        
        return modal;
    }
    
    approveReportCard(studentId) {
        if (confirm(`Are you sure you want to approve the report card for student ${studentId}?`)) {
            // Simulate approval
            SchoolManagement.showNotification('Report card approved successfully', 'success');
            
            // Update UI
            this.updateReportCardStatus(studentId, 'Approved');
        }
    }
    
    updateReportCardStatus(studentId, status) {
        // Update the report card status in the UI
        const row = document.querySelector(`[onclick="approveReportCard('${studentId}')"]`).closest('tr');
        if (row) {
            const statusCell = row.querySelector('.badge');
            if (statusCell) {
                statusCell.textContent = status;
                statusCell.className = `badge ${status === 'Approved' ? 'bg-success' : 'bg-warning'}`;
            }
            
            // Hide approve button
            const approveBtn = row.querySelector(`[onclick="approveReportCard('${studentId}')"]`);
            if (approveBtn) {
                approveBtn.style.display = 'none';
            }
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

// Initialize Class Teacher Manager when the interface is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're in the class teacher interface
    const classTeacherInterface = document.getElementById('class-teacher-interface');
    if (classTeacherInterface && classTeacherInterface.classList.contains('active')) {
        window.classTeacherManager = new ClassTeacherManager();
    }
});

// Export for use in other modules
window.ClassTeacherManager = ClassTeacherManager;
