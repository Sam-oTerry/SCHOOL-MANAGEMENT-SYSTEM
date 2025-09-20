// Head Teacher Specific JavaScript
// This file contains functionality specific to the Head Teacher role

class HeadTeacherManager {
    constructor() {
        this.staffId = this.generateStaffId();
        this.initializeHeadTeacherFeatures();
    }
    
    generateStaffId() {
        // Generate staff ID for head teacher
        const prefix = 'HT';
        const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `${prefix}${randomNum}`;
    }
    
    initializeHeadTeacherFeatures() {
        this.setupDashboard();
        this.setupApprovals();
        this.setupReports();
        this.setupEMISExport();
        this.setupFinanceManagement();
        this.setupBursarySystem();
        this.setupReportCardApproval();
    }
    
    setupDashboard() {
        // Initialize dashboard statistics
        this.loadDashboardStats();
        
        // Setup real-time updates
        this.setupRealTimeUpdates();
    }
    
    loadDashboardStats() {
        // Simulate loading dashboard statistics
        const stats = {
            totalStudents: 1248,
            teachingStaff: 68,
            feeCollectionRate: 85,
            passRate: 92
        };
        
        this.updateDashboardStats(stats);
    }
    
    updateDashboardStats(stats) {
        // Update the statistics display
        const statElements = {
            'total-students': stats.totalStudents,
            'teaching-staff': stats.teachingStaff,
            'fee-collection': stats.feeCollectionRate,
            'pass-rate': stats.passRate
        };
        
        Object.entries(statElements).forEach(([id, value]) => {
            const element = document.querySelector(`[data-stat="${id}"]`);
            if (element) {
                element.textContent = value;
            }
        });
    }
    
    setupRealTimeUpdates() {
        // Simulate real-time updates every 30 seconds
        setInterval(() => {
            this.updateRealTimeData();
        }, 30000);
    }
    
    updateRealTimeData() {
        // Simulate real-time data updates
        const updates = {
            totalStudents: Math.floor(Math.random() * 10) + 1240,
            teachingStaff: Math.floor(Math.random() * 5) + 65,
            feeCollectionRate: Math.floor(Math.random() * 10) + 80,
            passRate: Math.floor(Math.random() * 5) + 90
        };
        
        this.updateDashboardStats(updates);
    }
    
    setupApprovals() {
        // Setup approval management
        this.loadPendingApprovals();
        this.setupApprovalActions();
    }
    
    loadPendingApprovals() {
        // Simulate loading pending approvals
        const approvals = [
            {
                type: 'Report Cards',
                count: 15,
                icon: 'fas fa-file-alt',
                description: 'pending approval'
            },
            {
                type: 'Student IDs',
                count: 23,
                icon: 'fas fa-id-card',
                description: 'pending approval'
            },
            {
                type: 'EMIS Data',
                count: 1,
                icon: 'fas fa-chart-line',
                description: 'Ready for export'
            }
        ];
        
        this.displayPendingApprovals(approvals);
    }
    
    displayPendingApprovals(approvals) {
        const container = document.querySelector('.approval-section .card-body');
        if (!container) return;
        
        container.innerHTML = '';
        
        approvals.forEach(approval => {
            const approvalElement = document.createElement('div');
            approvalElement.className = 'd-flex align-items-center mb-3';
            approvalElement.innerHTML = `
                <div class="feature-icon">
                    <i class="${approval.icon}"></i>
                </div>
                <div>
                    <h6 class="mb-0">${approval.type}</h6>
                    <p class="text-muted mb-0">${approval.count} ${approval.description}</p>
                </div>
            `;
            container.appendChild(approvalElement);
        });
        
        // Add manage approvals button
        const button = document.createElement('button');
        button.className = 'btn btn-primary w-100 mt-3';
        button.textContent = 'Manage Approvals';
        button.addEventListener('click', () => this.showApprovalsModal());
        container.appendChild(button);
    }
    
    showApprovalsModal() {
        const modal = this.createApprovalsModal();
        this.showModal(modal);
    }
    
