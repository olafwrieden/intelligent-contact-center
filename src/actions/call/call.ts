"use server";

import { callAutomationClient } from "@/lib/acs";
import {
  CallLocator,
  FileSource,
  KnownCallRejectReason,
  PlayOptions,
  RejectCallOptions,
  StartRecordingOptions,
} from "@azure/communication-call-automation";

export const hold = async (callId: string) => {
  console.log("putting call on hold", callId);
  const playOptions: PlayOptions = {
    operationContext: "ConnectAgent",
    loop: true,
  };
  const playSource: FileSource = {
    url: process.env.HOLD_MUSIC_URL as string,
    kind: "fileSource",
  };

  const callProps = await callAutomationClient
    .getCallConnection(callId)
    .getCallConnectionProperties();

  // Get the agent from the call
  const agent = callProps.answeredby?.communicationUserId;
  if (!agent) {
    throw new Error("Agent not found");
  }

  // Mute the agent
  await callAutomationClient
    .getCallConnection(callId)
    .muteParticipant({ communicationUserId: agent });

  // Play hold music to the caller
  callAutomationClient
    .getCallConnection(callId)
    .getCallMedia()
    .playToAll([playSource], playOptions);
};

export const resume = async (callId: string) => {
  console.log("resuming call", callId);
  const callProps = await callAutomationClient
    .getCallConnection(callId)
    .getCallConnectionProperties();

  // Get the agent from the call
  const agent = callProps.answeredby?.communicationUserId;
  if (!agent) {
    throw new Error("Agent not found");
  }

  // TODO: Figure out how to unmute agent
  // Unmute the agent
  // await callAutomationClient
  //   .getCallConnection(callId)
  //   .muteParticipant(agent);

  // Stop playing hold music
  callAutomationClient
    .getCallConnection(callId)
    .getCallMedia()
    .cancelAllOperations();
};

export const end = async (callId: string) => {
  console.log("ending call", callId);
  const call = callAutomationClient.getCallConnection(callId);
  await call.hangUp(true);
};

export const startRecording = async (serverCallId: string) => {
  console.log("starting recording", serverCallId);
  const callRecording = callAutomationClient.getCallRecording();

  const locator: CallLocator = { id: serverCallId, kind: "groupCallLocator" };
  const options: StartRecordingOptions = {
    callLocator: locator,
    recordingFormat: "wav",
    recordingContent: "audio",
    recordingChannel: "unmixed",
    recordingStorage: {
      recordingStorageKind: "azureBlobStorage",
      recordingDestinationContainerUrl: process.env.RECORDING_STORAGE_URL,
    },
    // TODO: Add channel ordering
  };
  const recordingRequest = await callRecording.start(options);
  return recordingRequest.recordingId;
};

export const pauseRecording = async (recordingId: string) => {
  console.log("pausing recording", recordingId);
  const callRecording = callAutomationClient.getCallRecording();
  await callRecording.pause(recordingId);
};

export const resumeRecording = async (recordingId: string) => {
  console.log("resuming recording", recordingId);
  const callRecording = callAutomationClient.getCallRecording();
  await callRecording.resume(recordingId);
};

export const stopRecording = async (recordingId: string) => {
  console.log("stopping recording", recordingId);
  const callRecording = callAutomationClient.getCallRecording();
  await callRecording.stop(recordingId);
};
