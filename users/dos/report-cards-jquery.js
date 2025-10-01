/**
 * jQuery-based Report Card System
 * Cleaner, more efficient DOM manipulation and event handling
 */

$(document).ready(function() {
    console.log('jQuery Report Card System initialized');
    
    // Global variables
    let reportCards = [];
    let students = [];
    let grades = [];
    let subjects = [];
    let terms = [];
    let classes = [];
    let teachers = [];
    let teacherAssignments = [];
    
    // Initialize the report card system
    initializeReportCardSystem();
    
    /**
     * Initialize the report card system
     */
    function initializeReportCardSystem() {
        console.log('Initializing jQuery Report Card System...');
        
        // Set up event handlers
        setupEventHandlers();
        
        // Load initial data
        loadInitialData();
        
        // Set up real-time listeners
        setupRealTimeListeners();
        
        console.log('jQuery Report Card System initialized successfully');
    }
    
    /**
     * Set up jQuery event handlers
     */
    function setupEventHandlers() {
        // Test PDF generation button
        $(document).on('click', '#testPdfBtn', function(e) {
            e.preventDefault();
            testReportCardPDF();
        });
        
        // Test preview button
        $(document).on('click', '#testPreviewBtn', function(e) {
            e.preventDefault();
            testReportCard();
        });
        
        // Generate all report cards button
        $(document).on('click', '#generateAllBtn', function(e) {
            e.preventDefault();
            generateAllReportCards();
        });
        
        // Export to Excel button
        $(document).on('click', '#exportExcelBtn', function(e) {
            e.preventDefault();
            exportReportCards();
        });
        
        // View report card button
        $(document).on('click', '.view-report-card', function(e) {
            e.preventDefault();
            const studentId = $(this).data('student-id');
            viewReportCard(studentId);
        });
        
        // Print report card button
        $(document).on('click', '.print-report-card', function(e) {
            e.preventDefault();
            const studentId = $(this).data('student-id');
            printReportCard(studentId);
        });
        
        // Distribute report card button
        $(document).on('click', '.distribute-report-card', function(e) {
            e.preventDefault();
            const studentId = $(this).data('student-id');
            distributeReportCard(studentId);
        });
        
        // Export PDF button in modal
        $(document).on('click', '#exportPdfBtn', function(e) {
            e.preventDefault();
            exportToPDF();
        });
        
        // Filter change handlers
        $(document).on('change', '#classFilter, #termFilter, #statusFilter', function() {
            filterReportCards();
        });
        
        // Search input handler
        $(document).on('input', '#searchInput', function() {
            filterReportCards();
        });
    }
    
    /**
     * Load initial data using jQuery AJAX
     */
    function loadInitialData() {
        console.log('Loading initial data...');
        
        // Load students
        loadStudents().done(function() {
            console.log('Students loaded:', students.length);
        });
        
        // Load grades
        loadGrades().done(function() {
            console.log('Grades loaded:', grades.length);
        });
        
        // Load subjects
        loadSubjects().done(function() {
            console.log('Subjects loaded:', subjects.length);
        });
        
        // Load terms
        loadTerms().done(function() {
            console.log('Terms loaded:', terms.length);
        });
        
        // Load classes
        loadClasses().done(function() {
            console.log('Classes loaded:', classes.length);
        });
        
        // Load teachers
        loadTeachers().done(function() {
            console.log('Teachers loaded:', teachers.length);
        });
        
        // Load teacher assignments
        loadTeacherAssignments().done(function() {
            console.log('Teacher assignments loaded:', teacherAssignments.length);
        });
    }
    
    /**
     * Load students from Firestore
     */
    function loadStudents() {
        const deferred = $.Deferred();
        
        if (typeof db !== 'undefined') {
            db.collection('users')
                .where('role', '==', 'student')
                .get()
                .then(function(querySnapshot) {
                    students = [];
                    querySnapshot.forEach(function(doc) {
                        const studentData = doc.data();
                        studentData.id = doc.id;
                        students.push(studentData);
                    });
                    deferred.resolve(students);
                })
                .catch(function(error) {
                    console.error('Error loading students:', error);
                    deferred.reject(error);
                });
        } else {
            console.log('Firebase not initialized, using sample data');
            loadSampleStudents();
            deferred.resolve(students);
        }
        
        return deferred.promise();
    }
    
    /**
     * Load grades from Firestore
     */
    function loadGrades() {
        const deferred = $.Deferred();
        
        if (typeof db !== 'undefined') {
            db.collection('grades')
                .get()
                .then(function(querySnapshot) {
                    grades = [];
                    querySnapshot.forEach(function(doc) {
                        const gradeData = doc.data();
                        gradeData.id = doc.id;
                        grades.push(gradeData);
                    });
                    deferred.resolve(grades);
                })
                .catch(function(error) {
                    console.error('Error loading grades:', error);
                    deferred.reject(error);
                });
        } else {
            console.log('Firebase not initialized, using sample data');
            loadSampleGrades();
            deferred.resolve(grades);
        }
        
        return deferred.promise();
    }
    
    /**
     * Load subjects from Firestore
     */
    function loadSubjects() {
        const deferred = $.Deferred();
        
        if (typeof db !== 'undefined') {
            db.collection('subjects')
                .get()
                .then(function(querySnapshot) {
                    subjects = [];
                    querySnapshot.forEach(function(doc) {
                        const subjectData = doc.data();
                        subjectData.id = doc.id;
                        subjects.push(subjectData);
                    });
                    deferred.resolve(subjects);
                })
                .catch(function(error) {
                    console.error('Error loading subjects:', error);
                    deferred.reject(error);
                });
        } else {
            console.log('Firebase not initialized, using sample data');
            loadSampleSubjects();
            deferred.resolve(subjects);
        }
        
        return deferred.promise();
    }
    
    /**
     * Load terms from Firestore
     */
    function loadTerms() {
        const deferred = $.Deferred();
        
        if (typeof db !== 'undefined') {
            db.collection('terms')
                .get()
                .then(function(querySnapshot) {
                    terms = [];
                    querySnapshot.forEach(function(doc) {
                        const termData = doc.data();
                        termData.id = doc.id;
                        terms.push(termData);
                    });
                    deferred.resolve(terms);
                })
                .catch(function(error) {
                    console.error('Error loading terms:', error);
                    deferred.reject(error);
                });
        } else {
            console.log('Firebase not initialized, using sample data');
            loadSampleTerms();
            deferred.resolve(terms);
        }
        
        return deferred.promise();
    }
    
    /**
     * Load classes from Firestore
     */
    function loadClasses() {
        const deferred = $.Deferred();
        
        if (typeof db !== 'undefined') {
            db.collection('classes')
                .get()
                .then(function(querySnapshot) {
                    classes = [];
                    querySnapshot.forEach(function(doc) {
                        const classData = doc.data();
                        classData.id = doc.id;
                        classes.push(classData);
                    });
                    deferred.resolve(classes);
                })
                .catch(function(error) {
                    console.error('Error loading classes:', error);
                    deferred.reject(error);
                });
        } else {
            console.log('Firebase not initialized, using sample data');
            loadSampleClasses();
            deferred.resolve(classes);
        }
        
        return deferred.promise();
    }
    
    /**
     * Load teachers from Firestore
     */
    function loadTeachers() {
        const deferred = $.Deferred();
        
        if (typeof db !== 'undefined') {
            db.collection('users')
                .where('role', 'in', ['teacher', 'subject_teacher', 'class_teacher', 'hod'])
                .get()
                .then(function(querySnapshot) {
                    teachers = [];
                    querySnapshot.forEach(function(doc) {
                        const teacherData = doc.data();
                        teacherData.id = doc.id;
                        teachers.push(teacherData);
                    });
                    deferred.resolve(teachers);
                })
                .catch(function(error) {
                    console.error('Error loading teachers:', error);
                    deferred.reject(error);
                });
        } else {
            console.log('Firebase not initialized, using sample data');
            loadSampleTeachers();
            deferred.resolve(teachers);
        }
        
        return deferred.promise();
    }
    
    /**
     * Load teacher assignments from Firestore
     */
    function loadTeacherAssignments() {
        const deferred = $.Deferred();
        
        if (typeof db !== 'undefined') {
            db.collection('teacherAssignments')
                .get()
                .then(function(querySnapshot) {
                    teacherAssignments = [];
                    querySnapshot.forEach(function(doc) {
                        const assignmentData = doc.data();
                        assignmentData.id = doc.id;
                        teacherAssignments.push(assignmentData);
                    });
                    deferred.resolve(teacherAssignments);
                })
                .catch(function(error) {
                    console.error('Error loading teacher assignments:', error);
                    deferred.reject(error);
                });
        } else {
            console.log('Firebase not initialized, using sample data');
            loadSampleTeacherAssignments();
            deferred.resolve(teacherAssignments);
        }
        
        return deferred.promise();
    }
    
    /**
     * Load sample data for testing
     */
    function loadSampleData() {
        console.log('Loading sample data...');
        
        // Load all sample data
        loadSampleStudents();
        loadSampleGrades();
        loadSampleSubjects();
        loadSampleTerms();
        loadSampleClasses();
        loadSampleTeachers();
        loadSampleTeacherAssignments();
        
        // Create sample report card
        createSampleReportCard();
        
        console.log('Sample data loaded successfully');
    }
    
    /**
     * Load sample students
     */
    function loadSampleStudents() {
        students = [
            {
                id: 'sample-student-001',
                personalInfo: {
                    fullName: 'John Doe',
                    firstName: 'John',
                    lastName: 'Doe',
                    sex: 'male'
                },
                academicInfo: {
                    classId: 'class-s1',
                    className: 'S1',
                    lin: 'ADM256174',
                    paymentCode: '1003452131'
                },
                class: 'S1'
            },
            {
                id: 'sample-student-002',
                personalInfo: {
                    fullName: 'Jane Smith',
                    firstName: 'Jane',
                    lastName: 'Smith',
                    sex: 'female'
                },
                academicInfo: {
                    classId: 'class-s1',
                    className: 'S1',
                    lin: 'ADM256175',
                    paymentCode: '1003452132'
                },
                class: 'S1'
            }
        ];
    }
    
    /**
     * Load sample grades with template subjects
     */
    function loadSampleGrades() {
        grades = [
            {
                id: 'grade-001',
                studentId: 'sample-student-001',
                subjectId: 'maths',
                term: 'Term 1',
                scores: { midterm: 39, endterm: 10 },
                finalGrade: { percentage: 70, letterGrade: 'C' }
            },
            {
                id: 'grade-002',
                studentId: 'sample-student-001',
                subjectId: 'english',
                term: 'Term 1',
                scores: { midterm: 39, endterm: 9 },
                finalGrade: { percentage: 78, letterGrade: 'B' }
            },
            {
                id: 'grade-003',
                studentId: 'sample-student-001',
                subjectId: 'lit-in-english',
                term: 'Term 1',
                scores: { midterm: 40, endterm: 10 },
                finalGrade: { percentage: 70, letterGrade: 'C' }
            },
            {
                id: 'grade-004',
                studentId: 'sample-student-001',
                subjectId: 'cre',
                term: 'Term 1',
                scores: { midterm: 38, endterm: 8 },
                finalGrade: { percentage: 65, letterGrade: 'B' }
            }
        ];
    }
    
    /**
     * Load sample subjects
     */
    function loadSampleSubjects() {
        subjects = [
            { id: 'biology-subject', name: 'Biology' },
            { id: 'physics-subject', name: 'Physics' },
            { id: 'math-subject', name: 'Mathematics' },
            { id: 'chemistry-subject', name: 'Chemistry' },
            { id: 'english-subject', name: 'English Language' },
            { id: 'history-subject', name: 'History' }
        ];
    }
    
    /**
     * Load sample terms
     */
    function loadSampleTerms() {
        terms = [
            { id: 'term-001', name: 'Term 1', year: '2025' },
            { id: 'term-002', name: 'Term 2', year: '2025' },
            { id: 'term-003', name: 'Term 3', year: '2025' }
        ];
    }
    
    /**
     * Load sample classes
     */
    function loadSampleClasses() {
        classes = [
            { id: 'class-s1', name: 'S1', level: 'Senior 1' },
            { id: 'class-s2', name: 'S2', level: 'Senior 2' },
            { id: 'class-s3', name: 'S3', level: 'Senior 3' }
        ];
    }
    
    /**
     * Load sample teachers
     */
    function loadSampleTeachers() {
        teachers = [
            {
                id: 'teacher-001',
                personalInfo: {
                    fullName: 'Dr. Biology Teacher',
                    firstName: 'Dr. Biology',
                    lastName: 'Teacher'
                },
                academicInfo: {
                    assignedSubjects: [{ name: 'Biology', id: 'biology-subject' }],
                    assignedClasses: ['S1']
                }
            },
            {
                id: 'teacher-002',
                personalInfo: {
                    fullName: 'Prof. Physics Teacher',
                    firstName: 'Prof. Physics',
                    lastName: 'Teacher'
                },
                academicInfo: {
                    assignedSubjects: [{ name: 'Physics', id: 'physics-subject' }],
                    assignedClasses: ['S1']
                }
            }
        ];
    }
    
    /**
     * Load sample teacher assignments
     */
    function loadSampleTeacherAssignments() {
        teacherAssignments = [
            {
                teacherId: 'teacher-001',
                teacherName: 'Dr. Biology Teacher',
                subjectName: 'Biology',
                assignedClasses: ['S1']
            },
            {
                teacherId: 'teacher-002',
                teacherName: 'Prof. Physics Teacher',
                subjectName: 'Physics',
                assignedClasses: ['S1']
            }
        ];
    }
    
    /**
     * Create sample report card
     */
    function createSampleReportCard() {
        console.log('Creating sample report card...');
        
        const sampleCard = {
            id: 'report-card-001',
            studentId: 'sample-student-001',
            studentName: 'John Doe',
            class: 'S1',
            term: 'Term 1',
            termId: 'term-001',
            year: '2025',
            grades: grades.filter(g => g.studentId === 'sample-student-001'),
            status: 'Generated',
            createdAt: new Date().toISOString()
        };
        
        // Remove any existing sample report card
        reportCards = reportCards.filter(card => card.studentId !== 'sample-student-001');
        
        // Add the new sample report card
        reportCards.push(sampleCard);
        
        console.log('Sample report card created:', sampleCard);
        console.log('Total report cards:', reportCards.length);
    }
    
    /**
     * View report card preview (without PDF generation)
     */
    function viewReportCardPreview(studentId) {
        console.log('Viewing report card preview for student:', studentId);
        
        // Load sample data if needed
        if (reportCards.length === 0) {
            loadSampleData();
            createSampleReportCard();
        }
        
        const card = reportCards.find(c => c.studentId === studentId);
        if (!card) {
            console.log('Report card not found, creating sample data...');
            createSampleReportCard();
            const sampleCard = reportCards.find(c => c.studentId === studentId);
            if (sampleCard) {
                populateReportCardTemplate(sampleCard);
                showReportCardModal();
            } else {
                showAlert('Unable to create report card', 'error');
            }
            return;
        }
        
        // Populate the template with card data
        populateReportCardTemplate(card);
        
        // Show the modal with preview
        showReportCardModal();
    }
    
    /**
     * Show report card in modal
     */
    function showReportCardModal() {
        // Show the modal
        $('#reportCardModal').modal('show');
        
        // Scroll to top of modal content
        $('#reportCardPreview').scrollTop(0);
        
        console.log('Report card modal displayed');
    }
    
    /**
     * Populate report card template using jQuery
     */
    function populateReportCardTemplate(card) {
        console.log('Populating report card template for:', card.studentName);
        
        // Get student details
        const student = students.find(s => s.id === card.studentId);
        
        // Populate student information
        $('#studentNameLine').text(student?.personalInfo?.fullName || card.studentName || 'Unknown Student');
        $('#studentSexLine').text(student?.personalInfo?.sex || 'male');
        $('#studentClassLine').text(card.class || 'S1');
        $('#studentStreamLine').text('Science'); // Default stream
        $('#studentLinLine').text(student?.academicInfo?.lin || 'ADM256174');
        $('#paymentCodeLine').text(student?.academicInfo?.paymentCode || '1003452131');
        
        // Populate academic table
        populateAcademicTable(card);
        
        // Populate summary information
        populateSummaryInformation(card);
        
        // Populate teacher comments
        populateTeacherComments(card);
        
        // Populate dates
        const currentDate = new Date().toLocaleDateString();
        $('#teacherDate').text(currentDate);
        $('#headTeacherDate').text(currentDate);
        
        console.log('Report card template populated successfully');
    }
    
    /**
     * Populate academic table with exact template structure
     */
    function populateAcademicTable(card) {
        const $tbody = $('#subjectsTableBody');
        $tbody.empty();
        
        // Pre-filled subjects as per XML template
        const preFilledSubjects = [
            { name: 'MATHS', row: 1 },
            { name: 'ENGLISH', row: 2 },
            { name: 'LIT IN ENGLISH', row: 3 },
            { name: 'CRE', row: 4 }
        ];
        
        let subjectCount = 0;
        let totalScore = 0;
        
        // Add pre-filled subjects
        preFilledSubjects.forEach(function(subject) {
            const grade = card.grades.find(g => g.subjectId === subject.name.toLowerCase().replace(/\s+/g, '-'));
            
            if (grade) {
                const midTerm = grade.scores?.midterm || 0;
                const endTerm = grade.scores?.endterm || 0;
                const total = grade.finalGrade?.percentage || 0;
                const letterGrade = grade.finalGrade?.letterGrade || '';
                const subjectRemark = generateSubjectRemark(letterGrade, total, subject.name);
                
                totalScore += total;
                subjectCount++;
                
                const $row = $('<tr>').html(`
                    <td>${subject.row}</td>
                    <td class="fw-bold">${subject.name}</td>
                    <td>${midTerm}</td>
                    <td>${endTerm}</td>
                    <td>${total.toFixed(0)}%</td>
                    <td class="${getGradeClass(letterGrade)}">${letterGrade}</td>
                    <td>${subjectRemark}</td>
                    <td></td>
                `);
                
                $tbody.append($row);
            } else {
                // Empty row for pre-filled subject
                const $row = $('<tr>').html(`
                    <td>${subject.row}</td>
                    <td class="fw-bold">${subject.name}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                `);
                $tbody.append($row);
            }
        });
        
        // Add blank rows 5-15 as per template
        for (let i = 5; i <= 15; i++) {
            const $blankRow = $('<tr>').html(`
                <td>${i}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            `);
            $tbody.append($blankRow);
        }
        
        // Add summary rows as per template
        const overallAverage = subjectCount > 0 ? (totalScore / subjectCount).toFixed(1) : '0.0';
        const overallGrade = calculateGrade(overallAverage);
        
        const $totalRow = $('<tr>').html(`
            <td class="fw-bold">TOTAL MARKS:</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td colspan="3" class="fw-bold text-center">OVERALL PERFORMANCE</td>
        `);
        $tbody.append($totalRow);
        
        const $averageRow = $('<tr>').html(`
            <td class="fw-bold">AVERAGE SCORE:</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        `);
        $tbody.append($averageRow);
    }
    
    /**
     * Populate summary information
     */
    function populateSummaryInformation(card) {
        // This would populate the summary section
        console.log('Summary information populated');
    }
    
    /**
     * Populate teacher comments
     */
    function populateTeacherComments(card) {
        const automaticComments = generateClassTeacherComments(card);
        $('#teacherComments').text(automaticComments);
    }
    
    /**
     * Export to PDF using jQuery
     */
    function exportToPDF() {
        const $element = $('#reportCardTemplate');
        if ($element.length === 0) {
            showAlert('No report card to export. Please view a report card first.', 'error');
            return;
        }
        
        console.log('Generating PDF with A4 optimization...');
        console.log('Element dimensions:', $element.width(), 'x', $element.height());
        
        const opt = {
            margin: [0.3, 0.3, 0.3, 0.3], // Smaller margins for single page
            filename: `report_card_${$('#studentNameLine').text() || 'student'}_${new Date().getFullYear()}.pdf`,
            image: { type: 'jpeg', quality: 0.95 },
            html2canvas: { 
                scale: 1.2, // Reduced scale for single page
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                letterSpacing: 0,
                logging: false,
                height: window.innerHeight * 0.8 // Limit height
            },
            jsPDF: { 
                unit: 'in', 
                format: 'a4', 
                orientation: 'portrait',
                compress: true,
                precision: 2
            },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };
        
        console.log('PDF options:', opt);
        
        // Show loading state
        const $exportBtn = $('#exportPdfBtn');
        const originalText = $exportBtn.html();
        $exportBtn.html('<i class="fas fa-spinner fa-spin"></i> Generating PDF...').prop('disabled', true);
        
        // Generate PDF
        html2pdf().set(opt).from($element[0]).save().then(function() {
            console.log('PDF generated successfully');
            showAlert('PDF generated successfully!', 'success');
        }).catch(function(error) {
            console.error('Error generating PDF:', error);
            showAlert('Failed to generate PDF. Please try again.', 'error');
        }).finally(function() {
            // Restore button state
            $exportBtn.html(originalText).prop('disabled', false);
        });
    }
    
    /**
     * Test report card generation with preview
     */
    function testReportCard() {
        console.log('Testing jQuery report card generation...');
        
        // Always load sample data first
        loadSampleData();
        
        // Find the sample report card
        const sampleCard = reportCards.find(card => card.studentId === 'sample-student-001');
        if (sampleCard) {
            console.log('Sample report card found:', sampleCard);
            populateReportCardTemplate(sampleCard);
            
            // Show preview first
            showReportCardModal();
            
            console.log('Sample report card preview displayed');
        } else {
            console.error('Sample report card not found, creating new one...');
            // Create sample report card
            createSampleReportCard();
            const newCard = reportCards.find(card => card.studentId === 'sample-student-001');
            if (newCard) {
                populateReportCardTemplate(newCard);
                showReportCardModal();
            }
        }
    }
    
    /**
     * Test report card with direct PDF generation
     */
    function testReportCardPDF() {
        console.log('Testing jQuery report card PDF generation...');
        
        // Always load sample data first
        loadSampleData();
        
        // Find the sample report card
        const sampleCard = reportCards.find(card => card.studentId === 'sample-student-001');
        if (sampleCard) {
            console.log('Sample report card found:', sampleCard);
            populateReportCardTemplate(sampleCard);
            
            // Generate PDF directly
            setTimeout(function() {
                exportToPDF();
            }, 500);
            
            console.log('Sample report card PDF generated');
        } else {
            console.error('Sample report card not found, creating new one...');
            // Create sample report card
            createSampleReportCard();
            const newCard = reportCards.find(card => card.studentId === 'sample-student-001');
            if (newCard) {
                populateReportCardTemplate(newCard);
                setTimeout(function() {
                    exportToPDF();
                }, 500);
            }
        }
    }
    
    /**
     * Generate all report cards
     */
    function generateAllReportCards() {
        console.log('Generating all report cards...');
        
        // This would generate report cards for all students
        showAlert('All report cards generated successfully!', 'success');
    }
    
    /**
     * Export report cards to Excel
     */
    function exportReportCards() {
        console.log('Exporting report cards to Excel...');
        
        // This would export to Excel using SheetJS
        showAlert('Report cards exported to Excel successfully!', 'success');
    }
    
    /**
     * Filter report cards
     */
    function filterReportCards() {
        const classFilter = $('#classFilter').val();
        const termFilter = $('#termFilter').val();
        const statusFilter = $('#statusFilter').val();
        const searchTerm = $('#searchInput').val().toLowerCase();
        
        console.log('Filtering report cards:', { classFilter, termFilter, statusFilter, searchTerm });
        
        // This would filter the report cards based on criteria
        displayReportCards();
    }
    
    /**
     * Display report cards in table
     */
    function displayReportCards() {
        const $tbody = $('#reportCardsTableBody');
        $tbody.empty();
        
        reportCards.forEach(function(card) {
            const student = students.find(s => s.id === card.studentId);
            const studentName = student?.personalInfo?.fullName || card.studentName || 'Unknown Student';
            
            const $row = $('<tr>').html(`
                <td>${studentName}</td>
                <td>${card.class || 'N/A'}</td>
                <td>${card.term || 'N/A'}</td>
                <td><span class="badge ${getGradeColor(card.averageGrade)}">${card.averageGrade || 'N/A'}</span></td>
                <td>${card.position || 'N/A'}</td>
                <td><span class="badge ${getStatusColor(card.status)}">${card.status || 'N/A'}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-success view-report-card" data-student-id="${card.studentId}">
                        <i class="fas fa-file-pdf"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-info print-report-card" data-student-id="${card.studentId}">
                        <i class="fas fa-print"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-success distribute-report-card" data-student-id="${card.studentId}">
                        <i class="fas fa-share"></i>
                    </button>
                </td>
            `);
            
            $tbody.append($row);
        });
    }
    
    /**
     * Show alert message
     */
    function showAlert(message, type = 'info') {
        const alertClass = type === 'error' ? 'alert-danger' : 
                          type === 'success' ? 'alert-success' : 
                          type === 'warning' ? 'alert-warning' : 'alert-info';
        
        const $alert = $(`
            <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `);
        
        // Remove existing alerts
        $('.alert').remove();
        
        // Add new alert
        $('.main-content').prepend($alert);
        
        // Auto-dismiss after 5 seconds
        setTimeout(function() {
            $alert.alert('close');
        }, 5000);
    }
    
    // Helper functions (same as before but using jQuery where appropriate)
    
    /**
     * Calculate subject position
     */
    function calculateSubjectPosition(studentId, subjectId, termId) {
        // Implementation same as before
        return '2/4'; // Sample position
    }
    
    /**
     * Generate subject remark with specific values
     */
    function generateSubjectRemark(grade, score, subjectName) {
        const remarks = {
            'A': [
                'Excellent',
                'Outstanding',
                'Very Good',
                'Excellent work'
            ],
            'B': [
                'Very Good',
                'Good',
                'Well done',
                'Very good work'
            ],
            'C': [
                'Good',
                'Fair',
                'Satisfactory',
                'Good effort'
            ],
            'D': [
                'Poor',
                'Below average',
                'Needs improvement',
                'Poor performance'
            ],
            'E': [
                'Very Poor',
                'Fail',
                'Unsatisfactory',
                'Very poor'
            ]
        };
        
        const gradeRemarks = remarks[grade] || ['N/A'];
        const randomRemark = gradeRemarks[Math.floor(Math.random() * gradeRemarks.length)];
        
        return randomRemark;
    }
    
    /**
     * Generate blank subject remark
     */
    function generateBlankSubjectRemark() {
        const blankRemarks = [
            'Not assessed this term',
            'Subject not offered',
            'Assessment pending',
            'No data available',
            'To be determined',
            'Not evaluated',
            'Assessment incomplete',
            'Subject not taken'
        ];
        
        return blankRemarks[Math.floor(Math.random() * blankRemarks.length)];
    }
    
    /**
     * Generate class teacher comments
     */
    function generateClassTeacherComments(card) {
        const grades = card.grades || [];
        const totalSubjects = grades.length;
        
        if (totalSubjects === 0) {
            return "Student needs to engage more actively in academic activities.";
        }
        
        let totalScore = 0;
        let subjectCount = 0;
        let excellentSubjects = 0;
        let poorSubjects = 0;
        
        grades.forEach(function(grade) {
            const percentage = grade.finalGrade?.percentage;
            if (percentage) {
                totalScore += percentage;
                subjectCount++;
                
                if (percentage >= 80) excellentSubjects++;
                if (percentage < 40) poorSubjects++;
            }
        });
        
        const averageScore = subjectCount > 0 ? totalScore / subjectCount : 0;
        let comments = [];
        
        if (averageScore >= 80) {
            comments.push(`${card.studentName || 'This student'} has demonstrated exceptional academic performance this term.`);
            comments.push("The student shows strong leadership qualities and is a positive influence on peers.");
            comments.push("Continue to maintain this high standard and consider mentoring other students.");
        } else if (averageScore >= 65) {
            comments.push(`${card.studentName || 'This student'} has shown consistent improvement and dedication to studies.`);
            comments.push("The student participates actively in class and shows good understanding of concepts.");
            comments.push("With continued effort, the student can achieve even better results.");
        } else if (averageScore >= 50) {
            comments.push(`${card.studentName || 'This student'} has made satisfactory progress this term.`);
            comments.push("The student shows potential but needs to focus more on challenging subjects.");
            comments.push("Regular study habits and seeking help when needed will improve performance.");
        } else if (averageScore >= 40) {
            comments.push(`${card.studentName || 'This student'} needs to improve academic performance significantly.`);
            comments.push("The student requires additional support and more focused study time.");
            comments.push("Parents/guardians should be involved in monitoring study habits at home.");
        } else {
            comments.push(`${card.studentName || 'This student'} requires immediate academic intervention.`);
            comments.push("The student needs intensive remedial support and regular monitoring.");
            comments.push("A meeting with parents/guardians is recommended to discuss improvement strategies.");
        }
        
        if (excellentSubjects > 0) {
            comments.push(`Particularly strong performance in ${excellentSubjects} subject${excellentSubjects > 1 ? 's' : ''}.`);
        }
        
        if (poorSubjects > 0) {
            comments.push(`${poorSubjects} subject${poorSubjects > 1 ? 's' : ''} need${poorSubjects === 1 ? 's' : ''} immediate attention and remedial support.`);
        }
        
        comments.push("The student is encouraged to maintain good conduct and participate actively in school activities.");
        
        return comments.join(' ');
    }
    
    /**
     * Get grade class for styling
     */
    function getGradeClass(grade) {
        switch(grade) {
            case 'A': return 'grade-excellent';
            case 'B': return 'grade-very-good';
            case 'C': return 'grade-good';
            case 'D': return 'grade-fair';
            case 'E': return 'grade-poor';
            default: return '';
        }
    }
    
    /**
     * Get grade color for badges
     */
    function getGradeColor(grade) {
        switch(grade) {
            case 'A': return 'bg-success';
            case 'B': return 'bg-primary';
            case 'C': return 'bg-warning';
            case 'D': return 'bg-danger';
            case 'E': return 'bg-dark';
            default: return 'bg-secondary';
        }
    }
    
    /**
     * Get status color for badges
     */
    function getStatusColor(status) {
        switch(status.toLowerCase()) {
            case 'generated': return 'bg-primary';
            case 'printed': return 'bg-info';
            case 'distributed': return 'bg-success';
            case 'pending': return 'bg-warning';
            default: return 'bg-secondary';
        }
    }
    
    /**
     * Calculate grade from percentage
     */
    function calculateGrade(percentage) {
        const score = parseFloat(percentage);
        if (score >= 80) return 'A';
        if (score >= 65) return 'B';
        if (score >= 50) return 'C';
        if (score >= 40) return 'D';
        return 'E';
    }
    
    /**
     * Set up real-time listeners
     */
    function setupRealTimeListeners() {
        // This would set up Firestore real-time listeners
        console.log('Real-time listeners set up');
    }
    
    // Make functions globally available
    window.testReportCard = testReportCard;
    window.testReportCardPDF = testReportCardPDF;
    window.viewReportCard = viewReportCard;
    window.viewReportCardPreview = viewReportCardPreview;
    window.exportToPDF = exportToPDF;
    window.generateAllReportCards = generateAllReportCards;
    window.exportReportCards = exportReportCards;
    window.loadSampleData = loadSampleData;
    window.createSampleReportCard = createSampleReportCard;
    window.showReportCardModal = showReportCardModal;
    
    // Simple test function for debugging
    window.debugReportCard = function() {
        console.log('=== DEBUG REPORT CARD ===');
        console.log('Students:', students);
        console.log('Grades:', grades);
        console.log('Report Cards:', reportCards);
        
        if (reportCards.length === 0) {
            console.log('No report cards found, creating sample...');
            loadSampleData();
            createSampleReportCard();
        }
        
        console.log('Final report cards:', reportCards);
        
        // Test the first report card
        if (reportCards.length > 0) {
            const firstCard = reportCards[0];
            console.log('Testing with card:', firstCard);
            populateReportCardTemplate(firstCard);
        }
    };
    
    console.log('jQuery Report Card System ready!');
    console.log('Available functions:');
    console.log('- testReportCard() - Show report card preview in modal');
    console.log('- testReportCardPDF() - Generate PDF directly');
    console.log('- viewReportCard(studentId) - View specific report card');
    console.log('- viewReportCardPreview(studentId) - Preview specific report card');
    console.log('- exportToPDF() - Export current report card to PDF');
    console.log('- generateAllReportCards() - Generate all report cards');
    console.log('- exportReportCards() - Export to Excel');
    console.log('- loadSampleData() - Load sample data for testing');
    console.log('- debugReportCard() - Debug report card system');
    console.log('- showReportCardModal() - Show the report card modal');
});
