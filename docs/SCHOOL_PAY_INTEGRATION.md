# School Pay Uganda Integration with Firestore Database

## Overview
This document outlines the integration of School Pay Uganda transaction history with the Firestore database design, ensuring proper alignment between student records and financial transactions.

## School Pay Transaction History Analysis

### Expected File Structure
Based on the filename `transaction_histories-19-09-2025-102647.xlsx`, School Pay Uganda exports typically contain:

**Standard Columns:**
- **Transaction ID**: Unique identifier for each payment
- **Student ID/Number**: Student identification
- **Student Name**: Full name of the student
- **Amount**: Payment amount in Ugandan Shillings (UGX)
- **Payment Date**: Date of transaction
- **Payment Method**: Cash, Mobile Money, Bank Transfer, etc.
- **Payment Status**: Completed, Pending, Failed
- **Fee Type**: Tuition, Examination, Library, Sports, etc.
- **Reference Number**: School Pay reference
- **Parent/Guardian**: Contact information

## Updated Firestore Database Design

### 1. Enhanced Students Collection
```javascript
// Document ID: auto-generated or custom (e.g., "ST001")
{
  studentId: "ST001",
  schoolPayId: "SP123456",           // School Pay system ID
  paymentCode: "PAY001",             // Unique payment identification code
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    fullName: "John Doe",
    dateOfBirth: "2005-03-15",
    gender: "male",
    phone: "+256 700 123 456",
    address: "Kampala, Uganda",
    profileImage: "https://...",
    nationality: "Ugandan",
    religion: "Christian"
  },
  academicInfo: {
    admissionNumber: "ADM2023001",
    admissionDate: "2023-01-15",
    currentClass: "S.4 Science A",
    stream: "Science",
    status: "active",
    previousSchool: "ABC Primary School",
    emergencyContact: {
      name: "Jane Doe",
      phone: "+256 700 234 567",
      relationship: "mother",
      address: "Kampala, Uganda"
    }
  },
  financialInfo: {
    totalFeesOwed: 700000,
    totalFeesPaid: 350000,
    currentBalance: 350000,
    lastPaymentDate: "2023-10-15",
    paymentStatus: "partial",        // paid, partial, outstanding
    preferredPaymentMethod: "mobile_money"
  },
  schoolPayIntegration: {
    isIntegrated: true,
    lastSyncDate: "2023-10-15T10:30:00Z",
    syncStatus: "successful",        // successful, failed, pending
    externalId: "SP123456",
    paymentCode: "PAY001",          // Payment identification code
    qrCode: "https://...",          // QR code for easy payment identification
    paymentInstructions: {
      code: "PAY001",
      instructions: "Use payment code PAY001 when making payments via School Pay Uganda",
      qrCodeUrl: "https://..."
    }
  },
  createdAt: "2023-01-15T08:00:00Z",
  updatedAt: "2023-10-15T10:30:00Z"
}
```

### 2. Enhanced Financial Transactions Collection
```javascript
// Document ID: auto-generated or custom (e.g., "TXN001")
{
  transactionId: "TXN001",
  schoolPayTransactionId: "SP_TXN_789",  // School Pay transaction ID
  studentId: "ST001",                    // Reference to students collection
  type: "income",                        // income, expense
  category: "tuition_fee",               // tuition_fee, examination_fee, library_fee, etc.
  amount: 500000,                       // Amount in Ugandan Shillings
  currency: "UGX",
  paymentMethod: "mobile_money",         // cash, bank_transfer, mobile_money, school_pay
  description: "Tuition fee payment for Term 1",
  reference: "RCP001",                  // Receipt number
  schoolPayReference: "SP_REF_456",      // School Pay reference
  status: "completed",                   // pending, completed, failed, refunded
  processedBy: "user_789",               // Reference to users collection
  processedAt: "2023-10-15T10:30:00Z",
  dueDate: "2023-10-01",
  paidDate: "2023-10-15",
  receiptUrl: "https://...",
  notes: "Payment received via School Pay Uganda",
  schoolPayData: {
    originalTransactionId: "SP_TXN_789",
    schoolPayStatus: "completed",
    schoolPayMethod: "mobile_money",
    schoolPayReference: "SP_REF_456",
    parentPhone: "+256 700 234 567",
    parentName: "Jane Doe"
  },
  createdAt: "2023-10-15T08:00:00Z",
  updatedAt: "2023-10-15T10:30:00Z"
}
```

