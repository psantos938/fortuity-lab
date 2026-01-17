# 🧪 Fortuity Lab - Embryology Witnessing System

## 🚀 Quick Start Demo

### 1. Install Dependencies
```bash
cd fortuity-witnessing-system
npm install
```

### 2. Start Backend Server
```bash
npm start
```

### 3. Open Demo in Browser
Open `index.html` in your browser, or:
```bash
open index.html
```

---

## 📋 What You'll See

- **Live API Connection** - Backend running on localhost:3001
- **Authentication System** - Test login with demo users
- **Sample Creation** - Create tracked samples (sperm/oocytes)
- **Real-time Stats** - See counts update live
- **Audit Trail** - Every action is logged

---

## 🧑‍⚕️ Demo Users

| Username | Password | Role |
|----------|----------|------|
| admin | admin123 | Administrator |
| embryo1 | embryo123 | Embryologist |
| andro1 | andro123 | Andrologist |
| combined1 | combined123 | Both |

---

## 🔌 API Endpoints Available

### Authentication
- `POST /api/auth/login` - Username/password login
- `POST /api/auth/nfc-login` - NFC badge authentication

### Samples
- `GET /api/samples` - List all samples
- `POST /api/samples` - Create new sample
- `GET /api/samples/:id` - Get sample details
- `PUT /api/samples/:id` - Update sample

### Witnessing
- `POST /api/witnessing` - Record verification event
- `GET /api/witnessing/sample/:sampleId` - Get sample's witness history

### Patients
- `GET /api/patients` - List patients
- `POST /api/patients` - Create patient record
- `GET /api/patients/search?query=` - Search patients

### Audit & Stats
- `GET /api/audit` - View audit log
- `GET /api/stats` - System statistics

---

## 🌩️ Next: Deploy to Azure

After testing the demo, we'll deploy:

1. **Azure Cosmos DB** - Replace in-memory storage
2. **Azure Functions** - Serverless API deployment
3. **Azure AD B2C** - Real authentication
4. **Webflow Integration** - Embed your app
5. **Make.com Webhooks** - Automation triggers

---

## 🔧 Current Setup

- **Database**: In-memory (demo only)
- **Auth**: Simple username/password
- **Storage**: Resets on server restart

---

## 📱 Features Demonstrated

✅ User authentication  
✅ Sample creation & tracking  
✅ Barcode generation  
✅ Audit logging  
✅ Real-time stats  
✅ RESTful API structure  

---

## 🎯 What's Missing (Will Add in Production)

- [ ] Azure Cosmos DB persistence
- [ ] Azure AD B2C authentication
- [ ] NFC badge scanning
- [ ] Real-time notifications
- [ ] Make.com webhooks
- [ ] Power BI dashboards
- [ ] HIPAA compliance features
- [ ] Multi-clinic support

---

## 💡 Ready to Deploy?

Once you verify the demo works, I'll help you:
1. Set up Azure resources
2. Configure Cosmos DB
3. Deploy Functions
4. Integrate with Webflow
5. Connect Make.com automation

Let me know when you're ready! 🚀
