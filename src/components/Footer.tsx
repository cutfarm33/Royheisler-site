"use client";

import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-6 py-12 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Branding */}
          <div className="text-center md:text-left">
            <p className="font-semibold mb-1">Roy Heisler</p>
            <p className="text-sm text-muted">
              Custom Internal Tools & Software Consulting
            </p>
          </div>

          {/* Center: CutFarm attribution */}
          <motion.a
            href="https://cutfarm.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <span>A production of</span>
            <span className="font-mono font-semibold text-foreground">
              CutFarm
            </span>
            <span>Digital Studio</span>
          </motion.a>

          {/* Right: Copyright */}
          <p className="text-sm text-muted">© {currentYear} All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
