import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  swcMinify: true,
  images: {
    domains: ["194.87.99.150", "localhost"], // Добавь сюда все нужные домены/IP
  },
};

export default nextConfig;
