"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HARDWARE_ITEMS } from "@/lib/data";
import SectionReveal from "./SectionReveal";
import ScrollTextReveal from "./ScrollTextReveal";

export default function HardwareEdge() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: sectionScrollY } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax for the circuit decoration
  const circuitScale = useTransform(sectionScrollY, [0.4, 0.9], [0.6, 1]);
  const circuitOpacity = useTransform(sectionScrollY, [0.3, 0.6], [0, 1]);

  // Floating accent
  const accentY = useTransform(sectionScrollY, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} id="hardware" className="relative py-32 px-6 overflow-hidden">
      {/* Subtle separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Parallax accent */}
      <motion.div
        className="absolute right-0 top-1/4 w-[400px] h-[400px] rounded-full pointer-events-none -z-10"
        style={{
          y: accentY,
          background: "radial-gradient(circle, rgba(251,113,133,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <span className="section-label">Hardware &amp; IoT</span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
            Beyond the<br />
            <span className="text-gradient-warm">browser</span>.
          </h2>
        </SectionReveal>

        {/* Scroll-scrubbable description */}
        <ScrollTextReveal
          text="I don't just write JavaScript. I program microcontrollers, build IoT prototypes, and understand systems from the transistor level up."
          className="text-lg sm:text-xl text-text-secondary font-light max-w-2xl mb-16 leading-relaxed"
        />

        {/* Drag Hint */}
        <div className="mt-12 mb-4 flex items-center gap-3 text-text-muted/60 px-6 sm:px-0">
          <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          <span className="font-mono uppercase tracking-widest text-[10px]">Drag to explore</span>
        </div>

        <div ref={carouselRef} className="relative -mx-6 px-6 sm:-mx-0 sm:px-0 overflow-hidden cursor-grab active:cursor-grabbing">
          <motion.div
            drag="x"
            dragConstraints={carouselRef}
            className="flex gap-8 w-max"
          >
            {HARDWARE_ITEMS.map((item, i) => (
              <div key={item.title} className="w-[85vw] sm:w-[400px] flex-shrink-0 pointer-events-none">
                <div className="glass-card p-10 h-[400px] flex flex-col justify-center group relative overflow-hidden pointer-events-auto">
                  <motion.div
                    className="absolute right-[-20%] bottom-[-20%] text-[200px] opacity-5 rotate-12 pointer-events-none"
                  >
                    {item.icon}
                  </motion.div>
                  
                  <div className="text-5xl mb-6 text-accent relative z-10">
                    {item.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-text-primary mb-4 relative z-10">
                    {item.title}
                  </h3>

                  <p className="text-base text-text-secondary leading-relaxed relative z-10">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Decorative circuit-like line — scroll-linked scale */}
        <motion.div
          className="mt-16 flex items-center justify-center gap-3 text-text-muted origin-center"
          style={{ scale: circuitScale, opacity: circuitOpacity }}
        >
          <div className="w-2 h-2 rounded-full border border-accent/30" />
          <div className="w-16 h-px bg-accent/20" />
          <div className="w-3 h-3 rounded-sm border border-accent/30 rotate-45" />
          <div className="w-24 h-px bg-accent/20" />
          <div className="w-2 h-2 rounded-full border border-accent/30" />
          <div className="w-16 h-px bg-accent/20" />
          <div className="w-3 h-3 rounded-sm border border-accent/30 rotate-45" />
        </motion.div>
      </div>
    </section>
  );
}
