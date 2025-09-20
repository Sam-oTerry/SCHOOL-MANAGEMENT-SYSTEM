# Firestore Database Design for School Management System

## Overview
This document outlines a comprehensive Firestore database structure for the School Management System, designed to support all user roles and functionality identified in the system.

## Database Architecture

### Core Collections

#### 1. **users** Collection
```javascript
// Document ID: auto-generated or custom (e.g., "user_123")
{
  uid: "user_123",                    // Firebase Auth UID
  email: "john.doe@school.edu",
  role: "head_teacher",               // head_teacher, system_admin, dos, bursar, class_teacher, subject_teacher, hod
  staffId: "HT1234",                  // Auto-generated based on role
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    phone: "+256 700 123 456",
    address: "Kampala, Uganda",
    dateOfBirth: "1980-05-15",
    gender: "male",
    profileImage: "https://...",
    emergencyContact: {
      name: "Jane Doe",
      phone: "+256 700 234 567",
      relationship: "spouse"
    }
  },
  employmentInfo: {
    position: "Head Teacher",
    department: "Administration",
    hireDate: "2020-01-15",
    salary: 2500000,
    status: "active",                 // active, inactive, suspended
    qualifications: ["M.Ed", "B.Ed"],
    subjects: [],                     // For teachers
    classes: []                       // For class teachers
  },
  permissions: {
    canCreateUsers: true,
    canManageSystem: true,
    canViewFinancials: true,
    canManageAcademic: true
  },
  lastLogin: "2023-10-15T10:30:00Z",
  createdAt: "2023-01-15T08:00:00Z",
  updatedAt: "2023-10-15T10:30:00Z"
}
```

#### 2. **students** Collection
```javascript
// Document ID: auto-generated or custom (e.g., "ST001")
{
  studentId: "ST001",
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
    status: "active",                 // active, graduated, transferred, suspended
    previousSchool: "ABC Primary School",
    emergencyContact: {
      name: "Jane Doe",
      phone: "+256 700 234 567",
      relationship: "mother",
      address: "Kampala, Uganda"
    }
  },
  academicHistory: [
    {
      year: "2023",
      term: "1",
      class: "S.4 Science A",
      subjects: ["Mathematics", "Physics", "Chemistry", "Biology"],
      averageScore: 85.5,
      position: 5,
      totalStudents: 45
    }
  ],
  attendance: {
    totalDays: 180,
    presentDays: 175,
    absentDays: 5,
    attendanceRate: 97.2
  },
  createdAt: "2023-01-15T08:00:00Z",
  updatedAt: "2023-10-15T10:30:00Z"
}
```

#### 3. **subjects** Collection
```javascript
// Document ID: auto-generated or custom (e.g., "SUB001")
{
  subjectId: "SUB001",
  name: "Mathematics",
  code: "MATH",
  description: "Core Mathematics for Secondary School",
  department: "Mathematics",
  level: "O-Level",                   // O-Level, A-Level
  credits: 4,
  prerequisites: [],
  isCore: true,
  gradingSystem: {
    type: "percentage",              // percentage, letter_grade
    passingGrade: 50,
    maxScore: 100
  },
  curriculum: {
    topics: ["Algebra", "Geometry", "Trigonometry"],
    objectives: ["Problem solving", "Critical thinking"],
    resources: ["Textbooks", "Calculators"]
  },
  status: "active",
  createdAt: "2023-01-15T08:00:00Z",
  updatedAt: "2023-10-15T10:30:00Z"
}
```

#### 4. **classes** Collection
```javascript
// Document ID: auto-generated or custom (e.g., "S4SA")
{
  classId: "S4SA",
  name: "S.4 Science A",
  level: "S.4",
  stream: "Science",
  capacity: 45,
  currentEnrollment: 42,
  classTeacher: "user_123",         // Reference to users collection
  subjects: ["SUB001", "SUB002"],    // Array of subject IDs
  timetable: {
    monday: [
      { time: "08:00", subject: "SUB001", teacher: "user_456", room: "Room 1" },
      { time: "09:00", subject: "SUB002", teacher: "user_789", room: "Room 2" }
    ],
    // ... other days
  },
  academicYear: "2023",
  term: "1",
  status: "active",
  createdAt: "2023-01-15T08:00:00Z",
  updatedAt: "2023-10-15T10:30:00Z"
}
```

