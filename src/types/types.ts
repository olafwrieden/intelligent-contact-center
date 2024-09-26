import { Call, CallCategory, Customer, User } from "@prisma/client";
import { Server as SocketIOServer } from 'socket.io';
import { Server as NetServer, Socket } from 'net';
import { NextApiResponse } from "next";
import { AcsRouterJobStatus } from "@azure/eventgrid";

export type CallWithCustomerAgentCategory = Call & { customer?: Customer; agent?: User, category?: CallCategory };

/**
 * **Call Status:**
 * - PendingClassification
 * - Queued
 * - Assigned
 * - Completed
 * - Closed
 * - Cancelled
 * - ClassificationFailed
 * - Created
 * - PendingSchedule
 */
export type CallStatus = AcsRouterJobStatus

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export interface Word {
  text: string;
  offset: number;
  duration: number;
}

export interface TranscriptionData {
  text: string;
  format: string;
  confidence: number;
  offset: number;
  duration: number;
  words: Word[];
  participantRawID: string;
  resultStatus: string;
}

export interface TranscriptionRootObject {
  kind: string;
  transcriptionData: TranscriptionData;
}

export interface CallContextItem {
  summary: string;
  details: string;
}
