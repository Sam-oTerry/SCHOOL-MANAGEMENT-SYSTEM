# School Management System - Backend API

This backend provides API endpoints for generating report cards using Word templates.

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)
- Firebase project with Firestore database

### Installation

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Run setup script:**
   ```bash
   python setup.py
   ```

3. **Install dependencies manually (if needed):**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment:**
   ```bash
   # Copy example configuration
   cp config.env.example .env
   
   # Edit .env with your actual values
   # - Firebase project ID and API key
   ```

5. **Start the server:**
   ```bash
   python app.py
   ```

The API will be available at `http://localhost:5000`

## 📋 API Endpoints

### Health Check
```
GET /api/health
```
Returns API status and timestamp.

### Generate Word Document
```
POST /api/generate-word-report
```
Generates Word document directly from template.

**Request Body:**
```json
{
  "studentId": "student-001",
  "term": "Term 3",
  "className": "S.4"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Word document generated successfully",
  "data": {
    "content": "base64-encoded-document",
    "filename": "Report_Card_John_Doe_Term_3.docx"
  }
}
```

### Batch Generate
```
POST /api/batch-generate
```
Generates report cards for multiple students.

**Request Body:**
```json
{
  "students": ["student-001", "student-002", "student-003"],
  "term": "Term 3",
  "class": "S.4"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Batch processing completed for 3 students",
  "results": [
    {
      "studentId": "student-001",
      "success": true,
      "message": "Report card generated successfully"
    },
    ...
  ]
}
```

### Test Endpoint
```
GET /api/test
```
Test endpoint for development and debugging.

## 🔧 Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=your-secret-key-here

# Firebase Configuration
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_API_KEY=your-firebase-api-key
```

### Firebase Setup

1. **Get Firebase credentials:**
   - Go to Firebase Console
   - Project Settings > Service Accounts
   - Generate new private key
   - Save as `firebase-credentials.json`

2. **Update Firestore rules:**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true; // Adjust based on your security needs
       }
     }
   }
   ```

## 📁 Project Structure

```
backend/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── config.env.example     # Environment configuration template
├── setup.py              # Setup script
├── report_template.docx   # Word template for report cards
├── logs/                 # Log files (created automatically)
├── uploads/              # File uploads (created automatically)
└── temp/                # Temporary files (created automatically)
```

## 🔄 Integration with Frontend

The frontend (`users/dos/report-cards.html`) has been updated to integrate with this backend:

### Functions Available:
- `generateWordDocument()` - Generates Word documents
- `generateBatchReportCards()` - Batch processing

### Buttons Available:
- **Generate PDF** - HTML-to-PDF generation (existing)
- **Generate Word Doc** - Direct Word document generation
- **Batch Generate** - Multiple report cards at once

## 🧪 Testing

### Test the API:
```bash
# Health check
curl http://localhost:5000/api/health

# Test endpoint
curl http://localhost:5000/api/test

# Generate Word document
curl -X POST http://localhost:5000/api/generate-word-report \
  -H "Content-Type: application/json" \
  -d '{"studentId": "test-student", "term": "Term 3", "className": "S.4"}'
```

### Test Frontend Integration:
1. Start the backend server
2. Open `users/dos/report-cards.html`
3. Select a student, term, and class
4. Click "Generate Word Doc" button
5. Check console for API responses

## 🚨 Troubleshooting

### Common Issues:

1. **"Failed to connect to backend API"**
   - Ensure backend server is running on port 5000
   - Check CORS settings in `app.py`

2. **"Student not found"**
   - Check Firebase configuration
   - Verify student ID exists in Firestore
   - Check Firebase API key and project ID

3. **"Template not found"**
   - Ensure `report_template.docx` exists in backend folder
   - Check file permissions

### Debug Mode:
```bash
# Run with debug logging
FLASK_DEBUG=True python app.py
```

## 📚 Dependencies

- **Flask** - Web framework
- **Flask-CORS** - Cross-origin resource sharing
- **python-docx** - Word document processing
- **firebase-admin** - Firebase integration
- **requests** - HTTP client
- **python-dotenv** - Environment variables

## 🔒 Security Notes

- Change default `SECRET_KEY` in production
- Use HTTPS in production
- Implement proper authentication
- Validate all input data
- Use environment variables for sensitive data

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review Flask and Firebase documentation
3. Verify all environment variables are set correctly