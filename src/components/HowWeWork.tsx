import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { LineDivider } from "./GlobalGridOverlay";

const steps = [
  {
    title: "Understand",
    description: "Every project starts with research. We map the problem space, define constraints, and align on outcomes before any design work begins. This prevents rework and ensures strategic focus.",
  },
  {
    title: "Structure",
    description: "We define information architecture, component structure, and technical foundations. The system is designed before the interface. This is where clarity is built.",
  },
  {
    title: "Build",
    description: "Development and design happen in parallel. We ship iteratively, in working increments, with regular reviews. You see real progress, not static mockups.",
  },
  {
    title: "Evolve",
    description: "Launch is a milestone, not the finish line. We document, refine, and support post-launch iterations. Systems are built to be extended by your team or ours.",
  },
];

export function HowWeWork() {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section className="py-24 md:py-32 bg-secondary relative" ref={ref}>
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
            How we work
          </h2>
          <p 
            className={`text-2xl md:text-3xl font-heading leading-tight transition-all duration-700 ease-out-expo ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
            style={{ transitionDelay: "180ms" }}
          >
            A structured process that balances speed with quality. Every step builds on the last.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.title}
              className={`space-y-4 transition-all duration-700 ease-out-expo ${
                isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${260 + index * 90}ms` }}
            >
              {/* Step number with animated line */}
              <div className="flex items-center gap-3">
                <span className="inline-block text-sm text-muted-foreground font-ui tabular-nums">
                  0{index + 1}
                </span>
                <div 
                  className={`flex-1 h-px bg-border transition-transform duration-900 ease-out-expo origin-left ${
                    isRevealed ? "scale-x-100" : "scale-x-0"
                  }`}
                  style={{ transitionDelay: `${320 + index * 90}ms` }}
                />
              </div>
              <h3 className="text-xl md:text-2xl font-heading">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