### 3. School Pay Integration Collection
```javascript
// Document ID: auto-generated or custom (e.g., "SPI001")
{
  integrationId: "SPI001",
  fileName: "transaction_histories-19-09-2025-102647.xlsx",
  importDate: "2023-10-15T10:30:00Z",
  totalRecords: 150,
  successfulImports: 145,
  failedImports: 5,
  status: "completed",                  // pending, processing, completed, failed
  importedBy: "user_789",               // Reference to users collection
  errors: [
    {
      row: 12,
      studentId: "ST999",
      error: "Student not found",
      data: { /* original row data */ }
    }
  ],
  summary: {
    totalAmount: 75000000,             // Total amount imported
    averageTransaction: 500000,         // Average transaction amount
    paymentMethods: {
      mobile_money: 80,
      bank_transfer: 15,
      cash: 5
    },
    feeTypes: {
      tuition_fee: 100,
      examination_fee: 30,
      library_fee: 15
    }
  },
  createdAt: "2023-10-15T10:30:00Z",
  updatedAt: "2023-10-15T10:30:00Z"
}
```

### 4. Enhanced Fees Collection
```javascript
// Document ID: auto-generated or custom (e.g., "FEE001")
{
  feeId: "FEE001",
  studentId: "ST001",                   // Reference to students collection
  academicYear: "2023",
  term: "1",
  feeStructure: {
    tuition: 500000,
    examination: 100000,
    library: 50000,
    sports: 30000,
    other: 20000
  },
  totalAmount: 700000,
  paidAmount: 350000,
  balance: 350000,
  status: "partial",                   // paid, partial, outstanding
  dueDate: "2023-10-01",
  lastPaymentDate: "2023-10-15",
  paymentHistory: [
    {
      transactionId: "TXN001",
      amount: 350000,
      date: "2023-10-15",
      method: "mobile_money",
      reference: "RCP001",
      schoolPayReference: "SP_REF_456"
    }
  ],
  schoolPaySync: {
    lastSyncDate: "2023-10-15T10:30:00Z",
    syncStatus: "successful",
    externalFeeId: "SP_FEE_123"
  },
  createdAt: "2023-01-15T08:00:00Z",
  updatedAt: "2023-10-15T10:30:00Z"
}
```

## Payment Code System

### 1. School Pay Payment Code Integration
```javascript
// Function to receive payment codes from School Pay Uganda
async function receivePaymentCodesFromSchoolPay(schoolPayData) {
  // School Pay provides payment codes for each student
  // We need to match these codes to our student records
  
  const paymentCodeMapping = [];
  
  for (const studentData of schoolPayData) {
    const paymentCode = studentData.paymentCode; // Generated by School Pay
    const studentId = studentData.studentId; // Our internal student ID
    const studentName = studentData.studentName;
    
    // Find our student record
    const student = await findStudentById(studentId);
    
    if (student) {
      // Update student record with School Pay payment code
      await updateStudentPaymentCode(studentId, paymentCode, studentData);
      paymentCodeMapping.push({
        studentId: studentId,
        paymentCode: paymentCode,
        studentName: studentName,
        status: 'mapped'
      });
    } else {
      paymentCodeMapping.push({
        studentId: studentId,
        paymentCode: paymentCode,
        studentName: studentName,
        status: 'student_not_found',
        error: 'Student not found in our system'
      });
    }
  }
  
  return paymentCodeMapping;
}

// Function to update student record with School Pay payment code
async function updateStudentPaymentCode(studentId, paymentCode, schoolPayData) {
  const studentRef = db.collection('students').doc(studentId);
  
  await studentRef.update({
    paymentCode: paymentCode,
    'schoolPayIntegration.paymentCode': paymentCode,
    'schoolPayIntegration.paymentInstructions': {
      code: paymentCode,
      instructions: `Use payment code ${paymentCode} when making payments via School Pay Uganda`,
      qrCodeUrl: schoolPayData.qrCodeUrl || null
    },
    'schoolPayIntegration.lastSyncDate': new Date(),
    'schoolPayIntegration.syncStatus': 'successful',
    updatedAt: new Date()
  });
}
```

