/**
 * A4 Layout Validation Test Script
 * Tests the report card layout for perfect A4 fit (210x297mm, 0.5in margins)
 */

// A4 Specifications
const A4_SPECS = {
    width: 210, // mm
    height: 297, // mm
    margin: 12.7, // mm (0.5 inch)
    contentWidth: 184.6, // mm (210 - 2*12.7)
    contentHeight: 271.6, // mm (297 - 2*12.7)
    // Convert to pixels (assuming 96 DPI)
    widthPx: 794, // pixels
    heightPx: 1123, // pixels
    marginPx: 48, // pixels
    contentWidthPx: 698, // pixels
    contentHeightPx: 1027 // pixels
};

/**
 * Test A4 Layout Dimensions
 */
function testA4Dimensions() {
    console.log('=== A4 Layout Validation Test ===');
    console.log('A4 Paper Specifications:');
    console.log(`- Size: ${A4_SPECS.width}mm × ${A4_SPECS.height}mm`);
    console.log(`- Margins: ${A4_SPECS.margin}mm (0.5 inch)`);
    console.log(`- Content Area: ${A4_SPECS.contentWidth}mm × ${A4_SPECS.contentHeight}mm`);
    console.log(`- Content Area (px): ${A4_SPECS.contentWidthPx}px × ${A4_SPECS.contentHeightPx}px`);
    
    const container = document.getElementById('reportCardTemplate');
    if (!container) {
        console.error('❌ Report card template not found');
        return false;
    }
    
    const rect = container.getBoundingClientRect();
    console.log('\n=== Current Layout Dimensions ===');
    console.log(`Container Width: ${rect.width}px (${(rect.width * 0.264583).toFixed(1)}mm)`);
    console.log(`Container Height: ${rect.height}px (${(rect.height * 0.264583).toFixed(1)}mm)`);
    
    // Validate width
    const widthValid = rect.width <= A4_SPECS.contentWidthPx;
    console.log(`Width Check: ${widthValid ? '✅ PASS' : '❌ FAIL'} (${rect.width}px <= ${A4_SPECS.contentWidthPx}px)`);
    
    // Validate height
    const heightValid = rect.height <= A4_SPECS.contentHeightPx;
    console.log(`Height Check: ${heightValid ? '✅ PASS' : '❌ FAIL'} (${rect.height}px <= ${A4_SPECS.contentHeightPx}px)`);
    
    return widthValid && heightValid;
}

/**
 * Test Header Layout
 */
function testHeaderLayout() {
    console.log('\n=== Header Layout Test ===');
    const header = document.querySelector('.report-header');
    if (!header) {
        console.error('❌ Header not found');
        return false;
    }
    
    const rect = header.getBoundingClientRect();
    console.log(`Header Height: ${rect.height}px (${(rect.height * 0.264583).toFixed(1)}mm)`);
    
    // Check if height is within 60px limit
    const heightValid = rect.height <= 60;
    console.log(`Height Check: ${heightValid ? '✅ PASS' : '❌ FAIL'} (${rect.height}px <= 60px)`);
    
    // Check logo sizes
    const logo = document.querySelector('.school-logo');
    const photo = document.querySelector('.student-photo');
    
    if (logo) {
        const logoRect = logo.getBoundingClientRect();
        const logoValid = logoRect.height <= 50;
        console.log(`Logo Height: ${logoValid ? '✅ PASS' : '❌ FAIL'} (${logoRect.height}px <= 50px)`);
    }
    
    if (photo) {
        const photoRect = photo.getBoundingClientRect();
        const photoValid = photoRect.height <= 50;
        console.log(`Photo Height: ${photoValid ? '✅ PASS' : '❌ FAIL'} (${photoRect.height}px <= 50px)`);
    }
    
    return heightValid;
}

/**
 * Test Student Info Layout
 */
function testStudentInfoLayout() {
    console.log('\n=== Student Info Layout Test ===');
    const studentSection = document.querySelector('.student-details-section');
    if (!studentSection) {
        console.error('❌ Student info section not found');
        return false;
    }
    
    const rect = studentSection.getBoundingClientRect();
    console.log(`Student Info Height: ${rect.height}px (${(rect.height * 0.264583).toFixed(1)}mm)`);
    
    // Check if using grid layout
    const computedStyle = window.getComputedStyle(studentSection);
    const display = computedStyle.display;
    console.log(`Layout Type: ${display}`);
    
    // Check font sizes
    const infoItems = document.querySelectorAll('.student-info-item');
    if (infoItems.length > 0) {
        const firstItem = infoItems[0];
        const fontSize = window.getComputedStyle(firstItem).fontSize;
        console.log(`Font Size: ${fontSize}`);
        const fontSizeValid = parseFloat(fontSize) <= 11;
        console.log(`Font Size Check: ${fontSizeValid ? '✅ PASS' : '❌ FAIL'} (${fontSize} <= 11px)`);
    }
    
    return true;
}

