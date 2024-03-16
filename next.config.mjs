/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unsocial-bucket.s3.ap-southeast-1.amazonaws.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
