"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Spring configs — dot follows fast, ring follows slowly for trailing effect
const dotSpring = { damping: 25, stiffness: 300, mass: 0.5 };
const ringSpring = { damping: 20, stiffness: 120, mass: 0.8 };

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);

  // Raw mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Dot (inner) — snappy spring
  const dotX = useSpring(mouseX, dotSpring);
  const dotY = useSpring(mouseY, dotSpring);

  // Ring (outer) — lazy, trailing spring
  const ringX = useSpring(mouseX, ringSpring);
  const ringY = useSpring(mouseX, ringSpring);
  const ringXActual = useSpring(mouseX, ringSpring);
  const ringYActual = useSpring(mouseY, ringSpring);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onMouseEnterInteractive = () => setIsHovering(true);
    const onMouseLeaveInteractive = () => setIsHovering(false);

    const addListeners = () => {
      const interactives = document.querySelectorAll(
        "a, button, [data-cursor-hover], input, textarea, .glass-card"
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
      return interactives;
    };

    let interactives = addListeners();

    // MutationObserver to catch dynamically rendered elements
    const observer = new MutationObserver(() => {
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
      interactives = addListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };
  }, [mouseX, mouseY]);

  const dotSize = isHovering ? 48 : 16;
  const ringSize = isHovering ? 64 : 40;

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="custom-cursor"
        style={{
          x: dotX,
          y: dotY,
          width: dotSize,
          height: dotSize,
          translateX: "-50%",
          translateY: "-50%",
          background: isHovering
            ? "rgba(124, 92, 252, 0.2)"
            : "var(--color-accent)",
          mixBlendMode: isHovering ? "normal" : "difference",
        }}
        animate={{
          width: dotSize,
          height: dotSize,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
      />

      {/* Outer ring — trails behind */}
      <motion.div
        className="custom-cursor-ring"
        style={{
          x: ringXActual,
          y: ringYActual,
          width: ringSize,
          height: ringSize,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: isHovering
            ? "rgba(124, 92, 252, 0.1)"
            : "rgba(124, 92, 252, 0.4)",
          opacity: isHovering ? 0.5 : 1,
        }}
        animate={{
          width: ringSize,
          height: ringSize,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
      />
    </>
  );
}
