#!/usr/bin/env node

/**
 * Setup script to initialize Cosmos DB and get connection details
 * Run this after creating your Cosmos DB instance in Azure
 */

const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs').promises;
const path = require('path');

const execAsync = promisify(exec);

async function getCosmosDBDetails() {
  console.log('🔍 Fetching Cosmos DB connection details...\n');

  try {
    // Get the endpoint
    const { stdout: endpoint } = await execAsync(
      'az cosmosdb show --name fortuityembryology --resource-group fortuity-lab-rg --query documentEndpoint -o tsv'
    );

    // Get the primary key
    const { stdout: keys } = await execAsync(
      'az cosmosdb keys list --name fortuityembryology --resource-group fortuity-lab-rg -o json'
    );

    const keysJson = JSON.parse(keys);
    const primaryKey = keysJson.primaryMasterKey;

    const envContent = `# Azure Cosmos DB Configuration
COSMOS_ENDPOINT=${endpoint.trim()}
COSMOS_KEY=${primaryKey}
COSMOS_DATABASE=fortuity-lab

# Local Development
PORT=3001
`;

    // Write to .env file
    await fs.writeFile(path.join(__dirname, '.env'), envContent);

    console.log('✅ Cosmos DB details retrieved!');
    console.log('\n📝 Connection details saved to .env file');
    console.log('\n🔐 Cosmos DB Configuration:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Endpoint: ${endpoint.trim()}`);
    console.log(`Database: fortuity-lab`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('✨ Next steps:');
    console.log('  1. Run: npm start');
    console.log('  2. The server will automatically initialize Cosmos DB containers');
    console.log('  3. Your data will now persist in Azure!\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Make sure:');
    console.log('  - You are logged in to Azure CLI (az login)');
    console.log('  - The Cosmos DB account "fortuitylab" exists');
    console.log('  - You have the correct permissions\n');
    process.exit(1);
  }
}

getCosmosDBDetails();
