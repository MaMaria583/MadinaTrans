"use client";

import { useEffect, useRef } from "react";
import { LoaderCircle, Send, TriangleAlert } from "lucide-react";
import { DEMO_MODE } from "@/config/site";
import { serviceOptions } from "@/lib/forms";
import { Button } from "@/components/ui/Button";
import { ConsentField, HoneypotField, SelectField, TextAreaField, TextField } from "./fields";
import { FormResult } from "./FormResult";
import { useRequestForm } from "./useRequestForm";

export function QuoteForm({
  defaultService = "",
  serviceFromUrl = false,
}: {
  defaultService?: string;
  /** Pré-sélectionne le service depuis l'URL : /devis?service=transport-routier */
  serviceFromUrl?: boolean;
}) {
  const { errors, state, onSubmit, onFieldBlur, reset } = useRequestForm("quote");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!serviceFromUrl || !formRef.current) return;
    const fromUrl = new URLSearchParams(window.location.search).get("service");
    const select = formRef.current.elements.namedItem("service");
    if (fromUrl && select instanceof HTMLSelectElement && serviceOptions.some((o) => o.value === fromUrl)) {
      select.value = fromUrl;
    }
  }, [serviceFromUrl, state.status]);

  if (state.status === "demo" || state.status === "sent") {
    return <FormResult kind="quote" state={state} onReset={reset} />;
  }

  const submitting = state.status === "submitting";
  const validDefault = serviceOptions.some((o) => o.value === defaultService) ? defaultService : "";

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      className="relative grid gap-5 sm:grid-cols-2"
      aria-label="Demande de devis"
    >
      <HoneypotField />
      <TextField
        name="fullName"
        label="Nom et prénom"
        required
        autoComplete="name"
        placeholder="Ex. Aminata Traoré"
        error={errors.fullName}
        onBlur={onFieldBlur}
      />
      <TextField
        name="company"
        label="Entreprise"
        autoComplete="organization"
        placeholder="Nom de votre société"
        error={errors.company}
        onBlur={onFieldBlur}
      />
      <TextField
        name="email"
        type="email"
        inputMode="email"
        label="Adresse e-mail"
        required
        autoComplete="email"
        placeholder="nom@entreprise.com"
        error={errors.email}
        onBlur={onFieldBlur}
      />
      <TextField
        name="phone"
        type="tel"
        inputMode="tel"
        label="Téléphone"
        required
        autoComplete="tel"
        placeholder="+223 70 00 00 00"
        error={errors.phone}
        onBlur={onFieldBlur}
      />
      <SelectField
        name="service"
        label="Type de service"
        required
        options={serviceOptions}
        placeholder="Choisir un service"
        defaultValue={validDefault}
        error={errors.service}
        onBlur={onFieldBlur}
      />
      <TextField
        name="goods"
        label="Type de marchandise"
        required
        placeholder="Ex. matériaux, denrées, équipements…"
        error={errors.goods}
        onBlur={onFieldBlur}
      />
      <TextField
        name="origin"
        label="Ville de départ"
        required
        autoComplete="off"
        placeholder="Ex. Bamako"
        error={errors.origin}
        onBlur={onFieldBlur}
      />
      <TextField
        name="destination"
        label="Destination"
        required
        autoComplete="off"
        placeholder="Ville ou pays"
        error={errors.destination}
        onBlur={onFieldBlur}
      />
      <TextAreaField
        name="message"
        label="Description du besoin"
        required
        className="sm:col-span-2"
        placeholder="Volumes, poids, dates souhaitées, contraintes particulières…"
        hint="Plus votre description est précise, plus notre réponse le sera. 20 caractères minimum."
        error={errors.message}
        onBlur={onFieldBlur}
      />
      <div className="sm:col-span-2">
        <ConsentField error={errors.consent} onBlur={onFieldBlur} />
      </div>

      {state.status === "error" && (
        <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-800 sm:col-span-2">
          <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {state.message}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.8rem] text-muted">
          <span className="text-gold-500">*</span> Champs obligatoires
          {DEMO_MODE && " · Site de démonstration : aucune demande n'est transmise."}
        </p>
        <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? <LoaderCircle className="animate-spin" aria-hidden="true" /> : <Send aria-hidden="true" />}
          {submitting ? "Envoi en cours…" : "Envoyer ma demande"}
        </Button>
      </div>
    </form>
  );
}
