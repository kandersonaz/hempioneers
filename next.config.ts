import type { NextConfig } from "next";
import redirectsData from "./redirects.json";

const nextConfig: NextConfig = {
  async redirects() {
    return (redirectsData as Array<{
      source: string;
      destination: string;
      permanent: boolean;
    }>).map((r) => ({
      source: r.source,
      destination: r.destination,
      permanent: r.permanent,
    }));
  },
};

export default nextConfig;
