import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { LineDivider, SectionGridOverlay } from "./GlobalGridOverlay";

const services = [
  {
    title: "Websites as products",
    description: "We build websites with the same rigor applied to software. Clean architecture, fast performance, and a codebase designed to be maintained and extended — not patched.",
  },
  {
    title: "Digital product interfaces",
    description: "From dashboards to SaaS platforms, we create interfaces that prioritize usability, information hierarchy, and developer handoff. Every screen solves a problem.",
  },
  {
    title: "Scalable design systems",
    description: "We design component libraries and visual systems that work across teams, contexts, and time. Consistent by default. Flexible when needed.",
  },
  {
    title: "Technical direction",
    description: "For teams that need senior guidance on architecture, stack decisions, or product structure — we provide clarity before a single line of code is written.",
  },
];

export function WhatWeDo() {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section className="py-24 md:py-32 bg-background relative" ref={ref}>
      {/* Subtle grid texture overlay */}
      <SectionGridOverlay />
      
      <div className="container relative z-10">
        {/* Simple line divider - no grid texture */}
        <LineDivider 
          className="mb-16"
          animate={isRevealed}
        />
        
        <div className="mb-12 md:mb-20 max-w-3xl">
          <h2 
            className={`text-sm font-ui uppercase tracking-widest text-muted-foreground mb-6 transition-all duration-700 ease-out-expo ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            What we do
          </h2>
          <p 
            className={`text-2xl md:text-3xl font-heading leading-tight transition-all duration-700 ease-out-expo ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
            style={{ transitionDelay: "180ms" }}
          >
            We partner with product-minded companies to build digital infrastructure that grows with their ambition.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-16 md:gap-y-14">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className={`space-y-4 transition-all duration-700 ease-out-expo ${
                isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${260 + index * 80}ms` }}
            >
              {/* Small decorative line */}
              <div 
                className={`w-8 h-px bg-border transition-transform duration-800 ease-out-expo origin-left ${
                  isRevealed ? "scale-x-100" : "scale-x-0"
                }`}
                style={{ transitionDelay: `${300 + index * 80}ms` }}
              />
              <h3 className="text-xl md:text-2xl font-heading">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
