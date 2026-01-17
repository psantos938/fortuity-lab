# 🔗 Fortuity Lab - Quick Links & Resources

## 🌩️ Azure Resources

### Your Subscription
- **Name**: Microsoft Azure (5000)
- **ID**: `8fd52411-8852-4d26-85c5-e26a68f7dd9d`
- **Tenant**: Reproductive Centers of America
- **Portal**: https://portal.azure.com

### Resource Group
- **Name**: `fortuity-lab-rg`
- **Location**: East US 2
- **Direct Link**: https://portal.azure.com/#@reproductiveamerica.com/resource/subscriptions/8fd52411-8852-4d26-85c5-e26a68f7dd9d/resourceGroups/fortuity-lab-rg/overview

### Cosmos DB Database
- **Account Name**: `fortuitylab2026`
- **Database**: `fortuity-lab` (auto-created)
- **Location**: East US 2
- **Direct Link**: https://portal.azure.com/#@reproductiveamerica.com/resource/subscriptions/8fd52411-8852-4d26-85c5-e26a68f7dd9d/resourceGroups/fortuity-lab-rg/providers/Microsoft.DocumentDB/databaseAccounts/fortuitylab2026/overview
- **Data Explorer**: https://portal.azure.com/#@reproductiveamerica.com/resource/subscriptions/8fd52411-8852-4d26-85c5-e26a68f7dd9d/resourceGroups/fortuity-lab-rg/providers/Microsoft.DocumentDB/databaseAccounts/fortuitylab2026/dataExplorer

---

## 🧪 Testing & Development

### Local Demo (In-Memory)
- **URL**: http://localhost:3001
- **Demo Interface**: Open `index.html` in browser
- **Start Server**: `npm start` (without Cosmos DB configured)

### Production (Azure Cosmos DB)
- **URL**: http://localhost:3001
- **Configure**: `npm run setup-cosmos`
- **Start Server**: `npm start` (with .env configured)
- **Health Check**: http://localhost:3001/health

### API Endpoints
```
POST   http://localhost:3001/api/auth/login
POST   http://localhost:3001/api/auth/nfc-login
GET    http://localhost:3001/api/samples
POST   http://localhost:3001/api/samples
GET    http://localhost:3001/api/samples/:id
PUT    http://localhost:3001/api/samples/:id
POST   http://localhost:3001/api/witnessing
GET    http://localhost:3001/api/witnessing/sample/:sampleId
GET    http://localhost:3001/api/patients
POST   http://localhost:3001/api/patients
GET    http://localhost:3001/api/audit
GET    http://localhost:3001/api/stats
```

### Test Users
| Username | Password | Role |
|----------|----------|------|
| admin | admin123 | Administrator |
| embryo1 | embryo123 | Embryologist |
| andro1 | andro123 | Andrologist |
| combined1 | combined123 | Embryologist/Andrologist |

---

## 📚 Documentation & Help

### Azure Documentation
- **Cosmos DB**: https://learn.microsoft.com/en-us/azure/cosmos-db/
- **Cosmos DB NoSQL API**: https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/
- **Pricing Calculator**: https://azure.microsoft.com/en-us/pricing/calculator/
- **Cost Management**: https://portal.azure.com/#view/Microsoft_Azure_CostManagement/Menu/~/overview

### Azure CLI References
- **Cosmos DB Commands**: https://learn.microsoft.com/en-us/cli/azure/cosmosdb
- **Resource Groups**: https://learn.microsoft.com/en-us/cli/azure/group
- **Account Management**: https://learn.microsoft.com/en-us/cli/azure/account

### API & SDK Documentation
- **Azure Cosmos DB Node.js SDK**: https://learn.microsoft.com/en-us/javascript/api/overview/azure/cosmos-readme
- **Express.js**: https://expressjs.com/
- **React Documentation**: https://react.dev/

---

## 🔐 Security & Access

