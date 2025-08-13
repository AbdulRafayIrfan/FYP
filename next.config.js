/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ig.socialapi-v2.workers.dev",
      },
    ],
  },
};

module.exports = nextConfig;
