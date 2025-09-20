# Complete Firestore Database Design for School Management System

## Overview
This document provides a comprehensive Firestore database design that integrates all aspects of the School Management System including user authentication, student management, academic records, financial operations, and School Pay Uganda integration.

## Database Collections Structure

### 1. Users Collection (Authentication & Role Management)

**Collection:** `users`
**Document ID:** Firebase Auth UID

```javascript
// Document ID: auto-generated Firebase Auth UID
{
  // Basic Authentication Info
  uid: "firebase-auth-uid",
  email: "john.doe@school.edu",
  username: "jdoe", // System-generated username for staff
  role: "head_teacher", // head_teacher, system_admin, dos, bursar, class_teacher, subject_teacher, hod, parent
  
  // Personal Information
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    fullName: "John Doe",
    dateOfBirth: "1980-05-15",
    gender: "male",
    phone: "+256 700 123 456",
    address: "Kampala, Uganda",
    profileImage: "https://storage.googleapis.com/...",
    nationality: "Ugandan",
    religion: "Christian",
    emergencyContact: "+256 700 987 654"
  },
  
  // Role-specific Information
  roleInfo: {
    // For Staff
    staffId: "ST001",
    employeeNumber: "EMP2023001",
    department: "Sciences", // Sciences, Languages, Mathematics, etc.
    position: "Head Teacher",
    hireDate: "2020-01-15",
    salary: 2500000,
    qualifications: [
      {
        degree: "Master of Education",
        institution: "Makerere University",
        year: "2018"
      }
    ],
    
    // For Parents
    parentId: "P001",
    children: ["ST001", "ST002"], // Array of student IDs
    occupation: "Engineer",
    employer: "Uganda Electricity Board"
  },
  
  // Academic Information (for teachers)
  academicInfo: {
    subjects: ["Mathematics", "Physics"], // For subject teachers
    classes: ["S.4 Science A", "S.5 Science B"], // For class teachers
    department: "Sciences", // For HODs
    teachingExperience: 15,
    
    // For Department Heads
    departmentHead: {
      isHead: true,
      department: "Sciences",
      primarySubject: "Physics", // The one subject they head
      managedSubjects: ["Physics", "Chemistry", "Biology"], // Subjects in their department
      departmentTeachers: ["T001", "T002", "T003"] // Teachers under their department
    }
  },
  
  // System Access
  permissions: {
    canViewStudents: true,
    canEditStudents: false,
    canViewFinancials: true,
    canEditFinancials: false,
    canViewGrades: true,
    canEditGrades: true,
    canViewReports: true,
    canManageUsers: false
  },
  
  // Account Status
  accountStatus: "active", // active, suspended, inactive
  lastLogin: "2023-10-15T10:30:00Z",
  loginCount: 45,
  
  // Timestamps
  createdAt: "2023-01-15T08:00:00Z",
  updatedAt: "2023-10-15T10:30:00Z"
}
```

### 2. Students Collection

**Collection:** `students`
**Document ID:** Student ID (e.g., "ST001")

