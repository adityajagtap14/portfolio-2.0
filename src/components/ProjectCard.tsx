"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Scroll-linked micro-transform: subtle Y shift + rotation while in viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const cardY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const cardRotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.5, 0, -0.5]
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.9,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      className="group relative"
    >
      <motion.div
        className="glass-card overflow-hidden"
        style={{ y: cardY, rotateZ: cardRotate }}
      >
        {/* Coloured top accent bar */}
        <div
          className="h-1 w-full"
          style={{
            background: `linear-gradient(90deg, ${project.color}, transparent)`,
          }}
        />

        <div className="p-7 sm:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <p
                className="text-xs font-mono uppercase tracking-widest mb-1"
                style={{ color: project.color }}
              >
                {project.subtitle}
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-text-primary group-hover:text-gradient transition-all duration-500">
                {project.title}
              </h3>
            </div>

            {/* Icon */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-border group-hover:border-border-hover transition-colors duration-300 shrink-0"
              style={{ background: `${project.color}10` }}
            >
              <svg
                className="w-5 h-5 text-text-muted group-hover:text-accent-light transition-all duration-500 -rotate-45 group-hover:rotate-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
          </div>

          {/* Description */}
          <p className="text-text-secondary text-sm leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Tags — staggered whileInView */}
          <motion.div
            className="flex flex-wrap gap-2 mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06 } },
            }}
          >
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                className="tech-tag"
                variants={{
                  hidden: { opacity: 0, scale: 0.7 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
                  },
                }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* Links */}
          <div className="flex items-center gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-text-muted hover:text-accent-light transition-colors duration-300 flex items-center gap-1.5 font-mono"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Source Code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-text-muted hover:text-accent-light transition-colors duration-300 flex items-center gap-1.5 font-mono"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>

      {/* Hover glow effect */}
      <div
        className="absolute -inset-px rounded-[var(--radius-card)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-xl"
        style={{
          background: `radial-gradient(600px circle at 50% 50%, ${project.color}15, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}
