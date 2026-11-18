"use client";

import { useState, type FormEvent } from "react";
import { rulesFor, validateField, validateForm, type FieldErrors, type FormKind } from "@/lib/forms";

export type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "demo"; fields: Record<string, string> }
  | { status: "sent" }
  | { status: "error"; message: string };

/** Gestion commune : validation navigateur, envoi à /api/requests, états. */
export function useRequestForm(kind: FormKind) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  const onFieldBlur = (name: string, value: string) => {
    const rule = rulesFor(kind)[name];
    if (!rule) return;
    setErrors((prev) => {
      // On ne signale une erreur au blur que si le champ a déjà été saisi ou était en erreur
      if (!value && !prev[name]) return prev;
      return { ...prev, [name]: validateField(rule, value) };
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const fields: Record<string, string> = {};
    for (const name of Object.keys(rulesFor(kind))) {
      const v = data.get(name);
      fields[name] = typeof v === "string" ? v : "";
    }

    const found = validateForm(kind, fields);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(rulesFor(kind)).find((n) => found[n]);
      const el = first ? form.querySelector<HTMLElement>(`[name="${first}"]`) : null;
      el?.focus({ preventScroll: true });
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setState({ status: "submitting" });
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, fields, website: data.get("website") ?? "" }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        status?: string;
        message?: string;
        errors?: FieldErrors;
      };
      if (json.status === "demo") {
        setState({ status: "demo", fields });
        form.reset();
      } else if (json.status === "sent") {
        setState({ status: "sent" });
        form.reset();
      } else if (json.status === "invalid" && json.errors) {
        setErrors(json.errors);
        setState({ status: "idle" });
      } else {
        setState({ status: "error", message: json.message ?? "Une erreur est survenue. Merci de réessayer." });
      }
    } catch {
      setState({
        status: "error",
        message: "Impossible de joindre le serveur. Vérifiez votre connexion et réessayez.",
      });
    }
  };

  const reset = () => {
    setErrors({});
    setState({ status: "idle" });
  };

  return { errors, state, onSubmit, onFieldBlur, reset };
}
