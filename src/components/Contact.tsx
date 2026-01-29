"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export function Contact() {
  return (
    <section id="contact" className="px-6 py-24 border-t border-border">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-mono text-muted uppercase tracking-wider">
            Let&apos;s Talk
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4 mb-4">
            Ready to Unbundle?
          </h2>
          <p className="text-muted text-lg mb-10 max-w-lg mx-auto">
            Book a free 30-minute audit. I&apos;ll review your current software
            stack and identify where you&apos;re overpaying — no commitment.
          </p>

          {/* Simple CTA for now - can be replaced with Calendly or form later */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              href="mailto:hello@royheisler.com?subject=Software%20Audit%20Request"
            >
              Book a Software Audit
            </Button>
            <p className="text-sm text-muted">
              or email{" "}
              <a
                href="mailto:hello@royheisler.com"
                className="text-foreground hover:text-accent transition-colors"
              >
                hello@royheisler.com
              </a>
            </p>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-xs text-muted uppercase tracking-wider mb-6">
              What you get in the audit
            </p>
            <div className="grid sm:grid-cols-3 gap-6 text-sm">
              <div className="space-y-2">
                <div className="w-10 h-10 mx-auto bg-card border border-border rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-muted"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <p className="font-medium">Stack Review</p>
                <p className="text-muted">
                  Full inventory of your current tools
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 mx-auto bg-card border border-border rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-muted"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="font-medium">Cost Analysis</p>
                <p className="text-muted">Where you&apos;re overspending</p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 mx-auto bg-card border border-border rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-muted"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="font-medium">Action Plan</p>
                <p className="text-muted">Concrete next steps to cut bloat</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
