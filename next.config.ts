import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  swcMinify: true,
  images: {
    domains: ["194.87.99.150", "vsbvsm.ru", "vseobovsemm.duckdns.org"],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.vsbvsm.ru", // заменить на свой www-домен
          },
        ],
        permanent: true,
        destination: "https://vsbvsm.ru/:path*", // без www
      },
    ];
  },
};

export default nextConfig;