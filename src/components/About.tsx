"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { PROFILE, SKILLS, EDUCATION } from "@/lib/data";
import SectionReveal from "./SectionReveal";
import ScrollTextReveal from "./ScrollTextReveal";
import ParallaxLayer from "./ParallaxLayer";
import Folder from "./Folder";

const skillStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
};

const tagVariant = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const skillsInView = useInView(skillsRef, { once: true, margin: "-60px" });

  // Parallax for photo
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const photoRotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <section ref={sectionRef} id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <span className="section-label">About</span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
            More than just a<br />
            <span className="text-gradient">developer</span>.
          </h2>
        </SectionReveal>

        {/* Scroll-scrubbable intro paragraph */}
        <ScrollTextReveal
          text={PROFILE.aboutParagraphs[0]}
          className="text-xl sm:text-2xl font-light text-text-primary/90 max-w-3xl mb-16 leading-relaxed"
        />

        <div className="grid md:grid-cols-5 gap-12 md:gap-16">
          {/* Photo + Bio column */}
          <div className="md:col-span-3 space-y-6">
            {/* Photo container with parallax */}
            <SectionReveal delay={0.1}>
              <motion.div
                className="relative w-48 h-48 sm:w-56 sm:h-56 mb-8"
                style={{ y: photoY, rotate: photoRotate }}
              >
                <div className="w-full h-full rounded-2xl overflow-hidden border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/profile.jpg"
                    alt={`${PROFILE.name} portrait`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative corner */}
                <div className="absolute -bottom-2 -right-2 w-full h-full rounded-2xl border border-accent/20 -z-10" />
                {/* Glow behind photo */}
                <div className="absolute inset-0 rounded-2xl bg-accent/5 blur-2xl -z-20 scale-110" />
              </motion.div>
            </SectionReveal>

            {/* Remaining paragraphs with staggered reveals */}
            {PROFILE.aboutParagraphs.slice(1).map((p, i) => (
              <SectionReveal key={i} delay={0.15 + i * 0.1} parallax parallaxSpeed={15}>
                <p className="text-text-secondary leading-relaxed text-base">
                  {p}
                </p>
              </SectionReveal>
            ))}
          </div>

          {/* Skills & Education sidebar */}
          <div className="md:col-span-2 space-y-10">
            {/* Skills — staggered tag entrance */}
            <SectionReveal delay={0.2} direction="scale">
              <div ref={skillsRef} className="glass-card p-6 overflow-hidden">
                <h3 className="font-mono text-xs uppercase tracking-widest text-accent-light mb-8">
                  Tech Stack
                </h3>
                <div className="grid grid-cols-2 gap-y-12 gap-x-4 place-items-center pb-6">
                  {Object.entries(SKILLS).map(([category, items], idx) => {
                    const chunkSize = Math.ceil(items.length / 3);
                    const papers = [];
                    for (let i = 0; i < items.length; i += chunkSize) {
                      const chunk = items.slice(i, i + chunkSize);
                      papers.push(
                        <div
                          key={i}
                          className="text-center text-[10px] sm:text-xs text-gray-800 font-medium leading-tight px-1"
                        >
                          {chunk.map((skill, j) => (
                            <div key={j}>{skill}</div>
                          ))}
                        </div>
                      );
                    }

                    const colors = ["#7c5cfc", "#22d3ee", "#f43f5e", "#34d399"];

                    return (
                      <div key={category} className="flex flex-col items-center gap-3">
                        <Folder size={0.9} color={colors[idx % colors.length]} items={papers} />
                        <span className="text-xs font-mono text-text-muted mt-2 capitalize">
                          {category}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </SectionReveal>

            {/* Education — parallax offset */}
            <ParallaxLayer speed={-20}>
              <SectionReveal delay={0.35} direction="scale">
                <div className="glass-card p-6">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-accent-light mb-5">
                    Education
                  </h3>
                  {EDUCATION.map((edu, i) => (
                    <div key={i} className={i > 0 ? "mt-5 pt-5 border-t border-border" : ""}>
                      <p className="font-semibold text-sm text-text-primary">
                        {edu.degree}
                      </p>
                      <p className="text-sm text-text-secondary mt-0.5">
                        {edu.institution}
                      </p>
                      <p className="text-xs text-text-muted font-mono mt-1">
                        {edu.year}
                      </p>
                      <p className="text-xs text-text-muted mt-2 leading-relaxed">
                        {edu.coursework}
                      </p>
                    </div>
                  ))}
                </div>
              </SectionReveal>
            </ParallaxLayer>
          </div>
        </div>
      </div>
    </section>
  );
}
