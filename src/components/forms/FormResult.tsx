"use client";

import { CircleCheck, Info } from "lucide-react";
import { labelFor, serviceOptions, type FormKind } from "@/lib/forms";
import { cn } from "@/lib/cn";
import type { SubmitState } from "./useRequestForm";

/** Panneau affiché après soumission (démo ou envoi réel). */
export function FormResult({
  kind,
  state,
  onReset,
  tone = "light",
}: {
  kind: FormKind;
  state: Extract<SubmitState, { status: "demo" } | { status: "sent" }>;
  onReset: () => void;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  if (state.status === "sent") {
    return (
      <div role="status" className="flex flex-col items-start gap-4">
        <CircleCheck className="size-12 text-emerald-500" aria-hidden="true" />
        <h3 className={cn("text-2xl font-bold", dark ? "text-white" : "text-navy-900")}>Demande envoyée</h3>
        <p className={dark ? "text-navy-100" : "text-muted"}>
          Merci ! Votre {kind === "quote" ? "demande de devis" : "message"} a bien été transmis à nos équipes, qui
          reviendront vers vous dans les meilleurs délais.
        </p>
        <button type="button" onClick={onReset} className="font-semibold text-gold-500 underline underline-offset-4">
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  const summary = Object.entries(state.fields).filter(([k, v]) => v && k !== "consent" && k !== "message");

  return (
    <div role="status" className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="inline-flex size-11 items-center justify-center rounded-full bg-gold-400 text-navy-950">
          <Info className="size-6" aria-hidden="true" />
        </span>
        <h3 className={cn("text-xl font-bold", dark ? "text-white" : "text-navy-900")}>
          Formulaire validé — mode démonstration
        </h3>
      </div>
      <p className={cn("leading-relaxed", dark ? "text-navy-100" : "text-muted")}>
        Votre saisie est correcte, mais{" "}
        <strong className={dark ? "text-white" : "text-navy-900"}>aucune demande n&apos;a été transmise</strong> : le
        service de réception des demandes n&apos;est pas encore raccordé sur ce site de démonstration. Aucune donnée
        n&apos;a été enregistrée.
      </p>
      <dl
        className={cn(
          "grid gap-x-6 gap-y-2 rounded-xl p-4 text-sm sm:grid-cols-2",
          dark ? "bg-white/5 text-navy-100" : "bg-mist text-navy-800",
        )}
      >
        {summary.map(([k, v]) => (
          <div key={k} className="min-w-0">
            <dt className={cn("text-xs font-semibold uppercase tracking-wide", dark ? "text-navy-300" : "text-muted")}>
              {labelFor(kind, k)}
            </dt>
            <dd className="truncate">
              {k === "service" ? (serviceOptions.find((o) => o.value === v)?.label ?? v) : v}
            </dd>
          </div>
        ))}
      </dl>
      <button
        type="button"
        onClick={onReset}
        className={cn(
          "self-start font-semibold underline underline-offset-4",
          dark ? "text-gold-300" : "text-gold-700",
        )}
      >
        Revenir au formulaire
      </button>
    </div>
  );
}
