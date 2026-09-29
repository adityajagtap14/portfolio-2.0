"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
  /** If true, adds a subtle parallax offset while the element is in view */
  parallax?: boolean;
  /** Parallax travel distance in px (default 30) */
  parallaxSpeed?: number;
  /** Distance the element starts offset (default 60) */
  distance?: number;
}

export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  parallax = false,
  parallaxSpeed = 30,
  distance = 60,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Parallax scroll offset
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [parallaxSpeed, -parallaxSpeed]);

  const initialOffset =
    direction === "up"
      ? { y: distance, x: 0, scale: 1 }
      : direction === "left"
        ? { y: 0, x: -distance, scale: 1 }
        : direction === "right"
          ? { y: 0, x: distance, scale: 1 }
          : { y: 20, x: 0, scale: 0.95 }; // "scale" mode

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...initialOffset }}
      animate={inView ? { opacity: 1, y: 0, x: 0, scale: 1 } : {}}
      style={parallax ? { y: parallaxY } : undefined}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
    >
      {children}
    </motion.div>
  );
}
