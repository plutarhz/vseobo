import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  swcMinify: true,
  images: {
    domains: ["194.87.99.150", "https://vsbvsm.ru", "https://vsbvsm.online", "https://vseobovsemm.duckdns.org"], // Добавь сюда все нужные домены/IP
  },
};

export default nextConfig;
