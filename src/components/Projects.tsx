"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROJECTS } from "@/lib/data";
import SectionReveal from "./SectionReveal";
import ProjectCard from "./ProjectCard";
import ScrollTextReveal from "./ScrollTextReveal";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Floating accent behind grid
  const accentX = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const accentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.4, 0.4, 0]);

  return (
    <section ref={sectionRef} id="projects" className="relative py-32 px-6 overflow-hidden">
      {/* Parallax floating accent orb */}
      <motion.div
        className="absolute top-1/3 left-1/2 w-[500px] h-[500px] rounded-full pointer-events-none -z-10"
        style={{
          x: accentX,
          opacity: accentOpacity,
          background: "radial-gradient(circle, rgba(124,92,252,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <span className="section-label">Projects</span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
            Deep-dive<br />
            <span className="text-gradient">case studies</span>.
          </h2>
        </SectionReveal>

        {/* Scroll-scrubbable description */}
        <ScrollTextReveal
          text="Real-world projects spanning full-stack web apps, healthcare systems, and agricultural tech — each solving genuine problems with thoughtful engineering."
          className="text-lg sm:text-xl text-text-secondary font-light max-w-2xl mb-16 leading-relaxed"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