```javascript
// Document ID: "ST001"
{
  studentId: "ST001",
  admissionNumber: "ADM2023001",
  
  // Personal Information
  personalInfo: {
    firstName: "Jane",
    lastName: "Smith",
    fullName: "Jane Smith",
    dateOfBirth: "2005-03-15",
    gender: "female",
    phone: "+256 700 123 456",
    address: "Kampala, Uganda",
    profileImage: "https://storage.googleapis.com/...",
    nationality: "Ugandan",
    religion: "Christian",
    bloodGroup: "O+",
    medicalConditions: ["None"],
    allergies: ["None"]
  },
  
  // Academic Information
  academicInfo: {
    admissionDate: "2023-01-15",
    currentClass: "S.4 Science A",
    stream: "Science",
    status: "active", // active, inactive, graduated, withdrawn, suspended
    academicYear: "2023/2024",
    term: "Term 1",
    
    // Academic History
    academicHistory: [
      {
        year: "2023",
        class: "S.3",
        stream: "Science",
        grades: {
          "Mathematics": "A",
          "Physics": "B+",
          "Chemistry": "A-"
        },
        attendance: {
          totalDays: 180,
          presentDays: 175,
          percentage: 97.2
        }
      }
    ],
    
    // Current Academic Status
    currentGPA: 3.8,
    overallRank: 5,
    classRank: 2
  },
  
  // Financial Information
  financialInfo: {
    totalFeesOwed: 1000000,
    totalFeesPaid: 650000,
    currentBalance: 350000,
    lastPaymentDate: "2023-10-15",
    paymentStatus: "partial", // paid, partial, outstanding
    preferredPaymentMethod: "mobile_money",
    
    // Fee Structure
    feeStructure: {
      tuition: 800000,
      examination: 100000,
      library: 50000,
      sports: 30000,
      transport: 20000
    },
    
    // Payment History
    paymentHistory: [
      {
        transactionId: "TXN001",
        amount: 200000,
        date: "2023-10-15",
        method: "mobile_money",
        reference: "MTN123456"
      }
    ]
  },
  
  // Parent/Guardian Information
  parentInfo: {
    fatherName: "John Smith",
    fatherPhone: "+256 700 123 456",
    fatherEmail: "john.smith@email.com",
    fatherOccupation: "Engineer",
    
    motherName: "Mary Smith",
    motherPhone: "+256 700 123 457",
    motherEmail: "mary.smith@email.com",
    motherOccupation: "Teacher",
    
    guardianName: "Peter Smith",
    guardianPhone: "+256 700 987 654",
    guardianEmail: "peter.smith@email.com",
    guardianRelationship: "Uncle",
    
    emergencyContact: "+256 700 987 654",
    emergencyContactName: "Peter Smith"
  },
  
  // School Pay Integration
  schoolPayIntegration: {
    isIntegrated: true,
    schoolPayId: "SP123456",
    paymentCode: "PAY23T1ST001",
    lastSyncDate: "2023-10-15T10:30:00Z",
    syncStatus: "successful",
    
    paymentInstructions: {
      code: "PAY23T1ST001",
      instructions: "Use payment code PAY23T1ST001 when making payments via School Pay Uganda",
      qrCodeUrl: "https://schoolpay.ug/qr/PAY23T1ST001"
    }
  },
  
  // Timestamps
  createdAt: "2023-01-15T08:00:00Z",
  updatedAt: "2023-10-15T10:30:00Z"
}
```

### 3. Academic Levels Collection

**Collection:** `academic_levels`
**Document ID:** Level ID (e.g., "O_LEVEL", "A_LEVEL")

