"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROFILE } from "@/lib/data";
import MagneticButton from "./MagneticButton";
import AnimatedText from "./AnimatedText";

// Stagger children container
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

// Each child fades up with blur
const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// Decorative line draws in
const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 },
  },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-linked parallax: content fades & moves up as user scrolls past hero
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
    >
      {/* Animated grid background — inverse parallax */}
      <motion.div className="absolute inset-0 opacity-[0.03]" style={{ y: gridY }}>
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(124,92,252,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,92,252,0.3) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      {/* Hero content — scroll-linked fade & shift */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 max-w-4xl mx-auto text-center will-change-transform"
      >


        {/* Greeting */}
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base font-mono text-text-muted tracking-widest uppercase mb-4"
        >
          Hello, I&apos;m
        </motion.p>

        {/* Name — word-by-word mask reveal (balanced, not oversized) */}
        <AnimatedText
          text={PROFILE.name}
          as="h1"
          splitBy="word"
          delay={0.5}
          stagger={0.08}
          triggerOnLoad
          className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight mb-4 text-text-primary"
        />

        {/* Decorative line */}
        <motion.div
          variants={lineVariants}
          className="w-16 h-px bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-6 origin-center"
        />

        {/* Dual-expertise tagline — the real star, word-by-word mask reveal */}
        <AnimatedText
          text="I build at the intersection of full-stack software and embedded hardware"
          as="p"
          splitBy="word"
          delay={0.9}
          stagger={0.04}
          triggerOnLoad
          className="text-xl sm:text-2xl md:text-3xl font-light text-text-secondary leading-snug max-w-3xl mx-auto mb-3"
        />

        {/* Supporting context */}
        <motion.p
          variants={itemVariants}
          className="text-sm text-text-muted font-mono mb-8"
        >
          CS Student · Shetty Institute of Technology · Developer · Builder · Communicator
        </motion.p>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-base text-text-secondary/70 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {PROFILE.heroSubtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton href="#projects" variant="filled">
            <span>View My Work</span>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </MagneticButton>

          <MagneticButton href="#contact">
            <span>Get in Touch</span>
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="mt-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-text-muted/40 flex items-start justify-center p-1.5 mx-auto"
          >
            <motion.div className="w-1 h-1.5 rounded-full bg-accent-light" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
