import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Logo conceptuel TEMPORAIRE créé pour la démonstration.
 * Il ne s'agit pas du logo officiel de Madina Trans.
 */
export function LogoMark({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={cn("shrink-0", className)}>
      <path d="M3 42C10 24 23 10 45 6v7C28 16 17 28 12 42H3Z" fill="#C6A66A" />
      <path d="M16 42c5-11 14-19 29-22v7c-11 2-18 8-21 15h-8Z" fill={inverted ? "#FFFFFF" : "#101D32"} />
      <path d="M28 42c3-5 9-9 17-10v6c-4 1-7 2-9 4h-8Z" fill="#C6A66A" opacity="0.85" />
    </svg>
  );
}

export function Logo({
  inverted = false,
  className,
  withBaseline = true,
}: {
  inverted?: boolean;
  className?: string;
  withBaseline?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Madina Trans, retour à l'accueil"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <LogoMark className="h-9 w-9 min-[380px]:h-10 min-[380px]:w-10 sm:h-11 sm:w-11" inverted={inverted} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-sans text-[1.12rem] font-extrabold tracking-[-0.01em] whitespace-nowrap min-[380px]:text-[1.32rem] sm:text-[1.45rem]",
            inverted ? "text-white" : "text-navy-800",
          )}
        >
          MADINA <span className="text-gold-400">TRANS</span>
        </span>
        {withBaseline && (
          <span
            className={cn(
              "mt-1 text-[0.56rem] font-medium tracking-[0.06em] whitespace-nowrap uppercase min-[380px]:text-[0.62rem] min-[380px]:tracking-[0.08em]",
              inverted ? "text-navy-200" : "text-muted",
            )}
          >
            Transport · Transit · Logistique
          </span>
        )}
      </span>
    </Link>
  );
}
