export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 md:py-16 border-t border-border bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-lg font-heading tracking-tight text-foreground">
            NXT
          </span>
          
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
            <span>Build. Learn. Evolve.</span>
            <span className="hidden md:inline">·</span>
            <span>© {currentYear} NXT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
