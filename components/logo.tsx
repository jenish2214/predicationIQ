import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative flex h-8 w-8 items-center justify-center rounded-md border border-border bg-secondary">
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M10 1.25 2.5 4.5v5.25c0 4.55 3.2 8.79 7.5 9.5 4.3-.71 7.5-4.95 7.5-9.5V4.5L10 1.25Z"
            fill="hsl(var(--primary))"
          />
          <path
            d="M7.25 10.4 9 12.15l3.75-3.75"
            stroke="hsl(var(--primary-foreground))"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="absolute -bottom-0.5 right-0 h-1.5 w-1.5 rounded-full bg-accent" />
      </div>
      {showWordmark ? (
        <div className="flex flex-col leading-none">
          <span className="text-base font-semibold tracking-tight text-foreground">
            SovraID
          </span>
          <span className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Identity Network
          </span>
        </div>
      ) : null}
    </div>
  );
}