### 2. School Pay Payment Code Sync
```javascript
// Function to sync payment codes from School Pay Uganda
async function syncPaymentCodesFromSchoolPay() {
  try {
    // Fetch payment codes from School Pay API or file
    const schoolPayCodes = await fetchSchoolPayPaymentCodes();
    
    const syncResults = {
      totalCodes: schoolPayCodes.length,
      successfulMappings: 0,
      failedMappings: 0,
      errors: []
    };
    
    for (const codeData of schoolPayCodes) {
      try {
        // Find student by School Pay student ID or name
        const student = await findStudentBySchoolPayId(codeData.schoolPayStudentId) ||
                       await findStudentByName(codeData.studentName);
        
        if (student) {
          await updateStudentPaymentCode(student.studentId, codeData.paymentCode, codeData);
          syncResults.successfulMappings++;
        } else {
          syncResults.failedMappings++;
          syncResults.errors.push({
            paymentCode: codeData.paymentCode,
            studentName: codeData.studentName,
            error: 'Student not found in our system'
          });
        }
      } catch (error) {
        syncResults.failedMappings++;
        syncResults.errors.push({
          paymentCode: codeData.paymentCode,
          studentName: codeData.studentName,
          error: error.message
        });
      }
    }
    
    return syncResults;
  } catch (error) {
    throw new Error(`Failed to sync payment codes: ${error.message}`);
  }
}

// Function to fetch payment codes from School Pay
async function fetchSchoolPayPaymentCodes() {
  // This would typically be an API call to School Pay Uganda
  // For now, we'll simulate the data structure
  return [
    {
      schoolPayStudentId: "SP123456",
      studentName: "John Doe",
      paymentCode: "PAY23T1ST001", // Generated by School Pay
      qrCodeUrl: "https://schoolpay.ug/qr/PAY23T1ST001",
      academicYear: "2023",
      term: "1"
    },
    // ... more payment codes
  ];
}
```

### 3. Payment Code Validation and Matching
```javascript
// Function to validate payment codes from School Pay during transaction import
async function validateSchoolPayPaymentCode(paymentCode, studentId) {
  // Find student by payment code (provided by School Pay)
  const student = await db.collection('students')
    .where('paymentCode', '==', paymentCode)
    .get();
  
  if (student.empty) {
    throw new Error(`Payment code ${paymentCode} not found in our system`);
  }
  
  const studentData = student.docs[0].data();
  
  // Verify the student ID matches (if provided)
  if (studentId && studentData.studentId !== studentId) {
    throw new Error(`Payment code ${paymentCode} belongs to different student`);
  }
  
  return studentData;
}

// Function to find student by School Pay payment code
async function findStudentBySchoolPayPaymentCode(paymentCode) {
  const student = await db.collection('students')
    .where('paymentCode', '==', paymentCode)
    .get();
  
  if (student.empty) {
    return null;
  }
  
  return student.docs[0].data();
}

// Function to match School Pay student to our student record
async function matchSchoolPayStudent(schoolPayStudentId, studentName) {
  // Try to find by School Pay ID first
  let student = await db.collection('students')
    .where('schoolPayId', '==', schoolPayStudentId)
    .get();
  
  if (!student.empty) {
    return student.docs[0].data();
  }
  
  // If not found by School Pay ID, try by name
  student = await db.collection('students')
    .where('personalInfo.fullName', '==', studentName)
    .get();
  
  if (!student.empty) {
    return student.docs[0].data();
  }
  
  return null;
}
```

## Data Import Process

### 1. School Pay File Processing
```javascript
// Function to process School Pay Excel file
async function processSchoolPayFile(file) {
  const workbook = XLSX.readFile(file);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(worksheet);
  
  const integrationRecord = {
    integrationId: generateId(),
    fileName: file.name,
    importDate: new Date(),
    totalRecords: data.length,
    successfulImports: 0,
    failedImports: 0,
    status: "processing",
    importedBy: getCurrentUserId(),
    errors: [],
    summary: {
      totalAmount: 0,
      averageTransaction: 0,
      paymentMethods: {},
      feeTypes: {}
    }
  };
  
  // Process each transaction
  for (const row of data) {
    try {
      await processTransaction(row, integrationRecord);
      integrationRecord.successfulImports++;
    } catch (error) {
      integrationRecord.failedImports++;
      integrationRecord.errors.push({
        row: data.indexOf(row) + 1,
        studentId: row.studentId,
        error: error.message,
        data: row
      });
    }
  }
  
  // Save integration record
  await db.collection('school_pay_integrations').add(integrationRecord);
}
```

