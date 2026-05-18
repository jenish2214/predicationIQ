export function SiteBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 opacity-[0.35] bg-line-grid animate-grid-drift" />
      <div className="absolute inset-0 opacity-[0.5] bg-dot-grid" />
      <div className="absolute -left-40 top-[-12rem] h-[36rem] w-[36rem] rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -right-32 top-[40%] h-[28rem] w-[28rem] rounded-full bg-accent/8 blur-3xl" />
      <div className="absolute left-1/2 top-[80%] h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-px bg-border" />
    </div>
  );
}
