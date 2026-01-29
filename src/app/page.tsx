import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { CaseStudy } from "@/components/CaseStudy";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <section id="services">
          <Services />
        </section>
        <CaseStudy />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
