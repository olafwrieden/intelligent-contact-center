import { callAutomationClient } from "@/lib/acs";
import {
  CALL_CATEGORIES,
  COMPANY_CONTEXT,
  COMPANY_NAME,
  COMPANY_TAGLINE,
  INCOMING_CALL_GROUP,
} from "@/lib/constant";
import { categoriseCall } from "@/lib/openai";
import { CallQueueItem } from "@/lib/pubsub";
import {
  CallMediaRecognizeSpeechOptions,
  PlayOptions,
  TextSource,
  parseCallAutomationEvent,
} from "@azure/communication-call-automation";
import { WebPubSubServiceClient } from "@azure/web-pubsub";
import { NextRequest, NextResponse } from "next/server";

const contactCenter = new WebPubSubServiceClient(
  process.env.AZURE_WEB_PUBSUB_ENDPOINT as string,
  process.env.AZURE_WEB_PUBSUB_HUB as string
);

const CALL_SYSTEM_MESSAGE = `Your are a caller contacting ${COMPANY_NAME} for assistance with a power outage. Make up a ficticious name and address, and storyline around the nature of the Power Outage. You will respond like a real-person in a real-life situation. Don't worry about being perfect, just be yourself and don't delivery a fully polished response. Your call needs to have nuances and imperfections. Start the conversation with your reason for calling and answer/question the operator, the goal is to have a natural conversation.
## Company Context
- Company Name: ${COMPANY_NAME}
- Company Info: ${COMPANY_CONTEXT}

## Scenario Context
${CALL_CATEGORIES[0].description}
`;

// To handle a POST request to /api
export async function POST(req: NextRequest) {
  const body = await req.json();

  const callerId = req.nextUrl.searchParams.get("callerId");
  const payload = body[0];

  const event = parseCallAutomationEvent(payload);
  console.log(`Received callback for: ${event.kind}`);

  // When a call is connected...
  if (event.kind === "CallConnected") {
    const callConnection = callAutomationClient.getCallConnection(
      event.callConnectionId
    );
    const connectionProps = await callConnection.getCallConnectionProperties();

    const play: TextSource = {
      text: `Welcome to ${COMPANY_NAME}, ${COMPANY_TAGLINE}. In a few words, please tell us why you are calling today.`,
      voiceName: "en-AU-NatashaNeural",
      kind: "textSource",
    };
    // const playOptions: PlayOptions = { operationContext: "ConnectAgent" };
    // callAutomationClient
    //   .getCallConnection(event.callConnectionId)
    //   .getCallMedia()
    //   .playToAll([play], playOptions);

    const recognizeOptions: CallMediaRecognizeSpeechOptions = {
      endSilenceTimeoutInSeconds: 3,
      initialSilenceTimeoutInSeconds: 10,
      speechLanguage: "en-AU",
      playPrompt: play,
      operationContext: "OpenQuestionSpeech",
      kind: "callMediaRecognizeSpeechOptions",
    };

    const callerSource = connectionProps.source;
    console.log("call source", callerSource);

    await callConnection
      .getCallMedia()
      .startRecognizing(connectionProps.source!, recognizeOptions);

    // TODO: Implement Call Recording
    // await startRecording(eventData.serverCallId);

    // TODO: Implement IVR
    // await startRecognizing(callMedia, callerId, helloPrompt, "GetFreeFormText");

    contactCenter.group(INCOMING_CALL_GROUP).sendToAll(
      JSON.stringify({
        type: "INCOMING_CALL",
        id: event.callConnectionId,
        number: callerId ? `+${callerId?.trim()}` : "Unavailable",
        name: "Unknown Caller",
        isPriority: true,
        timestamp: new Date(payload.time),
      } satisfies CallQueueItem)
    );
  } else if (event.kind === "CallDisconnected") {
    contactCenter.group(INCOMING_CALL_GROUP).sendToAll(
      JSON.stringify({
        type: "DROPPED_CALL",
        id: event.callConnectionId,
      })
    );
  } else if (event.kind === "RecognizeCompleted") {
    const callConnectionId = event.callConnectionId;

    console.log(event);

    const callMedia = callAutomationClient
      .getCallConnection(callConnectionId)
      .getCallMedia();

    const text = event.speechResult?.speech || null;
    console.log(text);

    const bestCategory = await categoriseCall(text);
    console.log(`Category: ${bestCategory}`);

    if (text) {
      const play: TextSource = {
        text: `Your call has been categorised as: ${bestCategory}. Please wait while we connect you to an agent.`,
        voiceName: "en-AU-NatashaNeural",
        kind: "textSource",
      };
      const playOptions: PlayOptions = { operationContext: "ConnectAgent" };
      callMedia.playToAll([play], playOptions);
    }
  } else if (event.kind === "RecognizeFailed") {
    console.log(`Failed to recognize speech input.`);
    console.log(event);

    const play: TextSource = {
      text: `I'm sorry, I didn't catch that. Please try again.`,
      voiceName: "en-AU-NatashaNeural",
      kind: "textSource",
    };
    const playOptions: PlayOptions = { operationContext: "ConnectAgent" };
    callAutomationClient
      .getCallConnection(event.callConnectionId)
      .getCallMedia()
      .playToAll([play], playOptions);
  }

  return NextResponse.json({ message: "Hello" }, { status: 200 });
}
