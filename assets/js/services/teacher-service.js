// Teacher Management Service for Firebase
// Handles all teacher-related operations for HOD

class TeacherService {
    constructor() {
        this.db = firebase.firestore();
        this.auth = firebase.auth();
        this.currentUser = null;
        this.departmentId = null;
        this.initializeService();
    }

    async initializeService() {
        try {
            // Wait for auth state to be determined
            await new Promise((resolve) => {
                const unsubscribe = this.auth.onAuthStateChanged((user) => {
                    unsubscribe();
                    this.currentUser = user;
                    resolve();
                });
            });

            if (this.currentUser) {
                // Get user's department information
                await this.loadUserDepartment();
            }
        } catch (error) {
            console.error('Error initializing teacher service:', error);
        }
    }

    async loadUserDepartment() {
        try {
            const userDoc = await this.db.collection('users').doc(this.currentUser.uid).get();
            if (userDoc.exists) {
                const userData = userDoc.data();
                this.departmentId = userData.departmentId || userData.department;
                this.staffId = userData.staffId;
            }
        } catch (error) {
            console.error('Error loading user department:', error);
        }
    }

    // Get all teachers in the department
    async getDepartmentTeachers() {
        try {
            if (!this.departmentId) {
                throw new Error('Department ID not found');
            }

            const teachersSnapshot = await this.db.collection('teachers')
                .where('departmentId', '==', this.departmentId)
                .where('status', '==', 'active')
                .orderBy('firstName', 'asc')
                .get();

            const teachers = [];
            teachersSnapshot.forEach(doc => {
                teachers.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return { success: true, data: teachers };
        } catch (error) {
            console.error('Error fetching department teachers:', error);
            return { success: false, error: error.message };
        }
    }

    // Get teacher assignments
    async getTeacherAssignments(teacherId = null) {
        try {
            let query = this.db.collection('teacher_assignments')
                .where('status', '==', 'active');

            if (teacherId) {
                query = query.where('teacherId', '==', teacherId);
            } else if (this.departmentId) {
                query = query.where('departmentId', '==', this.departmentId);
            }

            const assignmentsSnapshot = await query.get();
            const assignments = [];
            
            assignmentsSnapshot.forEach(doc => {
                assignments.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return { success: true, data: assignments };
        } catch (error) {
            console.error('Error fetching teacher assignments:', error);
            return { success: false, error: error.message };
        }
    }

    // Get teacher performance data
    async getTeacherPerformance(teacherId, academicYear = null, term = null) {
        try {
            let query = this.db.collection('teacher_performance')
                .where('teacherId', '==', teacherId);

            if (academicYear) {
                query = query.where('academicYear', '==', academicYear);
            }
            if (term) {
                query = query.where('term', '==', term);
            }

            const performanceSnapshot = await query.orderBy('createdAt', 'desc').get();
            const performance = [];
            
            performanceSnapshot.forEach(doc => {
                performance.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return { success: true, data: performance };
        } catch (error) {
            console.error('Error fetching teacher performance:', error);
            return { success: false, error: error.message };
        }
    }

    // Get department statistics
    async getDepartmentStats() {
        try {
            if (!this.departmentId) {
                throw new Error('Department ID not found');
            }

            // Get teachers count
            const teachersSnapshot = await this.db.collection('teachers')
                .where('departmentId', '==', this.departmentId)
                .where('status', '==', 'active')
                .get();

            // Get assignments count
            const assignmentsSnapshot = await this.db.collection('teacher_assignments')
                .where('departmentId', '==', this.departmentId)
                .where('status', '==', 'active')
                .get();

            // Get students count in department classes
            const classesSnapshot = await this.db.collection('classes')
                .where('departmentId', '==', this.departmentId)
                .get();

            let totalStudents = 0;
            let totalClasses = 0;
            let averagePerformance = 0;

            for (const classDoc of classesSnapshot.docs) {
                const classData = classDoc.data();
                totalClasses++;
                
                // Count students in this class
                const studentsSnapshot = await this.db.collection('students')
                    .where('academicInfo.currentClass', '==', classDoc.id)
                    .where('academicInfo.status', '==', 'active')
                    .get();
                
                totalStudents += studentsSnapshot.size;
            }

            // Calculate average performance
            const performanceSnapshot = await this.db.collection('teacher_performance')
                .where('departmentId', '==', this.departmentId)
                .get();

            if (performanceSnapshot.size > 0) {
                let totalPerformance = 0;
                performanceSnapshot.forEach(doc => {
                    const data = doc.data();
                    totalPerformance += data.overallScore || 0;
                });
                averagePerformance = Math.round(totalPerformance / performanceSnapshot.size);
            }

            const stats = {
                totalTeachers: teachersSnapshot.size,
                activeTeachers: teachersSnapshot.size,
                totalClasses: totalClasses,
                totalStudents: totalStudents,
                averagePerformance: averagePerformance
            };

            return { success: true, data: stats };
        } catch (error) {
            console.error('Error fetching department stats:', error);
            return { success: false, error: error.message };
        }
    }

    // Assign teacher to class/subject
    async assignTeacher(teacherId, classId, subjectId, startDate, endDate, hoursPerWeek = 6) {
        try {
            const assignmentData = {
                teacherId: teacherId,
                classId: classId,
                subjectId: subjectId,
                departmentId: this.departmentId,
                startDate: firebase.firestore.Timestamp.fromDate(new Date(startDate)),
                endDate: firebase.firestore.Timestamp.fromDate(new Date(endDate)),
                hoursPerWeek: hoursPerWeek,
                status: 'active',
                assignedBy: this.currentUser.uid,
                assignedAt: firebase.firestore.FieldValue.serverTimestamp(),
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            const docRef = await this.db.collection('teacher_assignments').add(assignmentData);
            
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error('Error assigning teacher:', error);
            return { success: false, error: error.message };
        }
    }

    // Update teacher assignment
    async updateTeacherAssignment(assignmentId, updateData) {
        try {
            const updatePayload = {
                ...updateData,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            await this.db.collection('teacher_assignments').doc(assignmentId).update(updatePayload);
            
            return { success: true };
        } catch (error) {
            console.error('Error updating teacher assignment:', error);
            return { success: false, error: error.message };
        }
    }

    // Remove teacher assignment
    async removeTeacherAssignment(assignmentId) {
        try {
            await this.db.collection('teacher_assignments').doc(assignmentId).update({
                status: 'inactive',
                removedAt: firebase.firestore.FieldValue.serverTimestamp(),
                removedBy: this.currentUser.uid,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            return { success: true };
        } catch (error) {
            console.error('Error removing teacher assignment:', error);
            return { success: false, error: error.message };
        }
    }

    // Get available teachers for assignment
    async getAvailableTeachers(subjectId = null) {
        try {
            let query = this.db.collection('teachers')
                .where('departmentId', '==', this.departmentId)
                .where('status', '==', 'active');

            if (subjectId) {
                query = query.where('subjects', 'array-contains', subjectId);
            }

            const teachersSnapshot = await query.get();
            const teachers = [];
            
            teachersSnapshot.forEach(doc => {
                teachers.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return { success: true, data: teachers };
        } catch (error) {
            console.error('Error fetching available teachers:', error);
            return { success: false, error: error.message };
        }
    }

    // Get available classes
    async getAvailableClasses() {
        try {
            const classesSnapshot = await this.db.collection('classes')
                .where('departmentId', '==', this.departmentId)
                .where('status', '==', 'active')
                .orderBy('name', 'asc')
                .get();

            const classes = [];
            classesSnapshot.forEach(doc => {
                classes.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return { success: true, data: classes };
        } catch (error) {
            console.error('Error fetching available classes:', error);
            return { success: false, error: error.message };
        }
    }

    // Get available subjects
    async getAvailableSubjects() {
        try {
            const subjectsSnapshot = await this.db.collection('subjects')
                .where('departmentId', '==', this.departmentId)
                .where('status', '==', 'active')
                .orderBy('name', 'asc')
                .get();

            const subjects = [];
            subjectsSnapshot.forEach(doc => {
                subjects.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return { success: true, data: subjects };
        } catch (error) {
            console.error('Error fetching available subjects:', error);
            return { success: false, error: error.message };
        }
    }

    // Get teacher details with assignments
    async getTeacherDetails(teacherId) {
        try {
            // Get teacher basic info
            const teacherDoc = await this.db.collection('teachers').doc(teacherId).get();
            if (!teacherDoc.exists) {
                throw new Error('Teacher not found');
            }

            const teacherData = {
                id: teacherDoc.id,
                ...teacherDoc.data()
            };

            // Get teacher assignments
            const assignmentsResult = await this.getTeacherAssignments(teacherId);
            teacherData.assignments = assignmentsResult.success ? assignmentsResult.data : [];

            // Get teacher performance
            const performanceResult = await this.getTeacherPerformance(teacherId);
            teacherData.performance = performanceResult.success ? performanceResult.data : [];

            return { success: true, data: teacherData };
        } catch (error) {
            console.error('Error fetching teacher details:', error);
            return { success: false, error: error.message };
        }
    }

    // Real-time listener for department teachers
    subscribeToDepartmentTeachers(callback) {
        if (!this.departmentId) {
            console.error('Department ID not found');
            return null;
        }

        return this.db.collection('teachers')
            .where('departmentId', '==', this.departmentId)
            .where('status', '==', 'active')
            .onSnapshot((snapshot) => {
                const teachers = [];
                snapshot.forEach(doc => {
                    teachers.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                callback(teachers);
            }, (error) => {
                console.error('Error in real-time listener:', error);
                callback([]);
            });
    }

    // Real-time listener for teacher assignments
    subscribeToTeacherAssignments(callback, teacherId = null) {
        let query = this.db.collection('teacher_assignments')
            .where('status', '==', 'active');

        if (teacherId) {
            query = query.where('teacherId', '==', teacherId);
        } else if (this.departmentId) {
            query = query.where('departmentId', '==', this.departmentId);
        }

        return query.onSnapshot((snapshot) => {
            const assignments = [];
            snapshot.forEach(doc => {
                assignments.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            callback(assignments);
        }, (error) => {
            console.error('Error in assignments listener:', error);
            callback([]);
        });
    }

    // Export teachers data
    async exportTeachersData(format = 'json') {
        try {
            const teachersResult = await this.getDepartmentTeachers();
            if (!teachersResult.success) {
                throw new Error(teachersResult.error);
            }

            const assignmentsResult = await this.getTeacherAssignments();
            const assignments = assignmentsResult.success ? assignmentsResult.data : [];

            const exportData = {
                teachers: teachersResult.data,
                assignments: assignments,
                exportedAt: new Date().toISOString(),
                exportedBy: this.currentUser.uid,
                departmentId: this.departmentId
            };

            if (format === 'json') {
                return {
                    success: true,
                    data: JSON.stringify(exportData, null, 2),
                    filename: `teachers_export_${new Date().toISOString().split('T')[0]}.json`
                };
            }

            return { success: true, data: exportData };
        } catch (error) {
            console.error('Error exporting teachers data:', error);
            return { success: false, error: error.message };
        }
    }
}

// Initialize teacher service
window.teacherService = new TeacherService();
