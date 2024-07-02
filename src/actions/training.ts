import { callAutomationClient } from "@/lib/acs";
import { COMPANY_NAME } from "@/lib/constant";
import {
  CallInvite,
  CreateCallOptions,
} from "@azure/communication-call-automation";
import { v4 } from "uuid";

export type TrainingSession = {
  id: string;
  category: string;
};

export const startNewSession = async () => {
  // make invitation
  const callInvite: CallInvite = {
    targetParticipant: { phoneNumber: "" },
    sourceCallIdNumber: { phoneNumber: "" },
    sourceDisplayName: COMPANY_NAME,
  };

  const options: CreateCallOptions = {
    callIntelligenceOptions: {
      cognitiveServicesEndpoint: process.env.AI_SERVICES_ENDPOINT,
    },
  };
  console.log("Placing outbound call...");

  // callback url to recieve callback events
  const callbackUri = `${process.env.CALLBACK_URI}/api/callbacks/${v4()}`;

  // Place the call
  const call = await callAutomationClient.createCall(
    callInvite,
    callbackUri,
    options
  );
  return call ? true : false;
};

export const endSession = () => {};
