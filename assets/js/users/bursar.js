// Bursar Specific JavaScript
// This file contains functionality specific to the Bursar role

class BursarManager {
    constructor() {
        this.staffId = this.generateStaffId();
        this.initializeBursarFeatures();
    }
    
    generateStaffId() {
        // Generate staff ID for bursar
        const prefix = 'BUR';
        const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `${prefix}${randomNum}`;
    }
    
    initializeBursarFeatures() {
        this.setupFinancialOverview();
        this.setupFeeCollection();
        this.setupReceiptManagement();
        this.setupFinancialReports();
        this.setupTransactionTracking();
        this.setupPaymentAnalysis();
        this.setupStaffManagement();
        this.setupPaymentUpload();
    }
    
    setupFinancialOverview() {
        // Initialize financial overview
        this.loadFinancialOverview();
    }
    
    loadFinancialOverview() {
        // Simulate loading financial overview
        const financialData = {
            totalIncome: 45000000,
            totalExpenses: 32000000,
            netBalance: 13000000,
            feeCollectionRate: 85
        };
        
        this.displayFinancialOverview(financialData);
    }
    
    displayFinancialOverview(data) {
        const container = document.querySelector('#bursar-interface');
        if (!container) return;
        
        // Create financial overview section if it doesn't exist
        let overviewSection = container.querySelector('.financial-overview');
        if (!overviewSection) {
            overviewSection = document.createElement('div');
            overviewSection.className = 'financial-overview';
            overviewSection.innerHTML = `
                <div class="financial-card income">
                    <div class="financial-icon income">
                        <i class="fas fa-arrow-up"></i>
                    </div>
                    <div class="financial-amount income">${this.formatCurrency(data.totalIncome)}</div>
                    <div class="financial-label">Total Income</div>
                    <div class="financial-change positive">+12% from last month</div>
                </div>
                <div class="financial-card expenses">
                    <div class="financial-icon expenses">
                        <i class="fas fa-arrow-down"></i>
                    </div>
                    <div class="financial-amount expenses">${this.formatCurrency(data.totalExpenses)}</div>
                    <div class="financial-label">Total Expenses</div>
                    <div class="financial-change negative">+8% from last month</div>
                </div>
                <div class="financial-card balance">
                    <div class="financial-icon balance">
                        <i class="fas fa-balance-scale"></i>
                    </div>
                    <div class="financial-amount balance">${this.formatCurrency(data.netBalance)}</div>
                    <div class="financial-label">Net Balance</div>
                    <div class="financial-change positive">+15% from last month</div>
                </div>
                <div class="financial-card fees">
                    <div class="financial-icon fees">
                        <i class="fas fa-money-bill-wave"></i>
                    </div>
                    <div class="financial-amount fees">${data.feeCollectionRate}%</div>
                    <div class="financial-label">Fee Collection Rate</div>
                    <div class="financial-change positive">+5% from last month</div>
                </div>
            `;
            container.appendChild(overviewSection);
        }
    }
    
    setupFeeCollection() {
        // Setup fee collection
        this.loadFeeCollection();
        this.setupFeeActions();
    }
    
    loadFeeCollection() {
        // Simulate loading fee collection data
        const feeData = [
            {
                studentId: 'S00123',
                studentName: 'Mukasa John',
                class: 'S.4 Science',
                amount: 150000,
                status: 'Paid',
                dueDate: '2023-10-15'
            },
            {
                studentId: 'S00124',
                studentName: 'Nakato Mary',
                class: 'S.3 Arts',
                amount: 120000,
                status: 'Pending',
                dueDate: '2023-10-20'
            },
            {
                studentId: 'S00125',
                studentName: 'Okot David',
                class: 'S.1 East',
                amount: 100000,
                status: 'Overdue',
                dueDate: '2023-10-10'
            }
        ];
        
        this.displayFeeCollection(feeData);
    }
    
