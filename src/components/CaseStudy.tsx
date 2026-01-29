"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

const caseStudies = [
  {
    id: "gearbase",
    name: "GearBase",
    url: "https://mygearbase.com",
    domain: "mygearbase.com",
    tagline: "Personal Inventory Management",
    description:
      "A production inventory system handling thousands of items with real-time search. Built for photographers, hikers, and collectors who need insurance-grade tracking.",
    highlights: [
      { label: "Real-time Sync", description: "Changes propagate instantly across all devices" },
      { label: "Offline Capable", description: "Works without internet, syncs when reconnected" },
      { label: "Secure Data", description: "Row-level security ensures data isolation" },
      { label: "Sub-100ms Search", description: "Instant filtering across thousands of items" },
    ],
    mockInterface: "inventory",
  },
  {
    id: "adbase",
    name: "AdBase Studio",
    url: "https://adbasestudio.com",
    domain: "adbasestudio.com",
    tagline: "Video Asset Management for Agencies",
    description:
      "A video asset management platform for advertising agencies. AI-powered metadata generation, broadcast tracking, and client portal access — all in one place.",
    highlights: [
      { label: "AI Metadata", description: "Auto-generates descriptions for uploaded assets" },
      { label: "Broadcast Tracking", description: "Monitors when and where ads air" },
      { label: "Client Portals", description: "Give clients secure access to their assets" },
      { label: "Vimeo + Dropbox", description: "Seamless integration with existing workflows" },
    ],
    mockInterface: "video",
  },
];

function GearBaseMock() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex gap-3">
        <div className="flex-1 h-10 bg-background border border-border rounded-lg flex items-center px-3">
          <svg className="w-4 h-4 text-muted mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-sm text-muted">Search 2,847 items...</span>
        </div>
        <div className="h-10 px-4 bg-accent rounded-lg flex items-center">
          <span className="text-sm font-medium text-white">+ Add</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 px-3 py-2 text-xs font-mono text-muted uppercase tracking-wider border-b border-border">
        <span>Item</span>
        <span>Category</span>
        <span>Value</span>
        <span>Status</span>
      </div>
      {[
        { name: "Sony A7IV", cat: "Camera", val: "$2,498", status: "Owned" },
        { name: "Peak Design Bag", cat: "Bags", val: "$299", status: "Owned" },
        { name: "DJI Mavic 3", cat: "Drone", val: "$2,049", status: "Wishlist" },
      ].map((item, i) => (
        <div key={i} className="grid grid-cols-4 gap-4 px-3 py-3 text-sm border-b border-border/50 hover:bg-background/50 transition-colors">
          <span className="font-medium truncate">{item.name}</span>
          <span className="text-muted">{item.cat}</span>
          <span className="font-mono">{item.val}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full w-fit ${item.status === "Owned" ? "bg-green-500/20 text-green-400" : "bg-amber-500/20 text-amber-400"}`}>
            {item.status}
          </span>
        </div>
      ))}
    </div>
  );
}

function AdBaseMock() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex gap-3">
        <div className="flex-1 h-10 bg-background border border-border rounded-lg flex items-center px-3">
          <svg className="w-4 h-4 text-muted mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-sm text-muted">Search assets...</span>
        </div>
        <div className="h-10 px-4 bg-accent rounded-lg flex items-center">
          <span className="text-sm font-medium text-white">Upload</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { name: "Q1 Campaign Hero", duration: "0:30", status: "Aired" },
          { name: "Product Launch Cut", duration: "0:15", status: "Review" },
          { name: "Holiday Spot v2", duration: "0:60", status: "Draft" },
        ].map((item, i) => (
          <div key={i} className="bg-background border border-border rounded-lg overflow-hidden">
            <div className="aspect-video bg-border/50 flex items-center justify-center">
              <svg className="w-8 h-8 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="p-2">
              <p className="text-xs font-medium truncate">{item.name}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-muted">{item.duration}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded ${
                  item.status === "Aired" ? "bg-green-500/20 text-green-400" :
                  item.status === "Review" ? "bg-amber-500/20 text-amber-400" :
                  "bg-muted/20 text-muted"
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CaseStudy() {
  return (
    <section id="case-study" className="px-6 py-24 border-t border-border">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <span className="text-sm font-mono text-muted uppercase tracking-wider">
            Case Studies
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4 mb-4">
            I Don&apos;t Just Consult. I Ship.
          </h2>
          <p className="text-muted text-lg">
            These are production apps I built and maintain. The same architecture
            and attention to detail goes into every client project.
          </p>
        </div>

        {/* Case Studies */}
        <div className="space-y-24">
          {caseStudies.map((study, index) => (
            <div
              key={study.id}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Mock browser window */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
              >
                <div className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-background border-b border-border">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-border" />
                      <div className="w-3 h-3 rounded-full bg-border" />
                      <div className="w-3 h-3 rounded-full bg-border" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-card border border-border rounded px-3 py-1 text-xs font-mono text-muted">
                        {study.domain}
                      </div>
                    </div>
                  </div>

                  {/* Mock interface */}
                  {study.mockInterface === "inventory" ? <GearBaseMock /> : <AdBaseMock />}
                </div>

                {/* Decorative gradient */}
                <div className={`absolute -inset-4 -z-10 bg-gradient-to-r ${
                  index % 2 === 0 ? "from-accent/20 via-transparent to-transparent" : "from-transparent via-transparent to-accent/20"
                } rounded-2xl blur-3xl opacity-50`} />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}
              >
                <div>
                  <span className="text-sm font-mono text-accent">{study.tagline}</span>
                  <h3 className="text-2xl font-bold mt-2">{study.name}</h3>
                  <p className="text-muted mt-3">{study.description}</p>
                </div>

                <div className="grid gap-3">
                  {study.highlights.map((item, i) => (
                    <div
                      key={i}
                      className="flex gap-4 p-4 bg-card border border-border rounded-lg"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-accent/10 border border-accent/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.label}</h4>
                        <p className="text-sm text-muted">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    href={study.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Try {study.name}
                  </Button>
                  <Button variant="ghost" href="#contact">
                    Build Something Similar →
                  </Button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