### Azure Portal Access
- **Main Portal**: https://portal.azure.com
- **Cost Management**: https://portal.azure.com/#view/Microsoft_Azure_CostManagement/Menu/~/overview
- **Resource Health**: https://portal.azure.com/#view/Microsoft_Azure_Health/AzureHealthBrowseBlade/~/serviceIssues

### Cosmos DB Keys & Connection Strings
**⚠️ Keep these secure! Never commit to Git!**
- View in Portal: https://portal.azure.com/#@reproductiveamerica.com/resource/subscriptions/8fd52411-8852-4d26-85c5-e26a68f7dd9d/resourceGroups/fortuity-lab-rg/providers/Microsoft.DocumentDB/databaseAccounts/fortuitylab2026/keys
- Or run: `az cosmosdb keys list --name fortuitylab2026 --resource-group fortuity-lab-rg`

---

## 🛠️ Management & Monitoring

### Azure Portal Views
- **All Resources**: https://portal.azure.com/#view/HubsExtension/BrowseAll
- **Cosmos DB Accounts**: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.DocumentDb%2FdatabaseAccounts
- **Activity Log**: https://portal.azure.com/#@reproductiveamerica.com/resource/subscriptions/8fd52411-8852-4d26-85c5-e26a68f7dd9d/resourceGroups/fortuity-lab-rg/activitylog
- **Metrics**: https://portal.azure.com/#@reproductiveamerica.com/resource/subscriptions/8fd52411-8852-4d26-85c5-e26a68f7dd9d/resourceGroups/fortuity-lab-rg/providers/Microsoft.DocumentDB/databaseAccounts/fortuitylab2026/metrics

### Monitoring & Alerts
- **Azure Monitor**: https://portal.azure.com/#view/Microsoft_Azure_Monitoring/AzureMonitoringBrowseBlade/~/overview
- **Application Insights** (to be set up): https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview
- **Cosmos DB Insights**: https://portal.azure.com/#@reproductiveamerica.com/resource/subscriptions/8fd52411-8852-4d26-85c5-e26a68f7dd9d/resourceGroups/fortuity-lab-rg/providers/Microsoft.DocumentDB/databaseAccounts/fortuitylab2026/insights

---

## 🚀 Deployment Options

### Option 1: Azure Static Web Apps
- **Docs**: https://learn.microsoft.com/en-us/azure/static-web-apps/
- **Free Tier**: https://azure.microsoft.com/en-us/pricing/details/app-service/static/
- **Getting Started**: https://learn.microsoft.com/en-us/azure/static-web-apps/getting-started

### Option 2: Azure Functions + Webflow
- **Azure Functions**: https://learn.microsoft.com/en-us/azure/azure-functions/
- **Webflow**: https://webflow.com/
- **Webflow Custom Code**: https://university.webflow.com/lesson/custom-code-in-the-head-and-body-tags

### Option 3: Azure App Service
- **App Service**: https://learn.microsoft.com/en-us/azure/app-service/
- **Node.js Deployment**: https://learn.microsoft.com/en-us/azure/app-service/quickstart-nodejs
- **Custom Domains**: https://learn.microsoft.com/en-us/azure/app-service/app-service-web-tutorial-custom-domain

---

## 🔌 Integration Services

### Make.com (Integromat)
- **Dashboard**: https://www.make.com/en/login
- **Webhooks**: https://www.make.com/en/help/tools/webhooks
- **HTTP Module**: https://www.make.com/en/help/apps/http
- **Scenarios**: Create automation workflows for notifications

### Microsoft 365 Integration
- **Power Automate**: https://make.powerautomate.com/
- **Graph API**: https://developer.microsoft.com/en-us/graph
- **Teams Webhooks**: https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook

### Email Services
- **SendGrid (Azure)**: https://azuremarketplace.microsoft.com/en-us/marketplace/apps/sendgrid.sendgrid-azure
- **Azure Communication Services**: https://learn.microsoft.com/en-us/azure/communication-services/

---

## 📊 Analytics & Reporting

