"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;          // negative = moves up, positive = moves down relative to scroll
  className?: string;
  scaleRange?: [number, number]; // optional scale based on scroll
  opacityRange?: [number, number]; // optional opacity based on scroll
}

/**
 * Wraps children in a parallax container that shifts
 * vertically based on scroll position within the viewport.
 */
export default function ParallaxLayer({
  children,
  speed = -50,
  className = "",
  scaleRange,
  opacityRange,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed]);
  const scale = scaleRange
    ? useTransform(scrollYProgress, [0, 1], scaleRange)
    : undefined;
  const opacity = opacityRange
    ? useTransform(scrollYProgress, [0, 1], opacityRange)
    : undefined;

  return (
    <motion.div
      ref={ref}
      style={{ y, scale, opacity }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
