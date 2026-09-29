"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TIMELINE_EVENTS } from "@/lib/data";
import SectionReveal from "./SectionReveal";
import ScrollTextReveal from "./ScrollTextReveal";



export default function BeyondCode() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Scroll-linked timeline line drawing
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.8", "end 0.6"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section ref={sectionRef} id="beyond" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionReveal>
          <span className="section-label">Beyond the Code</span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
            Soft skills &amp;<br />
            <span className="text-gradient">extracurriculars</span>.
          </h2>
        </SectionReveal>

        <ScrollTextReveal
          text="Great engineers are also great communicators. Here's where I sharpen the other half of the equation — through hackathons, public speaking, and creative projects."
          className="text-lg sm:text-xl text-text-secondary font-light max-w-2xl mb-16 leading-relaxed"
        />

        {/* Timeline */}
        <div ref={timelineRef} className="relative pl-10">
          {/* Scroll-drawn vertical line */}
          <div className="absolute left-[1.25rem] top-0 bottom-0 w-px bg-border/30" />
          <motion.div
            className="absolute left-[1.25rem] top-0 w-px bg-gradient-to-b from-accent via-accent-light to-cyan origin-top"
            style={{ height: lineHeight, opacity: lineOpacity }}
          />

          {TIMELINE_EVENTS.map((event, i) => (
            <SectionReveal key={i} delay={i * 0.08} direction={i % 2 === 0 ? "left" : "right"} distance={40}>
              <div className="relative mb-12 last:mb-0">
                {/* Dot — pulses when drawn into */}
                <motion.div
                  className="absolute left-[-1.625rem] top-[0.375rem] w-3 h-3 rounded-full border-2 border-accent bg-bg-primary"
                  whileInView={{ scale: [1, 1.5, 1], borderColor: ["#7c5cfc", "#22d3ee", "#7c5cfc"] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />

                {/* Content */}
                <motion.div
                  className="glass-card p-6"
                  whileInView={{ opacity: 1, filter: "blur(0px)" }}
                  initial={{ opacity: 0.5, filter: "blur(4px)" }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
                >


                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {event.title}
                  </h3>

                  <p className="text-sm text-text-secondary leading-relaxed">
                    {event.description}
                  </p>
                </motion.div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
