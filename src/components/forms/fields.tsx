"use client";

import type { ReactNode } from "react";
import { Check, ChevronDown, CircleAlert } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Champs de formulaire accessibles.
 * - Mode contrôlé : passer `value` + `onChange`.
 * - Mode non contrôlé : passer `defaultValue` (lecture via FormData).
 * Les erreurs sont reliées au champ (aria-invalid / aria-describedby).
 */
interface BaseProps {
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  onBlur?: (name: string, value: string) => void;
  onChange?: (name: string, value: string) => void;
}

const inputBase =
  "w-full rounded-xl border bg-white px-4 text-[1rem] text-ink placeholder:text-navy-300 transition-[border-color,box-shadow] duration-200 outline-none focus:border-navy-600 focus:ring-4 focus:ring-navy-100 aria-invalid:border-red-500 aria-invalid:focus:ring-red-100";

function FieldShell({
  name,
  label,
  error,
  required,
  hint,
  className,
  children,
}: Omit<BaseProps, "onBlur" | "onChange"> & { children: ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={`f-${name}`} className="text-[0.9rem] font-semibold text-navy-900">
        {label}
        {required ? (
          <span className="ml-0.5 text-gold-600" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1.5 text-[0.82rem] font-normal text-muted">(facultatif)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`f-${name}-hint`} className="text-[0.82rem] leading-snug text-muted">
          {hint}
        </p>
      )}
      {error && <FieldError id={`f-${name}-error`}>{error}</FieldError>}
    </div>
  );
}

export function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} role="alert" className="flex items-start gap-1.5 text-[0.84rem] leading-snug font-medium text-red-700">
      <CircleAlert className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}

const describedBy = (name: string, error?: string, hint?: string) =>
  error ? `f-${name}-error` : hint ? `f-${name}-hint` : undefined;

export function TextField({
  type = "text",
  autoComplete,
  placeholder,
  inputMode,
  defaultValue,
  value,
  enterKeyHint,
  min,
  ...props
}: BaseProps & {
  type?: "text" | "email" | "tel" | "date";
  autoComplete?: string;
  placeholder?: string;
  inputMode?: "text" | "email" | "tel";
  defaultValue?: string;
  value?: string;
  enterKeyHint?: "next" | "done" | "send";
  min?: string;
}) {
  const { name, error, required, hint, onBlur, onChange } = props;
  return (
    <FieldShell {...props}>
      <input
        id={`f-${name}`}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        inputMode={inputMode}
        enterKeyHint={enterKeyHint}
        min={min}
        {...(value !== undefined ? { value } : { defaultValue })}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
        onBlur={(e) => onBlur?.(name, e.currentTarget.value)}
        onChange={(e) => onChange?.(name, e.currentTarget.value)}
        className={cn(inputBase, "h-12 border-line", type === "date" && "appearance-none")}
      />
    </FieldShell>
  );
}

export function TextAreaField({
  placeholder,
  rows = 5,
  value,
  maxLength,
  ...props
}: BaseProps & { placeholder?: string; rows?: number; value?: string; maxLength?: number }) {
  const { name, error, required, hint, onBlur, onChange } = props;
  return (
    <FieldShell {...props}>
      <textarea
        id={`f-${name}`}
        name={name}
        rows={rows}
        placeholder={placeholder}
        maxLength={maxLength}
        {...(value !== undefined ? { value } : {})}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
        onBlur={(e) => onBlur?.(name, e.currentTarget.value)}
        onChange={(e) => onChange?.(name, e.currentTarget.value)}
        className={cn(inputBase, "resize-y border-line py-3 leading-relaxed")}
      />
      {value !== undefined && maxLength && (
        <p className="-mt-0.5 self-end text-[0.75rem] text-muted tabular-nums" aria-hidden="true">
          {value.length} / {maxLength}
        </p>
      )}
    </FieldShell>
  );
}

