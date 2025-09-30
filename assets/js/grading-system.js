/**
 * Centralized Grading System Configuration
 * UCE Standard A-E Grading System
 * 
 * This file contains the standardized grading system used across the entire
 * school management system. All grade calculations and displays should use
 * this configuration to ensure consistency.
 */

class GradingSystem {
    constructor() {
        // UCE Standard A-E Grading System
        this.gradingScale = {
            'A': { 
                min: 80, 
                max: 100, 
                description: 'Excellent: Demonstrates exceptional mastery of subject competencies, with strong application of knowledge and skills.',
                shortDescription: 'Excellent',
                color: 'bg-success',
                badgeColor: 'success'
            },
            'B': { 
                min: 65, 
                max: 79, 
                description: 'Very Good: Shows solid understanding and effective application of most competencies.',
                shortDescription: 'Very Good',
                color: 'bg-primary',
                badgeColor: 'primary'
            },
            'C': { 
                min: 50, 
                max: 64, 
                description: 'Good: Achieves basic competencies but with some gaps in application or understanding.',
                shortDescription: 'Good',
                color: 'bg-info',
                badgeColor: 'info'
            },
            'D': { 
                min: 40, 
                max: 49, 
                description: 'Fair: Meets minimum requirements with significant limitations; barely qualifies for a pass.',
                shortDescription: 'Fair',
                color: 'bg-warning',
                badgeColor: 'warning'
            },
            'E': { 
                min: 0, 
                max: 39, 
                description: 'Poor: Fails to demonstrate adequate competencies; does not qualify for UCE certificate in that subject.',
                shortDescription: 'Poor',
                color: 'bg-danger',
                badgeColor: 'danger'
            }
        };
        
        // Marking weights
        this.markingWeights = {
            midTerm: 0.2,  // 20%
            endTerm: 0.8    // 80%
        };
    }
    
    /**
     * Calculate grade from score
     * @param {number} score - The numerical score (0-100)
     * @returns {Object} Grade object with grade, description, and color
     */
    calculateGrade(score) {
        for (const [grade, range] of Object.entries(this.gradingScale)) {
            if (score >= range.min && score <= range.max) {
                return { 
                    grade, 
                    description: range.description,
                    shortDescription: range.shortDescription,
                    color: range.color,
                    badgeColor: range.badgeColor
                };
            }
        }
        // Fallback to E grade
        const eGrade = this.gradingScale['E'];
        return { 
            grade: 'E', 
            description: eGrade.description,
            shortDescription: eGrade.shortDescription,
            color: eGrade.color,
            badgeColor: eGrade.badgeColor
        };
    }
    
    /**
     * Calculate final grade from mid-term and end-term scores
     * @param {number} midTerm - Mid-term score
     * @param {number} endTerm - End-term score
     * @returns {Object} Final grade object
     */
    calculateFinalGrade(midTerm, endTerm) {
        const midTermWeighted = midTerm * this.markingWeights.midTerm;
        const endTermWeighted = endTerm * this.markingWeights.endTerm;
        const finalScore = Math.round(midTermWeighted + endTermWeighted);
        return this.calculateGrade(finalScore);
    }
    
    /**
     * Get all grades for display purposes
     * @returns {Array} Array of grade objects
     */
    getAllGrades() {
        return Object.entries(this.gradingScale).map(([grade, data]) => ({
            grade,
            ...data
        }));
    }
    
    /**
     * Get grade range string for display
     * @param {string} grade - Grade letter (A, B, C, D, E)
     * @returns {string} Range string (e.g., "80–100%")
     */
    getGradeRange(grade) {
        const gradeData = this.gradingScale[grade];
        if (!gradeData) return 'N/A';
        
        if (grade === 'E') {
            return 'Below 40%';
        }
        return `${gradeData.min}–${gradeData.max}%`;
    }
    
    /**
     * Get HTML for grade badge
     * @param {string} grade - Grade letter
     * @returns {string} HTML badge element
     */
    getGradeBadge(grade) {
        const gradeData = this.gradingScale[grade];
        if (!gradeData) return `<span class="badge bg-secondary">${grade}</span>`;
        
        return `<span class="badge bg-${gradeData.badgeColor}">${grade}</span>`;
    }
    
    /**
     * Validate if a score is within valid range
     * @param {number} score - Score to validate
     * @returns {boolean} True if valid
     */
    isValidScore(score) {
        return typeof score === 'number' && score >= 0 && score <= 100;
    }
    
    /**
     * Get grade distribution data for charts
     * @param {Array} scores - Array of scores
     * @returns {Object} Grade distribution counts
     */
    getGradeDistribution(scores) {
        const distribution = { A: 0, B: 0, C: 0, D: 0, E: 0 };
        
        scores.forEach(score => {
            const gradeObj = this.calculateGrade(score);
            distribution[gradeObj.grade]++;
        });
        
        return distribution;
    }
}

// Create global instance
window.GradingSystem = new GradingSystem();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GradingSystem;
}