```javascript
// Document ID: "O_LEVEL"
{
  levelId: "O_LEVEL",
  levelName: "Ordinary Level",
  description: "O-Level Education (S.1 - S.4)",
  
  // Level Information
  levelInfo: {
    startClass: "S.1",
    endClass: "S.4",
    duration: 4, // years
    ageRange: "13-17",
    isActive: true
  },
  
  // Compulsory Subjects
  compulsorySubjects: [
    {
      subjectId: "SUB001",
      subjectName: "English Language",
      subjectCode: "ENG",
      isCore: true
    },
    {
      subjectId: "SUB002", 
      subjectName: "Mathematics",
      subjectCode: "MATH",
      isCore: true
    },
    {
      subjectId: "SUB003",
      subjectName: "Biology",
      subjectCode: "BIO",
      isCore: true
    }
  ],
  
  // Optional Subjects
  optionalSubjects: [
    {
      subjectId: "SUB004",
      subjectName: "Art",
      subjectCode: "ART",
      isCore: false
    },
    {
      subjectId: "SUB005",
      subjectName: "Music",
      subjectCode: "MUS",
      isCore: false
    }
  ],
  
  // Timestamps
  createdAt: "2023-01-15T08:00:00Z",
  updatedAt: "2023-10-15T10:30:00Z"
}

// Document ID: "A_LEVEL"
{
  levelId: "A_LEVEL",
  levelName: "Advanced Level",
  description: "A-Level Education (S.5 - S.6)",
  
  // Level Information
  levelInfo: {
    startClass: "S.5",
    endClass: "S.6",
    duration: 2, // years
    ageRange: "17-19",
    isActive: true
  },
  
  // Compulsory Subjects
  compulsorySubjects: [
    {
      subjectId: "SUB006",
      subjectName: "General Paper",
      subjectCode: "GP",
      isCore: true
    }
  ],
  
  // Optional Subjects (Students choose 3-4)
  optionalSubjects: [
    {
      subjectId: "SUB007",
      subjectName: "Physics",
      subjectCode: "PHY",
      isCore: false,
      department: "Sciences"
    },
    {
      subjectId: "SUB008",
      subjectName: "Chemistry",
      subjectCode: "CHEM",
      isCore: false,
      department: "Sciences"
    },
    {
      subjectId: "SUB009",
      subjectName: "Biology",
      subjectCode: "BIO",
      isCore: false,
      department: "Sciences"
    },
    {
      subjectId: "SUB010",
      subjectName: "Mathematics",
      subjectCode: "MATH",
      isCore: false,
      department: "Mathematics"
    },
    {
      subjectId: "SUB011",
      subjectName: "Economics",
      subjectCode: "ECON",
      isCore: false,
      department: "Social Sciences"
    },
    {
      subjectId: "SUB012",
      subjectName: "History",
      subjectCode: "HIST",
      isCore: false,
      department: "Social Sciences"
    }
  ],
  
  // Timestamps
  createdAt: "2023-01-15T08:00:00Z",
  updatedAt: "2023-10-15T10:30:00Z"
}
```

### 4. Subjects Collection

**Collection:** `subjects`
**Document ID:** Subject ID (e.g., "SUB001")

```javascript
// Document ID: "SUB001"
{
  subjectId: "SUB001",
  subjectCode: "MATH",
  subjectName: "Mathematics",
  description: "Advanced Mathematics for Senior 4",
  
  // Academic Information
  academicInfo: {
    level: "O_LEVEL", // O_LEVEL, A_LEVEL
    class: "S.4",
    stream: "Science", // Science, Arts, Commercial
    credits: 4,
    prerequisites: ["S.3 Mathematics"],
    department: "Mathematics",
    isCompulsory: true, // true for compulsory, false for optional
    isCore: true // Core subject in the level
  },
  
  // Teaching Information
  teachingInfo: {
    teachers: ["T001", "T002"], // Array of teacher IDs
    departmentHead: "T001", // HOD for this subject
    totalHours: 40,
    hoursPerWeek: 5,
    term: "Term 1",
    academicYear: "2023/2024"
  },
  
  // Assessment Information
  assessmentInfo: {
    totalMarks: 100,
    passMark: 50,
    assessmentTypes: [
      {
        type: "Continuous Assessment",
        weight: 30,
        maxMarks: 30
      },
      {
        type: "Mid-term Exam",
        weight: 30,
        maxMarks: 30
      },
      {
        type: "Final Exam",
        weight: 40,
        maxMarks: 40
      }
    ]
  },
  
  // Timestamps
  createdAt: "2023-01-15T08:00:00Z",
  updatedAt: "2023-10-15T10:30:00Z"
}
```

### 4. Classes Collection

**Collection:** `classes`
**Document ID:** Class ID (e.g., "S4SA")

```javascript
// Document ID: "S4SA"
{
  classId: "S4SA",
  className: "S.4 Science A",
  stream: "Science",
  level: "S.4",
  
  // Class Information
  classInfo: {
    academicYear: "2023/2024",
    term: "Term 1",
    totalStudents: 35,
    capacity: 40,
    classTeacher: "T001", // Teacher ID
    assistantTeacher: "T002"
  },
  
  // Students in Class
  students: [
    {
      studentId: "ST001",
      studentName: "Jane Smith",
      admissionNumber: "ADM2023001"
    }
  ],
  
  // Subjects for Class
  subjects: ["SUB001", "SUB002", "SUB003"], // Array of subject IDs
  
  // Class Performance
  performance: {
    averageScore: 75.5,
    passRate: 94.3,
    topPerformer: "ST001",
    classRank: 1
  },
  
  // Timestamps
  createdAt: "2023-01-15T08:00:00Z",
  updatedAt: "2023-10-15T10:30:00Z"
}
```

