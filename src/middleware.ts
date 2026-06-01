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
  "/vendor/sign-in(.*)",   // vendor auth must stay public even though /vendor is protected
  "/vendor/sign-up(.*)",
  "/join",
  "/forgot-password(.*)",
  "/api/webhooks(.*)",
  "/api/chat",
  "/api/analyze-code",
  "/api/analyze-site",
  "/analyzer(.*)",         // public AI site analyzer + generated reports
  "/preview(.*)",          // public live previews of approved submissions
  "/start-trial",
  "/sell",
  "/checkout/preview",
  "/sitemap.xml",
  "/robots.txt",
]);

// Only run Clerk if keys are configured; in dev with no keys, no-op pass-through.
const clerkEnabled = !!process.env.CLERK_SECRET_KEY;

export default clerkEnabled
  ? clerkMiddleware(async (auth, req) => {
      if (!isPublicRoute(req)) {
        const { userId } = await auth();
        if (!userId) {
          // Route to the correct portal's sign-in. We build the redirect
          // ourselves because Clerk's redirectToSignIn() only honors
          // returnBackUrl, not a per-request signInUrl.
          const isVendorArea = req.nextUrl.pathname.startsWith("/vendor");
          const signInPath = isVendorArea ? "/vendor/sign-in" : "/sign-in";
          const url = new URL(signInPath, req.url);
          url.searchParams.set("redirect_url", req.url);
          return NextResponse.redirect(url);
        }
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
