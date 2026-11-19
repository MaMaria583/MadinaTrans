"use client";

import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Filtre par catégorie des articles (rendu serveur, filtrage côté client). */
export function NewsFilter({
  categories,
  children,
  listClassName = "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
}: {
  categories: string[];
  children: ReactNode;
  listClassName?: string;
}) {
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
              "min-h-10 rounded-[3px] border px-4 text-sm font-medium transition-colors",
              active === cat
                ? "border-navy-900 bg-navy-900 text-white"
                : "border-line bg-white text-navy-800 hover:border-navy-900",
            )}
          >
            {cat}
          </button>
        ))}
      </div>
      <ul ref={listRef} className={listClassName}>
        {children}
      </ul>
    </>
  );
}
