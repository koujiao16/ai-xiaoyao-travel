import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/destinations/zhengzhou",
        destination: "/destinations/henan",
        permanent: true,
      },
      {
        source: "/zh/destinations/zhengzhou",
        destination: "/zh/destinations/henan",
        permanent: true,
      },
    ];
  },
  images: {
    // Keep permissive for placeholder assets (svg/png) in /public/images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;

