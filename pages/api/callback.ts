import { NextApiRequest, NextApiResponse } from "next";
import {
  ClientConfig,
  Client,
  middleware,
  MiddlewareConfig,
  WebhookEvent,
  TextMessage,
  MessageAPIResponseBase,
} from "@line/bot-sdk";

// Setup all LINE client configurations.
const clientConfig: ClientConfig = {
  channelAccessToken: process.env.NEXT_PUBLIC_CHANNEL_ACCESS_TOKEN || "",
  channelSecret: process.env.NEXT_PUBLIC_CHANNEL_SECRET || "",
};

const middlewareConfig: MiddlewareConfig = {
  channelAccessToken: process.env.NEXT_PUBLIC_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.NEXT_PUBLIC_CHANNEL_SECRET || "",
};

// Create a new LINE SDK client.
const client = new Client(clientConfig);

// Middleware to validate the request comes from LINE.
const lineMiddleware = middleware(middlewareConfig);

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await lineMiddleware(req, res, async () => {
        const events: WebhookEvent[] = req.body.events;

        // Process all of the received events asynchronously.
        const results = await Promise.all(
          events.map(async (event: WebhookEvent) => {
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
          })
        );

        // Return a successfull message.
        return res.status(200).json({
          status: "success",
          results,
        });
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
      }

      // Return an error message.
      return res.status(500).json({
        status: "error",
      });
    }
  } else {
    // Return a successfull message.
    return res.status(200).json({
      status: "success",
      message: "Connected successfully!",
    });
  }
}
