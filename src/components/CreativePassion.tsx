"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CREATIVE_PASSIONS, PROFILE } from "@/lib/data";
import SectionReveal from "./SectionReveal";
import MagneticButton from "./MagneticButton";
import ScrollTextReveal from "./ScrollTextReveal";

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function CreativePassion() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: sectionScrollY } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // YouTube CTA parallax
  const ctaY = useTransform(sectionScrollY, [0.5, 1], [40, -20]);
  const ctaRotate = useTransform(sectionScrollY, [0.5, 1], [1, -0.5]);

  return (
    <section ref={sectionRef} id="creative" className="relative py-32 px-6 overflow-hidden">
      {/* Separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <span className="section-label">Creative Side</span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
            When I&apos;m not<br />
            <span className="text-gradient-warm">coding</span>.
          </h2>
        </SectionReveal>

        <ScrollTextReveal
          text="I'm deeply passionate about content creation, videography, photography, and gaming. Creativity isn't separate from my engineering — it fuels it."
          className="text-lg sm:text-xl text-text-secondary font-light max-w-2xl mb-16 leading-relaxed"
        />

        {/* Drag Hint */}
        <div className="mt-12 mb-4 flex items-center gap-3 text-text-muted/60 px-6 sm:px-0">
          <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          <span className="font-mono uppercase tracking-widest text-[10px]">Drag to explore</span>
        </div>

        <div ref={carouselRef} className="relative -mx-6 px-6 sm:-mx-0 sm:px-0 overflow-hidden cursor-grab active:cursor-grabbing pb-12">
          <motion.div
            drag="x"
            dragConstraints={carouselRef}
            className="flex gap-8 w-max"
          >
            {CREATIVE_PASSIONS.map((passion, i) => (
              <div key={passion.title} className="w-[85vw] sm:w-[400px] flex-shrink-0 pointer-events-none">
                <div className="glass-card p-10 h-[400px] flex flex-col justify-center group relative overflow-hidden pointer-events-auto">
                  <motion.div
                    className="absolute right-[-20%] bottom-[-20%] text-[200px] opacity-5 rotate-12 pointer-events-none"
                  >
                    {passion.icon}
                  </motion.div>
                  
                  <div className="text-5xl mb-6 text-rose relative z-10">
                    {passion.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-text-primary mb-4 relative z-10">
                    {passion.title}
                  </h3>

                  <p className="text-base text-text-secondary leading-relaxed relative z-10">
                    {passion.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* YouTube CTA — parallax float */}
        <SectionReveal delay={0.2} direction="scale">
          <motion.div
            className="glass-card p-8 sm:p-10 text-center border-gradient"
            style={{ y: ctaY, rotateZ: ctaRotate }}
          >
            <motion.div
              className="text-5xl mb-4"
              whileInView={{ scale: [0.5, 1.2, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              🎥
            </motion.div>
            <h3 className="text-2xl font-bold text-text-primary mb-3">
              TimePass Society
            </h3>
            <p className="text-text-secondary max-w-md mx-auto mb-6 text-sm leading-relaxed">
              Check out my YouTube channel where I share creative video content,
              vlogs, and behind-the-scenes of my journey in tech and beyond.
            </p>
            <MagneticButton
              href={PROFILE.social.youtube}
              variant="filled"
              target="_blank"
              rel="noopener noreferrer"
              className="!bg-gradient-to-r !from-red-600 !to-red-500"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span>Visit My Channel</span>
            </MagneticButton>
          </motion.div>
        </SectionReveal>
      </div>
    </section>
  );
}