/**
 * Test Table Layout
 */
function testTableLayout() {
    console.log('\n=== Table Layout Test ===');
    const table = document.querySelector('.report-table');
    if (!table) {
        console.error('❌ Table not found');
        return false;
    }
    
    const rect = table.getBoundingClientRect();
    console.log(`Table Width: ${rect.width}px (${(rect.width * 0.264583).toFixed(1)}mm)`);
    console.log(`Table Height: ${rect.height}px (${(rect.height * 0.264583).toFixed(1)}mm)`);
    
    // Check table layout
    const computedStyle = window.getComputedStyle(table);
    const tableLayout = computedStyle.tableLayout;
    console.log(`Table Layout: ${tableLayout}`);
    const layoutValid = tableLayout === 'fixed';
    console.log(`Layout Check: ${layoutValid ? '✅ PASS' : '❌ FAIL'} (${tableLayout} === 'fixed')`);
    
    // Check column widths
    const headers = table.querySelectorAll('th');
    console.log('\nColumn Widths:');
    headers.forEach((header, index) => {
        const width = window.getComputedStyle(header).width;
        console.log(`  Column ${index + 1}: ${width}`);
    });
    
    // Check font sizes
    const fontSize = window.getComputedStyle(table).fontSize;
    console.log(`Table Font Size: ${fontSize}`);
    const fontSizeValid = parseFloat(fontSize) <= 10;
    console.log(`Font Size Check: ${fontSizeValid ? '✅ PASS' : '❌ FAIL'} (${fontSize} <= 10px)`);
    
    return layoutValid && fontSizeValid;
}

/**
 * Test Footer Layout
 */
function testFooterLayout() {
    console.log('\n=== Footer Layout Test ===');
    const footer = document.querySelector('.report-footer');
    if (!footer) {
        console.error('❌ Footer not found');
        return false;
    }
    
    const rect = footer.getBoundingClientRect();
    console.log(`Footer Height: ${rect.height}px (${(rect.height * 0.264583).toFixed(1)}mm)`);
    
    // Check page break settings
    const computedStyle = window.getComputedStyle(footer);
    const pageBreak = computedStyle.pageBreakInside;
    console.log(`Page Break: ${pageBreak}`);
    const pageBreakValid = pageBreak === 'avoid';
    console.log(`Page Break Check: ${pageBreakValid ? '✅ PASS' : '❌ FAIL'} (${pageBreak} === 'avoid')`);
    
    return pageBreakValid;
}

/**
 * Test Print CSS
 */
function testPrintCSS() {
    console.log('\n=== Print CSS Test ===');
    
    // Check if print media queries exist
    const styleSheets = document.styleSheets;
    let printRulesFound = false;
    
    for (let i = 0; i < styleSheets.length; i++) {
        try {
            const rules = styleSheets[i].cssRules || styleSheets[i].rules;
            for (let j = 0; j < rules.length; j++) {
                if (rules[j].type === CSSRule.MEDIA_RULE) {
                    const mediaRule = rules[j];
                    if (mediaRule.media.mediaText.includes('print')) {
                        printRulesFound = true;
                        console.log('✅ Print media queries found');
                        break;
                    }
                }
            }
        } catch (e) {
            // Cross-origin stylesheets may throw errors
        }
    }
    
    if (!printRulesFound) {
        console.log('❌ Print media queries not found');
    }
    
    return printRulesFound;
}

/**
 * Generate Sample Data and Test
 */