### Power BI
- **Power BI Service**: https://app.powerbi.com/
- **Connect to Cosmos DB**: https://learn.microsoft.com/en-us/power-bi/connect-data/desktop-connect-azure-cosmos-db
- **Embedded Analytics**: https://learn.microsoft.com/en-us/power-bi/developer/embedded/

### Azure Synapse Analytics (Advanced)
- **Synapse Link for Cosmos DB**: https://learn.microsoft.com/en-us/azure/cosmos-db/synapse-link
- **Real-time Analytics**: https://learn.microsoft.com/en-us/azure/synapse-analytics/

---

## 🆘 Support & Troubleshooting

### Azure Support
- **Support Portal**: https://portal.azure.com/#view/Microsoft_Azure_Support/HelpAndSupportBlade/~/overview
- **Service Health**: https://portal.azure.com/#view/Microsoft_Azure_Health/AzureHealthBrowseBlade/~/serviceIssues
- **Azure Status**: https://status.azure.com/

### Community & Forums
- **Microsoft Q&A**: https://learn.microsoft.com/en-us/answers/tags/133/azure-cosmos-db
- **Stack Overflow**: https://stackoverflow.com/questions/tagged/azure-cosmosdb
- **Azure Updates**: https://azure.microsoft.com/en-us/updates/

### Check System Status
```bash
# Check Cosmos DB status
./check-cosmos.sh

# List all resources
az resource list --resource-group fortuity-lab-rg --output table

# Check Cosmos DB details
az cosmosdb show --name fortuitylab2026 --resource-group fortuity-lab-rg

# View activity log
az monitor activity-log list --resource-group fortuity-lab-rg --max-events 10
```

---

## 💰 Cost Management

### Pricing Information
- **Cosmos DB Pricing**: https://azure.microsoft.com/en-us/pricing/details/cosmos-db/
- **Current Estimate**: ~$24-50/month for small clinic
  - 400 RU/s provisioned throughput: ~$24/month
  - Storage: $0.25/GB/month
  - Backups: Included

### Cost Optimization
- **Best Practices**: https://learn.microsoft.com/en-us/azure/cosmos-db/optimize-cost
- **Monitoring Costs**: https://portal.azure.com/#view/Microsoft_Azure_CostManagement/Menu/~/overview
- **Set Budgets**: https://portal.azure.com/#view/Microsoft_Azure_CostManagement/Menu/~/budgets

---

## 📱 Future Development

### Mobile App
- **React Native**: https://reactnative.dev/
- **Expo**: https://expo.dev/

### NFC Integration
- **Web NFC API**: https://developer.mozilla.org/en-US/docs/Web/API/Web_NFC_API
- **NFC Card Reader SDK**: Research hardware-specific options

### Barcode/QR Code
- **ZXing**: https://github.com/zxing-js/library
- **QuaggaJS**: https://serratus.github.io/quaggaJS/

---

## 🎯 Quick Commands Reference

```bash
# Check if Cosmos DB is ready
./check-cosmos.sh

# Configure Cosmos DB connection
npm run setup-cosmos

# Start server (auto-detects demo vs production)
npm start

# View all Azure resources
az resource list --resource-group fortuity-lab-rg --output table

# Get Cosmos DB endpoint
az cosmosdb show --name fortuitylab2026 --resource-group fortuity-lab-rg --query documentEndpoint -o tsv

# Get connection keys
az cosmosdb keys list --name fortuitylab2026 --resource-group fortuity-lab-rg

# View activity logs
az monitor activity-log list --resource-group fortuity-lab-rg --max-events 10

# Delete everything (if needed)
az group delete --name fortuity-lab-rg --yes
```

---

## 📞 Contact & Support

- **Organization**: Reproductive Centers of America
- **Domain**: reproductiveamerica.com
- **Azure Subscription**: Microsoft Azure (5000)

---

**Last Updated**: January 16, 2026
**System Version**: 1.0.0
**Database**: Azure Cosmos DB (fortuitylab2026)
**Region**: East US 2
