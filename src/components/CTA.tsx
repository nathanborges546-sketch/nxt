import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function CTA() {
  const { ref, isRevealed } = useScrollReveal();

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 md:py-32 bg-foreground text-background relative overflow-hidden" ref={ref}>
      {/* NO grid texture - clean background */}
      
      <div className="container relative z-10">
        {/* Section divider - simple line */}
        <div 
          className={`h-px bg-background/20 mb-16 transition-transform duration-900 ease-out-expo origin-left ${
            isRevealed ? "scale-x-100" : "scale-x-0"
          }`}
        />
        
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 
            className={`text-3xl md:text-4xl lg:text-5xl font-heading leading-tight transition-all duration-700 ease-out-expo ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
            style={{ transitionDelay: "120ms" }}
          >
            Ready to build something that lasts?
          </h2>
          
          <p 
            className={`text-lg text-background/70 max-w-xl mx-auto transition-all duration-700 ease-out-expo ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Describe your project, timeline, and goals. If there's a fit, we'll schedule a call to discuss next steps.
          </p>
          
          <button
            onClick={scrollToContact}
            className={`inline-flex items-center justify-center px-8 py-4 bg-background text-foreground font-ui font-medium transition-all duration-200 ease-out-expo hover:-translate-y-0.5 active:translate-y-0 ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
            style={{ 
              transitionDelay: isRevealed ? "300ms" : "0ms",
              transitionDuration: "600ms"
            }}
          >
            Start a project
          </button>
        </div>
      </div>
    </section>
  );
}