    createApprovalsModal() {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Manage Approvals</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h6>Report Cards</h6>
                                <div class="table-responsive">
                                    <table class="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>Student</th>
                                                <th>Class</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Mukasa John</td>
                                                <td>S.4 Science</td>
                                                <td>
                                                    <button class="btn btn-sm btn-success">Approve</button>
                                                    <button class="btn btn-sm btn-danger">Reject</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <h6>Student IDs</h6>
                                <div class="table-responsive">
                                    <table class="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>Student</th>
                                                <th>Class</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Nakato Mary</td>
                                                <td>S.3 Arts</td>
                                                <td>
                                                    <button class="btn btn-sm btn-success">Approve</button>
                                                    <button class="btn btn-sm btn-danger">Reject</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
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
    
    setupReports() {
        // Setup reports functionality
        this.loadRecentAdmissions();
    }
    
    loadRecentAdmissions() {
        // Simulate loading recent admissions
        const admissions = [
            {
                id: 'S00123',
                name: 'Mukasa John',
                class: 'S.4 Science',
                status: 'Active'
            },
            {
                id: 'S00124',
                name: 'Nakato Mary',
                class: 'S.3 Arts',
                status: 'Active'
            },
            {
                id: 'S00125',
                name: 'Okot David',
                class: 'S.1 East',
                status: 'Pending'
            }
        ];
        
        this.displayRecentAdmissions(admissions);
    }
    
    displayRecentAdmissions(admissions) {
        const tbody = document.querySelector('#head-teacher-interface .table tbody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        admissions.forEach(admission => {
            const row = document.createElement('tr');
            const statusClass = admission.status === 'Active' ? 'bg-success' : 'bg-warning';
            row.innerHTML = `
                <td>${admission.id}</td>
                <td>${admission.name}</td>
                <td>${admission.class}</td>
                <td><span class="badge ${statusClass}">${admission.status}</span></td>
            `;
            tbody.appendChild(row);
        });
    }
    
    setupEMISExport() {
        // Setup EMIS export functionality
        this.setupEMISExportButton();
    }
    
