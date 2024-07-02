"use server";

import { auth } from "@/auth";
import { INCOMING_CALL_GROUP } from "@/lib/constant";
import { WebPubSubServiceClient } from "@azure/web-pubsub";

const serviceClient = new WebPubSubServiceClient(
  process.env.AZURE_WEB_PUBSUB_ENDPOINT as string,
  process.env.AZURE_WEB_PUBSUB_HUB as string
);

export async function getSocketAuth(): Promise<string | null> {
  try {
    const session = await auth();
    if (!session || !session.user) {
      console.log("No user session found");
      return null;
    }

    const token = await serviceClient.getClientAccessToken({
      userId: session.user.id,
      groups: [INCOMING_CALL_GROUP],
      roles: ["webpubsub.sendToGroup", "webpubsub.joinLeaveGroup"],
    });

    return token.url;
  } catch (error: any) {
    throw new Error(error);
  }
}
