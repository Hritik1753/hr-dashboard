/** @type {import('next').NextConfig} */
const nextConfig = {
      eslint: {
    ignoreDuringBuilds: true, // ⛔️ Skip ESLint errors on build (Vercel)
  },
};

export default nextConfig;
