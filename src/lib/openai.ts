import { AzureKeyCredential, OpenAIClient } from "@azure/openai";

if (
  !process.env.AZURE_OPENAI_ENDPOINT ||
  !process.env.AZURE_OPENAI_API_KEY ||
  !process.env.AZURE_OPENAI_DEPLOYMENT
) {
  throw new Error(
    "AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_API_KEY or AZURE_OPENAI_DEPLOYMENT is not set"
  );
}

declare global {
  var client: OpenAIClient | undefined;
}

export const openai =
  globalThis.client ||
  new OpenAIClient(
    process.env.AZURE_OPENAI_ENDPOINT,
    new AzureKeyCredential(process.env.AZURE_OPENAI_API_KEY)
  );

if (process.env.NODE_ENV !== "production") globalThis.client = openai;

export async function getChatCompletions(
  systemPrompt: string,
  userPrompt: string
) {
  const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT || "";
  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ];

  const response = await openai.getChatCompletions(deploymentName, messages);
  const responseContent = response.choices[0]?.message?.content;
  console.log(responseContent);
  return responseContent || "";
}

export async function rewordCallIntent(text: string) {
  const systemMessage =
    'You are tasked with rewording the provided text to make it more professional and concise. You are expected to maintain the orginal meaning of the text. The text should tell the user "You are calling to/about...". Do not include any additional responses.';
  const userPrompt = `Reword the following call intent: ${text}`;

  return await getChatCompletions(systemMessage, userPrompt);
}

export async function categoriseCall(text: string | null) {
  if (!text) return "";

  const systemMessage =
    'Categorise the input call reason into one of the following categories based on closest match. If the call reason does not match any of the categories, select "Other". The categories are: "Power Outage", "Billing", "Technical Support", "General Enquiry", "Other". Respond with only the category name.';
  const userPrompt = `Call Context: ${text}`;

  return await getChatCompletions(systemMessage, userPrompt);
}
