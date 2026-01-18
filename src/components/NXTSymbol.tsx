import nxtIconBlack from "@/assets/nxt-icon-black.png";

interface NXTSymbolProps {
  className?: string;
  animate?: boolean;
}

export function NXTSymbol({ className = "" }: NXTSymbolProps) {
  return (
    <img 
      src={nxtIconBlack} 
      alt="NXT" 
      className={`dark:invert ${className}`}
    />
  );
}
