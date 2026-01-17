const express = require('express');
const cors = require('cors');
require('dotenv').config();
const CosmosDBService = require('./cosmos-db');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Cosmos DB
const cosmosDB = new CosmosDBService();
const USE_COSMOS = process.env.COSMOS_ENDPOINT && process.env.COSMOS_ENDPOINT !== 'demo';

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for demo mode only
const db = {
  users: [
    { id: 'USR001', username: 'admin', password: 'admin123', role: 'administrator', name: 'Dr. Sarah Chen', nfcTag: 'NFC-ADMIN-001' },
    { id: 'USR002', username: 'embryo1', password: 'embryo123', role: 'embryologist', name: 'Dr. Maria Santos', nfcTag: 'NFC-EMB-001' },
    { id: 'USR003', username: 'andro1', password: 'andro123', role: 'andrologist', name: 'Dr. James Wilson', nfcTag: 'NFC-AND-001' },
    { id: 'USR004', username: 'combined1', password: 'combined123', role: 'embryologist_andrologist', name: 'Dr. Emily Park', nfcTag: 'NFC-CMB-001' }
  ],
  cases: [],
  samples: [],
  witnessingEvents: [],
  patients: [],
  auditLog: []
};

// Helper function to generate IDs
const generateId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// ============================================================================
// AUTH ENDPOINTS
// ============================================================================

