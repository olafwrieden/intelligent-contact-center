export const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME;
export const COMPANY_TAGLINE = process.env.NEXT_PUBLIC_COMPANY_TAGLINE;
export const COMPANY_CONTEXT = process.env.NEXT_PUBLIC_COMPANY_CONTEXT;
export const COMPANY_PHONE = process.env.NEXT_PUBLIC_COMPANY_PHONE;
export const COMPANY_EMAIL = process.env.NEXT_PUBLIC_COMPANY_EMAIL;
export const COMPANY_WEBSITE = process.env.NEXT_PUBLIC_COMPANY_WEBSITE;
export const COMPANY_ADDRESS = process.env.NEXT_PUBLIC_COMPANY_ADDRESS;

export const SYTEM_MESSAGE = `You are a caller contacting ${COMPANY_NAME} for assistance with a power outage. Please provide your name and address so that we can assist you.`;

export const WELCOME_MESSAGE = `Thank you for calling ${COMPANY_NAME}. All our representatives are currently busy. Please hold the line and we will be with you shortly.`;

export const UNPLANNED_POWER_OUTAGE_CATEGORY = `This common category of calls involves customers reporting an unplanned power outage in their area. Agents need to be able to empathize with the customer's frustration and provide reassurance that the issue will be resolved as quickly as possible.`;
export const UNPLANNED_POWER_OUTAGE_COMMON_RESOLUTIONS = [
  `Acknowledge the customer's frustration and apologize for the inconvenience.`,
  `Assure the customer that the issue is being investigated and that updates will be provided.`,
  `Provide an estimated time for when the issue will be resolved.`,
  `Offer alternative solutions, such as providing updates via SMS or email.`,
];

export const COMPANY_CALL_FLOWS = [
  "We always greet the customer with out first name and sometimes our role",
  "We always ask the customer how we can help them today",
  "We always end calls with a thank you and a goodbye, reminding the customer they can call us at any time",
  "We always ask the customer if they have any other questions before ending the call",
  "We always ask the customer if they have happy to take a short survey at the end of the call",
];

export const CALL_CATEGORIES = [
  {
    id: "1",
    name: "Unplanned Power Outage",
    description: UNPLANNED_POWER_OUTAGE_CATEGORY,
    commonResolutions: UNPLANNED_POWER_OUTAGE_COMMON_RESOLUTIONS,
  },
  {
    id: "2",
    name: "Billing Inquiry",
    description:
      "This category of calls involves customers inquiring about their billing statements or charges. Agents need to be able to explain the charges clearly and provide assistance with any billing issues.",
    commonResolutions: [
      "Explain the charges on the customer's billing statement.",
      "Assist the customer with any billing issues or discrepancies.",
      "Offer payment options or assistance with setting up payment plans.",
      "Provide information on how the customer can access their billing statements online.",
    ],
  },
  {
    id: "3",
    name: "Technical Support",
    description:
      "This category of calls involves customers seeking technical support for their power products or services. Agents need to be able to troubleshoot technical issues and provide solutions to the customer's problems.",
    commonResolutions: [
      "Troubleshoot technical issues with the customer's power products or services.",
      "Provide step-by-step instructions on how to resolve technical issues.",
      "Offer remote assistance or schedule a service appointment if needed.",
      "Follow up with the customer to ensure that the issue has been resolved.",
    ],
  },
  {
    id: "4",
    name: "General Inquiry",
    description:
      "This category of calls involves general inquiries from customers about our products or services. Agents need to be able to provide accurate information and assist customers with their questions.",
    commonResolutions: [
      "Answer the customer's questions about our products or services.",
      "Provide information on pricing, availability, or other details.",
      "Assist the customer with placing an order or scheduling a service appointment.",
      "Offer additional information or resources to help the customer.",
    ],
  },
];

export const INCOMING_CALL_GROUP = "incoming-call";

export type ROLE = "AGENT" | "SUPERVISOR" | "ADMIN";