#### 5. **grades** Collection
```javascript
// Document ID: auto-generated or custom (e.g., "GRD001")
{
  gradeId: "GRD001",
  studentId: "ST001",                // Reference to students collection
  subjectId: "SUB001",              // Reference to subjects collection
  teacherId: "user_456",            // Reference to users collection
  classId: "S4SA",                  // Reference to classes collection
  academicYear: "2023",
  term: "1",
  assessmentType: "midterm",        // midterm, endterm, assignment, project
  scores: {
    midterm: 75,                   // 20% weight
    endterm: 85,                    // 80% weight
    assignments: [80, 85, 90],      // Array of assignment scores
    projects: [88]                  // Array of project scores
  },
  finalGrade: {
    percentage: 82,
    letterGrade: "B",
    points: 4
  },
  comments: "Good performance, needs improvement in algebra",
  status: "approved",               // pending, approved, rejected
  approvedBy: "user_123",           // Reference to approver
  approvedAt: "2023-10-15T10:30:00Z",
  createdAt: "2023-10-15T08:00:00Z",
  updatedAt: "2023-10-15T10:30:00Z"
}
```

#### 6. **attendance** Collection
```javascript
// Document ID: auto-generated or custom (e.g., "ATT001")
{
  attendanceId: "ATT001",
  studentId: "ST001",               // Reference to students collection
  classId: "S4SA",                  // Reference to classes collection
  date: "2023-10-15",
  status: "present",                // present, absent, late, excused
  timeIn: "08:00",
  timeOut: "16:00",
  remarks: "On time",
  recordedBy: "user_456",           // Reference to users collection
  createdAt: "2023-10-15T08:00:00Z"
}
```

#### 7. **financial_transactions** Collection
```javascript
// Document ID: auto-generated or custom (e.g., "TXN001")
{
  transactionId: "TXN001",
  studentId: "ST001",               // Reference to students collection
  type: "income",                  // income, expense
  category: "tuition_fee",         // tuition_fee, examination_fee, library_fee, etc.
  amount: 500000,                  // Amount in Ugandan Shillings
  currency: "UGX",
  paymentMethod: "cash",           // cash, bank_transfer, mobile_money, school_pay
  description: "Tuition fee payment for Term 1",
  reference: "RCP001",             // Receipt number
  status: "completed",             // pending, completed, failed, refunded
  processedBy: "user_789",         // Reference to users collection
  processedAt: "2023-10-15T10:30:00Z",
  dueDate: "2023-10-01",
  paidDate: "2023-10-15",
  receiptUrl: "https://...",
  notes: "Payment received in full",
  createdAt: "2023-10-15T08:00:00Z",
  updatedAt: "2023-10-15T10:30:00Z"
}
```

#### 8. **fees** Collection
```javascript
// Document ID: auto-generated or custom (e.g., "FEE001")
{
  feeId: "FEE001",
  studentId: "ST001",               // Reference to students collection
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
  status: "partial",               // paid, partial, outstanding
  dueDate: "2023-10-01",
  lastPaymentDate: "2023-10-15",
  paymentHistory: [
    {
      amount: 350000,
      date: "2023-10-15",
      method: "cash",
      reference: "RCP001"
    }
  ],
  createdAt: "2023-01-15T08:00:00Z",
  updatedAt: "2023-10-15T10:30:00Z"
}
```

#### 9. **announcements** Collection
```javascript
// Document ID: auto-generated or custom (e.g., "ANN001")
{
  announcementId: "ANN001",
  title: "Parent-Teacher Meeting",
  content: "All parents are invited to attend the parent-teacher meeting...",
  type: "general",                  // general, academic, financial, emergency
  priority: "high",                 // low, medium, high, urgent
  targetAudience: ["students", "parents", "staff"], // Array of target groups
  targetClasses: ["S4SA", "S4SB"], // Specific classes (optional)
  author: "user_123",               // Reference to users collection
  status: "published",             // draft, published, archived
  publishDate: "2023-10-15T10:30:00Z",
  expiryDate: "2023-11-15T10:30:00Z",
  attachments: ["https://..."],     // Array of attachment URLs
  readBy: ["user_456", "user_789"], // Array of user IDs who read it
  createdAt: "2023-10-15T08:00:00Z",
  updatedAt: "2023-10-15T10:30:00Z"
}
```

