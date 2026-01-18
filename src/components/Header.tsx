import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out-expo ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-sm border-b border-border" 
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Left: NXT wordmark only */}
        <a 
          href="/" 
          className="animate-text-reveal animate-text-reveal-1 flex items-center"
        >
          <span className="text-xl md:text-2xl font-heading tracking-tight text-foreground">
            NXT
          </span>
        </a>
        
        {/* Right: Theme toggle, Contact link, and NXT symbol (separate from wordmark) */}
        <div className="flex items-center gap-6 animate-text-reveal animate-text-reveal-2">
          <ThemeToggle />
          
          <button
            onClick={scrollToContact}
            className="font-ui text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Contact
          </button>
        </div>
      </div>
    </header>
  );
}
