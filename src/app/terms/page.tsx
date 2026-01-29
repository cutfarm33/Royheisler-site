import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Roy Heisler",
  description: "Terms of service for royheisler.com",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-muted mb-8">Last updated: January 2025</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
            <p className="text-muted leading-relaxed">
              By accessing royheisler.com, you agree to be bound by these Terms of
              Service. If you disagree with any part of the terms, you may not access
              the website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Consulting Services</h2>
            <p className="text-muted leading-relaxed">
              Any consulting services provided are subject to separate agreements.
              The information on this website is for general informational purposes
              and does not constitute professional advice. Specific project terms,
              deliverables, and pricing are established through individual client
              agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
            <p className="text-muted leading-relaxed">
              The content, design, and code of this website are owned by Roy Heisler
              unless otherwise stated. You may not reproduce, distribute, or create
              derivative works without explicit permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">External Links</h2>
            <p className="text-muted leading-relaxed">
              This website may contain links to third-party websites (including my
              products GearBase and AdBase Studio). I am not responsible for the
              content or practices of these external sites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="text-muted leading-relaxed">
              The information on this website is provided &quot;as is&quot; without warranties
              of any kind. I am not liable for any damages arising from the use of
              this website or reliance on its content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
            <p className="text-muted leading-relaxed">
              I reserve the right to modify these terms at any time. Changes will be
              posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p className="text-muted leading-relaxed">
              For questions about these terms, contact me at{" "}
              <a
                href="mailto:hello@royheisler.com"
                className="text-foreground hover:text-accent transition-colors"
              >
                hello@royheisler.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <a
            href="/"
            className="text-muted hover:text-foreground transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
