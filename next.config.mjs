/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_DIRECTUS_API_ENDPOINT.replace(/https?:\/\//, ''),
      },
    ],
  },
};

export default nextConfig;