#### 10. **timetables** Collection
```javascript
// Document ID: auto-generated or custom (e.g., "TT001")
{
  timetableId: "TT001",
  classId: "S4SA",                  // Reference to classes collection
  academicYear: "2023",
  term: "1",
  schedule: {
    monday: [
      {
        time: "08:00-09:00",
        subject: "Mathematics",
        subjectId: "SUB001",
        teacher: "John Doe",
        teacherId: "user_456",
        room: "Room 1"
      }
    ],
    // ... other days
  },
  status: "active",
  createdBy: "user_123",
  createdAt: "2023-01-15T08:00:00Z",
  updatedAt: "2023-10-15T10:30:00Z"
}
```

#### 11. **academic_calendar** Collection
```javascript
// Document ID: auto-generated or custom (e.g., "CAL001")
{
  calendarId: "CAL001",
  academicYear: "2023",
  events: [
    {
      eventId: "EVT001",
      title: "Term 1 Begins",
      description: "First day of Term 1",
      date: "2023-01-15",
      type: "academic",             // academic, holiday, examination, meeting
      priority: "high",
      isRecurring: false,
      createdBy: "user_123"
    }
  ],
  terms: [
    {
      termId: "T1",
      name: "Term 1",
      startDate: "2023-01-15",
      endDate: "2023-04-15",
      status: "active"
    }
  ],
  status: "active",
  createdAt: "2023-01-15T08:00:00Z",
  updatedAt: "2023-10-15T10:30:00Z"
}
```

#### 12. **reports** Collection
```javascript
// Document ID: auto-generated or custom (e.g., "RPT001")
{
  reportId: "RPT001",
  studentId: "ST001",               // Reference to students collection
  academicYear: "2023",
  term: "1",
  classId: "S4SA",
  grades: [
    {
      subjectId: "SUB001",
      subjectName: "Mathematics",
      midterm: 75,
      endterm: 85,
      finalGrade: 82,
      letterGrade: "B",
      position: 5,
      totalStudents: 45
    }
  ],
  overallPerformance: {
    averageScore: 82.5,
    position: 5,
    totalStudents: 45,
    classAverage: 78.2
  },
  attendance: {
    totalDays: 90,
    presentDays: 87,
    attendanceRate: 96.7
  },
  comments: {
    classTeacher: "Good performance, needs improvement in mathematics",
    headTeacher: "Approved",
    dos: "Approved"
  },
  status: "approved",              // draft, pending, approved, rejected
  generatedBy: "user_456",
  approvedBy: "user_123",
  generatedAt: "2023-10-15T10:30:00Z",
  approvedAt: "2023-10-16T09:00:00Z",
  createdAt: "2023-10-15T08:00:00Z",
  updatedAt: "2023-10-16T09:00:00Z"
}
```

#### 13. **system_settings** Collection
```javascript
// Document ID: "settings"
{
  schoolInfo: {
    name: "St. Mary's Secondary School",
    address: "Kampala, Uganda",
    phone: "+256 700 123 456",
    email: "info@stmarys.edu",
    website: "www.stmarys.edu",
    logo: "https://...",
    motto: "Excellence in Education"
  },
  academicSettings: {
    currentAcademicYear: "2023",
    currentTerm: "1",
    gradingSystem: "percentage",     // percentage, letter_grade
    passingGrade: 50,
    maxScore: 100,
    termWeights: {
      midterm: 20,
      endterm: 80
    }
  },
  financialSettings: {
    currency: "UGX",
    feeStructure: {
      tuition: 500000,
      examination: 100000,
      library: 50000,
      sports: 30000
    },
    paymentMethods: ["cash", "bank_transfer", "mobile_money", "school_pay"]
  },
  systemSettings: {
    allowStudentRegistration: true,
    allowOnlinePayments: true,
    requireGradeApproval: true,
    autoGenerateReports: false
  },
  updatedBy: "user_123",
  updatedAt: "2023-10-15T10:30:00Z"
}
```

