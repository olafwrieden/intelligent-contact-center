import { callAutomationClient } from "@/lib/acs";
import {
  AnswerCallOptions,
  CallIntelligenceOptions,
  KnownCallRejectReason,
} from "@azure/communication-call-automation";
import { IncomingCallEvent } from "@azure/communication-calling";
import {
  CommunicationIdentifierModel,
  EventGridDeserializer,
  EventGridEvent,
  SubscriptionValidationEventData,
  isSystemEvent,
} from "@azure/eventgrid";
import { NextRequest, NextResponse } from "next/server";

const allowCalls = true; // Determines if all incoming calls will be rejected

// Accepts incoming calls and routes them accordingly
export async function POST(req: NextRequest) {
  const body = await req.json();

  const eventGridDeserializer = new EventGridDeserializer();

  const events = (await eventGridDeserializer.deserializeEventGridEvents(
    body
  )) as EventGridEvent<SubscriptionValidationEventData | IncomingCallEvent>[];

  const event = events[0];

  // Handle SubscriptionValidation Event
  if (isSystemEvent("Microsoft.EventGrid.SubscriptionValidationEvent", event)) {
    console.log("Received SubscriptionValidation event");
    return NextResponse.json(
      { validationResponse: event.data.validationCode },
      { status: 200 }
    );
  }

  if (isSystemEvent("Microsoft.Communication.RouterWorkerOfferIssued", event)) {
    console.log("Received RouterWorkerOfferIssued event");
    console.log(event.data);
  }

  if (isSystemEvent("Microsoft.Communication.IncomingCall", event)) {
    // Handle IncomingCall Event
    const tempEventData = event.data as any;
    const fromCaller: CommunicationIdentifierModel = tempEventData["from"];
    const incomingCallContext = event.data.incomingCallContext;

    if (!allowCalls) {
      // If the contact center does not allow incoming calls, reject the call
      callAutomationClient.rejectCall(incomingCallContext, {
        callRejectReason: KnownCallRejectReason.Forbidden,
      });
    }

    const fromNumber =
      fromCaller.kind === "phoneNumber"
        ? fromCaller.phoneNumber?.value
        : fromCaller.rawId.split(":")[1];

    const callbackUri = `${process.env.CALLBACK_URI}/api/callbacks/${event.data.serverCallId}?callerId=${fromNumber}`;

    const callIntelligenceOptions: CallIntelligenceOptions = {
      cognitiveServicesEndpoint: process.env.AI_SERVICES_ENDPOINT,
    };

    const answerCallOptions: AnswerCallOptions = {
      callIntelligenceOptions: callIntelligenceOptions,
    };
    await callAutomationClient.answerCall(
      incomingCallContext,
      callbackUri,
      answerCallOptions
    );

    return NextResponse.json({ message: "Hello" }, { status: 200 });
  }

  return NextResponse.json({ message: "Hello" }, { status: 200 });

  // return;
  // try {
  //   // const event = body[0];
  //   const eventData = event[0];
  //   if (event.eventType === "Microsoft.EventGrid.SubscriptionValidationEvent") {
  //     console.log("Received SubscriptionValidation event");
  //     return NextResponse.json(
  //       { validationResponse: eventData.validationCode },
  //       { status: 200 }
  //     );
  //   }

  //   const callerId = eventData.from.rawId.split(":")[1];
  //   const uuid = uuidv4();
  //   const callbackUri = `${process.env.CALLBACK_URI}/api/callbacks/${uuid}?callerId=${callerId}`;
  //   const incomingCallContext = eventData.incomingCallContext;

  //   const callIntelligenceOptions: CallIntelligenceOptions = {
  //     cognitiveServicesEndpoint: process.env.AI_SERVICES_ENDPOINT,
  //   };

  //   const textToPlay = "Hi, how can I help you today?";
  //   const playSource: TextSource = {
  //     text: textToPlay,
  //     voiceName: "en-US-ElizabethNeural",
  //     kind: "textSource",
  //   };
  //   const recognizeOptions: CallMediaRecognizeSpeechOptions = {
  //     endSilenceTimeoutInSeconds: 1,
  //     playPrompt: playSource,
  //     operationContext: "OpenQuestionSpeech",
  //     kind: "callMediaRecognizeSpeechOptions",
  //   };

  //   await callAutomationClient
  //     .getCallConnection(event.callConnectionId)
  //     .getCallMedia()
  //     .startRecognizing([0], recognizeOptions);

  //   const answerCallOptions: AnswerCallOptions = {
  //     callIntelligenceOptions: callIntelligenceOptions,
  //   };
  //   const answerCallResult = await callAutomationClient.answerCall(
  //     incomingCallContext,
  //     callbackUri,
  //     answerCallOptions
  //   );
  // } catch (error) {
  //   console.error("Error during the incoming call event.", error);
  // }
}
