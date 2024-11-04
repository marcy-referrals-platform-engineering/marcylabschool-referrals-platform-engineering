/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**", // Allows images from any HTTPS domain
        },
        {
          protocol: "http",
          hostname: "**", // Allows images from any HTTP domain
        },
      ],
    },
  };
  
  export default nextConfig;
  