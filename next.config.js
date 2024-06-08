/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh'
      }
    ]
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcrypt']
  }
};

module.exports = nextConfig;
