const { CosmosClient } = require('@azure/cosmos');

class CosmosDBService {
  constructor() {
    this.endpoint = process.env.COSMOS_ENDPOINT;
    this.key = process.env.COSMOS_KEY;
    this.databaseId = process.env.COSMOS_DATABASE || 'fortuity-lab';
    
    // Only initialize if not in demo mode
    if (this.endpoint && this.endpoint !== 'demo') {
      this.client = new CosmosClient({ endpoint: this.endpoint, key: this.key });
      this.database = null;
      this.containers = {};
    }
  }

  async initialize() {
    if (!this.client) {
      console.log('📦 Running in DEMO mode - using in-memory storage');
      return;
    }

    try {
      console.log('🌩️  Connecting to Azure Cosmos DB...');
      
      // Create database if it doesn't exist
      const { database } = await this.client.databases.createIfNotExists({
        id: this.databaseId
      });
      this.database = database;

      // Create containers
      const containerDefinitions = [
        {
          id: 'users',
          partitionKey: { paths: ['/id'] }
        },
        {
          id: 'cases',
          partitionKey: { paths: ['/id'] }
        },
        {
          id: 'samples',
          partitionKey: { paths: ['/patientId'] }
        },
        {
          id: 'witnessing-events',
          partitionKey: { paths: ['/sampleId'] }
        },
        {
          id: 'patients',
          partitionKey: { paths: ['/id'] }
        },
        {
          id: 'audit-log',
          partitionKey: { paths: ['/sampleId'] }
        }
      ];

      for (const def of containerDefinitions) {
        const { container } = await database.containers.createIfNotExists(def);
        this.containers[def.id] = container;
        console.log(`✅ Container ready: ${def.id}`);
      }

      console.log('🎉 Cosmos DB initialized successfully!');
    } catch (error) {
      console.error('❌ Cosmos DB initialization error:', error.message);
      throw error;
    }
  }

  async createItem(containerName, item) {
    if (!this.containers[containerName]) {
      throw new Error(`Container ${containerName} not found`);
    }
    const { resource } = await this.containers[containerName].items.create(item);
    return resource;
  }

  async getItem(containerName, id, partitionKey) {
    if (!this.containers[containerName]) {
      throw new Error(`Container ${containerName} not found`);
    }
    const { resource } = await this.containers[containerName].item(id, partitionKey).read();
    return resource;
  }

  async queryItems(containerName, query, parameters = []) {
    if (!this.containers[containerName]) {
      throw new Error(`Container ${containerName} not found`);
    }
    const { resources } = await this.containers[containerName].items
      .query({ query, parameters })
      .fetchAll();
    return resources;
  }

  async updateItem(containerName, id, partitionKey, updates) {
    if (!this.containers[containerName]) {
      throw new Error(`Container ${containerName} not found`);
    }
    const { resource: item } = await this.containers[containerName].item(id, partitionKey).read();
    const updatedItem = { ...item, ...updates };
    const { resource } = await this.containers[containerName].item(id, partitionKey).replace(updatedItem);
    return resource;
  }

  async deleteItem(containerName, id, partitionKey) {
    if (!this.containers[containerName]) {
      throw new Error(`Container ${containerName} not found`);
    }
    await this.containers[containerName].item(id, partitionKey).delete();
  }
}

module.exports = CosmosDBService;