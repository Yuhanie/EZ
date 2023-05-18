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
        url: "https://scontent.ftpe4-1.fna.fbcdn.net/v/t39.30808-6/344376177_258385913229382_2652593194967422598_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=730e14&_nc_ohc=rFAthciA1R0AX8TGyz9&_nc_ht=scontent.ftpe4-1.fna&oh=00_AfCKChMphPQWDyv-jBYjUBkIFGjhxgKevYoWVRNSPCQFqQ&oe=645542D7",
        size: "full",
        aspectRatio: "20:12",
        aspectMode: "cover",
        // action: {
        //   type: "uri",
        //   label: "link",
        //   uri: "http://linecorp.com/",
        // },
        margin: "none",
        align: "center"
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "「Education zone」這個平台的開發目的在於創造友善的學習區，讓人們在資訊量爆炸的環境中，能以最有效率的方式獲取知識。",
            wrap: true,
            size: "xs",
            margin: "sm"
          },
          {
            type: "text",
            text: "改變學習方式，讓學習者能夠相互交流、分享學習心得，這樣不僅可以加強學習者的學習成果，也可以讓學習變得更加有趣和有意義。",
            wrap: true,
            size: "xs",
            margin: "xl"
          }
        ]
      },
    },
  }

  //常見問答
  const responseQA: FlexMessage = {
    type: "flex",
    altText: text,
    contents: {
      type: "carousel",
      contents: [
        {
          type: "bubble",
          hero: {
            type: "image",
            size: "full",
            aspectMode: "cover",
            aspectRatio: "320:200",
            url: "https://scontent-hkt1-2.xx.fbcdn.net/v/t39.30808-6/347788277_6312576802165083_3188368708464110216_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=uogyTWnM9CMAX9VPlx1&_nc_ht=scontent-hkt1-2.xx&oh=00_AfBLqKiFTQajr_98CQumNfwiv3-AeX5ep9z3hATzy5G8uw&oe=6469B444"
          },
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "1. 先準備好想分享的筆記，可選擇喜歡的筆記平台完成筆記、分享其他網站內容。",
                weight: "regular",
                size: "xs",
                wrap: true,
                margin: "md",
              },
              {
                type: "text",
                text: "2. 填寫標題及文章簡述。",
                size: "xs",
                margin: "md",
              },
              {
                type: "text",
                text: " 3. 貼上網址。",
                size: "xs",
                margin: "md",
              },
              {
                type: "text",
                text: "4. 選擇合適的標籤。",
                size: "xs",
                margin: "md",
              },
            ],
            "spacing": "sm",
            "paddingAll": "13px"
          },
        },
      ],

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
