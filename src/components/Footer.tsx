"use client";

import { PROFILE } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative py-10 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-text-muted font-mono">
          &copy; {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
        </p>

        <p className="text-xs text-text-muted">
          Crafted with{" "}
          <span className="text-rose">♥</span>{" "}
          using Next.js, Tailwind CSS &amp; Framer Motion
        </p>
      </div>
    </footer>
  );
}
