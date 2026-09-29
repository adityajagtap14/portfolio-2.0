"use client";

import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "filled";
  className?: string;
  target?: string;
  rel?: string;
  /** How strongly the element pulls toward cursor (0-1, default 0.3) */
  strength?: number;
}

// Spring config for that organic, heavy magnetic feel
const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };

/**
 * Magnetic hover button — the element (and its inner text)
 * subtly pull toward the cursor using Framer Motion springs.
 * Outer shell moves at `strength`, inner text moves at 1.5× for depth.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "default",
  className = "",
  target,
  rel,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  // Outer container motion
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Inner text moves more for depth parallax
  const innerX = useMotionValue(0);
  const innerY = useMotionValue(0);
  const innerSpringX = useSpring(innerX, { damping: 12, stiffness: 120, mass: 0.3 });
  const innerSpringY = useSpring(innerY, { damping: 12, stiffness: 120, mass: 0.3 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    x.set(dx * strength);
    y.set(dy * strength);
    innerX.set(dx * strength * 1.5);
    innerY.set(dy * strength * 1.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    innerX.set(0);
    innerY.set(0);
  };

  const variantClass =
    variant === "filled" ? "magnetic-btn magnetic-btn--filled" : "magnetic-btn";

  const combinedClass = `${variantClass} ${className}`;

  const content = (
    <motion.span
      className="relative z-10 inline-flex items-center gap-2"
      style={{ x: innerSpringX, y: innerSpringY }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        className={combinedClass}
        style={{ x: springX, y: springY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      className={combinedClass}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {content}
    </motion.button>
  );
}
