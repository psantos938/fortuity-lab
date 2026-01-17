# Fortuity Lab – Azure Deployment Checklist

Please reply with these 4 values so I can run the Azure CLI and deploy everything:
1) Region (example: eastus, westus2)
2) Resource Group name (new or existing?)
3) Webflow domain (for CORS)
4) Auth: demo for now OR Entra ID (B2C/External ID)

---

## Required choices (fill these in)
- **Subscription**: Microsoft Azure (5000) – `8fd52411-8852-4d26-85c5-e26a68f7dd9d`
- **Region**: `eastus2`
- **Resource Group**: `ftyrikng4-rg`
- **Webflow Domain** (for CORS): `https://www.reproductiveamerica.com`
- **Auth**: `demo` (first deploy)

## Azure resources to create
- Resource Group
- Cosmos DB (SQL API)
- Function App (Node.js)
- Storage Account (for Function App)
- Application Insights

## Webflow config snippet
Paste this in Webflow **before** the app script:
```html
<script>
  window.FORTUITY_CONFIG = {
    apiBaseUrl: "https://<your-function-app>.azurewebsites.net",
    functionKey: "<function-key-if-required>",
    emrWebhookUrl: "https://hook.us1.make.com/xxxxx" // optional
  };
</script>
```

## Make.com EMR webhook payload format
Return JSON in this shape:
```json
{
  "patient": {
    "firstName": "Jane",
    "lastName": "Doe",
    "dob": "1990-05-15",
    "mrn": "MRN-1234",
    "sampleType": "sperm_fresh"
  }
}
```

Once you confirm the required choices above, I will run the Azure CLI commands and deploy everything for you.