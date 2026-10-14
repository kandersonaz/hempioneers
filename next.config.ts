import type { NextConfig } from "next";
import redirectsData from "./redirects.json";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  async redirects() {
    return (
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
  },
};

export default nextConfig;
