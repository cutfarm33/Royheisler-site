import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Roy Heisler",
  description: "Privacy policy for royheisler.com",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-muted mb-8">Last updated: January 2025</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-muted leading-relaxed">
              Roy Heisler (&quot;I&quot;, &quot;me&quot;, or &quot;my&quot;) operates royheisler.com.
              This page informs you of my policies regarding the collection, use, and
              disclosure of personal information when you use my website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Information Collection</h2>
            <p className="text-muted leading-relaxed">
              I collect information you provide directly when you contact me via email
              or through any contact forms on the site. This may include your name,
              email address, and any message content you choose to share.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Use of Information</h2>
            <p className="text-muted leading-relaxed">
              Information collected is used solely to respond to your inquiries and
              provide consulting services. I do not sell, trade, or rent your personal
              information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
            <p className="text-muted leading-relaxed">
              This site may use analytics services to understand how visitors interact
              with the website. These services collect information such as how often
              users visit the site, what pages they visit, and what other sites they
              used prior to coming to this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
            <p className="text-muted leading-relaxed">
              This website uses minimal cookies necessary for basic functionality.
              No tracking cookies are used for advertising purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
            <p className="text-muted leading-relaxed">
              This site is hosted on Vercel. Their privacy practices are governed by
              their own privacy policy. I may also link to external sites (like my
              products GearBase and AdBase Studio) which have their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p className="text-muted leading-relaxed">
              If you have questions about this privacy policy, please contact me at{" "}
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
