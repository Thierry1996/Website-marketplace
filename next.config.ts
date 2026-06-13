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
      { protocol: "https", hostname: "plus.unsplash.com"    },
      { protocol: "https", hostname: "images.pexels.com"    },
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
  // Hosted marketplace app demos: static exports live under /public/apps/<id>/
  // as flat .html files. These afterFiles rewrites map clean URLs to the files
  // so the embedded preview + "Open full app" links navigate without redirects.
  // (Real asset requests like /apps/brasa/_next/* hit the filesystem first and
  //  never reach these rules.)
  async rewrites() {
    return [
      { source: "/apps/brasa", destination: "/apps/brasa/index.html" },
      { source: "/apps/brasa/menu", destination: "/apps/brasa/menu.html" },
      { source: "/apps/brasa/order", destination: "/apps/brasa/order.html" },
      { source: "/apps/brasa/reservations", destination: "/apps/brasa/reservations.html" },
      { source: "/apps/brasa/private-events", destination: "/apps/brasa/private-events.html" },
    ];
  },
};

export default nextConfig;
