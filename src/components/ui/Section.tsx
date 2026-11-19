import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

/** Sur-titre de section, avec numéro optionnel (« 01 — Nos métiers »). */
export function Eyebrow({ children, light = false, index }: { children: ReactNode; light?: boolean; index?: number }) {
  return (
    <p
      className={cn(
        "mb-4 inline-flex items-center gap-3 text-[0.78rem] font-bold tracking-[0.16em] uppercase",
        light ? "text-gold-300" : "text-gold-600",
      )}
    >
      {index !== undefined ? (
        <span
          className={cn(
            "font-display text-[0.8rem] tracking-normal tabular-nums",
            light ? "text-white/60" : "text-navy-300",
          )}
        >
          {String(index).padStart(2, "0")}
        </span>
      ) : null}
      <span aria-hidden="true" className="h-px w-8 bg-gold-400" />
      {children}
    </p>
  );
}

/**
 * Mot ou expression mis en valeur dans un titre : or + trait de soulignement
 * en forme de route, rappel du logo.
 */
export function Highlight({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span className={cn("relative inline-block whitespace-nowrap", light ? "text-gold-400" : "text-gold-600")}>
      <span className="relative z-10">{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        className="absolute -bottom-1.5 left-0 h-2.5 w-full text-gold-400/70"
      >
        <path d="M2 9C40 3 120 1 198 5" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  index,
  title,
  intro,
  align = "left",
  light = false,
  as: Tag = "h2",
  id,
  className,
}: {
  eyebrow?: string;
  index?: number;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  as?: "h1" | "h2";
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Eyebrow light={light} index={index}>
          {eyebrow}
        </Eyebrow>
      )}
      <Tag
        id={id}
        className={cn(
          "text-[clamp(1.8rem,4.4vw,2.75rem)] leading-[1.12] font-extrabold",
          light ? "text-white" : "text-navy-900",
        )}
      >
        {title}
      </Tag>
      {intro && (
        <p
          className={cn(
            "mt-5 text-[1.05rem] leading-relaxed sm:text-lg",
            align === "center" && "mx-auto max-w-2xl",
            light ? "text-navy-100" : "text-muted",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
