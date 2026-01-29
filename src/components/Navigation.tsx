"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export function Navigation() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo / Name */}
        <a
          href="/"
          className="font-semibold text-lg hover:text-muted transition-colors"
        >
          Roy Heisler
        </a>

        {/* Nav links - hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#case-study"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Work
          </a>
          <a
            href="#services"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Services
          </a>
          <Button size="sm" href="#contact">
            Get in Touch
          </Button>
        </div>

        {/* Mobile CTA */}
        <div className="md:hidden">
          <Button size="sm" href="#contact">
            Contact
          </Button>
        </div>
      </div>

      {/* Backdrop blur */}
      <div className="absolute inset-0 -z-10 bg-background/80 backdrop-blur-md border-b border-border/50" />
    </motion.nav>
  );
}