export function SelectField({
  options,
  placeholder = "Sélectionnez…",
  defaultValue = "",
  value,
  ...props
}: BaseProps & {
  options: ReadonlyArray<{ value: string; label: string }>;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
}) {
  const { name, error, required, hint, onBlur, onChange } = props;
  return (
    <FieldShell {...props}>
      <div className="relative">
        <select
          id={`f-${name}`}
          name={name}
          required={required}
          aria-required={required || undefined}
          {...(value !== undefined ? { value } : { defaultValue })}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(name, error, hint)}
          onBlur={(e) => onBlur?.(name, e.currentTarget.value)}
          onChange={(e) => {
            onChange?.(name, e.currentTarget.value);
            onBlur?.(name, e.currentTarget.value);
          }}
          className={cn(inputBase, "h-12 appearance-none border-line pr-11")}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-navy-500"
          aria-hidden="true"
        />
      </div>
    </FieldShell>
  );
}

/** Choix sous forme de grandes cartes (cibles tactiles confortables). */
export function ChoiceCards({
  name,
  legend,
  options,
  value,
  onChange,
  error,
  renderIcon,
}: {
  name: string;
  legend: string;
  options: ReadonlyArray<{ value: string; label: string; hint?: string }>;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  renderIcon?: (value: string) => ReactNode;
}) {
  return (
    <fieldset aria-describedby={error ? `f-${name}-error` : undefined}>
      <legend className="mb-3 text-[0.9rem] font-semibold text-navy-900">
        {legend}
        <span className="ml-0.5 text-gold-600" aria-hidden="true">
          *
        </span>
      </legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((o) => {
          const checked = value === o.value;
          return (
            <label
              key={o.value}
              className={cn(
                "group relative flex min-h-[4.5rem] cursor-pointer items-center gap-3.5 rounded-2xl border-2 p-4 transition-[border-color,background-color,box-shadow] duration-200",
                checked
                  ? "border-navy-800 bg-navy-50/70 shadow-card"
                  : "border-line bg-white hover:border-navy-200 hover:bg-mist",
                o.value === "autre" && "sm:col-span-2",
              )}
            >
              <input
                type="radio"
                name={name}
                value={o.value}
                checked={checked}
                onChange={() => onChange(name, o.value)}
                className="peer sr-only"
              />
              {renderIcon && (
                <span
                  className={cn(
                    "inline-flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors",
                    checked ? "bg-navy-800 text-gold-300" : "bg-mist text-navy-700",
                  )}
                >
                  {renderIcon(o.value)}
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-navy-900">{o.label}</span>
                {o.hint && <span className="block text-[0.82rem] leading-snug text-muted">{o.hint}</span>}
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "inline-flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  checked ? "border-navy-800 bg-navy-800 text-white" : "border-navy-200",
                )}
              >
                {checked && <Check className="size-3.5" strokeWidth={3.5} />}
              </span>
              <span className="pointer-events-none absolute inset-0 rounded-2xl ring-gold-400 peer-focus-visible:ring-4" />
            </label>
          );
        })}
      </div>
      {error && (
        <div className="mt-2">
          <FieldError id={`f-${name}-error`}>{error}</FieldError>
        </div>
      )}
    </fieldset>
  );
}

export function ConsentField({
  name = "consent",
  error,
  checked,
  onBlur,
  onChange,
}: {
  name?: string;
  error?: string;
  checked?: boolean;
  onBlur?: (name: string, value: string) => void;
  onChange?: (name: string, value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex cursor-pointer items-start gap-3 text-[0.88rem] leading-relaxed text-muted">
        <input
          type="checkbox"
          name={name}
          required
          {...(checked !== undefined ? { checked } : {})}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `f-${name}-error` : undefined}
          onChange={(e) => {
            const v = e.currentTarget.checked ? "on" : "";
            onChange?.(name, v);
            onBlur?.(name, v);
          }}
          className="mt-0.5 size-5 shrink-0 cursor-pointer rounded accent-navy-800"
        />
        <span>
          J&apos;accepte que les informations saisies soient utilisées pour traiter ma demande et me recontacter. Elles
          ne sont ni revendues ni cédées.
        </span>
      </label>
      {error && <FieldError id={`f-${name}-error`}>{error}</FieldError>}
    </div>
  );
}

/** Champ piège invisible pour les robots (ne pas remplir). */
export function HoneypotField({ value, onChange }: { value?: string; onChange?: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0 h-px w-px overflow-hidden opacity-0">
      <label>
        Ne pas remplir ce champ
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          {...(value !== undefined ? { value, onChange: (e) => onChange?.(e.currentTarget.value) } : {})}
        />
      </label>
    </div>
  );
}