### 5. Grades Collection

**Collection:** `grades`
**Document ID:** Grade ID (auto-generated)

```javascript
// Document ID: auto-generated
{
  gradeId: "GRD001",
  studentId: "ST001",
  subjectId: "SUB001",
  classId: "S4SA",
  
  // Grade Information
  gradeInfo: {
    academicYear: "2023/2024",
    term: "Term 1",
    examType: "Continuous Assessment", // Continuous Assessment, Mid-term, Final
    examDate: "2023-10-15",
    marksObtained: 85,
    maxMarks: 100,
    percentage: 85.0,
    grade: "A",
    points: 4.0
  },
  
  // Assessment Details
  assessmentDetails: {
    teacherId: "T001",
    teacherName: "John Doe",
    subjectName: "Mathematics",
    examTitle: "Algebra Test",
    duration: 120, // minutes
    venue: "Room 101"
  },
  
  // Grade Status
  status: "published", // draft, published, reviewed
  isPassed: true,
  remarks: "Excellent performance",
  
  // Timestamps
  createdAt: "2023-10-15T10:30:00Z",
  updatedAt: "2023-10-15T10:30:00Z"
}
```

### 6. Financial Transactions Collection

**Collection:** `financial_transactions`
**Document ID:** Transaction ID (auto-generated)

```javascript
// Document ID: auto-generated
{
  transactionId: "TXN001",
  studentId: "ST001",
  
  // Transaction Information
  transactionInfo: {
    type: "income", // income, expense
    category: "tuition_fee", // tuition_fee, examination_fee, library_fee, etc.
    amount: 200000,
    currency: "UGX",
    description: "Tuition fee payment for Term 1",
    reference: "MTN123456"
  },
  
  // Payment Information
  paymentInfo: {
    method: "mobile_money", // mobile_money, bank_transfer, cash, school_pay
    provider: "MTN",
    transactionReference: "MTN123456",
    paidDate: "2023-10-15",
    processedBy: "U001", // User ID who processed
    processedAt: "2023-10-15T10:30:00Z"
  },
  
  // School Pay Integration
  schoolPayData: {
    originalTransactionId: "SP123456",
    schoolPayStatus: "completed",
    schoolPayMethod: "mobile_money",
    schoolPayReference: "SP123456",
    parentPhone: "+256 700 123 456",
    parentName: "John Smith",
    paymentCode: "PAY23T1ST001"
  },
  
  // Transaction Status
  status: "completed", // pending, completed, failed, cancelled
  isVerified: true,
  verificationDate: "2023-10-15T10:30:00Z",
  
  // Timestamps
  createdAt: "2023-10-15T10:30:00Z",
  updatedAt: "2023-10-15T10:30:00Z"
}
```

### 7. School Pay Integrations Collection

**Collection:** `school_pay_integrations`
**Document ID:** Integration ID (auto-generated)

```javascript
// Document ID: auto-generated
{
  integrationId: "INT001",
  fileName: "transaction_histories-19-09-2025-102647.xlsx",
  
  // Import Information
  importInfo: {
    importDate: "2023-10-15T10:30:00Z",
    importedBy: "U001", // User ID
    totalRecords: 150,
    successfulImports: 145,
    failedImports: 5,
    status: "completed" // processing, completed, failed
  },
  
  // File Information
  fileInfo: {
    originalName: "transaction_histories-19-09-2025-102647.xlsx",
    fileSize: 245760, // bytes
    fileType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    uploadDate: "2023-10-15T10:30:00Z"
  },
  
  // Processing Results
  processingResults: {
    totalAmount: 15000000, // Total amount processed
    averageTransaction: 100000,
    paymentMethods: {
      "mobile_money": 120,
      "bank_transfer": 20,
      "cash": 5
    },
    feeTypes: {
      "tuition_fee": 100,
      "examination_fee": 30,
      "library_fee": 15,
      "sports_fee": 5
    }
  },
  
  // Error Handling
  errors: [
    {
      row: 15,
      studentId: "ST999",
      error: "Student not found",
      data: { /* original row data */ }
    }
  ],
  
  // Timestamps
  createdAt: "2023-10-15T10:30:00Z",
  updatedAt: "2023-10-15T10:30:00Z"
}
```

