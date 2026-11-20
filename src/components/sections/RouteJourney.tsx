"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface RouteStage {
  title: string;
  text: string;
  icon: ReactNode;
}

/**
 * Signature du site : « la route d'or ».
 * Sur ordinateur, la section se fige (sticky) pendant que le visiteur fait
 * défiler : une route dorée se trace d'un bout à l'autre, un repère la suit et
 * chaque étape s'allume à son passage. Sur mobile, la même route se trace à la
 * verticale sans figer la page. Mouvement réduit : route entièrement tracée.
 *
 * Moteur : une seule boucle requestAnimationFrame déclenchée par le défilement,
 * qui s'arrête dès que la progression est stable, et n'écrit dans le DOM que
 * lorsque la valeur change (méthodes du Skill 10k-websites, scrub-pipeline).
 * Seuls transform, opacity et stroke-dashoffset sont animés.
 */
export function RouteJourney({ header, stages }: { header: ReactNode; stages: RouteStage[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const items = Array.from(wrap.querySelectorAll<HTMLElement>("[data-stage]"));
    const path = wrap.querySelector<SVGPathElement>("path[data-route]");
    const dot = wrap.querySelector<HTMLElement>("[data-route-dot]");
    const total = path?.getTotalLength() ?? 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pinned = window.matchMedia("(min-width: 1024px)");

    let target = 0;
    let shown = -1;
    let raf: number | null = null;
    let lastActive = -1;

    const measure = () => {
      const r = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      if (pinned.matches) {
        const total = r.height - vh;
        return total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1;
      }
      // Mobile : progression à mesure que la liste traverse l'écran
      return Math.min(1, Math.max(0, (vh * 0.8 - r.top) / (r.height * 0.9)));
    };

    const write = (p: number) => {
      wrap.style.setProperty("--route", p.toFixed(4));
      if (path && dot && total) {
        // Le repère suit la route : position calculée dans le repère du SVG (1000 × 120), exprimée en %
        const pt = path.getPointAtLength(p * total);
        dot.style.transform = `translate(${(pt.x / 10).toFixed(2)}cqw, ${((pt.y / 120) * 100).toFixed(2)}cqh)`;
      }
      const active = Math.min(stages.length - 1, Math.floor(p * (stages.length - 1) + 0.15));
      if (active !== lastActive) {
        lastActive = active;
        items.forEach((el, i) => el.toggleAttribute("data-on", i <= active));
      }
    };

    const tick = () => {
      // Lissage (lerp) : la route suit la main avec une légère inertie, puis la boucle se repose
      shown = shown < 0 ? target : shown + (target - shown) * 0.18;
      if (Math.abs(target - shown) < 0.0015) shown = target;
      write(shown);
      raf = shown === target ? null : requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = measure();
      if (raf === null) raf = requestAnimationFrame(tick);
    };

    const apply = () => {
      if (reduce.matches) {
        window.removeEventListener("scroll", onScroll);
        if (raf !== null) cancelAnimationFrame(raf);
        raf = null;
        shown = target = 1;
        write(1);
        return;
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    };

    apply();
    reduce.addEventListener("change", apply);
    pinned.addEventListener("change", onScroll);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduce.removeEventListener("change", apply);
      pinned.removeEventListener("change", onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [stages.length]);

  // Tracé de la route (ordinateur) : une ligne légèrement ondulée, comme un axe routier vu de haut
  const d = "M 0 60 C 120 20, 200 100, 320 60 S 520 20, 640 60 S 860 100, 1000 60";

  return (
    <div ref={wrapRef} className="relative lg:h-[240vh]" style={{ ["--route" as string]: 0 }}>
      <div className="lg:sticky lg:top-0 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:py-16">
        {header}

        {/* Ordinateur : route horizontale */}
        <div className="relative mt-16 hidden lg:block">
          <svg
            viewBox="0 0 1000 120"
            preserveAspectRatio="none"
            className="h-24 w-full overflow-visible"
            aria-hidden="true"
          >
            <path
              d={d}
              fill="none"
              stroke="rgb(255 255 255 / 0.12)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            <path
              data-route
              d={d}
              pathLength={1}
              fill="none"
              stroke="var(--color-gold-400)"
              strokeWidth="2.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ strokeDasharray: 1, strokeDashoffset: "calc(1 - var(--route))" }}
            />
          </svg>
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 [container-type:size]">
            <span
              data-route-dot
              className="absolute top-0 left-0 -mt-2 -ml-2 block size-4 rounded-full bg-gold-300 shadow-[0_0_0_6px_rgb(198_166_106/0.25)] will-change-transform"
            />
          </span>
        </div>

        <ol className="relative mt-10 grid gap-0 lg:mt-12 lg:grid-cols-5 lg:gap-6">
          {/* Mobile : route verticale qui se trace */}
          <li aria-hidden="true" className="absolute top-2 bottom-2 left-[1.6rem] w-px bg-white/12 lg:hidden">
            <span className="block h-full w-px origin-top bg-gold-400" style={{ transform: "scaleY(var(--route))" }} />
          </li>
          {stages.map((stage, i) => (
            <li
              key={stage.title}
              data-stage
              className={cn(
                "group/stage relative flex gap-5 pb-10 last:pb-0 lg:block lg:pb-0",
                "[&:not([data-on])_.stage-icon]:border-white/15 [&:not([data-on])_.stage-icon]:text-navy-300",
                "[&:not([data-on])_.stage-text]:opacity-45",
              )}
            >
              <span className="stage-icon relative z-10 inline-flex size-[3.25rem] shrink-0 items-center justify-center rounded-full border border-gold-400/70 bg-navy-900 text-gold-300 transition-[color,border-color] duration-300">
                {stage.icon}
              </span>
              <div className="stage-text transition-opacity duration-500 lg:mt-5">
                <p className="font-display text-sm text-gold-400 tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 font-display text-2xl font-normal">{stage.title}</h3>
                <p className="mt-2 max-w-[28ch] text-[0.95rem] leading-relaxed text-navy-200">{stage.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
