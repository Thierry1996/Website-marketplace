import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * Public routes (anyone, signed in or not).
 * Everything else requires authentication when Clerk keys are present.
 */
const isPublicRoute = createRouteMatcher([
  "/",
  "/marketplace(.*)",
  "/categories(.*)",
  "/services(.*)",
  "/experts(.*)",
  "/pricing",
  "/testimonials",
  "/about",
  "/contact",
  "/hire-me",
  "/hire-an-expert",
  "/webinars(.*)",
  "/community(.*)",
  "/blog(.*)",
  "/faq",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/forgot-password(.*)",
  "/api/webhooks(.*)",
  "/sitemap.xml",
  "/robots.txt",
]);

// Only run Clerk if keys are configured; in dev with no keys, no-op pass-through.
const clerkEnabled = !!process.env.CLERK_SECRET_KEY;

export default clerkEnabled
  ? clerkMiddleware(async (auth, req) => {
      if (!isPublicRoute(req)) {
        await auth.protect();
      }
    })
  : function passthrough() {
      return NextResponse.next();
    };

export const config = {
  // Run on all routes except static files and _next internals.
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpg|jpeg|gif|png|svg|ico|webp|woff2?|ttf|map)).*)",
    "/(api|trpc)(.*)",
  ],
};
