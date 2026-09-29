"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollTextRevealProps {
  text: string;
  className?: string;
}

/**
 * Scrubbable text reveal — each word fades from muted to bright
 * as the user scrolls through the element's viewport range.
 */
export default function ScrollTextReveal({
  text,
  className = "",
}: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.4"],
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={className}>
      <p className="flex flex-wrap leading-relaxed">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = (i + 1) / words.length;
          return (
            <Word key={i} word={word} progress={scrollYProgress} range={[start, end]} />
          );
        })}
      </p>
    </div>
  );
}

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [4, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className="mr-[0.3em] inline-block will-change-transform"
    >
      {word}
    </motion.span>
  );
}
