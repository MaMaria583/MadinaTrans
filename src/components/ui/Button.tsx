import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "gold" | "navy" | "outline" | "outlineLight" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 select-none disabled:cursor-not-allowed disabled:opacity-60 [&_svg]:size-[1.1em] [&_svg]:shrink-0";

const variants: Record<Variant, string> = {
  gold: "bg-gold-400 text-navy-950 shadow-[0_8px_20px_-8px_rgb(217_154_11/0.7)] hover:bg-gold-300 hover:-translate-y-0.5",
  navy: "bg-navy-800 text-white hover:bg-navy-700 hover:-translate-y-0.5 shadow-[0_8px_20px_-10px_rgb(11_26_56/0.6)]",
  outline: "border border-navy-200 bg-white text-navy-800 hover:border-navy-800 hover:bg-navy-50",
  outlineLight: "border border-white/35 bg-white/5 text-white backdrop-blur-sm hover:bg-white/15 hover:border-white/60",
  ghost: "text-navy-800 hover:text-gold-600",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-[0.95rem]",
  lg: "min-h-13 px-7 text-base",
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
