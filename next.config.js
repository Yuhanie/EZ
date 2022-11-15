/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_FIREBASE_API_KEY: process.env.REACT_APP_FIREBASE_API_KEY,
    LINE_CHANNEL_ID:process.env.LINE_CHANNEL_ID,
    LINE_CHANNEL_SECRET:process.env.LINE_CHANNEL_SECRET

  }
}

module.exports = nextConfig