### 8. Report Cards Collection

**Collection:** `report_cards`
**Document ID:** Report Card ID (auto-generated)

```javascript
// Document ID: auto-generated
{
  reportCardId: "RC001",
  studentId: "ST001",
  classId: "S4SA",
  
  // Report Card Information
  reportCardInfo: {
    academicYear: "2023/2024",
    term: "Term 1",
    reportDate: "2023-10-15",
    generatedBy: "U001", // User ID
    status: "published" // draft, published, reviewed
  },
  
  // Academic Performance
  academicPerformance: {
    totalSubjects: 8,
    totalMarks: 800,
    marksObtained: 680,
    percentage: 85.0,
    grade: "A",
    points: 4.0,
    rank: 5,
    classRank: 2
  },
  
  // Subject-wise Performance
  subjectPerformance: [
    {
      subjectId: "SUB001",
      subjectName: "Mathematics",
      marksObtained: 85,
      maxMarks: 100,
      percentage: 85.0,
      grade: "A",
      points: 4.0,
      teacherName: "John Doe",
      remarks: "Excellent"
    }
  ],
  
  // Attendance Information
  attendance: {
    totalDays: 90,
    presentDays: 87,
    absentDays: 3,
    percentage: 96.7
  },
  
  // Comments and Remarks
  comments: {
    classTeacher: "Jane has shown excellent progress this term.",
    headTeacher: "Outstanding performance. Keep it up!",
    parentSignature: "John Smith",
    parentDate: "2023-10-20"
  },
  
  // Timestamps
  createdAt: "2023-10-15T10:30:00Z",
  updatedAt: "2023-10-15T10:30:00Z"
}
```

### 9. Announcements Collection

**Collection:** `announcements`
**Document ID:** Announcement ID (auto-generated)

```javascript
// Document ID: auto-generated
{
  announcementId: "ANN001",
  title: "Parent-Teacher Meeting",
  content: "There will be a parent-teacher meeting on Friday...",
  
  // Announcement Information
  announcementInfo: {
    type: "general", // general, academic, financial, emergency
    priority: "high", // low, medium, high, urgent
    targetAudience: "all", // all, students, parents, staff, specific_class
    targetClasses: ["S4SA", "S4SB"], // If specific classes
    isActive: true,
    startDate: "2023-10-15",
    endDate: "2023-10-20"
  },
  
  // Author Information
  author: {
    userId: "U001",
    userName: "John Doe",
    role: "head_teacher"
  },
  
  // Timestamps
  createdAt: "2023-10-15T10:30:00Z",
  updatedAt: "2023-10-15T10:30:00Z"
}
```

### 10. Staff Usernames Collection

**Collection:** `staff_usernames`
**Document ID:** Username (e.g., "jdoe")

```javascript
// Document ID: "jdoe"
{
  username: "jdoe",
  userId: "firebase-auth-uid",
  staffId: "ST001",
  fullName: "John Doe",
  role: "head_teacher",
  
  // Username Information
  usernameInfo: {
    isActive: true,
    createdBy: "system_admin_uid", // System admin who created this username
    createdDate: "2023-01-15T08:00:00Z",
    lastUsed: "2023-10-15T10:30:00Z",
    usageCount: 45
  },
  
  // Access Information
  accessInfo: {
    canLogin: true,
    loginAttempts: 0,
    lastLoginAttempt: "2023-10-15T10:30:00Z",
    isLocked: false,
    lockReason: null
  },
  
  // Timestamps
  createdAt: "2023-01-15T08:00:00Z",
  updatedAt: "2023-10-15T10:30:00Z"
}
```

