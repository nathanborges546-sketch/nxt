import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WhatWeDo } from "@/components/WhatWeDo";
import { HowWeWork } from "@/components/HowWeWork";
import { WhyNXT } from "@/components/WhyNXT";
import { CTA } from "@/components/CTA";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <WhatWeDo />
        <HowWeWork />
        <WhyNXT />
        <CTA />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
