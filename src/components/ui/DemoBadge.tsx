import { DEMO_MODE } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Badge signalant une donnée fictive ou non confirmée.
 * Affiché uniquement en mode démonstration.
 */
export function DemoBadge({
  label = "À confirmer",
  className,
  tone = "light",
}: {
  label?: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  if (!DEMO_MODE) return null;
  return (
    <span
      title="Information de démonstration, à confirmer auprès de Madina Trans"
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-dashed px-2 py-0.5 align-middle text-[0.68rem] font-semibold tracking-wide whitespace-nowrap uppercase",
        tone === "light"
          ? "border-gold-500/60 bg-gold-50 text-gold-700"
          : "border-gold-300/60 bg-gold-300/10 text-gold-200",
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
