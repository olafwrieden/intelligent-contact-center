namespace NodeJS {
  interface ProcessEnv {
    /** The name of your company. */
    NEXT_PUBLIC_COMPANY_NAME: string;
    /** A short tagline/slogan of your company. */
    NEXT_PUBLIC_COMPANY_TAGLINE: string;
    /** The public phone number customers can call. */
    NEXT_PUBLIC_COMPANY_PHONE: string;
    /** The URL of your company website. (ie. https://example.com) */
    NEXT_PUBLIC_COMPANY_WEBSITE: string;
    /** The public email address customers can contact. (ie. support@example.com) */
    NEXT_PUBLIC_COMPANY_EMAIL: string;
    /** A the address of your company. */
    NEXT_PUBLIC_COMPANY_ADDRESS: string;
    /** Context about your company and its operating environment (for AI's use). */
    NEXT_PUBLIC_COMPANY_CONTEXT: string;

    /** Endpoint of your Azure OpenAI instance. */
    AZURE_OPENAI_ENDPOINT: string;
    /** API key of your Azure OpenAI instance. */
    AZURE_OPENAI_API_KEY: string;
    /** Deployment name of your GPT model. */
    AZURE_OPENAI_DEPLOYMENT: string;

    /** Endpoint of your Azure AI multi-service account. */
    AI_SERVICES_ENDPOINT: string;
    /** API key of your Azure AI multi-service account. */
    AI_SERVICES_API_KEY: string;

    /** Endpoint of your Azure Communication Service instance. */
    ACS_ENDPOINT: string;
    /** API key of your Azure Communication Service instance. */
    ACS_API_KEY: string;

    /** Contact Center Service Principal Client ID. */
    AZURE_CLIENT_ID: string;
    /** Your Azure Tenant ID. */
    AZURE_TENANT_ID: string;
    /** Contact Center Service Principal Client Secret. */
    AZURE_CLIENT_SECRET: string;

    /** Contact Center GitHub Client ID */
    AUTH_GITHUB_ID:string
    /** Contact Center GitHub Client Secret */
    AUTH_GITHUB_SECRET:string

    /** Random secret for cookie and JWT encryption. */
    AUTH_SECRET: string;

    /** Database connection string. */
    DATABASE_URL: string;

    /** The endpoint URL which receives ACS callbacks. */
    CALLBACK_URI: string;

    /** Azure Web PubSub Endpoint. */
    AZURE_WEB_PUBSUB_ENDPOINT: string;
    /** Azure Web PubSub hub name. */
    AZURE_WEB_PUBSUB_HUB: string;

    /** The URL of the hold music to play to customers. */
    HOLD_MUSIC_URL: string;
    /** The URL of the storage location where recordings will be stored. */
    RECORDING_STORAGE_URL: string;
  }
}
