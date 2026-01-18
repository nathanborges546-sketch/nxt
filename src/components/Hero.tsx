import { HeroGridOverlay } from "./GlobalGridOverlay";
import nxtIconWhite from "@/assets/nxt-icon-white.png";
import nxtArrowWhite from "@/assets/nxt-arrow-white.png";
export function Hero() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return <section className="min-h-screen flex items-center pt-20 bg-foreground text-background relative overflow-hidden">
      {/* Grid texture overlay - ONLY in hero section */}
      <HeroGridOverlay />
      
      <div className="container relative z-10">
        <div className="space-y-10">
          {/* Horizontal line accent */}
          <div className="w-16 h-px bg-background/30 animate-line-reveal" style={{
            animationDelay: "0.1s"
          }} />
          
          {/* Text + Icon row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Text content - columns 1-7 */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="animate-text-reveal animate-text-reveal-2 text-4xl md:text-5xl lg:text-6xl font-heading leading-[1.1] tracking-tight">
                Digital systems built with engineering precision.
              </h1>
              
              <p className="animate-text-reveal animate-text-reveal-3 text-lg md:text-xl text-background/70 max-w-xl leading-relaxed">
                NXT designs and develops websites, digital products, and software interfaces for companies that need systems that scale, not templates that break.
              </p>
            </div>
            
            {/* Large icon - columns 8-12 */}
            <div className="lg:col-span-5 hidden lg:flex justify-end items-center">
              <div className="relative w-full max-w-sm">
                <img 
                  src={nxtIconWhite} 
                  alt="" 
                  aria-hidden="true" 
                  className="w-full h-auto animate-icon-reveal opacity-[0.12] dark:invert dark:opacity-[0.16]" 
                />
              </div>
            </div>
          </div>
          
          {/* CTA section - separate from grid */}
          <div className="space-y-4">
            <button onClick={scrollToContact} className="animate-cta-reveal inline-flex items-center justify-center px-8 py-4 bg-background text-foreground font-ui font-medium transition-all duration-200 ease-out-expo hover:-translate-y-0.5 active:translate-y-0">
              Start a project
            </button>
            <p className="animate-text-reveal animate-text-reveal-5 text-sm text-background/50">
              Describe your challenge. We respond within 48 hours if we're the right fit.
            </p>
          </div>
        </div>
      </div>
    </section>;
}