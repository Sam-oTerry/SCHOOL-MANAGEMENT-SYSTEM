// Complete Database Setup for School Management System
import { dbService } from './database-service.js';
import { writeBatch, collection, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase-config.js';

class CompleteDatabaseSetup {
  constructor() {
    this.db = db;
  }

  // Main initialization method
  async setupCompleteDatabase() {
    console.log('🚀 Starting Complete Database Setup...');
    
    try {
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

      console.log('✅ Complete Database Setup finished successfully!');
      return { success: true, results };
    } catch (error) {
      console.error('❌ Database setup failed:', error);
      return { success: false, error: error.message };
    }
  }

  // 1. Academic Levels
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
          isActive: true
        },
        compulsorySubjects: [
          { subjectId: "SUB001", subjectName: "English Language", subjectCode: "ENG", isCore: true },
          { subjectId: "SUB002", subjectName: "Mathematics", subjectCode: "MATH", isCore: true },
          { subjectId: "SUB003", subjectName: "Biology", subjectCode: "BIO", isCore: true }
        ],
        optionalSubjects: [
          { subjectId: "SUB004", subjectName: "Art", subjectCode: "ART", isCore: false },
          { subjectId: "SUB005", subjectName: "Music", subjectCode: "MUS", isCore: false }
        ]
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
          isActive: true
        },
        compulsorySubjects: [
          { subjectId: "SUB006", subjectName: "General Paper", subjectCode: "GP", isCore: true }
        ],
        optionalSubjects: [
          { subjectId: "SUB007", subjectName: "Physics", subjectCode: "PHY", isCore: false, department: "Sciences" },
          { subjectId: "SUB008", subjectName: "Chemistry", subjectCode: "CHEM", isCore: false, department: "Sciences" },
          { subjectId: "SUB009", subjectName: "Biology", subjectCode: "BIO", isCore: false, department: "Sciences" },
          { subjectId: "SUB010", subjectName: "Mathematics", subjectCode: "MATH", isCore: false, department: "Mathematics" },
          { subjectId: "SUB011", subjectName: "Economics", subjectCode: "ECON", isCore: false, department: "Social Sciences" },
          { subjectId: "SUB012", subjectName: "History", subjectCode: "HIST", isCore: false, department: "Social Sciences" }
        ]
      }
    ];

    for (const level of levels) {
      await dbService.create('academic_levels', level, level.levelId);
    }
    return { collection: 'academic_levels', count: levels.length };
  }

  // 2. Subjects
  async setupSubjects() {
    const subjects = [
      {
        subjectId: "SUB001",
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
          isCore: true
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
        }
      },
      {
        subjectId: "SUB002",
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
          isCore: true
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
        }
      }
    ];

    for (const subject of subjects) {
      await dbService.create('subjects', subject, subject.subjectId);
    }
    return { collection: 'subjects', count: subjects.length };
  }

  // 3. Users
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
          emergencyContact: "+256 700 000 001"
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
        loginCount: 1
      },
      {
        uid: "head-teacher-uid-001",
        email: "headteacher@school.edu",
        username: "headteacher",
        role: "head_teacher",
        personalInfo: {
          firstName: "John",
          lastName: "Doe",
          fullName: "John Doe",
          dateOfBirth: "1975-05-15",
          gender: "male",
          phone: "+256 700 123 456",
          address: "Kampala, Uganda",
          nationality: "Ugandan",
          religion: "Christian",
          emergencyContact: "+256 700 987 654"
        },
        roleInfo: {
          staffId: "HT001",
          employeeNumber: "EMP2023002",
          department: "Administration",
          position: "Head Teacher",
          hireDate: "2020-01-15",
          salary: 2500000,
          qualifications: [
            { degree: "Master of Education", institution: "Makerere University", year: "2018" }
          ]
        },
        academicInfo: {
          subjects: ["Mathematics", "Physics"],
          classes: ["S.4 Science A", "S.5 Science B"],
          department: "Sciences",
          teachingExperience: 15
        },
        permissions: {
          canViewStudents: true,
          canEditStudents: true,
          canViewFinancials: true,
          canEditFinancials: false,
          canViewGrades: true,
          canEditGrades: true,
          canViewReports: true,
          canManageUsers: false
        },
        accountStatus: "active",
        lastLogin: new Date(),
        loginCount: 1
      }
    ];

    for (const user of users) {
      await dbService.create('users', user, user.uid);
    }
    return { collection: 'users', count: users.length };
  }

  // 4. Students
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
          allergies: ["None"]
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
        }
      }
    ];

    for (const student of students) {
      await dbService.create('students', student, student.studentId);
    }
    return { collection: 'students', count: students.length };
  }

  // 5. Classes
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
          assistantTeacher: "T002"
        },
        students: [
          { studentId: "ST001", studentName: "Jane Smith", admissionNumber: "ADM2023001" }
        ],
        subjects: ["SUB001", "SUB002", "SUB003"],
        performance: {
          averageScore: 75.5,
          passRate: 94.3,
          topPerformer: "ST001",
          classRank: 1
        }
      }
    ];

    for (const classData of classes) {
      await dbService.create('classes', classData, classData.classId);
    }
    return { collection: 'classes', count: classes.length };
  }

  // 6. Grades
  async setupGrades() {
    const grades = [
      {
        gradeId: "GRD001",
        studentId: "ST001",
        subjectId: "SUB001",
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
          points: 4.0
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
        remarks: "Excellent performance"
      }
    ];

    for (const grade of grades) {
      await dbService.create('grades', grade, grade.gradeId);
    }
    return { collection: 'grades', count: grades.length };
  }

  // 7. Financial Transactions
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
          reference: "MTN123456"
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
        verificationDate: new Date()
      }
    ];

    for (const transaction of transactions) {
      await dbService.create('financial_transactions', transaction, transaction.transactionId);
    }
    return { collection: 'financial_transactions', count: transactions.length };
  }

  // 8. School Pay Integrations
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
        ]
      }
    ];

    for (const integration of integrations) {
      await dbService.create('school_pay_integrations', integration, integration.integrationId);
    }
    return { collection: 'school_pay_integrations', count: integrations.length };
  }

  // 9. Report Cards
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
          status: "published"
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
        }
      }
    ];

    for (const reportCard of reportCards) {
      await dbService.create('report_cards', reportCard, reportCard.reportCardId);
    }
    return { collection: 'report_cards', count: reportCards.length };
  }

  // 10. Announcements
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
          endDate: "2023-10-20"
        },
        author: {
          userId: "U001",
          userName: "John Doe",
          role: "head_teacher"
        }
      }
    ];

    for (const announcement of announcements) {
      await dbService.create('announcements', announcement, announcement.announcementId);
    }
    return { collection: 'announcements', count: announcements.length };
  }

  // 11. Staff Usernames
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
        }
      }
    ];

    for (const username of usernames) {
      await dbService.create('staff_usernames', username, username.username);
    }
    return { collection: 'staff_usernames', count: usernames.length };
  }

  // 12. Student Subject Selections
  async setupStudentSubjectSelections() {
    const selections = [
      {
        selectionId: "SEL001",
        studentId: "ST001",
        academicYear: "2023/2024",
        level: "A_LEVEL",
        subjectSelection: {
          compulsorySubjects: [
            { subjectId: "SUB006", subjectName: "General Paper", subjectCode: "GP", isCore: true }
          ],
          selectedOptionalSubjects: [
            { subjectId: "SUB007", subjectName: "Physics", subjectCode: "PHY", department: "Sciences", isCore: false },
            { subjectId: "SUB008", subjectName: "Chemistry", subjectCode: "CHEM", department: "Sciences", isCore: false },
            { subjectId: "SUB010", subjectName: "Mathematics", subjectCode: "MATH", department: "Mathematics", isCore: false }
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
        }
      }
    ];

    for (const selection of selections) {
      await dbService.create('student_subject_selections', selection, selection.selectionId);
    }
    return { collection: 'student_subject_selections', count: selections.length };
  }

  // 13. Attendance
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
          remarks: "On time"
        },
        recordedBy: {
          userId: "U001",
          userName: "John Doe",
          role: "class_teacher"
        }
      }
    ];

    for (const attendanceRecord of attendance) {
      await dbService.create('attendance', attendanceRecord, attendanceRecord.attendanceId);
    }
    return { collection: 'attendance', count: attendance.length };
  }
}

export const completeDatabaseSetup = new CompleteDatabaseSetup();
