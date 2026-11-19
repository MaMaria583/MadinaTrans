import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "gold" | "navy" | "outline" | "outlineLight" | "ghost";
type Size = "md" | "lg";

/**
 * Boutons institutionnels : angles nets, libellé légèrement espacé,
 * flèche qui glisse au survol. L'or champagne est réservé à l'action principale.
 */
const base =
  "group/btn inline-flex items-center justify-center gap-2.5 rounded-[3px] font-semibold tracking-[0.01em] transition-[background-color,border-color,color,box-shadow] duration-300 select-none disabled:cursor-not-allowed disabled:opacity-60 [&_svg]:size-[1.05em] [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg:last-child]:translate-x-0.5";

const variants: Record<Variant, string> = {
  gold: "bg-gold-400 text-navy-950 hover:bg-gold-300",
  navy: "bg-navy-900 text-white hover:bg-navy-700",
  outline:
    "border border-navy-900/25 bg-transparent text-navy-900 hover:border-navy-900 hover:bg-navy-900 hover:text-white",
  outlineLight:
    "border border-white/40 bg-transparent text-white hover:border-white hover:bg-white hover:text-navy-950",
  ghost: "text-navy-900 hover:text-gold-600",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-[0.93rem]",
  lg: "min-h-13 px-7 text-[0.98rem]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({
  href,
  variant = "gold",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "gold",
  size = "md",
  className,
  children,
  type = "button",
  ...rest
}: CommonProps & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button type={type} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}