### 2. Transaction Processing with School Pay Payment Codes
```javascript
async function processTransaction(row, integrationRecord) {
  // School Pay provides payment codes, we need to match them to our students
  let student = null;
  
  if (row.paymentCode) {
    // Find student by School Pay payment code
    student = await findStudentBySchoolPayPaymentCode(row.paymentCode);
    
    if (!student) {
      throw new Error(`Payment code ${row.paymentCode} not found in our system. Please sync payment codes first.`);
    }
  } else {
    // Fallback: try to find by School Pay student ID or name
    student = await matchSchoolPayStudent(row.studentId, row.studentName);
    
    if (!student) {
      throw new Error(`Student not found: ${row.studentName} (ID: ${row.studentId})`);
    }
  }
  
  // Verify payment code matches (if both are provided)
  if (row.paymentCode && student.paymentCode && student.paymentCode !== row.paymentCode) {
    throw new Error(`Payment code mismatch: Student has ${student.paymentCode}, transaction has ${row.paymentCode}`);
  }
  
  // Create transaction record
  const transaction = {
    transactionId: generateId(),
    schoolPayTransactionId: row.transactionId,
    studentId: student.studentId,
    type: "income",
    category: mapFeeType(row.feeType),
    amount: parseFloat(row.amount),
    currency: "UGX",
    paymentMethod: mapPaymentMethod(row.paymentMethod),
    description: row.description,
    reference: row.reference,
    schoolPayReference: row.schoolPayReference,
    status: mapPaymentStatus(row.status),
    processedBy: getCurrentUserId(),
    processedAt: new Date(),
    paidDate: new Date(row.paymentDate),
    schoolPayData: {
      originalTransactionId: row.transactionId,
      schoolPayStatus: row.status,
      schoolPayMethod: row.paymentMethod,
      schoolPayReference: row.schoolPayReference,
      parentPhone: row.parentPhone,
      parentName: row.parentName,
      paymentCode: row.paymentCode || student.paymentCode  // Payment code from School Pay or student record
    }
  };
  
  // Save transaction
  await db.collection('financial_transactions').add(transaction);
  
  // Update student financial info
  await updateStudentFinancialInfo(student.studentId, transaction);
  
  // Update integration summary
  updateIntegrationSummary(integrationRecord, transaction);
}
```

### 3. Student Financial Info Update
```javascript
async function updateStudentFinancialInfo(studentId, transaction) {
  const studentRef = db.collection('students').doc(studentId);
  const student = await studentRef.get();
  
  if (student.exists) {
    const studentData = student.data();
    const newTotalPaid = studentData.financialInfo.totalFeesPaid + transaction.amount;
    const newBalance = studentData.financialInfo.totalFeesOwed - newTotalPaid;
    
    await studentRef.update({
      'financialInfo.totalFeesPaid': newTotalPaid,
      'financialInfo.currentBalance': newBalance,
      'financialInfo.lastPaymentDate': transaction.paidDate,
      'financialInfo.paymentStatus': newBalance <= 0 ? 'paid' : 'partial',
      'schoolPayIntegration.lastSyncDate': new Date(),
      'schoolPayIntegration.syncStatus': 'successful',
      updatedAt: new Date()
    });
  }
}
```

## Data Mapping Functions

### 1. Fee Type Mapping
```javascript
function mapFeeType(schoolPayFeeType) {
  const mapping = {
    'Tuition': 'tuition_fee',
    'Examination': 'examination_fee',
    'Library': 'library_fee',
    'Sports': 'sports_fee',
    'Transport': 'transport_fee',
    'Meals': 'meals_fee',
    'Other': 'other_fee'
  };
  return mapping[schoolPayFeeType] || 'other_fee';
}
```

### 2. Payment Method Mapping
```javascript
function mapPaymentMethod(schoolPayMethod) {
  const mapping = {
    'Mobile Money': 'mobile_money',
    'Bank Transfer': 'bank_transfer',
    'Cash': 'cash',
    'School Pay': 'school_pay',
    'Card': 'card'
  };
  return mapping[schoolPayMethod] || 'cash';
}
```

