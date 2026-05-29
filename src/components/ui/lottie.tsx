"use client";

import { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { cn } from "@/lib/utils";

/**
 * Defensive Lottie wrapper. Renders a hosted .lottie/.json animation; if it
 * fails to load (offline, 404), it silently shows an optional fallback so it
 * can never break the page.
 */
export function Lottie({
  src,
  className,
  loop = true,
  autoplay = true,
  fallback = null,
}: {
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  fallback?: React.ReactNode;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) return <>{fallback}</>;

  return (
    <div className={cn("relative", className)}>
      <DotLottieReact
        src={src}
        loop={loop}
        autoplay={autoplay}
        style={{ width: "100%", height: "100%" }}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

/** A few hosted animations from lottie.host (load over network, degrade gracefully). */
export const LOTTIE = {
  rocket:    "https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie",
  marketing: "https://lottie.host/0d4e2b89-1f1a-4b2c-9b8e-1c2d3e4f5a6b/marketing.lottie",
  growth:    "https://lottie.host/embed/growth.lottie",
} as const;
