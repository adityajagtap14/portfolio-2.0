"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import HardwareEdge from "@/components/HardwareEdge";
import BeyondCode from "@/components/BeyondCode";
import CreativePassion from "@/components/CreativePassion";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  // Page-level scroll for orb parallax
  const { scrollYProgress } = useScroll();
  const orbPurpleY = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const orbCyanY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const orbRoseY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const orbPurpleX = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const orbCyanX = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <SmoothScrollProvider>
      <div ref={mainRef}>
        {/* Custom cursor (desktop only, hidden on mobile via CSS) */}
        <CustomCursor />

        {/* Ambient gradient orbs — scroll-reactive parallax */}
        <motion.div
          className="gradient-orb gradient-orb--purple"
          style={{ y: orbPurpleY, x: orbPurpleX }}
          aria-hidden="true"
        />
        <motion.div
          className="gradient-orb gradient-orb--cyan"
          style={{ y: orbCyanY, x: orbCyanX }}
          aria-hidden="true"
        />
        <motion.div
          className="gradient-orb gradient-orb--rose"
          style={{ y: orbRoseY }}
          aria-hidden="true"
        />

        {/* Film-grain noise overlay */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <main className="relative z-10 flex-1">
          <Hero />
          <About />
          <Projects />
          <HardwareEdge />
          <BeyondCode />
          <CreativePassion />
          <Contact />
        </main>

        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}

