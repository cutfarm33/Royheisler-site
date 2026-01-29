"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-24">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #fafafa 1px, transparent 1px),
                           linear-gradient(to bottom, #fafafa 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Badge */}
          <span className="inline-block px-4 py-1.5 mb-8 text-xs font-mono uppercase tracking-wider text-muted border border-border rounded-full">
            Software Unbundling
          </span>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Stop Renting
            <br />
            <span className="text-muted">Your Software.</span>
          </h1>

          {/* Sub-headline */}
          <div className="max-w-2xl mx-auto mb-10 space-y-2">
            <p className="text-lg sm:text-xl text-muted leading-relaxed">
              Stop renting features you don&apos;t use.
            </p>
            <p className="text-lg sm:text-xl text-foreground leading-relaxed">
              I build the exact tools you need to run your business.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" href="#contact">
              Book a Software Audit
            </Button>
            <Button variant="secondary" size="lg" href="#case-study">
              View Case Study
            </Button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-border rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-muted rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
