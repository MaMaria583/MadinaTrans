import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10", className)}>{children}</div>;
}

/** Sur-titre éditorial : filet doré et petite capitale espacée (au plus un pour trois sections). */
export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={cn("mb-5 inline-flex items-center gap-3 label-caps", light ? "text-gold-300" : "text-gold-700")}>
      <span aria-hidden="true" className="h-px w-10 bg-gold-400" />
      {children}
    </p>
  );
}

/**
 * Mise en valeur dans un titre : italique serif en or champagne.
 * Signature typographique de la marque.
 */
export function Highlight({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <em className={cn("font-normal italic", light ? "text-gold-300" : "text-gold-600")}>{children}</em>;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  light = false,
  as: Tag = "h2",
  id,
  size = "lg",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  as?: "h1" | "h2";
  id?: string;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <Tag
        id={id}
        className={cn(
          "font-normal tracking-[-0.02em]",
          size === "lg"
            ? "text-[clamp(2rem,4.8vw,3.4rem)] leading-[1.06]"
            : "text-[clamp(1.7rem,3.6vw,2.5rem)] leading-[1.1]",
          light ? "text-white" : "text-navy-900",
        )}
      >
        {title}
      </Tag>
      {intro && (
        <p
          className={cn(
            "mt-6 max-w-2xl text-[1.05rem] leading-[1.75] sm:text-lg",
            align === "center" && "mx-auto",
            light ? "text-navy-100/90" : "text-muted",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
