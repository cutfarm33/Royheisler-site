import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve the Closers Camp SPA (static files in public/closingcamp) at
  // /closingcamp with client-side deep-link support. These are "afterFiles"
  // rewrites, so real assets (public/closingcamp/assets/*, /brand/*,
  // /index.html) are served by the filesystem first; only paths with no
  // matching file (e.g. /closingcamp, /closingcamp/session/d1-01) fall through
  // to the SPA's index.html, where React Router takes over.
  async rewrites() {
    return [
      { source: "/closingcamp", destination: "/closingcamp/index.html" },
      { source: "/closingcamp/:path*", destination: "/closingcamp/index.html" },
    ];
  },
};

export default nextConfig;