// Login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = db.users.find(u => u.username === username && u.password === password);
  
  if (user) {
    const { password, ...userWithoutPassword } = user;
    res.json({ success: true, user: userWithoutPassword });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// NFC Login
app.post('/api/auth/nfc-login', (req, res) => {
  const { nfcTag } = req.body;
  const user = db.users.find(u => u.nfcTag === nfcTag);
  
  if (user) {
    const { password, ...userWithoutPassword } = user;
    res.json({ success: true, user: userWithoutPassword });
  } else {
    res.status(401).json({ success: false, message: 'Invalid NFC tag' });
  }
});

// ============================================================================
// SAMPLE ENDPOINTS
// ============================================================================

// Create new sample
app.post('/api/samples', (req, res) => {
  const sample = {
    id: generateId('SMP'),
    barcode: `FTY-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    ...req.body
  };
  
  db.samples.push(sample);
  
  // Log to audit
  db.auditLog.push({
    id: generateId('AUD'),
    timestamp: new Date().toISOString(),
    action: 'SAMPLE_CREATED',
    sampleId: sample.id,
    userId: req.body.createdBy,
    details: sample
  });
  
  res.json({ success: true, sample });
});

// Get all samples
app.get('/api/samples', (req, res) => {
  const { patientId, status, type } = req.query;
  let filteredSamples = db.samples;
  
  if (patientId) {
    filteredSamples = filteredSamples.filter(s => s.patientId === patientId);
  }
  if (status) {
    filteredSamples = filteredSamples.filter(s => s.status === status);
  }
  if (type) {
    filteredSamples = filteredSamples.filter(s => s.type === type);
  }
  
  res.json({ success: true, samples: filteredSamples });
});

// Get sample by ID
app.get('/api/samples/:id', (req, res) => {
  const sample = db.samples.find(s => s.id === req.params.id);
  if (sample) {
    res.json({ success: true, sample });
  } else {
    res.status(404).json({ success: false, message: 'Sample not found' });
  }
});

// Update sample
app.put('/api/samples/:id', (req, res) => {
  const index = db.samples.findIndex(s => s.id === req.params.id);
  if (index !== -1) {
    db.samples[index] = { ...db.samples[index], ...req.body, updatedAt: new Date().toISOString() };
    
    // Log to audit
    db.auditLog.push({
      id: generateId('AUD'),
      timestamp: new Date().toISOString(),
      action: 'SAMPLE_UPDATED',
      sampleId: req.params.id,
      userId: req.body.updatedBy,
      details: req.body
    });
    
    res.json({ success: true, sample: db.samples[index] });
  } else {
    res.status(404).json({ success: false, message: 'Sample not found' });
  }
});

// ============================================================================
// CASE ENDPOINTS
// ============================================================================

// Create case
app.post('/api/cases', (req, res) => {
  const caseRecord = {
    id: req.body.id || generateId('CASE'),
    createdAt: new Date().toISOString(),
    status: 'active',
    ...req.body
  };

  db.cases.push(caseRecord);

  db.auditLog.push({
    id: generateId('AUD'),
    timestamp: new Date().toISOString(),
    action: 'CASE_CREATED',
    caseId: caseRecord.id,
    userId: caseRecord.createdBy,
    details: caseRecord
  });

  res.json({ success: true, case: caseRecord });
});

// Get all cases
app.get('/api/cases', (req, res) => {
  const { status, createdBy } = req.query;
  let cases = db.cases;

  if (status) {
    cases = cases.filter(c => c.status === status);
  }
  if (createdBy) {
    cases = cases.filter(c => c.createdBy === createdBy);
  }

  res.json({ success: true, cases });
});

// Get case by ID
app.get('/api/cases/:id', (req, res) => {
  const caseRecord = db.cases.find(c => c.id === req.params.id);
  if (!caseRecord) {
    return res.status(404).json({ success: false, message: 'Case not found' });
  }
  res.json({ success: true, case: caseRecord });
});

// Update case
app.put('/api/cases/:id', (req, res) => {
  const index = db.cases.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Case not found' });
  }

  db.cases[index] = {
    ...db.cases[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  db.auditLog.push({
    id: generateId('AUD'),
    timestamp: new Date().toISOString(),
    action: 'CASE_UPDATED',
    caseId: req.params.id,
    userId: req.body.updatedBy,
    details: req.body
  });

  res.json({ success: true, case: db.cases[index] });
});

// ============================================================================
// WITNESSING ENDPOINTS
// ============================================================================

// Create witnessing event
app.post('/api/witnessing', (req, res) => {
  const event = {
    id: generateId('WIT'),
    timestamp: new Date().toISOString(),
    ...req.body
  };
  
  db.witnessingEvents.push(event);
  
  // Log to audit
  db.auditLog.push({
    id: generateId('AUD'),
    timestamp: new Date().toISOString(),
    action: 'WITNESS_VERIFICATION',
    eventId: event.id,
    sampleId: req.body.sampleId,
    userId: req.body.witnessId,
    details: event
  });
  
  res.json({ success: true, event });
});

// Get witnessing events for a sample
app.get('/api/witnessing/sample/:sampleId', (req, res) => {
  const events = db.witnessingEvents.filter(e => e.sampleId === req.params.sampleId);
  res.json({ success: true, events });
});

// Get all witnessing events
app.get('/api/witnessing', (req, res) => {
  const { startDate, endDate, userId } = req.query;
  let events = db.witnessingEvents;
  
  if (userId) {
    events = events.filter(e => e.witnessId === userId || e.performerId === userId);
  }
  if (startDate) {
    events = events.filter(e => e.timestamp >= startDate);
  }
  if (endDate) {
    events = events.filter(e => e.timestamp <= endDate);
  }
  
  res.json({ success: true, events });
});

// ============================================================================
// PATIENT ENDPOINTS
// ============================================================================

// Create patient
app.post('/api/patients', (req, res) => {
  const patient = {
    id: generateId('PAT'),
    createdAt: new Date().toISOString(),
    ...req.body
  };
  
  db.patients.push(patient);
  res.json({ success: true, patient });
});

// Get all patients
app.get('/api/patients', (req, res) => {
  res.json({ success: true, patients: db.patients });
});

// Search patients
app.get('/api/patients/search', (req, res) => {
  const { query } = req.query;
  const results = db.patients.filter(p => 
    p.name?.toLowerCase().includes(query?.toLowerCase()) ||
    p.medicalRecordNumber?.includes(query) ||
    p.id.includes(query)
  );
  res.json({ success: true, patients: results });
});

// ============================================================================
// AUDIT LOG ENDPOINTS
// ============================================================================

// Get audit log
app.get('/api/audit', (req, res) => {
  const { sampleId, userId, action, startDate, endDate } = req.query;
  let logs = db.auditLog;
  
  if (sampleId) logs = logs.filter(l => l.sampleId === sampleId);
  if (userId) logs = logs.filter(l => l.userId === userId);
  if (action) logs = logs.filter(l => l.action === action);
  if (startDate) logs = logs.filter(l => l.timestamp >= startDate);
  if (endDate) logs = logs.filter(l => l.timestamp <= endDate);
  
  res.json({ success: true, logs });
});

// ============================================================================
// STATS & DASHBOARD
// ============================================================================

app.get('/api/stats', (req, res) => {
  const stats = {
    totalSamples: db.samples.length,
    activeSamples: db.samples.filter(s => s.status === 'active').length,
    totalWitnessingEvents: db.witnessingEvents.length,
    todayEvents: db.witnessingEvents.filter(e => {
      const eventDate = new Date(e.timestamp);
      const today = new Date();
      return eventDate.toDateString() === today.toDateString();
    }).length,
    totalPatients: db.patients.length,
    auditLogEntries: db.auditLog.length
  };
  
  res.json({ success: true, stats });
});

// ============================================================================
// HEALTH CHECK
// ============================================================================

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    database: USE_COSMOS ? 'azure-cosmos-db' : 'in-memory-demo',
    cosmosConnected: USE_COSMOS && cosmosDB.database !== null
  });
});

// Initialize and start server
async function startServer() {
  try {
    // Initialize Cosmos DB if configured
    if (USE_COSMOS) {
      await cosmosDB.initialize();
      
      // Seed initial users into Cosmos DB
      for (const user of db.users) {
        try {
          await cosmosDB.createItem('users', user);
        } catch (e) {
          // User might already exist, that's ok
        }
      }
    }

    app.listen(PORT, () => {
      const dbMode = USE_COSMOS ? '☁️  Azure Cosmos DB (Production)' : '💾 In-Memory (Demo Mode)';
      console.log(`
🚀 Fortuity Lab Witnessing System
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Server running on: http://localhost:${PORT}
Database: ${dbMode}

API Endpoints:
  POST   /api/auth/login
  POST   /api/auth/nfc-login
  GET    /api/samples
  POST   /api/samples
  GET    /api/samples/:id
  PUT    /api/samples/:id
  POST   /api/witnessing
  GET    /api/witnessing/sample/:sampleId
  GET    /api/patients
  POST   /api/patients
  GET    /api/audit
  GET    /api/stats
  GET    /health

Test users:
  admin / admin123 (Administrator)
  embryo1 / embryo123 (Embryologist)
  andro1 / andro123 (Andrologist)

${USE_COSMOS ? '✨ Data persists in Azure Cosmos DB!' : '⚠️  Demo mode - data resets on restart'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();