    setupEMISExportButton() {
        // Add EMIS export functionality to navigation
        const emisLink = document.querySelector('[data-section="emis"]');
        if (emisLink) {
            emisLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showEMISExportModal();
            });
        }
    }
    
    showEMISExportModal() {
        const modal = this.createEMISExportModal();
        this.showModal(modal);
    }
    
    createEMISExportModal() {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">EMIS Data Export</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h6>Export Options</h6>
                                <div class="form-check mb-2">
                                    <input class="form-check-input" type="checkbox" id="students" checked>
                                    <label class="form-check-label" for="students">Student Data</label>
                                </div>
                                <div class="form-check mb-2">
                                    <input class="form-check-input" type="checkbox" id="staff" checked>
                                    <label class="form-check-label" for="staff">Staff Data</label>
                                </div>
                                <div class="form-check mb-2">
                                    <input class="form-check-input" type="checkbox" id="academic" checked>
                                    <label class="form-check-label" for="academic">Academic Data</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <h6>Export Format</h6>
                                <select class="form-select mb-3">
                                    <option>Excel (.xlsx)</option>
                                    <option>CSV (.csv)</option>
                                    <option>PDF (.pdf)</option>
                                </select>
                                <button class="btn btn-primary w-100">Generate Export</button>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        `;
        
        return modal;
    }
    
    setupApprovalActions() {
        // Setup approval action handlers
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('approve-btn')) {
                this.handleApproval(e.target.dataset.id, 'approve');
            } else if (e.target.classList.contains('reject-btn')) {
                this.handleApproval(e.target.dataset.id, 'reject');
            }
        });
    }
    
    handleApproval(id, action) {
        // Handle approval actions
        console.log(`Handling ${action} for ID: ${id}`);
        
        // Show notification
        const message = action === 'approve' ? 'Item approved successfully' : 'Item rejected';
        SchoolManagement.showNotification(message, 'success');
        
        // Update UI
        this.updateApprovalStatus(id, action);
    }
    
    updateApprovalStatus(id, action) {
        // Update the approval status in the UI
        const row = document.querySelector(`[data-id="${id}"]`);
        if (row) {
            const statusCell = row.querySelector('.status');
            if (statusCell) {
                statusCell.textContent = action === 'approve' ? 'Approved' : 'Rejected';
                statusCell.className = `badge ${action === 'approve' ? 'bg-success' : 'bg-danger'}`;
            }
        }
    }
    
    setupFinanceManagement() {
        // Setup finance management
        this.loadFinanceManagement();
    }
    
    loadFinanceManagement() {
        // Load finance management data
        const finance = {
            totalRevenue: 45000000,
            totalExpenses: 32000000,
            netIncome: 13000000,
            feeCollection: {
                collected: 38000000,
                pending: 7000000,
                rate: 84.4
            },
            expenses: [
                { category: 'Salaries', amount: 20000000, percentage: 62.5 },
                { category: 'Utilities', amount: 5000000, percentage: 15.6 },
                { category: 'Maintenance', amount: 3000000, percentage: 9.4 },
                { category: 'Supplies', amount: 4000000, percentage: 12.5 }
            ]
        };
        
        this.displayFinanceManagement(finance);
    }
    
    displayFinanceManagement(finance) {
        const container = document.querySelector('#head-teacher-interface');
        if (!container) return;
        
        // Create finance management section if it doesn't exist
        let financeSection = container.querySelector('.finance-management');
        if (!financeSection) {
            financeSection = document.createElement('div');
            financeSection.className = 'finance-management';
            financeSection.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h5>Finance Management</h5>
                        <button class="btn btn-sm btn-primary">Generate Financial Report</button>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="card bg-light">
                                    <div class="card-body text-center">
                                        <h3 class="text-primary">${this.formatCurrency(finance.totalRevenue)}</h3>
                                        <p class="mb-0">Total Revenue</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card bg-light">
                                    <div class="card-body text-center">
                                        <h3 class="text-danger">${this.formatCurrency(finance.totalExpenses)}</h3>
                                        <p class="mb-0">Total Expenses</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card bg-light">
                                    <div class="card-body text-center">
                                        <h3 class="text-success">${this.formatCurrency(finance.netIncome)}</h3>
                                        <p class="mb-0">Net Income</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card bg-light">
                                    <div class="card-body text-center">
                                        <h3 class="text-info">${finance.feeCollection.rate}%</h3>
                                        <p class="mb-0">Fee Collection Rate</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row mt-4">
                            <div class="col-md-6">
                                <h6>Fee Collection Status</h6>
                                <div class="table-responsive">
                                    <table class="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>Status</th>
                                                <th>Amount</th>
                                                <th>Percentage</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Collected</td>
                                                <td>${this.formatCurrency(finance.feeCollection.collected)}</td>
                                                <td>${finance.feeCollection.rate}%</td>
                                            </tr>
                                            <tr>
                                                <td>Pending</td>
                                                <td>${this.formatCurrency(finance.feeCollection.pending)}</td>
                                                <td>${(100 - finance.feeCollection.rate).toFixed(1)}%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <h6>Expense Breakdown</h6>
                                <div class="table-responsive">
                                    <table class="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>Category</th>
                                                <th>Amount</th>
                                                <th>Percentage</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${finance.expenses.map(expense => `
                                                <tr>
                                                    <td>${expense.category}</td>
                                                    <td>${this.formatCurrency(expense.amount)}</td>
                                                    <td>${expense.percentage}%</td>
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
            container.appendChild(financeSection);
        }
    }
    
    setupBursarySystem() {
        // Setup bursary system
        this.loadBursarySystem();
    }
    
    loadBursarySystem() {
        // Load bursary system data
        const bursaries = [
            {
                id: 'BUR001',
                studentId: 'S00123',
                studentName: 'Mukasa John',
                class: 'S.4 Science A',
                type: 'Full Bursary',
                amount: 150000,
                status: 'Approved',
                date: '2023-10-15'
            },
            {
                id: 'BUR002',
                studentId: 'S00124',
                studentName: 'Nakato Mary',
                class: 'S.4 Science A',
                type: 'Half Bursary',
                amount: 75000,
                status: 'Approved',
                date: '2023-10-14'
            },
            {
                id: 'BUR003',
                studentId: 'S00125',
                studentName: 'Okot David',
                class: 'S.3 Science',
                type: 'Full Bursary',
                amount: 150000,
                status: 'Pending',
                date: '2023-10-16'
            }
        ];
        
        this.displayBursarySystem(bursaries);
    }
    
    displayBursarySystem(bursaries) {
        const container = document.querySelector('#head-teacher-interface');
        if (!container) return;
        
        // Create bursary system section if it doesn't exist
        let bursarySection = container.querySelector('.bursary-system');
        if (!bursarySection) {
            bursarySection = document.createElement('div');
            bursarySection.className = 'bursary-system';
            bursarySection.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h5>Bursary System Management</h5>
                        <button class="btn btn-sm btn-primary" onclick="addBursary()">
                            <i class="fas fa-plus"></i> Add Bursary
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Bursary ID</th>
                                        <th>Student</th>
                                        <th>Class</th>
                                        <th>Type</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${bursaries.map(bursary => `
                                        <tr>
                                            <td><strong>${bursary.id}</strong></td>
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <div class="student-avatar me-2">${bursary.studentName.split(' ').map(n => n[0]).join('')}</div>
                                                    <div>
                                                        <strong>${bursary.studentName}</strong><br>
                                                        <small class="text-muted">${bursary.studentId}</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>${bursary.class}</td>
                                            <td><span class="badge ${bursary.type === 'Full Bursary' ? 'bg-success' : 'bg-warning'}">${bursary.type}</span></td>
                                            <td>${this.formatCurrency(bursary.amount)}</td>
                                            <td><span class="badge ${bursary.status === 'Approved' ? 'bg-success' : 'bg-warning'}">${bursary.status}</span></td>
                                            <td>${bursary.date}</td>
                                            <td>
                                                <button class="btn btn-sm btn-primary" onclick="viewBursary('${bursary.id}')">
                                                    <i class="fas fa-eye"></i> View
                                                </button>
                                                ${bursary.status === 'Pending' ? `
                                                    <button class="btn btn-sm btn-success" onclick="approveBursary('${bursary.id}')">
                                                        <i class="fas fa-check"></i> Approve
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
            container.appendChild(bursarySection);
        }
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
        const container = document.querySelector('#head-teacher-interface');
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
                        <small class="text-muted">Approve report cards for the school</small>
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
    
    setSchoolFees(amount) {
        // Set school fees
        console.log(`Setting school fees to: ${amount}`);
        
        // Simulate setting school fees
        SchoolManagement.showNotification(`School fees set to ${this.formatCurrency(amount)}`, 'success');
        
        // Update UI
        this.updateSchoolFees(amount);
    }
    
    updateSchoolFees(amount) {
        // Update school fees in UI
        const feesElement = document.querySelector('[data-fees="school-fees"]');
        if (feesElement) {
            feesElement.textContent = this.formatCurrency(amount);
        }
    }
    
    giveBursary(studentId, type, amount) {
        // Give bursary to student
        console.log(`Giving ${type} bursary of ${amount} to student ${studentId}`);
        
        // Simulate giving bursary
        SchoolManagement.showNotification(`${type} bursary of ${this.formatCurrency(amount)} given to student ${studentId}`, 'success');
        
        // Update UI
        this.updateBursaryList(studentId, type, amount);
    }
    
    updateBursaryList(studentId, type, amount) {
        // Update bursary list in UI
        const bursaryTable = document.querySelector('.bursary-system tbody');
        if (bursaryTable) {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td><strong>BUR${Date.now()}</strong></td>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="student-avatar me-2">${studentId}</div>
                        <div>
                            <strong>Student ${studentId}</strong><br>
                            <small class="text-muted">${studentId}</small>
                        </div>
                    </div>
                </td>
                <td>S.4 Science A</td>
                <td><span class="badge ${type === 'Full Bursary' ? 'bg-success' : 'bg-warning'}">${type}</span></td>
                <td>${this.formatCurrency(amount)}</td>
                <td><span class="badge bg-success">Approved</span></td>
                <td>${new Date().toISOString().split('T')[0]}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="viewBursary('BUR${Date.now()}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                </td>
            `;
            bursaryTable.appendChild(newRow);
        }
    }
    
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-UG', {
            style: 'currency',
            currency: 'UGX',
            minimumFractionDigits: 0
        }).format(amount);
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

// Initialize Head Teacher Manager when the interface is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're in the head teacher interface
    const headTeacherInterface = document.getElementById('head-teacher-interface');
    if (headTeacherInterface && headTeacherInterface.classList.contains('active')) {
        window.headTeacherManager = new HeadTeacherManager();
    }
});

// Export for use in other modules
window.HeadTeacherManager = HeadTeacherManager;
