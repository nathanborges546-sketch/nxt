import nxtGrid from "@/assets/nxt-grid.png";

/* Hero Grid Overlay - Subtle decorative texture ONLY for hero section */
export function HeroGridOverlay() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Grid positioned on right side, partially cropped, low opacity */}
      <div 
        className="absolute right-0 top-0 w-[70%] h-[80%] opacity-[0.05] dark:opacity-[0.08]"
        style={{
          maskImage: "linear-gradient(to left, black 20%, transparent 70%), linear-gradient(to bottom, black 30%, transparent 80%)",
          WebkitMaskImage: "linear-gradient(to left, black 20%, transparent 70%), linear-gradient(to bottom, black 30%, transparent 80%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      >
        <img 
          src={nxtGrid} 
          alt="" 
          className="w-full h-full object-cover scale-110 dark:invert"
        />
      </div>
    </div>
  );
}

/* Section Grid Overlay - Very subtle background texture */
export function SectionGridOverlay() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Grid positioned subtly, very low opacity */}
      <div 
        className="absolute left-0 bottom-0 w-[50%] h-[60%] opacity-[0.03] dark:opacity-[0.04]"
        style={{
          maskImage: "linear-gradient(to right, black 10%, transparent 60%), linear-gradient(to top, black 20%, transparent 70%)",
          WebkitMaskImage: "linear-gradient(to right, black 10%, transparent 60%), linear-gradient(to top, black 20%, transparent 70%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      >
        <img 
          src={nxtGrid} 
          alt="" 
          className="w-full h-full object-cover scale-110 dark:invert"
        />
      </div>
    </div>
  );
}

/* Simple line divider - NO grid texture */
export function LineDivider({ 
  className = "",
  animate = false 
}: { 
  className?: string;
  animate?: boolean;
}) {
  return (
    <div 
      className={`relative h-px overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div 
        className={`absolute inset-0 bg-border ${
          animate ? "animate-grid-line-reveal" : ""
        }`}
        style={{
          transformOrigin: "left",
          transform: animate ? undefined : "scaleX(1)"
        }}
      />
    </div>
  );
}
