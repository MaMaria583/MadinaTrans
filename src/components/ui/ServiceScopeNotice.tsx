import { ClipboardCheck } from "lucide-react";
import { DEMO_MODE } from "@/config/site";
import { serviceDetailsConfirmed, type Service } from "@/content/services";
import { cn } from "@/lib/cn";

/**
 * Mention affichée (en démonstration uniquement) sur une prestation dont le
 * détail n'a pas encore été validé par Madina Trans.
 */
export function ServiceScopeNotice({
  service,
  className,
  tone = "light",
}: {
  service: Service;
  className?: string;
  tone?: "light" | "dark";
}) {
  if (!DEMO_MODE || serviceDetailsConfirmed(service)) return null;
  return (
    <p
      role="note"
      className={cn(
        "flex items-start gap-2.5 rounded-xl border border-dashed px-4 py-3 text-sm leading-relaxed",
        tone === "light"
          ? "border-gold-400/70 bg-gold-50/70 text-navy-800"
          : "border-gold-300/50 bg-white/5 text-navy-100",
        className,
      )}
    >
      <ClipboardCheck
        className={cn("mt-0.5 size-4 shrink-0", tone === "light" ? "text-gold-700" : "text-gold-300")}
        aria-hidden="true"
      />
      <span>
        <strong>Périmètre à confirmer.</strong> Le détail de cette prestation est une proposition de rédaction : il sera
        validé par Madina Trans avant toute mise en ligne officielle.
      </span>
    </p>
  );
}
