/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/.well-known/agility-app.json",
        headers: [
          {
            //need to allow CORS requests to at LEAST to the app definition
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      }
    ]
  },
}

module.exports = nextConfig
