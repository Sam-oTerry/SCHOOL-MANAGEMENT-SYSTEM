# Uniform Components Documentation

This document explains how to use the uniform sidebar and header components across all user roles in the School Management System.

## Overview

The uniform components provide a consistent look and feel across all user interfaces while maintaining role-specific functionality. This ensures a professional and cohesive user experience.

## Components

### 1. Sidebar Component (`assets/js/components/sidebar.js`)

The sidebar component generates a consistent navigation menu for all user roles.

#### Usage

```javascript
// Generate sidebar for a specific role
const sidebarHTML = generateSidebar('subject-teacher', 'dashboard.html');
document.getElementById('sidebar-container').innerHTML = sidebarHTML;
```

#### Parameters

- `userRole` (string): The user role (e.g., 'subject-teacher', 'class-teacher', 'hod', 'bursar', 'dos', 'head-teacher', 'system-admin')
- `currentPage` (string): The current page filename to mark as active

#### Features

- **Role-specific navigation**: Each role has its own set of navigation links
- **Active page highlighting**: Current page is highlighted in the sidebar
- **Responsive design**: Sidebar collapses on mobile devices
- **Consistent styling**: Uniform appearance across all roles
- **Logout functionality**: Built-in logout button

### 2. Header Component (`assets/js/components/sidebar.js`)

The header component generates a consistent page header for all user roles.

#### Usage

```javascript
// Generate header for a specific role
const headerHTML = generateHeader('subject-teacher', 'Dashboard');
document.getElementById('header-container').innerHTML = headerHTML;
```

#### Parameters

- `userRole` (string): The user role
- `pageTitle` (string): The title of the current page

#### Features

- **Role badge**: Displays the user's role with appropriate color coding
- **User information**: Shows current user name
- **Responsive design**: Adapts to different screen sizes
- **Consistent styling**: Uniform appearance across all roles

### 3. CSS Components

#### Header Styles (`assets/css/components/header.css`)

Provides consistent header styling including:
- Role badge colors
- Responsive design
- Typography consistency

#### Sidebar Styles (`assets/css/components/sidebar.css`)

Provides consistent sidebar styling including:
- Navigation link styling
- Hover effects
- Active state highlighting
- Mobile responsiveness

## Implementation Guide

### Step 1: Include Required Files

In your HTML file, include the necessary CSS and JavaScript files:

```html
<link href="../css/main.css" rel="stylesheet">
<link href="../css/users/[role].css" rel="stylesheet">
<script src="../js/components/sidebar.js"></script>
```

### Step 2: Create HTML Structure

```html
<div class="container-fluid">
    <div class="row">
        <!-- Sidebar container -->
        <div id="sidebar-container"></div>
        
        <!-- Main content -->
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
            <!-- Header container -->
            <div id="header-container"></div>
            
            <!-- Your page content goes here -->
        </main>
    </div>
</div>
```

### Step 3: Initialize Components

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const USER_ROLE = 'subject-teacher';
    const CURRENT_PAGE = 'dashboard.html';
    const PAGE_TITLE = 'Dashboard';
    
    // Generate components
    document.getElementById('sidebar-container').innerHTML = generateSidebar(USER_ROLE, CURRENT_PAGE);
    document.getElementById('header-container').innerHTML = generateHeader(USER_ROLE, PAGE_TITLE);
    
    // Initialize page-specific functionality
    initializePage();
});
```

## Role Configuration

Each user role has its own navigation configuration:

### Subject Teacher
- Dashboard
- My Subjects
- Grade Entry
- Student Lists
- Project Work
- Results Analysis
- Announcements
- Timetable

### Class Teacher
- Dashboard
- My Subjects
- Student Management
- Grade Entry
- Report Cards
- Class Performance
- Announcements

### Head of Department (HOD)
- Dashboard
- My Teachers
- Teacher Assignment
- Department Performance
- Results Approval
- Department Analytics
- Announcements

### Bursar
- Dashboard
- Financial Dashboard
- Fee Collection
- Receipt Management
- Financial Reports
- Transaction Tracking
- Payment Analysis
- Staff Management
- Payment Upload

### Director of Studies (DOS)
- Dashboard
- My Subjects
- Academic Progress
- Report Cards
- Announcements
- Timetable
- Academic Calendar
- Student IDs

### Head Teacher
- Dashboard
- My Subjects
- Staff Management
- Report Cards
- School Fees
- Bursaries
- Announcements

### System Administrator
- System Dashboard
- User Management
- Announcements
- Academic Calendar
- Student Management
- Staff Management
- System Settings
- Term Management

## Mobile Responsiveness

The components are fully responsive and include:

- **Mobile sidebar**: Collapsible sidebar for mobile devices
- **Touch-friendly**: Large touch targets for mobile users
- **Responsive typography**: Text scales appropriately
- **Mobile navigation**: Easy navigation on small screens

## Customization

### Adding New Navigation Links

To add new navigation links for a specific role, modify the `roleConfig` object in `sidebar.js`:

```javascript
const roleConfig = {
    'your-role': {
        title: 'Your Role',
        staffId: 'YR1234',
        links: [
            { icon: 'fas fa-icon', text: 'Link Text', href: 'link.html' },
            // Add more links here
        ]
    }
};
```

### Customizing Colors

Modify the CSS variables in `main.css` to change the color scheme:

```css
:root {
    --primary: #your-color;
    --secondary: #your-color;
    --accent: #your-color;
}
```

## Best Practices

1. **Consistent naming**: Use consistent naming conventions for page files
2. **Role-specific CSS**: Create role-specific CSS files for custom styling
3. **Mobile-first**: Design for mobile devices first, then enhance for desktop
4. **Accessibility**: Ensure all components are accessible
5. **Performance**: Minimize JavaScript and CSS for better performance

## Troubleshooting

### Common Issues

1. **Sidebar not showing**: Check if the sidebar container exists and JavaScript is loaded
2. **Active page not highlighted**: Ensure the current page filename matches exactly
3. **Mobile sidebar not working**: Check if the toggle functions are properly implemented
4. **Styling issues**: Ensure all CSS files are properly linked

### Debug Tips

1. Check browser console for JavaScript errors
2. Verify that all required files are loaded
3. Test on different screen sizes
4. Validate HTML structure

## Support

For issues or questions regarding the uniform components, please refer to the main documentation or contact the development team.
