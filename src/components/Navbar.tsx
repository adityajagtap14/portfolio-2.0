"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROFILE } from "@/lib/data";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Hardware", href: "#hardware" },
  { label: "Beyond Code", href: "#beyond" },
  { label: "Creative", href: "#creative" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-bg-primary/80 backdrop-blur-xl border-b border-border shadow-lg"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand / Home Radiant Button */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group relative inline-flex h-9 w-24 items-center justify-center overflow-hidden rounded-full bg-border/30 transition-transform active:scale-95"
          >
            {/* Spinning Radiant Gradient Border (Visible on hover) */}
            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#7c5cfc_50%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Inner Button Background */}
            <span className="absolute inset-[1px] rounded-full bg-bg-primary/95 backdrop-blur-3xl z-10 transition-colors group-hover:bg-bg-primary/90" />
            
            {/* Button Content */}
            <div className="relative z-20 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent group-hover:shadow-[0_0_10px_rgba(124,92,252,1)] transition-shadow duration-300" />
              <span className="font-mono text-[11px] font-bold tracking-widest text-text-primary uppercase mt-[1px]">
                HOME
              </span>
            </div>
          </a>

          {/* Desktop nav — Sliding Pill Tab Bar */}
          <ul
            className="hidden md:flex items-center gap-1 p-1 rounded-full border border-border/50"
            style={{ backgroundColor: "var(--color-bg-primary)" }}
            onMouseLeave={() => setHoveredTab(null)}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  onMouseEnter={() => setHoveredTab(link.href)}
                  className={`relative z-10 block px-4 py-2 text-sm transition-colors duration-300 ${
                    hoveredTab === link.href ? "text-bg-primary font-medium" : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.label}
                </a>
                {hoveredTab === link.href && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 z-0 rounded-full bg-text-primary"
                    transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.8 }}
                  />
                )}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex magnetic-btn text-xs px-4 py-2"
          >
            Get in Touch
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 z-[60]"
            aria-label="Toggle navigation"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-text-primary"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              className="block w-6 h-0.5 bg-text-primary"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-text-primary"
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-bg-primary/95 backdrop-blur-xl flex items-center justify-center"
          >
            <nav>
              <ul className="flex flex-col items-center gap-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-2xl font-light text-text-primary hover:text-accent-light transition-colors"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