#### 14. **audit_logs** Collection
```javascript
// Document ID: auto-generated
{
  logId: "LOG001",
  userId: "user_123",               // Reference to users collection
  action: "create_student",         // create, update, delete, login, logout
  resource: "students",            // Collection name
  resourceId: "ST001",             // Document ID
  details: {
    oldData: {},
    newData: { firstName: "John", lastName: "Doe" },
    changes: ["firstName", "lastName"]
  },
  ipAddress: "192.168.1.100",
  userAgent: "Mozilla/5.0...",
  timestamp: "2023-10-15T10:30:00Z",
  success: true,
  errorMessage: null
}
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
    
    // Students can read their own data
    match /students/{studentId} {
      allow read: if request.auth != null && 
        (resource.data.studentId == request.auth.uid || 
         hasRole(['head_teacher', 'system_admin', 'dos', 'class_teacher']));
      allow write: if request.auth != null && 
        hasRole(['head_teacher', 'system_admin', 'dos']);
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
    
    // Helper function to check user roles
    function hasRole(roles) {
      return request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in roles;
    }
  }
}
```

## Indexes

### Composite Indexes
```javascript
// For querying grades by student and subject
grades: [
  { studentId: "asc", subjectId: "asc", academicYear: "desc" },
  { classId: "asc", academicYear: "desc", term: "desc" }
]

// For querying attendance by student and date range
attendance: [
  { studentId: "asc", date: "desc" },
  { classId: "asc", date: "desc" }
]

// For querying financial transactions
financial_transactions: [
  { studentId: "asc", date: "desc" },
  { type: "asc", status: "asc", date: "desc" }
]

// For querying announcements by target audience
announcements: [
  { targetAudience: "array-contains", publishDate: "desc" },
  { status: "asc", publishDate: "desc" }
]
```

## Data Relationships

### Primary Relationships
1. **Users** → **Students**: One-to-many (class teachers to students)
2. **Users** → **Subjects**: Many-to-many (teachers to subjects)
3. **Students** → **Grades**: One-to-many
4. **Students** → **Attendance**: One-to-many
5. **Students** → **Financial Transactions**: One-to-many
6. **Classes** → **Students**: One-to-many
7. **Classes** → **Subjects**: Many-to-many
8. **Subjects** → **Grades**: One-to-many

### Query Patterns

#### Common Queries
```javascript
// Get all students in a class
db.collection('students')
  .where('academicInfo.currentClass', '==', 'S.4 Science A')
  .where('academicInfo.status', '==', 'active')

// Get grades for a student
db.collection('grades')
  .where('studentId', '==', 'ST001')
  .where('academicYear', '==', '2023')
  .orderBy('subjectId')

// Get financial transactions for a student
db.collection('financial_transactions')
  .where('studentId', '==', 'ST001')
  .where('type', '==', 'income')
  .orderBy('createdAt', 'desc')

// Get announcements for a specific audience
db.collection('announcements')
  .where('targetAudience', 'array-contains', 'students')
  .where('status', '==', 'published')
  .orderBy('publishDate', 'desc')
```

## Performance Considerations

### Optimization Strategies
1. **Denormalization**: Store frequently accessed data in multiple collections
2. **Caching**: Use Firebase Functions for complex queries
3. **Pagination**: Implement pagination for large datasets
4. **Batch Operations**: Use batch writes for multiple operations
5. **Real-time Updates**: Use Firestore listeners for real-time data

### Data Size Management
1. **Archive Old Data**: Move old academic years to separate collections
2. **Cleanup**: Regularly clean up temporary data
3. **Compression**: Compress large text fields
4. **CDN**: Use Cloud Storage for large files (images, documents)

## Backup and Recovery

### Backup Strategy
1. **Automated Backups**: Daily automated backups
2. **Point-in-time Recovery**: Restore to specific timestamps
3. **Cross-region Replication**: Backup to multiple regions
4. **Export/Import**: Regular data exports for compliance

### Disaster Recovery
1. **Multi-region Setup**: Deploy across multiple regions
2. **Failover**: Automatic failover to backup regions
3. **Data Validation**: Regular data integrity checks
4. **Recovery Testing**: Regular disaster recovery drills

This Firestore database design provides a comprehensive foundation for the School Management System, supporting all identified user roles and functionality while maintaining data integrity, security, and performance.