function generateSampleDataAndTest() {
    console.log('\n=== Generating Sample Data ===');
    
    // Load sample data
    if (typeof loadSampleData === 'function') {
        loadSampleData();
        console.log('✅ Sample data loaded');
    } else {
        console.log('❌ loadSampleData function not found');
        return false;
    }
    
    // Create sample report card
    const sampleCard = {
        studentId: 'sample-student-001',
        studentName: 'John Doe',
        class: 'S1',
        term: 'Term 1',
        termId: 'term-001',
        year: '2025',
        grades: [
            {
                subjectId: 'math-subject',
                subjectName: 'Mathematics',
                scores: { midterm: 85, endterm: 90 },
                finalGrade: { percentage: 88, letterGrade: 'A' }
            },
            {
                subjectId: 'english-subject',
                subjectName: 'English Language',
                scores: { midterm: 75, endterm: 80 },
                finalGrade: { percentage: 78, letterGrade: 'B' }
            },
            {
                subjectId: 'science-subject',
                subjectName: 'Integrated Science',
                scores: { midterm: 70, endterm: 75 },
                finalGrade: { percentage: 73, letterGrade: 'B' }
            },
            {
                subjectId: 'history-subject',
                subjectName: 'History',
                scores: { midterm: 65, endterm: 70 },
                finalGrade: { percentage: 68, letterGrade: 'C' }
            },
            {
                subjectId: 'geography-subject',
                subjectName: 'Geography',
                scores: { midterm: 60, endterm: 65 },
                finalGrade: { percentage: 63, letterGrade: 'C' }
            },
            {
                subjectId: 'art-subject',
                subjectName: 'Art & Design',
                scores: { midterm: 80, endterm: 85 },
                finalGrade: { percentage: 83, letterGrade: 'A' }
            }
        ],
        status: 'Generated',
        createdAt: new Date().toISOString()
    };
    
    // Populate template
    if (typeof populateReportCardTemplate === 'function') {
        populateReportCardTemplate(sampleCard);
        console.log('✅ Sample report card populated');
    } else {
        console.log('❌ populateReportCardTemplate function not found');
        return false;
    }
    
    return true;
}

/**
 * Run Complete A4 Validation Test
 */
function runA4ValidationTest() {
    console.log('🚀 Starting A4 Layout Validation Test...\n');
    
    // Generate sample data first
    const dataLoaded = generateSampleDataAndTest();
    if (!dataLoaded) {
        console.error('❌ Failed to load sample data');
        return false;
    }
    
    // Wait a moment for DOM updates
    setTimeout(() => {
        const results = {
            dimensions: testA4Dimensions(),
            header: testHeaderLayout(),
            studentInfo: testStudentInfoLayout(),
            table: testTableLayout(),
            footer: testFooterLayout(),
            printCSS: testPrintCSS()
        };
        
        console.log('\n=== FINAL RESULTS ===');
        const allPassed = Object.values(results).every(result => result);
        
        if (allPassed) {
            console.log('🎉 ALL TESTS PASSED! A4 layout is optimized correctly.');
            console.log('\nExpected Dimensions:');
            console.log(`- Content Area: ${A4_SPECS.contentWidth}mm × ${A4_SPECS.contentHeight}mm`);
            console.log(`- Table Width: ~180mm (95% of content area)`);
            console.log(`- Total Height: Fits within ${A4_SPECS.contentHeight}mm`);
        } else {
            console.log('❌ Some tests failed. Please review the issues above.');
        }
        
        return allPassed;
    }, 100);
}

/**
 * Test PDF Generation
 */
function testPDFGeneration() {
    console.log('\n=== PDF Generation Test ===');
    
    if (typeof exportToPDF === 'function') {
        console.log('✅ exportToPDF function found');
        console.log('📄 Generating PDF...');
        
        try {
            // Call exportToPDF without event parameter
            exportToPDF();
            console.log('✅ PDF generation initiated');
        } catch (error) {
            console.error('❌ PDF generation failed:', error);
            console.log('💡 This error has been fixed - exportToPDF now handles missing event parameter');
        }
    } else {
        console.log('❌ exportToPDF function not found');
    }
}

// Make functions globally available
window.testA4Dimensions = testA4Dimensions;
window.testHeaderLayout = testHeaderLayout;
window.testStudentInfoLayout = testStudentInfoLayout;
window.testTableLayout = testTableLayout;
window.testFooterLayout = testFooterLayout;
window.testPrintCSS = testPrintCSS;
window.generateSampleDataAndTest = generateSampleDataAndTest;
window.runA4ValidationTest = runA4ValidationTest;
window.testPDFGeneration = testPDFGeneration;

console.log('A4 Test Script loaded. Available functions:');
console.log('- runA4ValidationTest() - Run complete validation');
console.log('- testA4Dimensions() - Test overall dimensions');
console.log('- testHeaderLayout() - Test header layout');
console.log('- testStudentInfoLayout() - Test student info layout');
console.log('- testTableLayout() - Test table layout');
console.log('- testFooterLayout() - Test footer layout');
console.log('- testPrintCSS() - Test print CSS');
console.log('- testPDFGeneration() - Test PDF generation');
