/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure image domains for Next.js Image component
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow images from any HTTPS source
      },
    ],
  },
  // Disable TypeScript type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint checks during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Remove console logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
};

module.exports = nextConfig; 