# 🚀 Quick Start Guide - Fortuity Lab Demo

This guide will help you get the Fortuity Lab Witnessing System demo up and running in minutes!

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## 🎯 Option 1: Simple HTML Demo (Fastest!)

Perfect for a quick look at the system without installing anything extra.

### Step 1: Start the Backend Server

```bash
# Install dependencies (first time only)
npm install

# Start the server
npm start
```

You should see:
```
🚀 Fortuity Lab Witnessing System
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Server running on: http://localhost:3001
Database: 💾 In-Memory (Demo Mode)
```

### Step 2: Open the Demo Page

Simply open `index.html` in your web browser:

```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html

# Or just double-click index.html in your file explorer
```

### Step 3: Try It Out!

1. **Login** with demo credentials:
   - Username: `admin`
   - Password: `admin123`

2. **Create a Sample**:
   - Select sample type (Sperm/Oocytes)
   - Enter patient name
   - Click "Create Sample"

3. **Watch the Stats Update** in real-time!

---

## 🎨 Option 2: Full React Application (Production-Ready)

The complete React frontend with a professional UI.

### Step 1: Start the Backend Server

```bash
# Install backend dependencies (first time only)
npm install

# Start the backend server
npm start
```

Keep this terminal open - the server needs to keep running.

### Step 2: Start the React Frontend

Open a **new terminal** window and run:

```bash
# Navigate to client directory
cd client

# Install frontend dependencies (first time only)
npm install

# Start the React app
npm start
```

The React app will automatically open in your browser at `http://localhost:3000`

### Step 3: Login and Explore

1. **Login** with any demo user:
   - `admin` / `admin123` (Administrator)
   - `embryo1` / `embryo123` (Embryologist)
   - `andro1` / `andro123` (Andrologist)
   - `combined1` / `combined123` (Combined Role)

2. **Explore the Dashboard**:
   - View real-time statistics
   - See recent samples
   - Click "Refresh" to update data

---

## 🔧 Demo Features

### What's Working:
✅ User authentication with role-based access  
✅ Sample creation and tracking  
✅ Automatic barcode generation  
✅ Real-time statistics dashboard  
✅ Audit logging for all actions  
✅ RESTful API with full CRUD operations  
✅ Responsive UI with modern design  

### Demo Limitations:
⚠️ Data is stored in-memory (resets on server restart)  
⚠️ No real database persistence  
⚠️ Simplified authentication (no encryption)  

---

## 🧪 Testing the API Directly

You can test the API endpoints using curl or any HTTP client:

### Check Server Health
```bash
curl http://localhost:3001/health
```

### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Get Statistics
```bash
curl http://localhost:3001/api/stats
```

### Create a Sample
```bash
curl -X POST http://localhost:3001/api/samples \
  -H "Content-Type: application/json" \
  -d '{
    "type": "sperm_fresh",
    "patientName": "Test Patient",
    "patientId": "PAT-001",
    "status": "active",
    "station": "collection",
    "createdBy": "USR001"
  }'
```

### Get All Samples
```bash
curl http://localhost:3001/api/samples
```

---

## 📱 Available API Endpoints

### Authentication
- `POST /api/auth/login` - Username/password login
- `POST /api/auth/nfc-login` - NFC badge authentication

### Samples
- `GET /api/samples` - List all samples
- `POST /api/samples` - Create new sample
- `GET /api/samples/:id` - Get sample details
- `PUT /api/samples/:id` - Update sample

### Cases
- `GET /api/cases` - List all cases
- `POST /api/cases` - Create new case
- `GET /api/cases/:id` - Get case details
- `PUT /api/cases/:id` - Update case

### Witnessing
- `POST /api/witnessing` - Record verification event
- `GET /api/witnessing/sample/:sampleId` - Get sample's witness history
- `GET /api/witnessing` - Get all witnessing events

### Patients
- `GET /api/patients` - List patients
- `POST /api/patients` - Create patient record
- `GET /api/patients/search?query=` - Search patients

### Audit & Stats
- `GET /api/audit` - View audit log
- `GET /api/stats` - System statistics
- `GET /health` - Server health check

---

## 🛠️ Troubleshooting

### Backend won't start
**Error:** `Port 3001 already in use`
- **Solution:** Kill the process using port 3001 or change the port:
  ```bash
  PORT=3002 npm start
  ```

### Frontend can't connect to backend
**Error:** `Connection error. Please check if the server is running.`
- **Solution:** Make sure the backend server is running on port 3001
- Check that you see the server startup message in the terminal

### React app won't start
**Error:** `Something is already running on port 3000`
- **Solution:** 
  - Choose 'Y' when asked if you want to run on another port, OR
  - Kill the process using port 3000

### Samples not showing up
- **Solution:** Click the "Refresh" button or reload the page
- Make sure you're logged in

---

## 🎯 Next Steps

### For Production Deployment:

1. **Azure Cosmos DB Setup** - Replace in-memory storage with persistent database
   - See [AZURE-DEPLOYMENT.md](AZURE-DEPLOYMENT.md) for setup instructions

2. **Azure Functions** - Deploy the API as serverless functions
   - Automatic scaling
   - Pay only for what you use

3. **Azure AD B2C** - Add enterprise authentication
   - Multi-factor authentication
   - Single sign-on (SSO)
   - Enhanced security

4. **Additional Features**:
   - Real NFC badge scanning
   - Real-time notifications
   - Power BI dashboards
   - Make.com automation
   - HIPAA compliance features

See [WHATS-NEXT.md](WHATS-NEXT.md) for detailed next steps!

---

## 💡 Need Help?

- Check the [README.md](README.md) for project overview
- Review [CUSTOMIZATION.md](CUSTOMIZATION.md) for branding changes
- See [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- Browse [LINKS.md](LINKS.md) for additional resources

---

## 🎉 You're All Set!

The demo is now running. Explore the features, test the API, and see how the witnessing system works. When you're ready to deploy to production, we'll help you set up Azure resources and add enterprise features!
