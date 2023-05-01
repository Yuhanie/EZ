import { NextApiRequest, NextApiResponse } from "next";
import {
  FlexMessage,
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

  //推薦筆記
  const responseRecommendNotes: FlexMessage = {
    type: "flex",
    altText: text,
    contents: {
      type: "bubble",
      hero: {
        type: "image",
        url: "https://scontent-hkt1-2.xx.fbcdn.net/v/t39.30808-6/343563846_142826835287947_6637212040245042921_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=conkD8VUPyYAX8uwFIi&_nc_ht=scontent-hkt1-2.xx&oh=00_AfDSWw4Sf2veKgFc3RA8k1iu1FnfuijWC8JmKMsxYB_M7Q&oe=645164D0",
        size: "full",
        aspectRatio: "20:12",
        aspectMode: "cover",
        action: {
          type: "uri",
          label: "link",
          uri: "http://linecorp.com/",
        },
        margin: "none",
        align: "center"
      },
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
          {
            type: "box",
            layout: "vertical",
            margin: "lg",
            spacing: "sm",
            contents: [
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  {
                    type: "text",
                    text: "標籤",
                    color: "#aaaaaa",
                    size: "sm",
                    flex: 1
                  },
                  {
                    type: "text",
                    text: "專題相關",
                    wrap: true,
                    color: "#666666",
                    size: "sm",
                    flex: 5
                  }
                ],
              }
            ],
          }
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
              label: "查看更多",
              uri: "https://fju-benwu.notion.site/Next-548a6c9fed644164ae9562510e30cffb",
            },
          },
        ],
        flex: 0,
      },
    },
  }

  //最新筆記
  const responseLatestNotes: FlexMessage = {
    type: "flex",
    altText: text,
    contents: {
      type: "bubble",
      hero: {
        type: "image",
        url: "https://scontent.ftpe4-2.fna.fbcdn.net/v/t39.30808-6/344538372_903173417419520_2356649982331164325_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=730e14&_nc_ohc=HyIdbOuZeBwAX_kZ82O&_nc_ht=scontent.ftpe4-2.fna&oh=00_AfBvOyZv4Q85ScQhN3u9fhOLGvXMJw6NKkPQM1gkvGNRKA&oe=6454618C",
        size: "full",
        aspectRatio: "20:12",
        aspectMode: "cover",
        action: {
          type: "uri",
          label: "link",
          uri: "http://linecorp.com/",
        },
        margin: "none",
        align: "center"
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "Deeplink 專題分享",
            weight: "bold",
            size: "xl",
          },
          {
            type: "box",
            layout: "vertical",
            margin: "lg",
            spacing: "sm",
            contents: [
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  {
                    type: "text",
                    text: "標籤",
                    color: "#aaaaaa",
                    size: "sm",
                    flex: 1
                  },
                  {
                    type: "text",
                    text: "專題相關",
                    wrap: true,
                    color: "#666666",
                    size: "sm",
                    flex: 5
                  }
                ],
              }
            ],
          }
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
              label: "查看更多",
              uri: "https://deeplink.tw/#/webinarContent/xgHtzskYqW2N7TKWlOiD",
            },
          },
        ],
        flex: 0,
      },
    },
  }

  //About us
  const responseAboutUs: FlexMessage = {
    type: "flex",
    altText: text,
    contents: {
      type: "bubble",
      hero: {
        type: "image",
        url: "https://scontent-hkt1-2.xx.fbcdn.net/v/t39.30808-6/343563846_142826835287947_6637212040245042921_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=conkD8VUPyYAX8uwFIi&_nc_ht=scontent-hkt1-2.xx&oh=00_AfDSWw4Sf2veKgFc3RA8k1iu1FnfuijWC8JmKMsxYB_M7Q&oe=645164D0",
        size: "full",
        aspectRatio: "20:12",
        aspectMode: "cover",
        action: {
          type: "uri",
          label: "link",
          uri: "http://linecorp.com/",
        },
        margin: "none",
        align: "center"
      },
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
          {
            type: "box",
            layout: "vertical",
            margin: "lg",
            spacing: "sm",
            contents: [
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  {
                    type: "text",
                    text: "標籤",
                    color: "#aaaaaa",
                    size: "sm",
                    flex: 1
                  },
                  {
                    type: "text",
                    text: "專題相關",
                    wrap: true,
                    color: "#666666",
                    size: "sm",
                    flex: 5
                  }
                ],
              }
            ],
          }
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
        ],
        flex: 0,
      },
    },
  }

 //常見問答
  const responseQA: FlexMessage = {
    type: "flex",
    altText: text,
    contents: {
      type: "bubble",
      hero: {
        type: "image",
        url: "https://scontent-hkt1-2.xx.fbcdn.net/v/t39.30808-6/343563846_142826835287947_6637212040245042921_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=conkD8VUPyYAX8uwFIi&_nc_ht=scontent-hkt1-2.xx&oh=00_AfDSWw4Sf2veKgFc3RA8k1iu1FnfuijWC8JmKMsxYB_M7Q&oe=645164D0",
        size: "full",
        aspectRatio: "20:12",
        aspectMode: "cover",
        action: {
          type: "uri",
          label: "link",
          uri: "http://linecorp.com/",
        },
        margin: "none",
        align: "center"
      },
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
          {
            type: "box",
            layout: "vertical",
            margin: "lg",
            spacing: "sm",
            contents: [
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  {
                    type: "text",
                    text: "標籤",
                    color: "#aaaaaa",
                    size: "sm",
                    flex: 1
                  },
                  {
                    type: "text",
                    text: "專題相關",
                    wrap: true,
                    color: "#666666",
                    size: "sm",
                    flex: 5
                  }
                ],
              }
            ],
          }
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
        ],
        flex: 0,
      },
    },
  }

  // Reply to the user.
  if (text === "推薦筆記") {
    await client.replyMessage(replyToken, responseRecommendNotes);
  } 
  if (text === "最新筆記") {
    await client.replyMessage(replyToken, responseLatestNotes);
  }
  if (text === "About us") {
    await client.replyMessage(replyToken, responseAboutUs);
  }
  if (text === "常見問答") {
    await client.replyMessage(replyToken, responseQA);
  }
  else {
    await client.replyMessage(replyToken, response);
  }

  // await client.replyMessage(replyToken, response);
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
