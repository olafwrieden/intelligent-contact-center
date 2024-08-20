# Azure Intelligent Contact Center 🤙

![Banner](/media/banner.png)

Welcome to the Intelligent Contact Center Accelerator by [Olaf Wrieden](https://linkedin.com/in/olafwrieden). This accelerator provides a comprehensive set of features to help you build a modern contact center solution using Azure Communication Services. The accelerator is built using Next.js, it can be customized and extended to meet your business requirements.

## Features ✨

The Intelligent Contact Center Accelerator provides the following features:

- **Inbound Call Handling**: Handle incoming calls to your Azure Communication Service phone number.
- **Outbound Call Handling**: Make outbound calls to any phone number.
- **Call Transfer**: Transfer calls to another phone number.
- **Real-Time Call Transcription**: Transcribe calls in real-time.
- **IVR (Interactive Voice Response)**: Greeting and call intent routing.
- **Call Recording**: Record calls and store them in Azure Blob Storage.
- **Call Analytics**: Analyze call data and generate insights.
- **Call Categorization**: Categorize calls based on their intent.
- **Call Queues**: Route incoming calls to agents based on availability/performance.
- **Hold Music**: Play music to callers when they are on hold.
- **Agent Management**: Manage agents and their availability.
- **Customer Management**: Manage customers and their details.
- **Scenario Playbooks**: Guide agents with scenario-specific playbooks.
- **Call Notes**: Add notes to calls for future reference.
- **Call History**: View call history and call details.
- **Post-Call Survey**: Collect feedback from customers after a call.
- **Contact Center Statistics**: View statistics and insights about the contact center.
- **Knowledge Base Search**: Search for information in the knowledge base during the call.
- **Outage Map (Optional, Industry-Specific)**: View a map of outages and their status.

## Deploy to Azure 🚀

Coming Soon...

## Developing / Running Locally 🛠️

To run the project locally, you will need to have the following installed:

- [Node.js](https://nodejs.org/en/)
- [Azure DevTunnel](https://learn.microsoft.com/en-us/azure/developer/dev-tunnels/get-started?tabs=windows#install)

### 1. Start the Application

To start the Next.js Application, run the following commands:

Install the dependencies:

```bash
npm install
```

Start the application:

```bash
npm run dev
```

The application should now be running on [http://localhost:3000](http://localhost:3000). If your application is running on a different port, note the port number for the next step.

### 2. Create a DevTunnel

Now that your application is running locally, you need to route call events from Azure Communication Service to your local port. You can create a DevTunnel (or use alternatives like _ngrok_) that exposes your local application's port to the internet.

Authenticate with DevTunnel:

```bash
devtunnel user login
```

Create a DevTunnel (replace `<port-number>` with the port your local application is running on and ensure that you have the `--allow-anonymous` flag):

```bash
devtunnel host -p <port-number> --allow-anonymous
```

You should see a message that the DevTunnel has been created and a URL that you can use to access your local application.

```bash
...
Connect via browser: https://5oq83752.auc1.devtunnels.ms:3000, .....
...
```

Copy this URL and use it to configure your Azure Communication Service resource. Note that this URL changes every time you create a new DevTunnel.

### 3. Route Call Events to Local Application

To route call events to your local application, you need to configure your Azure Communication Service resource to use the DevTunnel URL.

1. Navigate to your Azure Communication Service resource in the Azure Portal.
2. Click on "Events" tab.
3. Click on "+ Event Subscription".
4. Fill in the required fields:

   - **Name**: A name for your event subscription (e.g. _local-dev_).
   - **Event type**: `Microsoft.Communication.IncomingCall`.
   - **Endpoint type**: `Webhook`.
   - **Endpoint URL**: [YOUR-DEV-TUNNEL-URL]/api/incoming

     ⚠️ **Note:** You need to append `/api/incoming` to the DevTunnel URL to route incoming call events to your local application's API route.

5. Click "Save" and wait for the event subscription to be created.

Now, when you receive a call to your Azure Communication Service phone number, the call event will be routed to your local application.