### 11. Student Subject Selection Collection

**Collection:** `student_subject_selections`
**Document ID:** Selection ID (auto-generated)

```javascript
// Document ID: auto-generated
{
  selectionId: "SEL001",
  studentId: "ST001",
  academicYear: "2023/2024",
  level: "A_LEVEL", // O_LEVEL, A_LEVEL
  
  // Subject Selection
  subjectSelection: {
    // Compulsory subjects (automatically included)
    compulsorySubjects: [
      {
        subjectId: "SUB006",
        subjectName: "General Paper",
        subjectCode: "GP",
        isCore: true
      }
    ],
    
    // Optional subjects chosen by student
    selectedOptionalSubjects: [
      {
        subjectId: "SUB007",
        subjectName: "Physics",
        subjectCode: "PHY",
        department: "Sciences",
        isCore: false
      },
      {
        subjectId: "SUB008",
        subjectName: "Chemistry", 
        subjectCode: "CHEM",
        department: "Sciences",
        isCore: false
      },
      {
        subjectId: "SUB010",
        subjectName: "Mathematics",
        subjectCode: "MATH",
        department: "Mathematics",
        isCore: false
      }
    ],
    
    // Total subjects (compulsory + selected optional)
    totalSubjects: 4,
    totalCredits: 16
  },
  
  // Selection Information
  selectionInfo: {
    selectedBy: "ST001", // Student ID
    approvedBy: "U001", // Teacher/Admin ID who approved
    selectionDate: "2023-01-15",
    approvalDate: "2023-01-16",
    status: "approved", // pending, approved, rejected
    remarks: "Good subject combination for sciences"
  },
  
  // Timestamps
  createdAt: "2023-01-15T08:00:00Z",
  updatedAt: "2023-01-16T10:30:00Z"
}
```

### 12. Attendance Collection

**Collection:** `attendance`
**Document ID:** Attendance ID (auto-generated)

```javascript
// Document ID: auto-generated
{
  attendanceId: "ATT001",
  studentId: "ST001",
  classId: "S4SA",
  
  // Attendance Information
  attendanceInfo: {
    date: "2023-10-15",
    status: "present", // present, absent, late, excused
    timeIn: "08:00",
    timeOut: "16:00",
    remarks: "On time"
  },
  
  // Recorded By
  recordedBy: {
    userId: "U001",
    userName: "John Doe",
    role: "class_teacher"
  },
  
  // Timestamps
  createdAt: "2023-10-15T08:00:00Z",
  updatedAt: "2023-10-15T08:00:00Z"
}
```

## Database Indexes

### Required Indexes for Optimal Performance

