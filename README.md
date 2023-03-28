This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

記得要新增.env.local，內容是:
NEXT_PUBLIC_API_KEY=xx
NEXT_PUBLIC_AUTH_DOMAIN=xx
NEXT_PUBLIC_PROJECT_ID=xx
NEXT_PUBLIC_STORAGE_BUCKET=xx
NEXT_PUBLIC_MESSAGING_SENDER_ID=xx
NEXT_PUBLIC_APP_ID=xx
NEXT_PUBLIC_MEASUREMENT_ID=xx

接下來啟動伺服器:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

會看到讀取.env.local
C:\Users\USER\2022\project\EZ>yarn dev
yarn run v1.22.15
$ next dev
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
info - Loaded env from C:\Users\USER\2022\project\EZ\.env.local

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
