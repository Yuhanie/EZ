// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  Client,
  MessageAPIResponseBase,
  TextMessage,
  WebhookEvent,
} from "@line/bot-sdk";
const clientConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || "",
  channelSecret: process.env.CHANNEL_SECRET,
};

// Create a new LINE SDK client.
const client = new Client(clientConfig);

// type Data = {
//   status?: string;
//   // name: string;
//   results?: any;
// };

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const events: WebhookEvent[] = req.body.events;
  console.log(events);
  // Process all of the received events asynchronously.

  const results = events.map(async (event: WebhookEvent) => {
    try {
      await textEventHandler(event);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
      }

      // Return an error message.
      return res.status(500).json({
        status: "error",
      });
    }
  });

  // Return a successfull message.
  return res.status(200).json({
    status: "success",
    results,
  });
}

// Function handler to receive the text.
const textEventHandler = async (
  event: WebhookEvent
): Promise<MessageAPIResponseBase | undefined> => {
  // Process all variables here.
  if (event.type !== "message" || event.message.type !== "text") {
    return;
  }

  // Process all message related variables here.
  const { replyToken } = event;
  const { text } = event.message;

  // Create a new message.
  const response: TextMessage = {
    type: "text",
    text,
  };

  // Reply to the user.
  await client.replyMessage(replyToken, response);
};