```javascript
// Users Collection Indexes
users: [
  { fields: ["role"], order: ["asc"] },
  { fields: ["accountStatus"], order: ["asc"] },
  { fields: ["roleInfo.department"], order: ["asc"] },
  { fields: ["username"], order: ["asc"] }
]

// Students Collection Indexes
students: [
  { fields: ["academicInfo.currentClass"], order: ["asc"] },
  { fields: ["academicInfo.status"], order: ["asc"] },
  { fields: ["financialInfo.paymentStatus"], order: ["asc"] },
  { fields: ["schoolPayIntegration.paymentCode"], order: ["asc"] }
]

// Academic Levels Indexes
academic_levels: [
  { fields: ["levelInfo.isActive"], order: ["asc"] },
  { fields: ["levelId"], order: ["asc"] }
]

// Subjects Collection Indexes
subjects: [
  { fields: ["academicInfo.level"], order: ["asc"] },
  { fields: ["academicInfo.department"], order: ["asc"] },
  { fields: ["academicInfo.isCompulsory"], order: ["asc"] },
  { fields: ["teachingInfo.departmentHead"], order: ["asc"] }
]

// Staff Usernames Indexes
staff_usernames: [
  { fields: ["username"], order: ["asc"] },
  { fields: ["userId"], order: ["asc"] },
  { fields: ["role"], order: ["asc"] },
  { fields: ["usernameInfo.isActive"], order: ["asc"] }
]

// Student Subject Selections Indexes
student_subject_selections: [
  { fields: ["studentId", "academicYear"], order: ["asc", "asc"] },
  { fields: ["level", "academicYear"], order: ["asc", "asc"] },
  { fields: ["selectionInfo.status"], order: ["asc"] }
]

// Grades Collection Indexes
grades: [
  { fields: ["studentId", "academicYear", "term"], order: ["asc", "asc", "asc"] },
  { fields: ["subjectId", "academicYear", "term"], order: ["asc", "asc", "asc"] },
  { fields: ["classId", "academicYear", "term"], order: ["asc", "asc", "asc"] }
]

// Financial Transactions Indexes
financial_transactions: [
  { fields: ["studentId", "paidDate"], order: ["asc", "desc"] },
  { fields: ["type", "status"], order: ["asc", "asc"] },
  { fields: ["paidDate"], order: ["desc"] }
]

// School Pay Integrations Indexes
school_pay_integrations: [
  { fields: ["importInfo.status"], order: ["asc"] },
  { fields: ["importInfo.importDate"], order: ["desc"] }
]

// Attendance Indexes
attendance: [
  { fields: ["studentId", "attendanceInfo.date"], order: ["asc", "desc"] },
  { fields: ["classId", "attendanceInfo.date"], order: ["asc", "desc"] },
  { fields: ["attendanceInfo.status"], order: ["asc"] }
]
```

## Security Rules

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Students - role-based access
    match /students/{studentId} {
      allow read: if request.auth != null && 
        (hasRole(['head_teacher', 'system_admin', 'dos', 'class_teacher', 'bursar']) ||
         resource.data.studentId == request.auth.uid);
      allow write: if request.auth != null && 
        hasRole(['head_teacher', 'system_admin', 'dos', 'bursar']);
    }
    
    // Grades - teachers can write, students can read their own
    match /grades/{gradeId} {
      allow read: if request.auth != null && 
        (resource.data.studentId == request.auth.uid || 
         hasRole(['head_teacher', 'system_admin', 'dos', 'class_teacher', 'subject_teacher', 'hod']));
      allow write: if request.auth != null && 
        hasRole(['subject_teacher', 'class_teacher', 'dos', 'head_teacher', 'system_admin']);
    }
    
    // Financial data - only bursar and above
    match /financial_transactions/{transactionId} {
      allow read, write: if request.auth != null && 
        hasRole(['bursar', 'head_teacher', 'system_admin']);
    }
    
    // School Pay integrations - only bursar and above
    match /school_pay_integrations/{integrationId} {
      allow read, write: if request.auth != null && 
        hasRole(['bursar', 'head_teacher', 'system_admin']);
    }
    
    // Announcements - role-based access
    match /announcements/{announcementId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        hasRole(['head_teacher', 'system_admin', 'dos']);
    }
    
    // Helper function to check user roles
    function hasRole(roles) {
      return request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in roles;
    }
  }
}
```

## Implementation Benefits

### 1. **Complete User Management**
- Firebase Authentication integration
- Role-based access control
- User permissions and security

### 2. **Comprehensive Student Records**
- Personal, academic, and financial information
- School Pay Uganda integration
- Payment code management

### 3. **Academic Management**
- Subject and class management
- Grade recording and tracking
- Report card generation

### 4. **Financial Integration**
- Transaction recording and tracking
- School Pay Uganda file processing
- Payment analytics and reporting

### 5. **Real-time Updates**
- Live data synchronization
- Real-time notifications
- Collaborative features

### 6. **Scalability**
- Cloud-based infrastructure
- Automatic scaling
- Global accessibility

This complete Firestore database design provides a solid foundation for your School Management System with full integration capabilities, security, and scalability.
