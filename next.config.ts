import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "localhost",
      "api-marketplace-cars.onrender.com",
      "marketplace-cars.netlify.app/",
      "res.cloudinary.com",
      "res.cloudinary.com/dgysc0sib/image/upload/",
    ],
  },
};
export default nextConfig;
