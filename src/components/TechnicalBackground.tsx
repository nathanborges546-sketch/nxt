import technicalGrid from "@/assets/technical-grid.png";

interface TechnicalBackgroundProps {
  variant?: "light" | "dark" | "inverted";
  opacity?: number;
  showGrid?: boolean;
  showDecoration?: boolean;
  decorationPosition?: "top-left" | "bottom-right" | "center";
  className?: string;
}

export function TechnicalBackground({
  variant = "light",
  opacity = 0.04,
  showGrid = true,
  showDecoration = false,
  decorationPosition = "bottom-right",
  className = "",
}: TechnicalBackgroundProps) {
  const gridOpacity = variant === "dark" ? opacity * 1.5 : opacity;
  
  const decorationPositions = {
    "top-left": "top-0 left-0 -translate-x-1/4 -translate-y-1/4",
    "bottom-right": "bottom-0 right-0 translate-x-1/4 translate-y-1/4",
    "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Technical grid lines */}
      {showGrid && (
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--foreground) / ${gridOpacity}) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--foreground) / ${gridOpacity}) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      )}
      
      {/* Abstract technical decoration */}
      {showDecoration && (
        <div 
          className={`absolute w-[800px] h-[800px] ${decorationPositions[decorationPosition]} animate-decorative-reveal`}
          style={{ opacity: variant === "dark" ? 0.06 : 0.03 }}
        >
          <img 
            src={technicalGrid} 
            alt="" 
            className={`w-full h-full object-contain ${variant === "inverted" ? "invert" : ""}`}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}

/* Section separator line */
export function SectionDivider({ 
  className = "", 
  animate = false 
}: { 
  className?: string; 
  animate?: boolean;
}) {
  return (
    <div 
      className={`h-px bg-border ${animate ? "animate-line-reveal" : ""} ${className}`}
      style={{ transformOrigin: "left" }}
    />
  );
}

/* Geometric accent shapes */
export function GeometricAccent({ 
  variant = "chevron",
  size = "md",
  className = "" 
}: { 
  variant?: "chevron" | "line" | "corner";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-32 h-32",
  };

  if (variant === "line") {
    return (
      <div 
        className={`h-px bg-foreground/10 ${className}`}
        style={{ width: size === "sm" ? "40px" : size === "md" ? "80px" : "160px" }}
      />
    );
  }

  if (variant === "corner") {
    return (
      <svg 
        viewBox="0 0 40 40" 
        className={`${sizes[size]} ${className}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        style={{ opacity: 0.15 }}
      >
        <path d="M0 40 L0 0 L40 0" />
      </svg>
    );
  }

  return (
    <svg 
      viewBox="0 0 40 40" 
      className={`${sizes[size]} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      style={{ opacity: 0.15 }}
    >
      <path d="M10 5 L10 35 L30 20 Z" />
    </svg>
  );
}
