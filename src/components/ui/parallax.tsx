"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionStyle } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Scroll-driven parallax. Translates children on the Y axis as the element
 * passes through the viewport. `speed` > 0 moves slower than scroll (depth);
 * negative moves opposite.
 */
export function Parallax({
  children,
  speed = 40,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <motion.div ref={ref} style={{ y } as MotionStyle} className={className}>
      {children}
    </motion.div>
  );
}

/** A floating decorative blob that drifts on scroll — pure eye-candy depth. */
export function ParallaxBlob({
  className,
  speed = 80,
  style,
}: {
  className?: string;
  speed?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, speed > 0 ? 40 : -40]);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      style={{ y, rotate, ...style } as MotionStyle}
      className={cn("pointer-events-none absolute rounded-full blur-3xl", className)}
    />
  );
}
