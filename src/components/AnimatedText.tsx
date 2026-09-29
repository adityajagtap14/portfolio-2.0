"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  /** "word" splits by words, "char" splits by characters */
  splitBy?: "word" | "char";
  /** Delay before the animation starts (seconds) */
  delay?: number;
  /** Stagger delay between each word/char (seconds) */
  stagger?: number;
  /** Only animate once, or every time it enters viewport */
  once?: boolean;
  /** Tag to render — h1, h2, p, span */
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  /** Trigger on page load (true) or on scroll into view (false) */
  triggerOnLoad?: boolean;
}

const containerVariants = (stagger: number, delay: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

const wordVariants = {
  hidden: {
    y: "110%",
    rotateX: -80,
    opacity: 0,
  },
  visible: {
    y: "0%",
    rotateX: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const, // expo-out
    },
  },
};

/**
 * Premium staggered text reveal — each word/char slides up
 * from behind an overflow:hidden mask with a 3D rotation.
 */
export default function AnimatedText({
  text,
  className = "",
  splitBy = "word",
  delay = 0,
  stagger = 0.06,
  once = true,
  as: Tag = "div",
  triggerOnLoad = false,
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-60px" });

  const pieces = splitBy === "word" ? text.split(" ") : text.split("");
  const separator = splitBy === "word" ? "\u00A0" : ""; // non-breaking space between words

  // Determine if we should animate
  const shouldAnimate = triggerOnLoad ? true : inView;

  return (
    <Tag className={className}>
      <motion.span
        ref={ref}
        className="inline-flex flex-wrap"
        variants={containerVariants(stagger, delay)}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        style={{ perspective: "600px" }}
      >
        {pieces.map((piece, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden"
            style={{ verticalAlign: "top" }}
          >
            <motion.span
              className="inline-block will-change-transform"
              variants={wordVariants}
              style={{ transformOrigin: "bottom center" }}
            >
              {piece}
              {separator}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