    displayFeeCollection(feeData) {
        const container = document.querySelector('#bursar-interface');
        if (!container) return;
        
        // Create fee collection section if it doesn't exist
        let feeSection = container.querySelector('.fee-collection');
        if (!feeSection) {
            feeSection = document.createElement('div');
            feeSection.className = 'fee-collection';
            feeSection.innerHTML = `
                <div class="collection-header">
                    <h5 class="collection-title">Fee Collection</h5>
                    <div class="collection-actions">
                        <button class="collection-btn">Add Payment</button>
                        <button class="collection-btn secondary">Generate Report</button>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table fee-table">
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Class</th>
                                <th>Amount</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${feeData.map(fee => `
                                <tr>
                                    <td>
                                        <div class="student-info">
                                            <div class="student-avatar">${fee.studentName.split(' ').map(n => n[0]).join('')}</div>
                                            <div class="student-details">
                                                <h6>${fee.studentName}</h6>
                                                <p>${fee.studentId}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>${fee.class}</td>
                                    <td class="fee-amount">${this.formatCurrency(fee.amount)}</td>
                                    <td>${fee.dueDate}</td>
                                    <td><span class="fee-status ${fee.status.toLowerCase()}">${fee.status}</span></td>
                                    <td>
                                        <div class="fee-actions">
                                            <button class="fee-action-btn view" data-id="${fee.studentId}">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                            <button class="fee-action-btn edit" data-id="${fee.studentId}">
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
            container.appendChild(feeSection);
        }
    }
    
