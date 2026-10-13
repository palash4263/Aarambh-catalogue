/** @type {import('next').NextConfig} */
const nextConfig = {
  // A second dev server (e.g. a preview on another port) can point this at its
  // own folder so it never clobbers the main server's .next output.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
