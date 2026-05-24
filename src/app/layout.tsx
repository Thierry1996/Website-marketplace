import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

import "./globals.css";
import { siteConfig } from "@/lib/site";
import { StructuredData } from "@/components/layout/structured-data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#090b15" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Clerk is optional in dev — if no keys, render without the provider.
  const hasClerk = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const content = (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Toaster richColors position="top-right" />
        <StructuredData />
      </body>
    </html>
  );

  return hasClerk ? <ClerkProvider>{content}</ClerkProvider> : content;
}