    setupFeeActions() {
        // Setup fee action handlers
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('fee-action-btn') || e.target.closest('.fee-action-btn')) {
                const action = e.target.closest('.fee-action-btn').classList.contains('view') ? 'view' : 'edit';
                const studentId = e.target.closest('.fee-action-btn').dataset.id;
                this.handleFeeAction(action, studentId);
            }
        });
        
        // Add payment button
        const addPaymentBtn = document.querySelector('.collection-btn');
        if (addPaymentBtn) {
            addPaymentBtn.addEventListener('click', () => this.addPayment());
        }
    }
    
    handleFeeAction(action, studentId) {
        if (action === 'view') {
            this.viewPaymentDetails(studentId);
        } else if (action === 'edit') {
            this.editPayment(studentId);
        }
    }
    
    viewPaymentDetails(studentId) {
        const modal = this.createPaymentDetailsModal(studentId);
        this.showModal(modal);
    }
    
    editPayment(studentId) {
        const modal = this.createEditPaymentModal(studentId);
        this.showModal(modal);
    }
    
    createPaymentDetailsModal(studentId) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Payment Details - ${studentId}</h5>
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
                                        <td><strong>Class:</strong></td>
                                        <td>S.4 Science</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Student ID:</strong></td>
                                        <td>${studentId}</td>
                                    </tr>
                                </table>
                            </div>
                            <div class="col-md-6">
                                <h6>Payment Information</h6>
                                <table class="table table-sm">
                                    <tr>
                                        <td><strong>Amount Due:</strong></td>
                                        <td>${this.formatCurrency(150000)}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Amount Paid:</strong></td>
                                        <td>${this.formatCurrency(150000)}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Balance:</strong></td>
                                        <td>${this.formatCurrency(0)}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div class="mt-3">
                            <h6>Payment History</h6>
                            <div class="table-responsive">
                                <table class="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Method</th>
                                            <th>Receipt</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>2023-10-15</td>
                                            <td>${this.formatCurrency(150000)}</td>
                                            <td>Bank Transfer</td>
                                            <td><button class="btn btn-sm btn-outline-primary">View</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Print Receipt</button>
                    </div>
                </div>
            </div>
        `;
        
        return modal;
    }
    
    createEditPaymentModal(studentId) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Payment - ${studentId}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label class="form-label">Amount</label>
                                <input type="number" class="form-control" value="150000">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Payment Method</label>
                                <select class="form-select">
                                    <option>Bank Transfer</option>
                                    <option>Cash</option>
                                    <option>Mobile Money</option>
                                    <option>Check</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Payment Date</label>
                                <input type="date" class="form-control" value="2023-10-15">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Notes</label>
                                <textarea class="form-control" rows="3"></textarea>
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
    
    addPayment() {
        const modal = this.createAddPaymentModal();
        this.showModal(modal);
    }
    
    createAddPaymentModal() {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add Payment</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label class="form-label">Student</label>
                                <select class="form-select">
                                    <option>Select Student</option>
                                    <option>Mukasa John (S00123)</option>
                                    <option>Nakato Mary (S00124)</option>
                                    <option>Okot David (S00125)</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Amount</label>
                                <input type="number" class="form-control" placeholder="Enter amount">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Payment Method</label>
                                <select class="form-select">
                                    <option>Bank Transfer</option>
                                    <option>Cash</option>
                                    <option>Mobile Money</option>
                                    <option>Check</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Payment Date</label>
                                <input type="date" class="form-control">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Notes</label>
                                <textarea class="form-control" rows="3" placeholder="Optional notes"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary">Add Payment</button>
                    </div>
                </div>
            </div>
        `;
        
        return modal;
    }
    
    setupReceiptManagement() {
        // Setup receipt management
        this.loadReceiptManagement();
    }
    
    loadReceiptManagement() {
        // Simulate loading receipt management data
        const receiptData = {
            totalReceipts: 245,
            pendingReceipts: 12,
            processedReceipts: 233
        };
        
        this.displayReceiptManagement(receiptData);
    }
    
    displayReceiptManagement(data) {
        const container = document.querySelector('#bursar-interface');
        if (!container) return;
        
        // Create receipt management section if it doesn't exist
        let receiptSection = container.querySelector('.receipt-management');
        if (!receiptSection) {
            receiptSection = document.createElement('div');
            receiptSection.className = 'receipt-management';
            receiptSection.innerHTML = `
                <div class="receipt-header">
                    <h5 class="receipt-title">Receipt Management</h5>
                    <div class="receipt-filters">
                        <div class="filter-group">
                            <label class="filter-label">Status</label>
                            <select class="filter-select">
                                <option>All</option>
                                <option>Pending</option>
                                <option>Processed</option>
                            </select>
                        </div>
                        <div class="filter-group">
                            <label class="filter-label">Date Range</label>
                            <select class="filter-select">
                                <option>Last 30 days</option>
                                <option>Last 3 months</option>
                                <option>This year</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="receipt-stats">
                    <div class="receipt-stat">
                        <span class="number">${data.totalReceipts}</span>
                        <span class="label">Total Receipts</span>
                    </div>
                    <div class="receipt-stat">
                        <span class="number">${data.pendingReceipts}</span>
                        <span class="label">Pending</span>
                    </div>
                    <div class="receipt-stat">
                        <span class="number">${data.processedReceipts}</span>
                        <span class="label">Processed</span>
                    </div>
                </div>
            `;
            container.appendChild(receiptSection);
        }
    }
    
    setupFinancialReports() {
        // Setup financial reports
        this.loadFinancialReports();
    }
    
    loadFinancialReports() {
        // Simulate loading financial reports
        const reports = [
            {
                title: 'Monthly Income Report',
                description: 'Detailed breakdown of monthly income sources',
                icon: 'fas fa-chart-line'
            },
            {
                title: 'Expense Analysis',
                description: 'Comprehensive analysis of school expenses',
                icon: 'fas fa-chart-pie'
            },
            {
                title: 'Fee Collection Report',
                description: 'Student fee collection status and trends',
                icon: 'fas fa-money-bill-wave'
            },
            {
                title: 'Budget vs Actual',
                description: 'Comparison of budgeted vs actual expenses',
                icon: 'fas fa-balance-scale'
            }
        ];
        
        this.displayFinancialReports(reports);
    }
    
    displayFinancialReports(reports) {
        const container = document.querySelector('#bursar-interface');
        if (!container) return;
        
        // Create financial reports section if it doesn't exist
        let reportsSection = container.querySelector('.financial-reports');
        if (!reportsSection) {
            reportsSection = document.createElement('div');
            reportsSection.className = 'financial-reports';
            reportsSection.innerHTML = `
                <div class="reports-header">
                    <h5 class="reports-title">Financial Reports</h5>
                </div>
                <div class="report-options">
                    ${reports.map(report => `
                        <div class="report-option">
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
    
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-UG', {
            style: 'currency',
            currency: 'UGX',
            minimumFractionDigits: 0
        }).format(amount);
    }
    
    setupTransactionTracking() {
        // Setup transaction tracking
        this.loadTransactionTracking();
    }
    
    loadTransactionTracking() {
        // Load transaction tracking data
        const transactions = [
            {
                id: 'TXN001',
                date: '2023-10-15',
                studentId: 'S00123',
                studentName: 'Mukasa John',
                amount: 150000,
                type: 'School Fees',
                method: 'Bank Transfer',
                status: 'Completed'
            },
            {
                id: 'TXN002',
                date: '2023-10-14',
                studentId: 'S00124',
                studentName: 'Nakato Mary',
                amount: 120000,
                type: 'School Fees',
                method: 'Mobile Money',
                status: 'Completed'
            },
            {
                id: 'TXN003',
                date: '2023-10-13',
                studentId: 'S00125',
                studentName: 'Okot David',
                amount: 100000,
                type: 'School Fees',
                method: 'Cash',
                status: 'Pending'
            }
        ];
        
        this.displayTransactionTracking(transactions);
    }
    
    displayTransactionTracking(transactions) {
        const container = document.querySelector('#bursar-interface');
        if (!container) return;
        
        // Create transaction tracking section if it doesn't exist
        let transactionSection = container.querySelector('.transaction-tracking');
        if (!transactionSection) {
            transactionSection = document.createElement('div');
            transactionSection.className = 'transaction-tracking';
            transactionSection.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h5>Transaction Tracking</h5>
                        <button class="btn btn-sm btn-primary">Export Transactions</button>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Transaction ID</th>
                                        <th>Date</th>
                                        <th>Student</th>
                                        <th>Amount</th>
                                        <th>Type</th>
                                        <th>Method</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${transactions.map(transaction => `
                                        <tr>
                                            <td>${transaction.id}</td>
                                            <td>${transaction.date}</td>
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <div class="student-avatar me-2">${transaction.studentName.split(' ').map(n => n[0]).join('')}</div>
                                                    <div>
                                                        <strong>${transaction.studentName}</strong><br>
                                                        <small class="text-muted">${transaction.studentId}</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>${this.formatCurrency(transaction.amount)}</td>
                                            <td>${transaction.type}</td>
                                            <td>${transaction.method}</td>
                                            <td><span class="badge ${transaction.status === 'Completed' ? 'bg-success' : 'bg-warning'}">${transaction.status}</span></td>
                                            <td>
                                                <button class="btn btn-sm btn-primary" onclick="viewTransaction('${transaction.id}')">
                                                    View Details
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
            container.appendChild(transactionSection);
        }
    }
    
    setupPaymentAnalysis() {
        // Setup payment analysis
        this.loadPaymentAnalysis();
    }
    
    loadPaymentAnalysis() {
        // Load payment analysis data
        const analysis = {
            totalPayments: 45000000,
            averagePayment: 150000,
            paymentMethods: {
                'Bank Transfer': 45,
                'Mobile Money': 35,
                'Cash': 20
            },
            monthlyTrend: [
                { month: 'Jan', amount: 42000000 },
                { month: 'Feb', amount: 38000000 },
                { month: 'Mar', amount: 45000000 },
                { month: 'Apr', amount: 47000000 },
                { month: 'May', amount: 43000000 },
                { month: 'Jun', amount: 46000000 }
            ]
        };
        
        this.displayPaymentAnalysis(analysis);
    }
    
    displayPaymentAnalysis(analysis) {
        const container = document.querySelector('#bursar-interface');
        if (!container) return;
        
        // Create payment analysis section if it doesn't exist
        let analysisSection = container.querySelector('.payment-analysis');
        if (!analysisSection) {
            analysisSection = document.createElement('div');
            analysisSection.className = 'payment-analysis';
            analysisSection.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h5>Payment Analysis</h5>
                        <button class="btn btn-sm btn-primary">Generate Report</button>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="card bg-light">
                                    <div class="card-body text-center">
                                        <h3 class="text-primary">${this.formatCurrency(analysis.totalPayments)}</h3>
                                        <p class="mb-0">Total Payments</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card bg-light">
                                    <div class="card-body text-center">
                                        <h3 class="text-success">${this.formatCurrency(analysis.averagePayment)}</h3>
                                        <p class="mb-0">Average Payment</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card bg-light">
                                    <div class="card-body text-center">
                                        <h3 class="text-info">300</h3>
                                        <p class="mb-0">Total Transactions</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row mt-4">
                            <div class="col-md-6">
                                <h6>Payment Methods</h6>
                                <div class="table-responsive">
                                    <table class="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>Method</th>
                                                <th>Count</th>
                                                <th>Percentage</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${Object.entries(analysis.paymentMethods).map(([method, count]) => `
                                                <tr>
                                                    <td>${method}</td>
                                                    <td>${count}</td>
                                                    <td>${count}%</td>
                                                </tr>
                                            `).join('')}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <h6>Monthly Trend</h6>
                                <div class="table-responsive">
                                    <table class="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>Month</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${analysis.monthlyTrend.map(trend => `
                                                <tr>
                                                    <td>${trend.month}</td>
                                                    <td>${this.formatCurrency(trend.amount)}</td>
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
            container.appendChild(analysisSection);
        }
    }
    
    setupStaffManagement() {
        // Setup staff and support staff management
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
                salary: 800000,
                status: 'Active'
            },
            {
                id: 'ST002',
                name: 'Mary Nakato',
                role: 'Teacher',
                department: 'Physics',
                salary: 750000,
                status: 'Active'
            },
            {
                id: 'ST003',
                name: 'David Okello',
                role: 'Support Staff',
                department: 'Maintenance',
                salary: 400000,
                status: 'Active'
            },
            {
                id: 'ST004',
                name: 'Sarah Namukasa',
                role: 'Support Staff',
                department: 'Administration',
                salary: 450000,
                status: 'Active'
            }
        ];
        
        this.displayStaffManagement(staff);
    }
    
    displayStaffManagement(staff) {
        const container = document.querySelector('#bursar-interface');
        if (!container) return;
        
        // Create staff management section if it doesn't exist
        let staffSection = container.querySelector('.staff-management');
        if (!staffSection) {
            staffSection = document.createElement('div');
            staffSection.className = 'staff-management';
            staffSection.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h5>Staff & Support Staff Management</h5>
                        <button class="btn btn-sm btn-primary">Add Staff</button>
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
                                        <th>Salary</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${staff.map(member => `
                                        <tr>
                                            <td>${member.id}</td>
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
                                            <td>${this.formatCurrency(member.salary)}</td>
                                            <td><span class="badge bg-success">${member.status}</span></td>
                                            <td>
                                                <button class="btn btn-sm btn-primary" onclick="viewStaffDetails('${member.id}')">
                                                    View Details
                                                </button>
                                                <button class="btn btn-sm btn-warning" onclick="editStaff('${member.id}')">
                                                    Edit
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
    
    setupPaymentUpload() {
        // Setup payment upload functionality
        this.loadPaymentUpload();
    }
    
    loadPaymentUpload() {
        // Load payment upload interface
        const container = document.querySelector('#bursar-interface');
        if (!container) return;
        
        // Create payment upload section if it doesn't exist
        let uploadSection = container.querySelector('.payment-upload');
        if (!uploadSection) {
            uploadSection = document.createElement('div');
            uploadSection.className = 'payment-upload';
            uploadSection.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h5>Payment Records Upload</h5>
                        <small class="text-muted">Upload payment records from Excel files</small>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Select Excel File (.xlsx)</label>
                                    <input type="file" class="form-control" accept=".xlsx,.xls" id="payment-file">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Payment Period</label>
                                    <select class="form-select">
                                        <option>First Term 2023</option>
                                        <option>Second Term 2023</option>
                                        <option>Third Term 2023</option>
                                    </select>
                                </div>
                                <button class="btn btn-primary" onclick="uploadPaymentFile()">
                                    <i class="fas fa-upload"></i> Upload File
                                </button>
                            </div>
                            <div class="col-md-6">
                                <h6>Upload Instructions</h6>
                                <ul class="list-unstyled">
                                    <li><i class="fas fa-check text-success"></i> File must be in .xlsx format</li>
                                    <li><i class="fas fa-check text-success"></i> Include Student ID, Name, Amount, Date</li>
                                    <li><i class="fas fa-check text-success"></i> Maximum file size: 10MB</li>
                                    <li><i class="fas fa-check text-success"></i> Use the provided template</li>
                                </ul>
                                <button class="btn btn-outline-primary btn-sm">
                                    <i class="fas fa-download"></i> Download Template
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(uploadSection);
        }
    }
    
    uploadPaymentFile() {
        const fileInput = document.getElementById('payment-file');
        const file = fileInput.files[0];
        
        if (!file) {
            SchoolManagement.showNotification('Please select a file to upload', 'warning');
            return;
        }
        
        if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
            SchoolManagement.showNotification('Please select a valid Excel file', 'error');
            return;
        }
        
        // Simulate file upload
        SchoolManagement.showNotification('File uploaded successfully', 'success');
        
        // Simulate processing
        setTimeout(() => {
            SchoolManagement.showNotification('Payment records processed successfully', 'success');
        }, 2000);
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

// Initialize Bursar Manager when the interface is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're in the bursar interface
    const bursarInterface = document.getElementById('bursar-interface');
    if (bursarInterface && bursarInterface.classList.contains('active')) {
        window.bursarManager = new BursarManager();
    }
});

// Export for use in other modules
window.BursarManager = BursarManager;
