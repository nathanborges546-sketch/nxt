import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { LineDivider } from "./GlobalGridOverlay";

const reasons = [
  {
    statement: "We think in systems, not pages.",
    detail: "Every element is part of a larger structure. We design for scalability, consistency, and long-term maintainability — not isolated deliverables.",
  },
  {
    statement: "We build with an engineering mindset.",
    detail: "Clean code matters. Performance matters. We approach design with the precision of software development and ship code your team can actually work with.",
  },
  {
    statement: "We prioritize clarity over trends.",
    detail: "Our work is defined by restraint and intention. We solve real problems instead of chasing visual novelty or design trends.",
  },
  {
    statement: "We optimize for evolution.",
    detail: "Products change. Teams grow. We build foundations that adapt — so your next iteration doesn't require a complete rebuild.",
  },
];

export function WhyNXT() {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section className="py-24 md:py-32 bg-background relative" ref={ref}>
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
            Why NXT
          </h2>
          <p 
            className={`text-2xl md:text-3xl font-heading leading-tight transition-all duration-700 ease-out-expo ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
            style={{ transitionDelay: "180ms" }}
          >
            We're selective about the work we take. Here's what defines our approach.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-16 md:gap-y-12">
          {reasons.map((reason, index) => (
            <div 
              key={reason.statement}
              className={`space-y-3 transition-all duration-700 ease-out-expo ${
                isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${260 + index * 80}ms` }}
            >
              {/* Corner accent - simple geometric, uses currentColor */}
              <svg 
                viewBox="0 0 24 24" 
                className={`w-6 h-6 text-foreground transition-all duration-700 ease-out-expo ${
                  isRevealed ? "opacity-15" : "opacity-0"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                style={{ transitionDelay: `${280 + index * 80}ms` }}
              >
                <path d="M2 22 L2 2 L22 2" />
              </svg>
              <h3 className="text-xl md:text-2xl font-heading leading-tight">
                {reason.statement}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {reason.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
