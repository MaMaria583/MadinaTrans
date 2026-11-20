"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { ArrowLeft, ArrowRight, Check, CircleHelp, LoaderCircle, Lock, Send, TriangleAlert } from "lucide-react";
import { DEMO_MODE } from "@/config/site";
import {
  quoteSteps,
  rulesFor,
  serviceLabel,
  serviceOptions,
  validateField,
  validateFields,
  type FieldErrors,
} from "@/lib/forms";
import { ServiceIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import { ChoiceCards, ConsentField, HoneypotField, TextAreaField, TextField } from "./fields";
import { FormResult } from "./FormResult";
import { submitRequest, useFillTimer, type SubmitState } from "./useRequestForm";

const serviceIcon = (value: string) => {
  const map = {
    "transport-routier": "truck",
    "transit-affretement": "fileCheck",
    "affretement-maritime": "ship",
    "logistique-distribution": "warehouse",
  } as const;
  const icon = map[value as keyof typeof map];
  return icon ? <ServiceIcon name={icon} className="size-5" /> : <CircleHelp className="size-5" aria-hidden="true" />;
};

const emptyValues = () =>
  Object.fromEntries(Object.keys(rulesFor("quote")).map((k) => [k, ""])) as Record<string, string>;

const isValidService = (v: string) => serviceOptions.some((o) => o.value === v);

// Lecture du paramètre ?service= sans effet de bord ni décalage d'hydratation
const noopSubscribe = () => () => {};
const readUrlService = () => new URLSearchParams(window.location.search).get("service") ?? "";

/** Date du jour (AAAA-MM-JJ) pour borner le sélecteur de date. */
const todayIso = () => new Date().toISOString().slice(0, 10);

/**
 * Formulaire de devis en 3 étapes :
 *  1. Service  2. Trajet & marchandise  3. Coordonnées
 * Validation à chaque étape, messages explicites, anti-spam, envoi via /api/requests.
 */
export function QuoteForm({
  defaultService = "",
  serviceFromUrl = false,
}: {
  defaultService?: string;
  serviceFromUrl?: boolean;
}) {
  const urlService = useSyncExternalStore(noopSubscribe, readUrlService, () => "");
  const initialService = serviceFromUrl && isValidService(urlService) ? urlService : defaultService;

  const [values, setValues] = useState<Record<string, string>>(emptyValues);
  const [serviceChoice, setServiceChoice] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  const [honeypot, setHoneypot] = useState("");
  const elapsed = useFillTimer();
  const topRef = useRef<HTMLDivElement>(null);

  const service = serviceChoice ?? (isValidService(initialService) ? initialService : "");
  const allValues = { ...values, service };

  const setField = (name: string, value: string) => {
    if (name === "service") setServiceChoice(value);
    else setValues((prev) => ({ ...prev, [name]: value }));
    // Une erreur affichée disparaît dès que la saisie devient correcte
    if (errors[name]) {
      const rule = rulesFor("quote")[name];
      setErrors((prev) => ({ ...prev, [name]: rule ? validateField(rule, value) : undefined }));
    }
  };

  const onBlur = (name: string, value: string) => {
    const rule = rulesFor("quote")[name];
    if (!rule || !value) return;
    setErrors((prev) => ({ ...prev, [name]: validateField(rule, value) }));
  };

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const focusFirstError = (found: FieldErrors) => {
    const first = quoteSteps[step].fields.find((n) => found[n]);
    if (!first) return;
    requestAnimationFrame(() => {
      const el = topRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
      el?.focus({ preventScroll: true });
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  const validateStep = () => {
    const found = validateFields("quote", allValues, quoteSteps[step].fields);
    setErrors((prev) => ({ ...prev, ...Object.fromEntries(quoteSteps[step].fields.map((f) => [f, found[f]])) }));
    if (Object.keys(found).length > 0) {
      focusFirstError(found);
      return false;
    }
    return true;
  };

  const next = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, quoteSteps.length - 1));
    scrollTop();
  };

  const back = () => {
    setStep((s) => Math.max(s - 1, 0));
    scrollTop();
  };

  const submit = async () => {
    if (!validateStep()) return;
    const found = validateFields("quote", allValues);
    if (Object.keys(found).length > 0) {
      // Retour à la première étape contenant une erreur
      setErrors(found);
      const target = quoteSteps.findIndex((s) => s.fields.some((f) => found[f]));
      setStep(target);
      scrollTop();
      return;
    }
    setState({ status: "submitting" });
    const res = await submitRequest("quote", allValues, { website: honeypot, elapsed: elapsed() });
    if (res.status === "demo") setState({ status: "demo", fields: allValues });
    else if (res.status === "sent") setState({ status: "sent", reference: res.reference, fields: allValues });
    else if (res.status === "invalid" && res.errors) {
      setErrors(res.errors);
      const target = quoteSteps.findIndex((s) => s.fields.some((f) => res.errors?.[f]));
      setStep(Math.max(target, 0));
      setState({ status: "idle" });
    } else {
      setState({ status: "error", message: res.message ?? "Une erreur est survenue. Merci de réessayer." });
    }
  };

  const reset = () => {
    setValues(emptyValues());
    setServiceChoice(null);
    setErrors({});
    setStep(0);
    setState({ status: "idle" });
  };

  if (state.status === "demo" || state.status === "sent") {
    return <FormResult kind="quote" state={state} onReset={reset} />;
  }

  const submitting = state.status === "submitting";
  const isLast = step === quoteSteps.length - 1;

  return (
    <div ref={topRef} className="scroll-mt-32">
      {/* Progression : étape franchie (coche), étape en cours (titre affiché), étape à venir */}
      <ol className="mb-9 grid grid-cols-3 gap-3" aria-label="Étapes de la demande">
        {quoteSteps.map((s, i) => (
          <li key={s.id} aria-current={i === step ? "step" : undefined}>
            <span className="relative block h-[3px] overflow-hidden rounded-full bg-line">
              <span
                className={cn(
                  "absolute inset-0 origin-left bg-gold-400 transition-transform duration-700 ease-[var(--ease-premium)]",
                  i <= step ? "scale-x-100" : "scale-x-0",
                )}
              />
            </span>
            <span
              className={cn(
                "mt-3 flex items-center gap-2 text-[0.78rem] font-semibold sm:text-[0.84rem]",
                i === step ? "text-navy-900" : i < step ? "text-navy-700" : "text-muted",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "inline-flex size-5 shrink-0 items-center justify-center rounded-full font-display text-[0.72rem] tabular-nums transition-colors duration-500",
                  i < step
                    ? "bg-gold-400 text-navy-950"
                    : i === step
                      ? "bg-navy-900 text-white"
                      : "border border-line text-muted",
                )}
              >
                {i < step ? <Check className="size-3" strokeWidth={3} /> : i + 1}
              </span>
              <span className="sr-only">Étape {i + 1} : </span>
              <span className={cn(i !== step && "max-sm:sr-only")}>{s.title}</span>
            </span>
          </li>
        ))}
      </ol>

      <form
        noValidate
        aria-label="Demande de devis"
        className="relative"
        onSubmit={(e) => {
          e.preventDefault();
          if (isLast) void submit();
          else next();
        }}
      >
        <HoneypotField value={honeypot} onChange={setHoneypot} />

        <div key={step} className="animate-fade-in">
          {step === 0 && (
            <ChoiceCards
              name="service"
              legend="Quel service vous intéresse ?"
              options={serviceOptions}
              value={service}
              onChange={setField}
              error={errors.service}
              renderIcon={serviceIcon}
            />
          )}

          {step === 1 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <p className="rounded-xl bg-mist px-4 py-3 text-sm text-navy-800 sm:col-span-2">
                Service : <strong>{serviceLabel(service)}</strong>{" "}
                <button type="button" onClick={() => setStep(0)} className="ml-1 font-semibold text-gold-700 underline">
                  modifier
                </button>
              </p>
              <TextField
                name="origin"
                label="Ville de départ"
                required
                autoComplete="address-level2"
                placeholder="Ex. Bamako"
                enterKeyHint="next"
                value={values.origin}
                onChange={setField}
                onBlur={onBlur}
                error={errors.origin}
              />
              <TextField
                name="destination"
                label="Destination"
                required
                autoComplete="off"
                placeholder="Ville ou pays"
                enterKeyHint="next"
                value={values.destination}
                onChange={setField}
                onBlur={onBlur}
                error={errors.destination}
              />
              <TextField
                name="goods"
                label="Type de marchandise"
                required
                placeholder="Ex. ciment, denrées, équipements…"
                enterKeyHint="next"
                value={values.goods}
                onChange={setField}
                onBlur={onBlur}
                error={errors.goods}
                className="sm:col-span-2"
              />
              <TextField
                name="volume"
                label="Poids / volume estimé"
                placeholder="Ex. 20 tonnes, 1 conteneur 40'…"
                enterKeyHint="next"
                value={values.volume}
                onChange={setField}
                onBlur={onBlur}
                error={errors.volume}
              />
              <TextField
                name="date"
                type="date"
                label="Date souhaitée"
                min={todayIso()}
                value={values.date}
                onChange={setField}
                onBlur={onBlur}
                error={errors.date}
              />
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                name="fullName"
                label="Nom et prénom"
                required
                autoComplete="name"
                placeholder="Ex. Aminata Traoré"
                enterKeyHint="next"
                value={values.fullName}
                onChange={setField}
                onBlur={onBlur}
                error={errors.fullName}
              />
              <TextField
                name="company"
                label="Entreprise"
                autoComplete="organization"
                placeholder="Nom de votre société"
                enterKeyHint="next"
                value={values.company}
                onChange={setField}
                onBlur={onBlur}
                error={errors.company}
              />
              <TextField
                name="email"
                type="email"
                inputMode="email"
                label="Adresse e-mail"
                required
                autoComplete="email"
                placeholder="nom@entreprise.com"
                enterKeyHint="next"
                value={values.email}
                onChange={setField}
                onBlur={onBlur}
                error={errors.email}
              />
              <TextField
                name="phone"
                type="tel"
                inputMode="tel"
                label="Téléphone"
                required
                autoComplete="tel"
                placeholder="+223 70 00 00 00"
                hint="Format malien ou international avec indicatif."
                enterKeyHint="next"
                value={values.phone}
                onChange={setField}
                onBlur={onBlur}
                error={errors.phone}
              />
              <TextAreaField
                name="message"
                label="Description du besoin"
                required
                className="sm:col-span-2"
                rows={4}
                maxLength={3000}
                placeholder="Volumes, conditionnement, contraintes de délai, accès au site…"
                hint="Plus votre description est précise, plus notre réponse le sera (20 caractères minimum)."
                value={values.message}
                onChange={setField}
                onBlur={onBlur}
                error={errors.message}
              />
              <div className="sm:col-span-2">
                <ConsentField checked={values.consent === "on"} onChange={setField} error={errors.consent} />
              </div>
            </div>
          )}
        </div>

        {state.status === "error" && (
          <p role="alert" className="mt-5 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-800">
            <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {state.message}
          </p>
        )}

        <div className="mt-9 flex flex-col-reverse gap-3 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <button
              type="button"
              onClick={back}
              className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-[3px] border border-line px-6 font-semibold text-navy-800 transition-[border-color,background-color,transform] duration-200 hover:border-navy-900 hover:bg-mist active:scale-[0.98]"
            >
              <ArrowLeft
                className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
              Retour
            </button>
          ) : (
            <p className="flex items-center gap-2 text-[0.8rem] text-muted">
              <Lock className="size-3.5" aria-hidden="true" /> Données utilisées uniquement pour votre demande
            </p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="group inline-flex min-h-13 w-full items-center justify-center gap-2.5 rounded-[3px] bg-gold-400 px-8 font-semibold text-navy-950 transition-[transform,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-gold-300 hover:shadow-[0_14px_30px_-14px_rgb(198_166_106/0.7)] active:scale-[0.98] disabled:cursor-wait disabled:opacity-70 sm:w-auto [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg:last-child]:translate-x-0.5"
          >
            {submitting ? (
              <>
                <LoaderCircle className="size-5 animate-spin" aria-hidden="true" /> Envoi en cours…
              </>
            ) : isLast ? (
              <>
                <Send className="size-5" aria-hidden="true" /> Envoyer ma demande
              </>
            ) : (
              <>
                Continuer <ArrowRight className="size-5" aria-hidden="true" />
              </>
            )}
          </button>
        </div>
        {DEMO_MODE && isLast && (
          <p className="mt-3 text-center text-[0.8rem] text-muted sm:text-right">
            Site de démonstration : la demande est vérifiée mais n&apos;est transmise que si Resend est configuré.
          </p>
        )}
      </form>
    </div>
  );
}
