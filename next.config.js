/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: false,

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
