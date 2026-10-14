import type { NextConfig } from "next";
import redirectsData from "./redirects.json";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  async redirects() {
    const contentRedirects = (
      redirectsData as Array<{
        source: string;
        destination: string;
        statusCode: number;
      }>
    ).map((r) => ({
      source: r.source,
      destination: r.destination,
      statusCode: r.statusCode as 301,
    }));

    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "hempioneers.com" }],
        destination: "https://www.hempioneers.com/:path*",
        permanent: true,
      },
      ...contentRedirects,
    ];
  },
};

export default nextConfig;
