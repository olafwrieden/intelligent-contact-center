@description('Location for all resources.')
param location string = resourceGroup().location

@secure()
param authSecretHash string = uniqueString(newGuid())

@description('Storage account for recordings, hold music and other media')
resource storageAccount 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: 'contactcentre'
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    accessTier: 'Hot'
  }
}

@description('PubSub broker for call events')
resource pubSub 'Microsoft.SignalRService/webPubSub@2024-03-01' = {
  name: 'pubsub'
  location: location
  sku: {
    name: 'Standard_S1'
  }
}

@description('AI Service for speech recognition / synthesis')
resource aiService 'Microsoft.CognitiveServices/accounts@2024-04-01-preview' = {
  name: 'cognitive'
  location: location
  sku: {
    name: 'S0'
  }
  kind: 'CognitiveServices'
  properties: {
    apiProperties: {
      statisticsEnabled: false
    }
  }
}

@description('Azure OpenAI Service for natural language understanding')
resource openAi 'Microsoft.CognitiveServices/accounts@2024-04-01-preview' = {
  name: 'openai'
  location: location
  kind: 'OpenAI'
  sku: {
    name: 'S0'
  }

  resource gpt4 'deployments@2024-04-01-preview' = {
    name: 'gpt4'
    properties: {
      model: {
        name: 'gpt-4'
        format: 'openai'
      }
      raiPolicyName: 'Microsoft.Default'
      versionUpgradeOption: 'OnceNewDefaultVersionAvailable'
    }
  }
}

@description('AI Search Service for knowledge base')
resource aiSearch 'Microsoft.Search/searchServices@2024-06-01-preview' = {
  name: 'search'
  location: location
  sku: {
    name: 'standard'
  }
  properties: {
    partitionCount: 1
    semanticSearch: 'standard'
    publicNetworkAccess: 'enabled'
    replicaCount: 1
  }
}

@description('Azure Communication Service for call interactions')
resource communicationService 'Microsoft.Communication/communicationServices@2023-06-01-preview' = {
  name: 'comms'
  location: location
  properties: {
    dataLocation: location
  }
}

@description('Azure Key Vault for secrets and keys')
resource kv 'Microsoft.KeyVault/vaults@2023-07-01' = {
  name: 'keyvault'
  location: location
  properties: {
    sku: {
      family: 'A'
      name: 'standard'
    }
    tenantId: subscription().tenantId
    enableRbacAuthorization: true
    enabledForDeployment: false
    enabledForDiskEncryption: true
    enabledForTemplateDeployment: false
  }

  resource AZURE_OPENAI_API_KEY 'secrets' = {
    name: 'AZURE-OPENAI-API-KEY'
    properties: {
      contentType: 'text/plain'
      value: openAi.listKeys().key1
    }
  }

  resource AI_SERVICES_API_KEY 'secrets' = {
    name: 'AI-SERVICES-API-KEY'
    properties: {
      contentType: 'text/plain'
      value: aiService.listKeys().key1
    }
  }

  resource ACS_API_KEY 'secrets' = {
    name: 'ACS-API-KEY'
    properties: {
      contentType: 'text/plain'
      value: communicationService.listKeys().primaryKey
    }
  }

  resource AZURE_CLIENT_SECRET 'secrets' = {
    name: 'AZURE-CLIENT-SECRET'
    properties: {
      contentType: 'text/plain'
      value: ''
    }
  }

  resource DATABASE_URL 'secrets' = {
    name: 'DATABASE-URL'
    properties: {
      contentType: 'text/plain'
      value: ''
    }
  }

  resource AUTH_SECRET 'secrets' = {
    name: 'AUTH-SECRET'
    properties: {
      contentType: 'text/plain'
      value: authSecretHash
    }
  }
}
