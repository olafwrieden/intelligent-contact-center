// declare global {
//   var pubsub: WebPubSubServiceClient | undefined;
// }

// export const socketClient =
//   globalThis.pubsub ||
//   new WebPubSubServiceClient(
//     process.env.AZURE_WEB_PUBSUB_ENDPOINT as string,
//     process.env.AZURE_WEB_PUBSUB_HUB as string
//   );

// if (process.env.NODE_ENV !== "production") globalThis.pubsub = socketClient;

export interface CallQueueItem {
  type: "INCOMING_CALL" | "DROPPED_CALL";
  id: string;
  number: string;
  name: string | null;
  isPriority: boolean;
  timestamp: Date;
}
