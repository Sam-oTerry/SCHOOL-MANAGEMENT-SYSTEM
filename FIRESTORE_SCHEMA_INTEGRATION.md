# Firestore Schema for Report Cards Integration

## Collections Structure

### 1. Students Collection (`students/{id}`)

```javascript
{
  // Document ID: student's unique identifier
  id: "student-001",
  
  // Basic Information
  name: "John Doe",
  sex: "Male",
  class: "S.4 Science A",
  stream: "Science",
  lin: "ADM256174", // Learner Identification Number
  payment_code: "1003",
  
  // Academic Data
  subjects: [
    {
      name: "MATHS",
      aoi: 39,        // Activity of Integration
      eot: 10,        // End of Term Score
      rank: 5,        // Class Position
      remark: "Good",
      initials: "JD"  // Teacher Initials
    },
    {
      name: "ENGLISH",
      aoi: 39,
      eot: 9,
      rank: 3,
      remark: "Well done",
      initials: "SM"
    },
    // ... more subjects
  ],
  
  // Performance Summary
  overall_performance: {
    total_marks: 283,
    average_score: 70.75,
    grade: "B",
    position: 4
  },
  
  // Remarks
  class_teacher_remark: "Good performance this term. Keep it up!",
  head_remark: "Satisfactory progress. Continue working hard.",
  
  // Financial Information
  fees_balance: 250000,
  
  // Metadata
  created_at: "2025-01-01T00:00:00Z",
  updated_at: "2025-01-01T00:00:00Z"
}
```

### 2. Report Cards Collection (`report_cards/{student_id}`)

```javascript
{
  // Document ID: student's ID (same as students collection)
  student_id: "student-001",
  
  // Report Information
  class: "S.4 Science A",
  term: "Term 3",
  academic_year: "2025",
  
  // Performance Data
  avg_grade: "B",
  position: 4,
  total_marks: 283,
  average_score: 70.75,
  
  // Status Tracking
  status: "Generated", // "Generated", "Printed", "Distributed", "Pending"
  
  // Generation Details
  generated_at: "2025-01-01T10:30:00Z",
  generated_by: "teacher-001", // User ID who generated
  
  // Distribution Options
  email_sent: false,
  onedrive_saved: false,
  
  // Print Information
  printed_at: null,
  printed_by: null,
  
  // Distribution Information
  distributed_at: null,
  distributed_by: null,
  
  // File Information
  file_path: "/reports/student-001-term3-2025.docx",
  file_size: 45678,
  
  // Metadata
  created_at: "2025-01-01T10:30:00Z",
  updated_at: "2025-01-01T10:30:00Z"
}
```

### 3. Classes Collection (`classes/{id}`) - Optional

```javascript
{
  id: "s4-science-a",
  name: "S.4 Science A",
  stream: "Science",
  year: 4,
  subjects: [
    "MATHS",
    "ENGLISH", 
    "LIT IN ENGLISH",
    "CRE",
    "PHYSICS",
    "CHEMISTRY",
    "BIOLOGY"
  ],
  class_teacher: "teacher-001",
  student_count: 35,
  created_at: "2025-01-01T00:00:00Z"
}
```

### 4. Terms Collection (`terms/{id}`) - Optional

```javascript
{
  id: "term3-2025",
  name: "Term 3",
  academic_year: "2025",
  start_date: "2025-01-01",
  end_date: "2025-03-31",
  is_active: true,
  created_at: "2025-01-01T00:00:00Z"
}
```

## Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Students collection - read/write for authenticated users
    match /students/{studentId} {
      allow read, write: if request.auth != null;
    }
    
    // Report cards collection - read/write for authenticated users
    match /report_cards/{reportId} {
      allow read, write: if request.auth != null;
    }
    
    // Classes collection - read for all, write for admins
    match /classes/{classId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        request.auth.token.role in ['admin', 'dos'];
    }
    
    // Terms collection - read for all, write for admins
    match /terms/{termId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        request.auth.token.role in ['admin', 'dos'];
    }
  }
}
```

## API Integration Notes

### FastAPI Endpoint Usage

```javascript
// Generate Report Card
POST /generate_report/{student_id}
Headers: {
  "Authorization": "Bearer {firebase_token}",
  "Content-Type": "application/json"
}
Body: {
  "term": "Term 3",
  "class": "S.4 Science A"
}
Response: DOCX file (binary)
```

### Authentication Flow

1. User logs in via Firebase Auth
2. Get ID token: `await firebase.auth().currentUser.getIdToken()`
3. Include token in API requests: `Authorization: Bearer {token}`
4. FastAPI validates token with Firebase Admin SDK

### Data Flow

1. **Page Load:**
   - Load students from `students` collection
   - Load report cards from `report_cards` collection
   - Update summary statistics
   - Populate dropdowns and table

2. **Single Report Generation:**
   - User selects student, class, term
   - Call FastAPI with student data
   - Download DOCX file
   - Update `report_cards` collection with status 'Generated'
   - Refresh UI

3. **Batch Generation:**
   - Loop through students in selected class/term
   - Call FastAPI for each student
   - Update statuses in Firestore
   - Refresh UI

4. **Status Updates:**
   - Generated: When report is created
   - Printed: When user clicks print
   - Distributed: When sent via email/OneDrive

## Sample Data for Testing

### Sample Student Document

```javascript
// students/sample-student-001
{
  name: "John Doe",
  sex: "Male",
  class: "S.4 Science A",
  stream: "Science",
  lin: "ADM256174",
  payment_code: "1003",
  subjects: [
    {
      name: "MATHS",
      aoi: 39,
      eot: 10,
      rank: 5,
      remark: "Good",
      initials: "JD"
    },
    {
      name: "ENGLISH",
      aoi: 39,
      eot: 9,
      rank: 3,
      remark: "Well done",
      initials: "SM"
    },
    {
      name: "LIT IN ENGLISH",
      aoi: 40,
      eot: 10,
      rank: 4,
      remark: "Good effort",
      initials: "AB"
    },
    {
      name: "CRE",
      aoi: 38,
      eot: 8,
      rank: 6,
      remark: "Good",
      initials: "CD"
    }
  ],
  overall_performance: {
    total_marks: 283,
    average_score: 70.75,
    grade: "B",
    position: 4
  },
  class_teacher_remark: "Good performance this term. Keep it up!",
  head_remark: "Satisfactory progress. Continue working hard.",
  fees_balance: 250000,
  created_at: "2025-01-01T00:00:00Z",
  updated_at: "2025-01-01T00:00:00Z"
}
```

### Sample Report Card Document

```javascript
// report_cards/sample-student-001
{
  student_id: "sample-student-001",
  class: "S.4 Science A",
  term: "Term 3",
  academic_year: "2025",
  avg_grade: "B",
  position: 4,
  total_marks: 283,
  average_score: 70.75,
  status: "Generated",
  generated_at: "2025-01-01T10:30:00Z",
  generated_by: "teacher-001",
  email_sent: false,
  onedrive_saved: false,
  printed_at: null,
  printed_by: null,
  distributed_at: null,
  distributed_by: null,
  file_path: "/reports/sample-student-001-term3-2025.docx",
  file_size: 45678,
  created_at: "2025-01-01T10:30:00Z",
  updated_at: "2025-01-01T10:30:00Z"
}
```

## Error Handling

### Common Error Scenarios

1. **Authentication Errors:**
   - Token expired: Refresh token and retry
   - Invalid token: Redirect to login
   - Network error: Show retry option

2. **API Errors:**
   - 404: Student not found
   - 500: Server error
   - Timeout: Show loading and retry

3. **Firestore Errors:**
   - Permission denied: Check security rules
   - Network error: Retry operation
   - Document not found: Handle gracefully

### Error Response Format

```javascript
{
  "error": true,
  "message": "Error description",
  "code": "ERROR_CODE",
  "details": {
    "field": "Additional error details"
  }
}
```

## Performance Considerations

1. **Pagination:** Implement pagination for large student lists
2. **Caching:** Cache frequently accessed data
3. **Batch Operations:** Use batch writes for multiple updates
4. **Indexing:** Create composite indexes for queries
5. **Real-time Updates:** Use Firestore listeners for live updates

## Migration Notes

If migrating from existing system:

1. **Data Migration:** Export existing data and transform to new schema
2. **Field Mapping:** Map old field names to new schema
3. **Validation:** Ensure data integrity during migration
4. **Testing:** Test with sample data before full migration
5. **Rollback Plan:** Keep backup of original data