### 3. Payment Status Mapping
```javascript
function mapPaymentStatus(schoolPayStatus) {
  const mapping = {
    'Completed': 'completed',
    'Pending': 'pending',
    'Failed': 'failed',
    'Cancelled': 'cancelled'
  };
  return mapping[schoolPayStatus] || 'pending';
}
```

## Security Rules for School Pay Integration

### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // School Pay integrations - only bursar and above
    match /school_pay_integrations/{integrationId} {
      allow read, write: if request.auth != null && 
        hasRole(['bursar', 'head_teacher', 'system_admin']);
    }
    
    // Financial transactions with School Pay data
    match /financial_transactions/{transactionId} {
      allow read: if request.auth != null && 
        (hasRole(['bursar', 'head_teacher', 'system_admin']) ||
         (resource.data.studentId == request.auth.uid && hasRole(['student'])));
      allow write: if request.auth != null && 
        hasRole(['bursar', 'head_teacher', 'system_admin']);
    }
    
    // Students with School Pay integration
    match /students/{studentId} {
      allow read: if request.auth != null && 
        (hasRole(['head_teacher', 'system_admin', 'dos', 'class_teacher', 'bursar']) ||
         resource.data.studentId == request.auth.uid);
      allow write: if request.auth != null && 
        hasRole(['head_teacher', 'system_admin', 'dos', 'bursar']);
    }
    
    // Helper function to check user roles
    function hasRole(roles) {
      return request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in roles;
    }
  }
}
```

## Query Patterns for School Pay Data

### 1. Get Student Payment History
```javascript
// Get all payments for a specific student
db.collection('financial_transactions')
  .where('studentId', '==', 'ST001')
  .where('type', '==', 'income')
  .orderBy('paidDate', 'desc')
  .get();
```

### 2. Get School Pay Integration Summary
```javascript
// Get integration history
db.collection('school_pay_integrations')
  .orderBy('importDate', 'desc')
  .limit(10)
  .get();
```

### 3. Get Outstanding Payments
```javascript
// Get students with outstanding balances
db.collection('students')
  .where('financialInfo.paymentStatus', '==', 'outstanding')
  .where('academicInfo.status', '==', 'active')
  .get();
```

### 4. Get Payment Analytics
```javascript
// Get payment method distribution
db.collection('financial_transactions')
  .where('type', '==', 'income')
  .where('status', '==', 'completed')
  .get();
```

## Payment Code Management UI

### 1. Student Payment Code Display
```html
<!-- Payment Code Card for Student Dashboard -->
<div class="card mb-4">
  <div class="card-header">
    <h5><i class="fas fa-qrcode"></i> Payment Code</h5>
  </div>
  <div class="card-body">
    <div class="row">
      <div class="col-md-6">
        <div class="payment-code-display">
          <h3 class="text-primary">{{ student.paymentCode }}</h3>
          <p class="text-muted">Use this code when making payments via School Pay Uganda</p>
        </div>
      </div>
      <div class="col-md-6 text-center">
        <div class="qr-code-container">
          <img src="{{ student.schoolPayIntegration.paymentInstructions.qrCodeUrl }}" 
               alt="Payment QR Code" class="qr-code-image">
          <p class="small text-muted mt-2">Scan QR code for quick payment</p>
        </div>
      </div>
    </div>
    <div class="payment-instructions">
      <h6>Payment Instructions:</h6>
      <ol>
        <li>Open School Pay Uganda app</li>
        <li>Enter payment code: <strong>{{ student.paymentCode }}</strong></li>
        <li>Or scan the QR code above</li>
        <li>Enter amount and complete payment</li>
      </ol>
    </div>
  </div>
</div>
```

### 2. School Pay Payment Code Sync Interface
```javascript
// Function to sync payment codes from School Pay Uganda
async function syncPaymentCodesFromSchoolPay() {
  try {
    showNotification('Syncing payment codes from School Pay Uganda...', 'info');
    
    const result = await syncPaymentCodesFromSchoolPay();
    
    if (result.successfulMappings > 0) {
      showNotification(`Successfully synced ${result.successfulMappings} payment codes`, 'success');
    }
    
    if (result.failedMappings > 0) {
      showNotification(`${result.failedMappings} payment codes failed to sync. Check error log.`, 'warning');
      
      // Display errors in a modal or console
      console.error('Payment code sync errors:', result.errors);
    }
    
    return result;
  } catch (error) {
    showNotification(`Error syncing payment codes: ${error.message}`, 'error');
    throw error;
  }
}

