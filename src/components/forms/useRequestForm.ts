"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { rulesFor, validateField, validateForm, type FieldErrors, type FormKind } from "@/lib/forms";

export type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "demo"; fields: Record<string, string> }
  | { status: "sent"; reference?: string; fields: Record<string, string> }
  | { status: "error"; message: string };

type ApiResponse = {
  status?: string;
  message?: string;
  reference?: string;
  errors?: FieldErrors;
};

/** Envoi à l'API, commun aux formulaires de devis et de contact. */
export async function submitRequest(
  kind: FormKind,
  fields: Record<string, string>,
  meta: { website: string; elapsed: number },
): Promise<ApiResponse & { httpStatus: number }> {
  try {
    const res = await fetch("/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, fields, ...meta }),
    });
    const json = (await res.json().catch(() => ({}))) as ApiResponse;
    return { ...json, httpStatus: res.status };
  } catch {
    return {
      status: "error",
      message: "Impossible de joindre le serveur. Vérifiez votre connexion internet et réessayez.",
      httpStatus: 0,
    };
  }
}

/** Mesure le temps passé sur le formulaire (anti-robot). */
export function useFillTimer() {
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  return () => (startedAt.current ? Date.now() - startedAt.current : 0);
}

/** Gestion du formulaire de contact (non contrôlé, lecture via FormData). */
export function useRequestForm(kind: FormKind) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  const elapsed = useFillTimer();

  const onFieldBlur = (name: string, value: string) => {
    const rule = rulesFor(kind)[name];
    if (!rule) return;
    setErrors((prev) => {
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
    const res = await submitRequest(kind, fields, {
      website: String(data.get("website") ?? ""),
      elapsed: elapsed(),
    });
    if (res.status === "demo") setState({ status: "demo", fields });
    else if (res.status === "sent") setState({ status: "sent", reference: res.reference, fields });
    else if (res.status === "invalid" && res.errors) {
      setErrors(res.errors);
      setState({ status: "idle" });
    } else setState({ status: "error", message: res.message ?? "Une erreur est survenue. Merci de réessayer." });
  };

  const reset = () => {
    setErrors({});
    setState({ status: "idle" });
  };

  return { errors, state, onSubmit, onFieldBlur, reset };
}
