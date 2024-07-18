provider microsoftGraph

var uniqueId = take(uniqueString(resourceGroup().id), 5)

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// PARAMETERS
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

@description('Location for all resources.')
param location string = resourceGroup().location

@secure()
param authSecretHash string = uniqueString(newGuid())

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// RESOURCES
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

resource appRegistration 'Microsoft.Graph/applications@v1.0' = {
  uniqueName: 'contactcenter'
  displayName: 'Intelligent Contact Center'
}

@description('Storage account for recordings, hold music and other media')
resource storageAccount 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: 'contactcenter${uniqueId}'
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    accessTier: 'Hot'
  }
}

@description('Azure Web PubSub broker for call events')
resource pubSub 'Microsoft.SignalRService/webPubSub@2024-03-01' = {
  name: 'contactcenter-pubsub'
  location: location
  sku: {
    name: 'Standard_S1'
  }
  identity: {
    type: 'SystemAssigned'
  }
}

@description('AI Service for speech recognition / synthesis')
resource aiService 'Microsoft.CognitiveServices/accounts@2024-04-01-preview' = {
  name: 'contactcenter-aiservices'
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
  name: 'contactcenter-openai'
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
  name: 'contactcenter-knowledgebase'
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
  name: 'contactcenter-comms'
  location: location
  properties: {
    dataLocation: location
  }
  identity: {
    type: 'SystemAssigned'
  }
}

@description('Built-in Storage Blob Data Contributor role')
resource storageBlobDataContributorRoleDefinition 'Microsoft.Authorization/roleDefinitions@2022-04-01' existing = {
  scope: resourceGroup()
  name: 'ba92f5b4-2d11-453d-a403-e96b0029c9fe'
}

@description('Assign the Storage Blob Data Contributor role to the Communication Service')
resource acsStorageRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(resourceGroup().id, communicationService.name, storageBlobDataContributorRoleDefinition.id)
  properties: {
    roleDefinitionId: storageBlobDataContributorRoleDefinition.id
    principalId: communicationService.identity.principalId
    principalType: 'ServicePrincipal'
  }
}

@description('Azure Key Vault for secrets and keys')
resource kv 'Microsoft.KeyVault/vaults@2023-07-01' = {
  name: 'contactcenter-keyvault'
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
