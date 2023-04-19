// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  Client,
  FlexMessage,
  MessageAPIResponseBase,
  TextMessage,
  WebhookEvent,
} from "@line/bot-sdk";
const clientConfig = {
  channelAccessToken: process.env.NEXT_PUBLIC_CHANNEL_ACCESS_TOKEN || "",
  channelSecret: process.env.NEXT_PUBLIC_CHANNEL_SECRET,
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
        console.error("Error in textEventHandler:", err);
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

  //Create a new message.
  const response: TextMessage = {
    type: "text",
    text,
  };

  const responseNotes: FlexMessage = {
    type: "flex",
    altText: text,
    contents: {
      type: "bubble",
      // hero: {
      //   type: "image",
      //   url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
      //   size: "full",
      //   aspectRatio: "20:13",
      //   aspectMode: "cover",
      //   action: {
      //     type: "uri",
      //     label: "link",
      //     uri: "http://linecorp.com/",
      //   },
      // },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "吳老師的Next筆記",
            weight: "bold",
            size: "xl",
          },
        ],
      },
      footer: {
        type: "box",
        layout: "vertical",
        spacing: "sm",
        contents: [
          {
            type: "button",
            style: "link",
            height: "sm",
            action: {
              type: "uri",
              label: "WEBSITE",
              uri: "https://fju-benwu.notion.site/Next-548a6c9fed644164ae9562510e30cffb",
            },
          },
          {
            type: "box",
            layout: "vertical",
            contents: [],
            margin: "sm",
          },
        ],
        flex: 0,
      },
    },
  };

  // Reply to the user.
  try{
    if (text === "筆記") {
      await client.replyMessage(replyToken, responseNotes);
    } else {
      await client.replyMessage(replyToken, response);
    }
  
  }
  catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error in replyMessage:", err);
    }


  }
};
