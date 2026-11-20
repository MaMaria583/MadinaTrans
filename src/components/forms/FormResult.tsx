"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { CircleCheck, Info, Mail, Phone } from "lucide-react";
import { contact, telHref } from "@/config/site";
import { labelFor, serviceLabel, type FormKind } from "@/lib/forms";
import type { SubmitState } from "./useRequestForm";

/** Panneau affiché après soumission (démonstration ou envoi réel). */
export function FormResult({
  kind,
  state,
  onReset,
}: {
  kind: FormKind;
  state: Extract<SubmitState, { status: "demo" } | { status: "sent" }>;
  onReset: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Le message de confirmation reçoit le focus et reste visible sur mobile
  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const summary = Object.entries(state.fields).filter(([k, v]) => v && k !== "consent" && k !== "message");
  const tel = telHref();

  if (state.status === "sent") {
    return (
      <div ref={ref} tabIndex={-1} role="status" className="flex scroll-mt-32 flex-col gap-5 outline-none">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CircleCheck className="size-8" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-2xl font-bold text-navy-900">
            {kind === "quote" ? "Demande de devis envoyée" : "Message envoyé"}
          </h3>
          <p className="mt-2 leading-relaxed text-muted">
            Merci {state.fields.fullName?.split(" ")[0]} ! Votre {kind === "quote" ? "demande" : "message"} a bien été
            transmis{kind === "quote" ? "e" : ""} à nos équipes, qui reviendront vers vous dans les meilleurs délais.
          </p>
        </div>
        {state.reference && (
          <p className="rounded-xl bg-mist px-4 py-3 text-sm text-navy-800">
            Référence de votre demande : <strong className="font-mono tracking-wide">{state.reference}</strong>
            <span className="block text-muted">Conservez-la pour tout échange avec nos équipes.</span>
          </p>
        )}
        <ol className="space-y-2 text-[0.95rem] text-navy-800">
          <li className="flex gap-3">
            <span className="font-display font-bold text-gold-600">1.</span> Votre demande est étudiée par nos équipes.
          </li>
          <li className="flex gap-3">
            <span className="font-display font-bold text-gold-600">2.</span> Nous vous contactons par e-mail ou
            téléphone pour préciser votre besoin.
          </li>
          <li className="flex gap-3">
            <span className="font-display font-bold text-gold-600">3.</span> Vous recevez une proposition adaptée.
          </li>
        </ol>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {tel && (
            <a href={tel} className="inline-flex items-center gap-1.5 font-semibold text-navy-800 hover:text-gold-600">
              <Phone className="size-4" aria-hidden="true" /> Urgent ? {contact.phone.value}
            </a>
          )}
          <button type="button" onClick={onReset} className="font-semibold text-navy-800 underline underline-offset-4">
            Envoyer une autre demande
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} tabIndex={-1} role="status" className="flex scroll-mt-32 flex-col gap-4 outline-none">
      <div className="flex items-center gap-3">
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-gold-400 text-navy-950">
          <Info className="size-6" aria-hidden="true" />
        </span>
        <h3 className="text-xl font-bold text-navy-900">Formulaire validé, mode démonstration</h3>
      </div>
      <p className="leading-relaxed text-muted">
        Votre saisie est correcte, mais <strong className="text-navy-900">aucune demande n&apos;a été transmise</strong>{" "}
        : le service d&apos;envoi des e-mails (Resend) n&apos;est pas encore configuré sur ce site de démonstration.
        Aucune donnée n&apos;a été enregistrée.
      </p>
      <dl className="grid gap-x-6 gap-y-3 rounded-xl bg-mist p-4 text-sm text-navy-800 sm:grid-cols-2">
        {summary.map(([k, v]) => (
          <div key={k} className="min-w-0">
            <dt className="text-xs font-semibold tracking-wide text-muted uppercase">{labelFor(kind, k)}</dt>
            <dd className="truncate">{k === "service" ? serviceLabel(v) : v}</dd>
          </div>
        ))}
      </dl>
      <p className="flex items-start gap-2 text-sm text-muted">
        <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        Une fois Resend configuré, cette demande sera envoyée par e-mail à l&apos;adresse administrateur de Madina
        Trans, avec une référence de suivi.
      </p>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        <button type="button" onClick={onReset} className="font-semibold text-gold-700 underline underline-offset-4">
          Revenir au formulaire
        </button>
        <Link
          href="/mentions-legales#demonstration"
          className="font-semibold text-navy-800 underline underline-offset-4"
        >
          À propos de la démonstration
        </Link>
      </div>
    </div>
  );
}
