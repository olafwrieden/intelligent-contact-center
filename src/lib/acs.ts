// import JobRouterClient from "@azure-rest/communication-job-router";
import { CallAutomationClient } from "@azure/communication-call-automation";
import { DefaultAzureCredential } from "@azure/identity";

if (!process.env.ACS_ENDPOINT || !process.env.ACS_API_KEY) {
  throw new Error("ACS_ENDPOINT or ACS_API_KEY is not set");
}

const credential = new DefaultAzureCredential();
const endpointUrl = process.env.ACS_ENDPOINT;

// Call Automation Client
export const callAutomationClient = new CallAutomationClient(
  endpointUrl,
  credential,
);


// Job Router Client
// const jobRouterConnectionString = `${process.env.ACS_ENDPOINT};${process.env.ACS_API_KEY}`;
// export const jobRouter = JobRouterClient(jobRouterConnectionString);
