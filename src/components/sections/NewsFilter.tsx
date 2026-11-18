"use client";

import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Filtre par catégorie des articles (rendu serveur, filtrage côté client). */
export function NewsFilter({ categories, children }: { categories: string[]; children: ReactNode }) {
  const [active, setActive] = useState("Tous");
  const listRef = useRef<HTMLUListElement>(null);

  const select = (cat: string) => {
    setActive(cat);
    listRef.current?.querySelectorAll<HTMLLIElement>(":scope > li").forEach((li) => {
      li.hidden = cat !== "Tous" && li.dataset.category !== cat;
    });
  };

  return (
    <>
      <div role="group" aria-label="Filtrer par catégorie" className="mb-10 flex flex-wrap gap-2">
        {["Tous", ...categories].map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={active === cat}
            onClick={() => select(cat)}
            className={cn(
              "min-h-10 rounded-full border px-4 text-sm font-semibold transition-colors",
              active === cat
                ? "border-navy-800 bg-navy-800 text-white"
                : "border-line bg-white text-navy-800 hover:border-navy-800",
            )}
          >
            {cat}
          </button>
        ))}
      </div>
      <ul ref={listRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </ul>
    </>
  );
}
