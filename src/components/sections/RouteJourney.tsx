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
 * défiler : une ligne dorée relie les étapes en passant par le centre de chaque
 * pictogramme, un repère la suit et chaque étape s'allume à son passage (l'étape
 * en cours est pleine). Sur mobile, la même ligne se trace à la verticale, en
 * chronologie, sans figer la page. Mouvement réduit : ligne entièrement tracée.
 *
 * Moteur : une seule boucle requestAnimationFrame déclenchée par le défilement,
 * qui s'arrête dès que la progression est stable, et n'écrit dans le DOM que
 * lorsque la valeur change (méthodes du Skill 10k-websites, scrub-pipeline).
 * Seuls transform et opacity sont animés ; la position découle de --route en CSS.
 */
export function RouteJourney({ header, stages }: { header: ReactNode; stages: RouteStage[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const items = Array.from(wrap.querySelectorAll<HTMLElement>("[data-stage]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pinned = window.matchMedia("(min-width: 1024px)");
    const last = stages.length - 1;

    let target = 0;
    let shown = -1;
    let raf: number | null = null;
    let lastActive = -2;

    const measure = () => {
      const r = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      if (pinned.matches) {
        const total = r.height - vh;
        // La ligne se termine un peu avant la fin du maintien : la dernière étape reste lisible
        return total > 0 ? Math.min(1, Math.max(0, -r.top / (total * 0.85))) : 1;
      }
      // Mobile : progression à mesure que la chronologie traverse l'écran
      return Math.min(1, Math.max(0, (vh * 0.72 - r.top) / (r.height * 0.82)));
    };

    const write = (p: number) => {
      wrap.style.setProperty("--route", p.toFixed(4));
      // Une étape s'allume quand la ligne atteint le centre de son pictogramme
      const active = p <= 0 ? -1 : Math.min(last, Math.floor(p * last + 0.02));
      if (active !== lastActive) {
        lastActive = active;
        items.forEach((el, i) => {
          el.toggleAttribute("data-on", i <= active);
          el.toggleAttribute("data-current", i === active);
        });
      }
    };

    const tick = () => {
      // Lissage (lerp) : la ligne suit la main avec une légère inertie, puis la boucle se repose
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

  return (
    <div ref={wrapRef} className="relative lg:h-[230vh]" style={{ ["--route" as string]: 0 }}>
      <div className="lg:sticky lg:top-0 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:py-20">
        {header}

        <div className="relative mt-14 [container-type:inline-size] lg:mt-20">
          {/* Ordinateur : ligne horizontale du centre du 1er pictogramme au centre du dernier (80 % de la largeur) */}
          <div aria-hidden="true" className="absolute top-8 left-8 hidden h-px w-[80cqw] bg-white/14 lg:block">
            <span
              className="block h-full origin-left bg-gradient-to-r from-gold-500 to-gold-300"
              style={{ transform: "scaleX(var(--route))" }}
            />
            <span
              className="absolute top-0 left-0 -mt-[5px] -ml-[5px] block size-[11px] rounded-full bg-gold-300 shadow-[0_0_0_5px_rgb(198_166_106/0.22),0_0_18px_rgb(216_192_143/0.55)] will-change-transform"
              style={{ transform: "translateX(calc(var(--route) * 80cqw))" }}
            />
          </div>

          {/* Mobile : ligne verticale qui passe par le centre des pictogrammes */}
          <div aria-hidden="true" className="absolute top-7 bottom-0 left-7 w-px bg-white/14 lg:hidden">
            <span
              className="block h-full w-px origin-top bg-gradient-to-b from-gold-500 to-gold-300"
              style={{ transform: "scaleY(var(--route))" }}
            />
          </div>

          <ol className="relative grid lg:grid-cols-5">
            {stages.map((stage, i) => (
              <li
                key={stage.title}
                data-stage
                className={cn(
                  "group/stage relative flex gap-6 pb-12 last:pb-0 lg:block lg:pr-8 lg:pb-0",
                  // Étape pas encore atteinte : estompée mais lisible
                  "[&:not([data-on])_.stage-icon]:border-white/15 [&:not([data-on])_.stage-icon]:text-navy-300",
                  "[&:not([data-on])_.stage-text]:opacity-55",
                  // Étape en cours : pictogramme plein, halo doré
                  "[&[data-current]_.stage-icon]:bg-gold-400 [&[data-current]_.stage-icon]:text-navy-950 [&[data-current]_.stage-icon]:shadow-[0_0_0_7px_rgb(198_166_106/0.16)]",
                )}
              >
                {i === stages.length - 1 && (
                  // La ligne verticale s'arrête au centre du dernier pictogramme
                  <span
                    aria-hidden="true"
                    className="absolute top-14 bottom-0 left-[1.6rem] w-1.5 bg-navy-900 lg:hidden"
                  />
                )}
                <span className="stage-icon relative z-10 inline-flex size-14 shrink-0 items-center justify-center rounded-full border border-gold-400/80 bg-navy-900 text-gold-300 transition-[color,border-color,background-color,box-shadow] duration-500 ease-[var(--ease-premium)] lg:size-16">
                  {stage.icon}
                </span>
                <div className="stage-text pt-1 transition-opacity duration-500 lg:mt-7 lg:pt-0">
                  <p className="label-caps text-gold-400">
                    Étape <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  </p>
                  <h3 className="mt-2.5 font-display text-[1.7rem] leading-tight font-normal lg:text-[1.85rem]">
                    {stage.title}
                  </h3>
                  <span aria-hidden="true" className="mt-4 block h-px w-8 bg-gold-400/60" />
                  <p className="mt-4 max-w-[30ch] text-[1.02rem] leading-relaxed text-navy-100">{stage.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
