// API Configuration
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const api = {
  // Auth endpoints
  login: (credentials) => 
    fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    }),
  
  nfcLogin: (nfcTag) =>
    fetch(`${API_URL}/api/auth/nfc-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nfcTag })
    }),

  // Sample endpoints
  getSamples: () =>
    fetch(`${API_URL}/api/samples`),
  
  createSample: (sampleData) =>
    fetch(`${API_URL}/api/samples`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sampleData)
    }),
  
  getSample: (id) =>
    fetch(`${API_URL}/api/samples/${id}`),
  
  updateSample: (id, updates) =>
    fetch(`${API_URL}/api/samples/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    }),

  // Patient endpoints
  getPatients: () =>
    fetch(`${API_URL}/api/patients`),
  
  createPatient: (patientData) =>
    fetch(`${API_URL}/api/patients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patientData)
    }),

  // Witnessing endpoints
  createWitnessing: (witnessingData) =>
    fetch(`${API_URL}/api/witnessing`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(witnessingData)
    }),
  
  getWitnessingEvents: (sampleId) =>
    fetch(`${API_URL}/api/witnessing/sample/${sampleId}`),

  // Stats endpoint
  getStats: () =>
    fetch(`${API_URL}/api/stats`),

  // Health check
  health: () =>
    fetch(`${API_URL}/health`),
};

export default api;
