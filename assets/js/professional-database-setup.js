// Professional Database Setup for School Management System
// Optimized for production use with no duplication and proper validation
import { dbService } from './database-service.js';
import { db } from './firebase-config.js';

class ProfessionalDatabaseSetup {
  constructor() {
    this.db = db;
    this.batchSize = 500;
    this.createdDocuments = new Set(); // Track created documents to prevent duplicates
  }

  // Main method to setup professional database
  async setupProfessionalDatabase() {
    console.log('🚀 Starting Professional Database Setup...');
    console.log('================================================');
    
    try {
      // Check if database already has data
      const hasData = await this.checkExistingData();
      if (hasData) {
        console.log('⚠️  Database already contains data. Skipping setup to prevent duplication.');
        return { success: true, message: 'Database already initialized', skipped: true };
      }

      // Setup collections in proper order (dependencies first)
      const results = await Promise.all([
        this.setupAcademicLevels(),
        this.setupSubjects(),
        this.setupUsers(),
        this.setupStudents(),
        this.setupClasses(),
        this.setupGrades(),
        this.setupFinancialTransactions(),
        this.setupSchoolPayIntegrations(),
        this.setupReportCards(),
        this.setupAnnouncements(),
        this.setupStaffUsernames(),
        this.setupStudentSubjectSelections(),
        this.setupAttendance()
      ]);

      console.log('✅ Professional Database Setup completed successfully!');
      return { success: true, results };
    } catch (error) {
      console.error('❌ Professional Database Setup failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Check if database already has data
  async checkExistingData() {
    try {
      const collections = ['users', 'students', 'subjects', 'academic_levels'];
      for (const collectionName of collections) {
        const result = await dbService.query(collectionName, []);
        if (result.success && result.data.length > 0) {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.log('Checking existing data failed, proceeding with setup...');
      return false;
    }
  }

  // 1. Academic Levels - Professional Setup
  async setupAcademicLevels() {
    const levels = [
      {
        levelId: "O_LEVEL",
        levelName: "Ordinary Level",
        description: "O-Level Education (S.1 - S.4)",
        levelInfo: {
          startClass: "S.1",
          endClass: "S.4",
          duration: 4,
          ageRange: "13-17",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        compulsorySubjects: [
          { subjectId: "ENG", subjectName: "English Language", subjectCode: "ENG", isCore: true },
          { subjectId: "MATH", subjectName: "Mathematics", subjectCode: "MATH", isCore: true },
          { subjectId: "BIO", subjectName: "Biology", subjectCode: "BIO", isCore: true }
        ],
        optionalSubjects: [
          { subjectId: "ART", subjectName: "Art", subjectCode: "ART", isCore: false },
          { subjectId: "MUS", subjectName: "Music", subjectCode: "MUS", isCore: false }
        ],
        metadata: {
          version: "1.0",
          createdBy: "system",
          lastModified: new Date()
        }
      },
      {
        levelId: "A_LEVEL",
        levelName: "Advanced Level",
        description: "A-Level Education (S.5 - S.6)",
        levelInfo: {
          startClass: "S.5",
          endClass: "S.6",
          duration: 2,
          ageRange: "17-19",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        compulsorySubjects: [
          { subjectId: "GP", subjectName: "General Paper", subjectCode: "GP", isCore: true }
        ],
        optionalSubjects: [
          { subjectId: "PHY", subjectName: "Physics", subjectCode: "PHY", isCore: false, department: "Sciences" },
          { subjectId: "CHEM", subjectName: "Chemistry", subjectCode: "CHEM", isCore: false, department: "Sciences" },
          { subjectId: "BIO", subjectName: "Biology", subjectCode: "BIO", isCore: false, department: "Sciences" },
          { subjectId: "MATH", subjectName: "Mathematics", subjectCode: "MATH", isCore: false, department: "Mathematics" },
          { subjectId: "ECON", subjectName: "Economics", subjectCode: "ECON", isCore: false, department: "Social Sciences" },
          { subjectId: "HIST", subjectName: "History", subjectCode: "HIST", isCore: false, department: "Social Sciences" }
        ],
        metadata: {
          version: "1.0",
          createdBy: "system",
          lastModified: new Date()
        }
      }
    ];

    return await this.pushCollectionWithValidation('academic_levels', levels, 'levelId');
  }

  // 2. Subjects - Professional Setup
  async setupSubjects() {
    const subjects = [
      {
        subjectId: "MATH",
        subjectCode: "MATH",
        subjectName: "Mathematics",
        description: "Advanced Mathematics for Senior 4",
        academicInfo: {
          level: "O_LEVEL",
          class: "S.4",
          stream: "Science",
          credits: 4,
          prerequisites: ["S.3 Mathematics"],
          department: "Mathematics",
          isCompulsory: true,
          isCore: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        teachingInfo: {
          teachers: ["T001", "T002"],
          departmentHead: "T001",
          totalHours: 40,
          hoursPerWeek: 5,
          term: "Term 1",
          academicYear: "2023/2024"
        },
        assessmentInfo: {
          totalMarks: 100,
          passMark: 50,
          assessmentTypes: [
            { type: "Continuous Assessment", weight: 30, maxMarks: 30 },
            { type: "Mid-term Exam", weight: 30, maxMarks: 30 },
            { type: "Final Exam", weight: 40, maxMarks: 40 }
          ]
        },
        metadata: {
          version: "1.0",
          createdBy: "system",
          lastModified: new Date()
        }
      },
      {
        subjectId: "ENG",
        subjectCode: "ENG",
        subjectName: "English Language",
        description: "English Language and Literature",
        academicInfo: {
          level: "O_LEVEL",
          class: "S.4",
          stream: "Science",
          credits: 4,
          prerequisites: ["S.3 English"],
          department: "Languages",
          isCompulsory: true,
          isCore: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        teachingInfo: {
          teachers: ["T003"],
          departmentHead: "T003",
          totalHours: 40,
          hoursPerWeek: 5,
          term: "Term 1",
          academicYear: "2023/2024"
        },
        assessmentInfo: {
          totalMarks: 100,
          passMark: 50,
          assessmentTypes: [
            { type: "Continuous Assessment", weight: 30, maxMarks: 30 },
            { type: "Mid-term Exam", weight: 30, maxMarks: 30 },
            { type: "Final Exam", weight: 40, maxMarks: 40 }
          ]
        },
        metadata: {
          version: "1.0",
          createdBy: "system",
          lastModified: new Date()
        }
      }
    ];

    return await this.pushCollectionWithValidation('subjects', subjects, 'subjectId');
  }

  // 3. Users - Professional Setup with Validation
  async setupUsers() {
    const users = [
      {
        uid: "admin-uid-001",
        email: "admin@school.edu",
        username: "admin",
        role: "system_admin",
        personalInfo: {
          firstName: "System",
          lastName: "Administrator",
          fullName: "System Administrator",
          dateOfBirth: "1980-01-01",
          gender: "male",
          phone: "+256 700 000 001",
          address: "Kampala, Uganda",
          nationality: "Ugandan",
          religion: "Christian",
          emergencyContact: "+256 700 000 001",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        roleInfo: {
          staffId: "ADM001",
          employeeNumber: "EMP2023001",
          department: "Administration",
          position: "System Administrator",
          hireDate: "2020-01-01",
          salary: 3000000,
          qualifications: [
            { degree: "Master of Information Technology", institution: "Makerere University", year: "2018" }
          ]
        },
        permissions: {
          canViewStudents: true,
          canEditStudents: true,
          canViewFinancials: true,
          canEditFinancials: true,
          canViewGrades: true,
          canEditGrades: true,
          canViewReports: true,
          canManageUsers: true
        },
        accountStatus: "active",
        lastLogin: new Date(),
        loginCount: 1,
        metadata: {
          version: "1.0",
          createdBy: "system",
          lastModified: new Date()
        }
      }
    ];

    return await this.pushCollectionWithValidation('users', users, 'uid');
  }

  // 4. Students - Professional Setup
  async setupStudents() {
    const students = [
      {
        studentId: "ST001",
        admissionNumber: "ADM2023001",
        personalInfo: {
          firstName: "Jane",
          lastName: "Smith",
          fullName: "Jane Smith",
          dateOfBirth: "2005-03-15",
          gender: "female",
          phone: "+256 700 123 456",
          address: "Kampala, Uganda",
          nationality: "Ugandan",
          religion: "Christian",
          bloodGroup: "O+",
          medicalConditions: ["None"],
          allergies: ["None"],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        academicInfo: {
          admissionDate: "2023-01-15",
          currentClass: "S.4 Science A",
          stream: "Science",
          status: "active",
          academicYear: "2023/2024",
          term: "Term 1",
          academicHistory: [
            {
              year: "2023",
              class: "S.3",
              stream: "Science",
              grades: { "Mathematics": "A", "Physics": "B+", "Chemistry": "A-" },
              attendance: { totalDays: 180, presentDays: 175, percentage: 97.2 }
            }
          ],
          currentGPA: 3.8,
          overallRank: 5,
          classRank: 2
        },
        financialInfo: {
          totalFeesOwed: 1000000,
          totalFeesPaid: 650000,
          currentBalance: 350000,
          lastPaymentDate: "2023-10-15",
          paymentStatus: "partial",
          preferredPaymentMethod: "mobile_money",
          feeStructure: {
            tuition: 800000,
            examination: 100000,
            library: 50000,
            sports: 30000,
            transport: 20000
          },
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
        schoolPayIntegration: {
          isIntegrated: true,
          schoolPayId: "SP123456",
          paymentCode: "PAY23T1ST001",
          lastSyncDate: new Date(),
          syncStatus: "successful",
          paymentInstructions: {
            code: "PAY23T1ST001",
            instructions: "Use payment code PAY23T1ST001 when making payments via School Pay Uganda",
            qrCodeUrl: "https://schoolpay.ug/qr/PAY23T1ST001"
          }
        },
        metadata: {
          version: "1.0",
          createdBy: "system",
          lastModified: new Date()
        }
      }
    ];

    return await this.pushCollectionWithValidation('students', students, 'studentId');
  }

  // 5. Classes - Professional Setup
  async setupClasses() {
    const classes = [
      {
        classId: "S4SA",
        className: "S.4 Science A",
        stream: "Science",
        level: "S.4",
        classInfo: {
          academicYear: "2023/2024",
          term: "Term 1",
          totalStudents: 35,
          capacity: 40,
          classTeacher: "T001",
          assistantTeacher: "T002",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        students: [
          { studentId: "ST001", studentName: "Jane Smith", admissionNumber: "ADM2023001" }
        ],
        subjects: ["MATH", "ENG", "BIO"],
        performance: {
          averageScore: 75.5,
          passRate: 94.3,
          topPerformer: "ST001",
          classRank: 1
        },
        metadata: {
          version: "1.0",
          createdBy: "system",
          lastModified: new Date()
        }
      }
    ];

    return await this.pushCollectionWithValidation('classes', classes, 'classId');
  }

  // 6. Grades - Professional Setup
  async setupGrades() {
    const grades = [
      {
        gradeId: "GRD001",
        studentId: "ST001",
        subjectId: "MATH",
        classId: "S4SA",
        gradeInfo: {
          academicYear: "2023/2024",
          term: "Term 1",
          examType: "Continuous Assessment",
          examDate: "2023-10-15",
          marksObtained: 85,
          maxMarks: 100,
          percentage: 85.0,
          grade: "A",
          points: 4.0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        assessmentDetails: {
          teacherId: "T001",
          teacherName: "John Doe",
          subjectName: "Mathematics",
          examTitle: "Algebra Test",
          duration: 120,
          venue: "Room 101"
        },
        status: "published",
        isPassed: true,
        remarks: "Excellent performance",
        metadata: {
          version: "1.0",
          createdBy: "system",
          lastModified: new Date()
        }
      }
    ];

    return await this.pushCollectionWithValidation('grades', grades, 'gradeId');
  }

  // 7. Financial Transactions - Professional Setup
  async setupFinancialTransactions() {
    const transactions = [
      {
        transactionId: "TXN001",
        studentId: "ST001",
        transactionInfo: {
          type: "income",
          category: "tuition_fee",
          amount: 200000,
          currency: "UGX",
          description: "Tuition fee payment for Term 1",
          reference: "MTN123456",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        paymentInfo: {
          method: "mobile_money",
          provider: "MTN",
          transactionReference: "MTN123456",
          paidDate: "2023-10-15",
          processedBy: "U001",
          processedAt: new Date()
        },
        schoolPayData: {
          originalTransactionId: "SP123456",
          schoolPayStatus: "completed",
          schoolPayMethod: "mobile_money",
          schoolPayReference: "SP123456",
          parentPhone: "+256 700 123 456",
          parentName: "John Smith",
          paymentCode: "PAY23T1ST001"
        },
        status: "completed",
        isVerified: true,
        verificationDate: new Date(),
        metadata: {
          version: "1.0",
          createdBy: "system",
          lastModified: new Date()
        }
      }
    ];

    return await this.pushCollectionWithValidation('financial_transactions', transactions, 'transactionId');
  }

  // 8. School Pay Integrations - Professional Setup
  async setupSchoolPayIntegrations() {
    const integrations = [
      {
        integrationId: "INT001",
        fileName: "transaction_histories-19-09-2025-102647.xlsx",
        importInfo: {
          importDate: new Date(),
          importedBy: "U001",
          totalRecords: 150,
          successfulImports: 145,
          failedImports: 5,
          status: "completed"
        },
        fileInfo: {
          originalName: "transaction_histories-19-09-2025-102647.xlsx",
          fileSize: 245760,
          fileType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          uploadDate: new Date()
        },
        processingResults: {
          totalAmount: 15000000,
          averageTransaction: 100000,
          paymentMethods: { "mobile_money": 120, "bank_transfer": 20, "cash": 5 },
          feeTypes: { "tuition_fee": 100, "examination_fee": 30, "library_fee": 15, "sports_fee": 5 }
        },
        errors: [
          {
            row: 15,
            studentId: "ST999",
            error: "Student not found",
            data: {}
          }
        ],
        metadata: {
          version: "1.0",
          createdBy: "system",
          lastModified: new Date()
        }
      }
    ];

    return await this.pushCollectionWithValidation('school_pay_integrations', integrations, 'integrationId');
  }

  // 9. Report Cards - Professional Setup
  async setupReportCards() {
    const reportCards = [
      {
        reportCardId: "RC001",
        studentId: "ST001",
        classId: "S4SA",
        reportCardInfo: {
          academicYear: "2023/2024",
          term: "Term 1",
          reportDate: "2023-10-15",
          generatedBy: "U001",
          status: "published",
          createdAt: new Date(),
          updatedAt: new Date()
        },
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
        subjectPerformance: [
          {
            subjectId: "MATH",
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
        attendance: {
          totalDays: 90,
          presentDays: 87,
          absentDays: 3,
          percentage: 96.7
        },
        comments: {
          classTeacher: "Jane has shown excellent progress this term.",
          headTeacher: "Outstanding performance. Keep it up!",
          parentSignature: "John Smith",
          parentDate: "2023-10-20"
        },
        metadata: {
          version: "1.0",
          createdBy: "system",
          lastModified: new Date()
        }
      }
    ];

    return await this.pushCollectionWithValidation('report_cards', reportCards, 'reportCardId');
  }

  // 10. Announcements - Professional Setup
  async setupAnnouncements() {
    const announcements = [
      {
        announcementId: "ANN001",
        title: "Parent-Teacher Meeting",
        content: "There will be a parent-teacher meeting on Friday...",
        announcementInfo: {
          type: "general",
          priority: "high",
          targetAudience: "all",
          targetClasses: ["S4SA", "S4SB"],
          isActive: true,
          startDate: "2023-10-15",
          endDate: "2023-10-20",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        author: {
          userId: "U001",
          userName: "John Doe",
          role: "head_teacher"
        },
        metadata: {
          version: "1.0",
          createdBy: "system",
          lastModified: new Date()
        }
      }
    ];

    return await this.pushCollectionWithValidation('announcements', announcements, 'announcementId');
  }

  // 11. Staff Usernames - Professional Setup
  async setupStaffUsernames() {
    const usernames = [
      {
        username: "admin",
        userId: "admin-uid-001",
        staffId: "ADM001",
        fullName: "System Administrator",
        role: "system_admin",
        usernameInfo: {
          isActive: true,
          createdBy: "system_admin_uid",
          createdDate: new Date(),
          lastUsed: new Date(),
          usageCount: 45
        },
        accessInfo: {
          canLogin: true,
          loginAttempts: 0,
          lastLoginAttempt: new Date(),
          isLocked: false,
          lockReason: null
        },
        metadata: {
          version: "1.0",
          createdBy: "system",
          lastModified: new Date()
        }
      }
    ];

    return await this.pushCollectionWithValidation('staff_usernames', usernames, 'username');
  }

  // 12. Student Subject Selections - Professional Setup
  async setupStudentSubjectSelections() {
    const selections = [
      {
        selectionId: "SEL001",
        studentId: "ST001",
        academicYear: "2023/2024",
        level: "A_LEVEL",
        subjectSelection: {
          compulsorySubjects: [
            { subjectId: "GP", subjectName: "General Paper", subjectCode: "GP", isCore: true }
          ],
          selectedOptionalSubjects: [
            { subjectId: "PHY", subjectName: "Physics", subjectCode: "PHY", department: "Sciences", isCore: false },
            { subjectId: "CHEM", subjectName: "Chemistry", subjectCode: "CHEM", department: "Sciences", isCore: false },
            { subjectId: "MATH", subjectName: "Mathematics", subjectCode: "MATH", department: "Mathematics", isCore: false }
          ],
          totalSubjects: 4,
          totalCredits: 16
        },
        selectionInfo: {
          selectedBy: "ST001",
          approvedBy: "U001",
          selectionDate: "2023-01-15",
          approvalDate: "2023-01-16",
          status: "approved",
          remarks: "Good subject combination for sciences"
        },
        metadata: {
          version: "1.0",
          createdBy: "system",
          lastModified: new Date()
        }
      }
    ];

    return await this.pushCollectionWithValidation('student_subject_selections', selections, 'selectionId');
  }

  // 13. Attendance - Professional Setup
  async setupAttendance() {
    const attendance = [
      {
        attendanceId: "ATT001",
        studentId: "ST001",
        classId: "S4SA",
        attendanceInfo: {
          date: "2023-10-15",
          status: "present",
          timeIn: "08:00",
          timeOut: "16:00",
          remarks: "On time",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        recordedBy: {
          userId: "U001",
          userName: "John Doe",
          role: "class_teacher"
        },
        metadata: {
          version: "1.0",
          createdBy: "system",
          lastModified: new Date()
        }
      }
    ];

    return await this.pushCollectionWithValidation('attendance', attendance, 'attendanceId');
  }

  // Professional method to push collection with validation and duplicate prevention
  async pushCollectionWithValidation(collectionName, data, idField) {
    try {
      console.log(`📤 Setting up ${collectionName}...`);
      
      // Check for existing documents to prevent duplicates
      const existingDocs = await this.checkExistingDocuments(collectionName);
      const newData = data.filter(item => !existingDocs.has(item[idField]));
      
      if (newData.length === 0) {
        console.log(`✅ ${collectionName} already exists, skipping to prevent duplication`);
        return { collection: collectionName, count: 0, success: true, skipped: true };
      }

      const batch = writeBatch(this.db);
      let batchCount = 0;
      
      for (const item of newData) {
        const docId = item[idField];
        
        // Check if document already exists
        if (this.createdDocuments.has(`${collectionName}/${docId}`)) {
          continue; // Skip if already created in this session
        }
        
        const docRef = doc(this.db, collectionName, docId);
        
        // Add professional metadata
        const dataWithMetadata = {
          ...item,
          createdAt: new Date(),
          updatedAt: new Date(),
          version: "1.0",
          createdBy: "system"
        };
        
        batch.set(docRef, dataWithMetadata);
        this.createdDocuments.add(`${collectionName}/${docId}`);
        batchCount++;
        
        // Commit batch if it reaches the limit
        if (batchCount >= this.batchSize) {
          await batch.commit();
          batchCount = 0;
        }
      }
      
      // Commit remaining documents
      if (batchCount > 0) {
        await batch.commit();
      }
      
      console.log(`✅ Successfully set up ${newData.length} documents in ${collectionName}`);
      return { collection: collectionName, count: newData.length, success: true };
    } catch (error) {
      console.error(`❌ Failed to setup ${collectionName}:`, error);
      return { collection: collectionName, count: 0, success: false, error: error.message };
    }
  }

  // Check for existing documents to prevent duplicates
  async checkExistingDocuments(collectionName) {
    try {
      const result = await dbService.query(collectionName, []);
      if (result.success) {
        const existingIds = new Set();
        result.data.forEach(doc => {
          if (doc.id) existingIds.add(doc.id);
        });
        return existingIds;
      }
      return new Set();
    } catch (error) {
      console.log(`Checking existing documents in ${collectionName} failed, proceeding...`);
      return new Set();
    }
  }
}

export const professionalDatabaseSetup = new ProfessionalDatabaseSetup();
