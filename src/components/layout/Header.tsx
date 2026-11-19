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
  const [menuTop, setMenuTop] = useState(78);
  const headerRef = useRef<HTMLElement>(null);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
          "sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-shadow duration-300",
          scrolled ? "border-line shadow-[0_6px_24px_-12px_rgb(11_26_56/0.25)]" : "border-transparent",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-[height] duration-300 sm:px-6 lg:px-8",
            scrolled ? "h-[68px]" : "h-[78px]",
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
                        "relative inline-flex h-10 items-center rounded-full px-2 text-[0.88rem] font-semibold whitespace-nowrap transition-colors xl:px-3 xl:text-[0.94rem]",
                        active ? "text-navy-900" : "text-navy-700/80 hover:text-navy-900",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-2 -bottom-0.5 h-[3px] origin-left rounded-full bg-gold-400 transition-transform duration-300 xl:inset-x-3",
                          active ? "scale-x-100" : "scale-x-0",
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
              className="hidden min-h-11 items-center gap-2 rounded-full bg-gold-400 px-5 whitespace-nowrap text-[0.92rem] font-bold text-navy-950 shadow-[0_8px_20px_-8px_rgb(217_154_11/0.7)] transition-all hover:-translate-y-0.5 hover:bg-gold-300 sm:inline-flex"
            >
              <span className="lg:hidden xl:inline">Demander un devis</span>
              <span className="hidden lg:inline xl:hidden">Devis</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full border border-line text-navy-800 transition-colors hover:bg-navy-50 lg:hidden"
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
        className="fixed inset-x-0 bottom-0 z-[45] overflow-y-auto overscroll-contain border-t border-line bg-white lg:hidden"
        style={{ top: menuTop }}
      >
        <nav aria-label="Navigation mobile" className="px-4 pt-4 pb-10 sm:px-6">
          <ul className="divide-y divide-line">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-14 items-center justify-between text-lg font-semibold",
                      active ? "text-gold-600" : "text-navy-900",
                    )}
                  >
                    {item.label}
                    <ArrowRight className="size-5 opacity-40" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={quoteHref}
            onClick={close}
            className="mt-6 flex min-h-14 items-center justify-center gap-2 rounded-full bg-gold-400 text-base font-bold text-navy-950"
          >
            Demander un devis <ArrowRight className="size-5" aria-hidden="true" />
          </Link>
          <div className="mt-8 space-y-3 rounded-2xl bg-mist p-5 text-[0.95rem] text-navy-800">
            {isDisplayable(contact.phone) && (
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <Phone className="size-4 text-gold-600" aria-hidden="true" />
                <ContactValue kind="phone" />
              </p>
            )}
            {isDisplayable(contact.email) && (
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 break-all">
                <Mail className="size-4 shrink-0 text-gold-600" aria-hidden="true" />
                <ContactValue kind="email" />
              </p>
            )}
            <p className="pt-2 text-sm font-medium text-gold-700 italic">{company.tagline}</p>
          </div>
        </nav>
      </div>
    </>
  );
}
