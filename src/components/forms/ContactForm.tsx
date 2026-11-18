"use client";

import { LoaderCircle, Send, TriangleAlert } from "lucide-react";
import { DEMO_MODE } from "@/config/site";
import { contactSubjects } from "@/lib/forms";
import { Button } from "@/components/ui/Button";
import { ConsentField, HoneypotField, SelectField, TextAreaField, TextField } from "./fields";
import { FormResult } from "./FormResult";
import { useRequestForm } from "./useRequestForm";

const subjectOptions = contactSubjects.map((s) => ({ value: s, label: s }));

export function ContactForm() {
  const { errors, state, onSubmit, onFieldBlur, reset } = useRequestForm("contact");

  if (state.status === "demo" || state.status === "sent") {
    return <FormResult kind="contact" state={state} onReset={reset} />;
  }

  const submitting = state.status === "submitting";

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="relative grid gap-5 sm:grid-cols-2"
      aria-label="Formulaire de contact"
    >
      <HoneypotField />
      <TextField
        name="fullName"
        label="Nom et prénom"
        required
        autoComplete="name"
        error={errors.fullName}
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
        autoComplete="tel"
        placeholder="+223 70 00 00 00"
        error={errors.phone}
        onBlur={onFieldBlur}
      />
      <SelectField
        name="subject"
        label="Objet"
        required
        options={subjectOptions}
        error={errors.subject}
        onBlur={onFieldBlur}
      />
      <TextAreaField
        name="message"
        label="Message"
        required
        className="sm:col-span-2"
        rows={6}
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
          {DEMO_MODE && " · Démonstration : aucun message n'est transmis."}
        </p>
        <Button type="submit" variant="navy" size="lg" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? <LoaderCircle className="animate-spin" aria-hidden="true" /> : <Send aria-hidden="true" />}
          {submitting ? "Envoi en cours…" : "Envoyer le message"}
        </Button>
      </div>
    </form>
  );
}
