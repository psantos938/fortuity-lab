# Fortuity Lab - Witnessing System

Production-ready embryology lab witnessing system with React frontend and Azure backend.

## 🚀 Quick Start

### Backend (API Server)
```bash
npm install
npm start
```
Server runs on http://localhost:3001

### Frontend (React App)
```bash
cd client
npm install
npm start
```
Frontend runs on http://localhost:3000

## 🎨 Customization

All visual customization is in one place:
- **Theme colors**: `client/src/styles/theme.js`
- **Components**: `client/src/components/`
- **API config**: `client/src/api.js`

### Change Theme Colors
Edit `client/src/styles/theme.js`:
```javascript
colors: {
  primary: {
    400: '#your-color-here',  // Main brand color
    600: '#darker-version',    // Hover states
  }
}
```

### Quick Theme Presets
```javascript
import { themePresets } from './styles/theme';
// Use: medical, modern, nature, or professional
```

## 📦 Project Structure

```
fortuity-witnessing-system/
├── server.js              # Express API server
├── cosmos-db.js           # Azure Cosmos DB service
├── .env                   # Environment config (DO NOT COMMIT)
│
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── LoginScreen.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── StatusBadge.jsx
│   │   ├── styles/
│   │   │   └── theme.js   # 🎨 All colors & styles here
│   │   ├── api.js         # API endpoints
│   │   ├── App.jsx        # Main app component
│   │   └── index.jsx      # React entry point
│   └── public/
│       └── index.html
│
└── docs/
    ├── DEPLOYMENT.md      # Azure deployment guide
    ├── LINKS.md           # All resource links
    └── CUSTOMIZATION.md   # Visual customization guide
```

## 🌐 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed Azure deployment instructions.

## 🔗 Resources

- [Azure Portal](https://portal.azure.com)
- [Cosmos DB Dashboard](LINKS.md)
- [API Documentation](DEPLOYMENT.md)

## 👥 Demo Users

- admin / admin123 (Administrator)
- embryo1 / embryo123 (Embryologist)
- andro1 / andro123 (Andrologist)