// Function to display payment code sync status
function displayPaymentCodeSyncStatus(syncResults) {
  const statusHtml = `
    <div class="alert alert-info">
      <h6>Payment Code Sync Results</h6>
      <p><strong>Total Codes:</strong> ${syncResults.totalCodes}</p>
      <p><strong>Successful:</strong> ${syncResults.successfulMappings}</p>
      <p><strong>Failed:</strong> ${syncResults.failedMappings}</p>
      ${syncResults.errors.length > 0 ? `
        <details>
          <summary>View Errors</summary>
          <ul>
            ${syncResults.errors.map(error => `<li>${error.paymentCode}: ${error.error}</li>`).join('')}
          </ul>
        </details>
      ` : ''}
    </div>
  `;
  
  document.getElementById('sync-status').innerHTML = statusHtml;
}
```

### 3. Payment Code Search and Validation
```javascript
// Function to search transactions by payment code
async function searchTransactionsByPaymentCode(paymentCode) {
  const transactions = await db.collection('financial_transactions')
    .where('schoolPayData.paymentCode', '==', paymentCode)
    .orderBy('paidDate', 'desc')
    .get();
  
  return transactions.docs.map(doc => doc.data());
}

// Function to validate payment code format
function validatePaymentCodeFormat(paymentCode) {
  const pattern = /^PAY\d{2}T[1-3]ST\d{3}$/;
  return pattern.test(paymentCode);
}
```

## Benefits of School Pay Integration

### 1. **Automated Data Sync**
- Real-time payment updates
- Reduced manual data entry
- Eliminated data entry errors

### 2. **Enhanced Financial Tracking**
- Complete payment history
- Automated balance calculations
- Real-time payment status updates

### 3. **Improved Parent Communication**
- Automatic receipt generation
- Payment confirmation notifications
- Outstanding balance alerts

### 4. **Better Financial Reporting**
- Comprehensive payment analytics
- Fee collection efficiency metrics
- Payment method analysis

### 5. **Streamlined Operations**
- Reduced administrative workload
- Faster payment processing
- Improved cash flow management

### 6. **Enhanced Payment Code System**
- **Unique Identification**: Each student gets a unique payment code (e.g., PAY23T1ST001)
- **QR Code Integration**: QR codes for quick payment identification
- **Parent-Friendly**: Easy-to-use payment codes for parents
- **Transaction Matching**: Automatic matching of payments to students
- **Error Prevention**: Reduced payment errors through code validation

## School Pay Payment Code Integration

### Payment Code Source
- **Generated by**: School Pay Uganda system
- **Format**: Varies based on School Pay system
- **Purpose**: Unique identification for each student's payment transactions
- **Integration**: We receive and store these codes, not generate them

### School Pay Integration Process
1. **Code Reception**: School Pay provides payment codes for each student
2. **Student Matching**: We match School Pay codes to our student records
3. **Code Storage**: Store School Pay payment codes in our database
4. **Transaction Matching**: Use codes to match payments to students
5. **Validation**: Verify codes during transaction import

### Expected School Pay Data Structure
```javascript
// School Pay provides this data structure
{
  schoolPayStudentId: "SP123456",        // School Pay's student ID
  studentName: "John Doe",               // Student name
  paymentCode: "PAY23T1ST001",          // Generated by School Pay
  qrCodeUrl: "https://schoolpay.ug/qr/PAY23T1ST001",
  academicYear: "2023",
  term: "1",
  schoolName: "St. Mary's Secondary School"
}
```

## Implementation Workflow with School Pay Payment Codes

1. **Code Reception**: Receive payment codes from School Pay Uganda system
2. **Student Matching**: Match School Pay codes to our student records
3. **Code Storage**: Store School Pay payment codes in our database
4. **Parent Distribution**: Provide payment codes to parents for payments
5. **Payment Processing**: Parents use School Pay codes when making payments
6. **Transaction Import**: Import transactions using School Pay payment codes
7. **Transaction Matching**: Match payments to students using payment codes
8. **Balance Updates**: Automatic balance updates based on matched transactions
9. **Receipt Generation**: Generate receipts with School Pay payment code references

This integration ensures that School Pay Uganda transaction data is seamlessly aligned with student records, providing a comprehensive view of each student's financial status and payment history with enhanced payment code identification.
