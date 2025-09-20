# Subject Teacher Module
# This directory contains Subject Teacher specific files and functionality

## Enhanced Features

### Core Functionality
- **Staff ID Generation**: Automatic staff ID generation (ST prefix)
- **Subject Management**: Add and edit marks for assigned subjects
- **Grading System**: New curriculum A-F grading (Mid-term 20%, End-term 80%)
- **Student Lists**: View students for assigned subjects only
- **Project Work**: Add and manage project assignments
- **Results Analysis**: Comprehensive subject performance analysis

### Access Control
- **Read-only Announcements**: View announcements but cannot create/edit
- **Timetable Access**: View teaching schedule and school calendar
- **Multi-class Teaching**: Support for teaching multiple classes and subjects
- **Subject Restrictions**: Can only access subjects assigned by HOD
- **Class Restrictions**: Can only see learners in their assigned classes

## Files
- `README.md` - This documentation
- `my-subjects.html` - Subject management interface
- Additional files will be added as needed

## Usage

The Subject Teacher interface is automatically loaded when a user with the Subject Teacher role logs in. Teachers can:
- Enter marks for their assigned subjects
- View student lists for their classes
- Analyze subject performance
- Manage project work
- View announcements and timetables

## Grading System

The system uses the new curriculum grading system:
- **A**: 90-100% (Excellent)
- **B**: 80-89% (Very Good)
- **C**: 70-79% (Good)
- **D**: 60-69% (Satisfactory)
- **E**: 50-59% (Pass)
- **F**: 0-49% (Fail)

Marks are weighted as:
- Mid-term: 20%
- End-term: 80%

## Access Level
- Subject management for assigned subjects only
- Can enter and manage grades for assigned subjects
- Can track subject performance and analyze results
- Can manage project work and assignments
- Can view student lists for assigned classes
- Read-only access to announcements and timetables
