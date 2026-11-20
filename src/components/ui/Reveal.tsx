"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Apparition discrète au défilement (respecte prefers-reduced-motion via CSS).
 * kind="fade" : le bloc monte et apparaît ; kind="media" : la photographie se
 * dévoile de bas en haut et se pose ; kind="rule" : un filet se trace.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  kind = "fade",
  as: Tag = "div",
}: {
  children?: ReactNode;
  className?: string;
  delay?: number;
  kind?: "fade" | "media" | "rule";
  as?: "div" | "li" | "article" | "section" | "span";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={cn(kind === "media" ? "reveal-media" : kind === "rule" ? "reveal-rule" : "reveal", className)}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
