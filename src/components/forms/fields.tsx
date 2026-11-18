"use client";

import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

interface BaseProps {
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  tone?: "light" | "dark";
  onBlur?: (name: string, value: string) => void;
}

const inputBase =
  "w-full rounded-xl border bg-white px-4 text-[1rem] text-ink placeholder:text-navy-300 transition-[border-color,box-shadow] outline-none focus:border-navy-600 focus:ring-4 focus:ring-navy-100";

function FieldShell({
  name,
  label,
  error,
  required,
  hint,
  className,
  tone = "light",
  children,
}: Omit<BaseProps, "onBlur"> & { children: ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={`f-${name}`}
        className={cn("text-[0.88rem] font-semibold", tone === "dark" ? "text-navy-50" : "text-navy-900")}
      >
        {label}
        {required ? (
          <span className="ml-0.5 text-gold-500" aria-hidden="true">
            *
          </span>
        ) : (
          <span className={cn("ml-1.5 font-normal", tone === "dark" ? "text-navy-300" : "text-muted")}>
            (facultatif)
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`f-${name}-hint`} className={cn("text-[0.8rem]", tone === "dark" ? "text-navy-300" : "text-muted")}>
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`f-${name}-error`}
          role="alert"
          className={cn("text-[0.82rem] font-medium", tone === "dark" ? "text-red-300" : "text-red-700")}
        >
          {error}
        </p>
      )}
    </div>
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
  ...props
}: BaseProps & {
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  placeholder?: string;
  inputMode?: "text" | "email" | "tel";
  defaultValue?: string;
}) {
  const { name, error, required, hint, onBlur } = props;
  return (
    <FieldShell {...props}>
      <input
        id={`f-${name}`}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        inputMode={inputMode}
        defaultValue={defaultValue}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
        onBlur={(e) => onBlur?.(name, e.currentTarget.value)}
        className={cn(inputBase, "h-12", error ? "border-red-500" : "border-line")}
      />
    </FieldShell>
  );
}

export function TextAreaField({
  placeholder,
  rows = 5,
  ...props
}: BaseProps & { placeholder?: string; rows?: number }) {
  const { name, error, required, hint, onBlur } = props;
  return (
    <FieldShell {...props}>
      <textarea
        id={`f-${name}`}
        name={name}
        rows={rows}
        placeholder={placeholder}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
        onBlur={(e) => onBlur?.(name, e.currentTarget.value)}
        className={cn(inputBase, "resize-y py-3 leading-relaxed", error ? "border-red-500" : "border-line")}
      />
    </FieldShell>
  );
}

export function SelectField({
  options,
  placeholder = "Sélectionnez…",
  defaultValue = "",
  ...props
}: BaseProps & {
  options: ReadonlyArray<{ value: string; label: string }>;
  placeholder?: string;
  defaultValue?: string;
}) {
  const { name, error, required, hint, onBlur } = props;
  return (
    <FieldShell {...props}>
      <div className="relative">
        <select
          id={`f-${name}`}
          name={name}
          required={required}
          defaultValue={defaultValue}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(name, error, hint)}
          onBlur={(e) => onBlur?.(name, e.currentTarget.value)}
          onChange={(e) => onBlur?.(name, e.currentTarget.value)}
          className={cn(inputBase, "h-12 appearance-none pr-11", error ? "border-red-500" : "border-line")}
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

export function ConsentField({
  name = "consent",
  error,
  tone = "light",
  onBlur,
}: {
  name?: string;
  error?: string;
  tone?: "light" | "dark";
  onBlur?: (name: string, value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className={cn(
          "flex cursor-pointer items-start gap-3 text-[0.88rem] leading-relaxed",
          tone === "dark" ? "text-navy-100" : "text-muted",
        )}
      >
        <input
          type="checkbox"
          name={name}
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `f-${name}-error` : undefined}
          onChange={(e) => onBlur?.(name, e.currentTarget.checked ? "on" : "")}
          className="mt-0.5 size-5 shrink-0 cursor-pointer rounded accent-gold-500"
        />
        <span>
          J&apos;accepte que les informations saisies soient utilisées pour traiter ma demande et me recontacter. Elles
          ne sont ni revendues ni cédées.
        </span>
      </label>
      {error && (
        <p
          id={`f-${name}-error`}
          role="alert"
          className={cn("text-[0.82rem] font-medium", tone === "dark" ? "text-red-300" : "text-red-700")}
        >
          {error}
        </p>
      )}
    </div>
  );
}

/** Champ piège invisible pour les robots (ne pas remplir). */
export function HoneypotField() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0 h-px w-px overflow-hidden opacity-0">
      <label>
        Ne pas remplir ce champ
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
