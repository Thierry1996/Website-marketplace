import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin Turbopack workspace root to silence the multi-lockfile warning.
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "pixabay.com"          },
      { protocol: "https", hostname: "cdn.pixabay.com"      },
      { protocol: "https", hostname: "media.gettyimages.com"},
      { protocol: "https", hostname: "image.shutterstock.com" },
      { protocol: "https", hostname: "res.cloudinary.com"   },
      { protocol: "https", hostname: "utfs.io"              },
      { protocol: "https", hostname: "uploadthing.com"      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
