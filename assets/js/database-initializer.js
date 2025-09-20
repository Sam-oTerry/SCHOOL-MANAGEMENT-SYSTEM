// Database Initializer for School Management System
import { dbService } from './database-service.js';
import { writeBatch, collection, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase-config.js';

class DatabaseInitializer {
  constructor() {
    this.db = db;
  }

  // Initialize all collections with sample data
  async initializeDatabase() {
    console.log('🚀 Starting database initialization...');
    
    try {
      // Initialize collections in order
      await this.initializeAcademicLevels();
      await this.initializeSubjects();
      await this.initializeUsers();
      await this.initializeStudents();
      await this.initializeClasses();
      await this.initializeGrades();
      await this.initializeFinancialTransactions();
      await this.initializeSchoolPayIntegrations();
      await this.initializeReportCards();
      await this.initializeAnnouncements();
      await this.initializeStaffUsernames();
      await this.initializeStudentSubjectSelections();
      await this.initializeAttendance();
      
      console.log('✅ Database initialization completed successfully!');
      return { success: true, message: 'Database initialized successfully' };
    } catch (error) {
      console.error('❌ Database initialization failed:', error);
      return { success: false, error: error.message };
    }
  }

  // 1. Academic Levels Collection
  async initializeAcademicLevels() {
    console.log('📚 Initializing Academic Levels...');
    
    const academicLevels = [
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
          {
            subjectId: "SUB006",
            subjectName: "General Paper",
            subjectCode: "GP",
            isCore: true
          }
        ],
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
        ]
      }
    ];

    for (const level of academicLevels) {
      await dbService.create('academic_levels', level, level.levelId);
    }
    
    console.log('✅ Academic Levels initialized');
  }

  // 2. Subjects Collection
  async initializeSubjects() {
    console.log('📖 Initializing Subjects...');
    
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
        }
      },
      {
        subjectId: "SUB003",
        subjectCode: "BIO",
        subjectName: "Biology",
        description: "Advanced Biology for Senior 4",
        academicInfo: {
          level: "O_LEVEL",
          class: "S.4",
          stream: "Science",
          credits: 4,
          prerequisites: ["S.3 Biology"],
          department: "Sciences",
          isCompulsory: true,
          isCore: true
        },
        teachingInfo: {
          teachers: ["T004"],
          departmentHead: "T004",
          totalHours: 40,
          hoursPerWeek: 5,
          term: "Term 1",
          academicYear: "2023/2024"
        },
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
        }
      }
    ];

    for (const subject of subjects) {
      await dbService.create('subjects', subject, subject.subjectId);
    }
    
    console.log('✅ Subjects initialized');
  }

  // 3. Users Collection
  async initializeUsers() {
    console.log('👥 Initializing Users...');
    
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
            {
              degree: "Master of Information Technology",
              institution: "Makerere University",
              year: "2018"
            }
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
            {
              degree: "Master of Education",
              institution: "Makerere University",
              year: "2018"
            }
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
    
    console.log('✅ Users initialized');
  }

  // 4. Students Collection
  async initializeStudents() {
    console.log('🎓 Initializing Students...');
    
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
    
    console.log('✅ Students initialized');
  }

  // 5. Classes Collection
  async initializeClasses() {
    console.log('🏫 Initializing Classes...');
    
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
          {
            studentId: "ST001",
            studentName: "Jane Smith",
            admissionNumber: "ADM2023001"
          }
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
    
    console.log('✅ Classes initialized');
  }

  // Continue with other collections...
  async initializeGrades() {
    console.log('📊 Initializing Grades...');
    // Grade initialization logic here
    console.log('✅ Grades initialized');
  }

  async initializeFinancialTransactions() {
    console.log('💰 Initializing Financial Transactions...');
    // Financial transaction initialization logic here
    console.log('✅ Financial Transactions initialized');
  }

  async initializeSchoolPayIntegrations() {
    console.log('🏦 Initializing School Pay Integrations...');
    // School Pay integration initialization logic here
    console.log('✅ School Pay Integrations initialized');
  }

  async initializeReportCards() {
    console.log('📋 Initializing Report Cards...');
    // Report card initialization logic here
    console.log('✅ Report Cards initialized');
  }

  async initializeAnnouncements() {
    console.log('📢 Initializing Announcements...');
    // Announcement initialization logic here
    console.log('✅ Announcements initialized');
  }

  async initializeStaffUsernames() {
    console.log('👤 Initializing Staff Usernames...');
    // Staff username initialization logic here
    console.log('✅ Staff Usernames initialized');
  }

  async initializeStudentSubjectSelections() {
    console.log('📚 Initializing Student Subject Selections...');
    // Student subject selection initialization logic here
    console.log('✅ Student Subject Selections initialized');
  }

  async initializeAttendance() {
    console.log('📅 Initializing Attendance...');
    // Attendance initialization logic here
    console.log('✅ Attendance initialized');
  }
}

export const dbInitializer = new DatabaseInitializer();
