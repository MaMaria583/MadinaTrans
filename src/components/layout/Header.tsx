"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Mail, Menu, Phone, X } from "lucide-react";
import { mainNav, quoteHref } from "@/config/navigation";
import { company, contact, isDisplayable } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { ContactValue } from "@/components/ui/ContactValue";
import { cn } from "@/lib/cn";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuTop, setMenuTop] = useState(78);
  const headerRef = useRef<HTMLElement>(null);
  const menuId = useId();

  // En-tête intelligent : se retire quand on descend, revient dès qu'on remonte
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 320);
        lastY = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Verrouillage du défilement + fermeture par Échap quand le menu mobile est ouvert
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  const toggle = () => {
    // Le menu s'ouvre juste sous l'en-tête, quelle que soit la position de défilement
    const bottom = headerRef.current?.getBoundingClientRect().bottom ?? 78;
    setMenuTop(Math.max(0, Math.round(bottom)));
    setOpen((v) => !v);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "sticky top-0 z-50 border-b bg-white/92 backdrop-blur-xl transition-[transform,box-shadow] duration-500 ease-[var(--ease-premium)]",
          scrolled ? "border-line shadow-[0_10px_30px_-20px_rgb(16_29_50/0.35)]" : "border-transparent",
          hidden && !open && "-translate-y-full",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 transition-[height] duration-300 sm:px-8 lg:px-10",
            scrolled ? "h-[68px]" : "h-[80px]",
          )}
        >
          <Logo />

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-0.5 xl:gap-1">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group/nav relative inline-flex h-10 items-center px-2 text-[0.86rem] font-medium whitespace-nowrap transition-colors xl:px-3.5 xl:text-[0.9rem]",
                        active ? "text-navy-900" : "text-navy-600 hover:text-navy-900",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-2 bottom-0.5 h-px origin-left bg-gold-500 transition-transform duration-500 ease-[var(--ease-premium)] xl:inset-x-3.5",
                          active ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={quoteHref}
              className="hidden min-h-11 items-center gap-2 rounded-[3px] bg-navy-900 px-5 text-[0.88rem] font-semibold whitespace-nowrap text-white transition-colors duration-300 hover:bg-gold-400 hover:text-navy-950 sm:inline-flex"
            >
              <span className="lg:hidden xl:inline">Demander un devis</span>
              <span className="hidden lg:inline xl:hidden">Devis</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-[3px] border border-line text-navy-900 transition-colors hover:bg-ivory lg:hidden"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={toggle}
            >
              {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile (hors de <header> : backdrop-filter créerait un bloc conteneur pour position:fixed) */}
      <div
        id={menuId}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 z-[45] animate-fade-in overflow-y-auto overscroll-contain bg-navy-950 text-white lg:hidden"
        style={{ top: menuTop }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-routes" />
        <nav aria-label="Navigation mobile" className="relative px-5 pt-6 pb-12 sm:px-8">
          <p className="label-caps text-gold-300">Menu</p>
          <ul className="mt-4">
            {mainNav.map((item, i) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-white/10">
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className="flex min-h-16 items-baseline gap-4"
                  >
                    <span className="font-display text-sm text-white/40 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "font-display text-[1.75rem] leading-none font-normal",
                        active ? "text-gold-300 italic" : "text-white",
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={quoteHref}
            onClick={close}
            className="mt-8 flex min-h-14 items-center justify-center gap-2 rounded-[3px] bg-gold-400 text-base font-semibold text-navy-950"
          >
            Demander un devis <ArrowRight className="size-5" aria-hidden="true" />
          </Link>
          <div className="mt-8 space-y-3 border-t border-white/10 pt-6 text-[0.95rem] text-navy-100">
            {isDisplayable(contact.phone) && (
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <Phone className="size-4 text-gold-400" aria-hidden="true" />
                <ContactValue kind="phone" tone="dark" />
              </p>
            )}
            {isDisplayable(contact.email) && (
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 break-all">
                <Mail className="size-4 shrink-0 text-gold-400" aria-hidden="true" />
                <ContactValue kind="email" tone="dark" />
              </p>
            )}
            <p className="pt-2 font-display text-lg text-gold-300 italic">{company.tagline}</p>
          </div>
        </nav>
      </div>
    </>
  );
}
