import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={cn(
        "mb-3 inline-flex items-center gap-2.5 text-[0.8rem] font-bold tracking-[0.14em] uppercase",
        light ? "text-gold-300" : "text-gold-600",
      )}
    >
      <span aria-hidden="true" className="h-0.5 w-7 rounded-full bg-gold-400" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  light = false,
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <Tag
        className={cn(
          "text-3xl leading-[1.15] font-extrabold sm:text-4xl lg:text-[2.6rem]",
          light ? "text-white" : "text-navy-900",
        )}
      >
        {title}
      </Tag>
      {intro && <p className={cn("mt-5 text-lg leading-relaxed", light ? "text-navy-100" : "text-muted")}>{intro}</p>}
    </div>
  );
}
