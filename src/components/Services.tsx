"use client";

import { motion } from "framer-motion";

const services = [
  {
    number: "01",
    title: "SaaS Audit",
    description:
      "I review your monthly software spend and identify the bloat. Most teams are paying for features they'll never use. Let's cut the fat.",
    tags: ["Cost Analysis", "Vendor Review", "ROI Assessment"],
  },
  {
    number: "02",
    title: "Legacy Migration",
    description:
      "That Access database from 2008? The spreadsheet with 47 tabs? I move your critical data to modern, web-based tools your team will actually enjoy using.",
    tags: ["Data Migration", "Excel to Web", "Access Replacement"],
  },
  {
    number: "03",
    title: "Custom Dashboards",
    description:
      "No more wrestling with Tableau licenses. I build exactly the dashboard you need — the metrics you care about, nothing else — deployed on your infrastructure.",
    tags: ["Real-time Data", "Self-hosted", "Your Design"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Services() {
  return (
    <section className="px-6 py-24 border-t border-border">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <span className="text-sm font-mono text-muted uppercase tracking-wider">
            Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4 mb-4">
            The Unbundling
          </h2>
          <p className="text-muted text-lg">
            Three ways I help operations teams escape software bloat and
            spreadsheet hell.
          </p>
        </div>

        {/* Services grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service) => (
            <motion.div
              key={service.number}
              variants={itemVariants}
              className="group relative p-6 bg-card border border-border rounded-xl hover:border-muted transition-colors"
            >
              {/* Number */}
              <span className="text-6xl font-bold text-border group-hover:text-muted/30 transition-colors">
                {service.number}
              </span>

              {/* Content */}
              <h3 className="text-xl font-semibold mt-4 mb-3">
                {service.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-mono text-muted bg-background border border-border rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
