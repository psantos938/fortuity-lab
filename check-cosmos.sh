#!/bin/bash

echo "🔍 Checking Cosmos DB status..."
echo ""

STATUS=$(az cosmosdb show --name fortuityembryology --resource-group fortuity-lab-rg --query provisioningState -o tsv 2>/dev/null)

if [ "$STATUS" = "Succeeded" ]; then
    echo "✅ Cosmos DB is ready!"
    echo ""
    echo "Next steps:"
    echo "  1. Run: npm run setup-cosmos"
    echo "  2. Run: npm start"
    echo ""
elif [ "$STATUS" = "Creating" ]; then
    echo "⏳ Cosmos DB is still creating..."
    echo "   This typically takes 3-5 minutes."
    echo ""
    echo "Run this script again in a minute to check status."
elif [ "$STATUS" = "Failed" ]; then
    echo "❌ Cosmos DB creation failed"
    echo ""
    echo "Check Azure Portal for details:"
    echo "https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.DocumentDb%2FdatabaseAccounts"
else
    echo "❓ Status: $STATUS"
    echo ""
    echo "If empty, Cosmos DB might not exist yet."
fi
