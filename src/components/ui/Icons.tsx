import {
  Award,
  CalendarRange,
  ChartNoAxesColumnIncreasing,
  Clock,
  Eye,
  FileCheck2,
  Globe,
  Lock,
  ShieldCheck,
  Ship,
  Smile,
  Truck,
  Users,
  Warehouse,
  type LucideProps,
} from "lucide-react";
import type { CommitmentIcon } from "@/content/commitments";
import type { ServiceIcon as ServiceIconName } from "@/content/services";

const serviceIcons = { truck: Truck, fileCheck: FileCheck2, ship: Ship, warehouse: Warehouse };
const commitmentIcons = {
  shield: ShieldCheck,
  clock: Clock,
  users: Users,
  chart: ChartNoAxesColumnIncreasing,
  lock: Lock,
  award: Award,
  smile: Smile,
  eye: Eye,
};
const figureIcons = { calendar: CalendarRange, truck: Truck, globe: Globe, users: Users };

export function ServiceIcon({ name, ...props }: { name: ServiceIconName } & LucideProps) {
  const Icon = serviceIcons[name];
  return <Icon aria-hidden="true" {...props} />;
}

export function CommitmentIconView({ name, ...props }: { name: CommitmentIcon } & LucideProps) {
  const Icon = commitmentIcons[name];
  return <Icon aria-hidden="true" {...props} />;
}

export function FigureIcon({ name, ...props }: { name: keyof typeof figureIcons } & LucideProps) {
  const Icon = figureIcons[name];
  return <Icon aria-hidden="true" {...props} />;
}

/* Icônes de marques (absentes de lucide) */
type SvgProps = { className?: string };

export function FacebookIcon({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4a20 20 0 0 0-2.2-.1c-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9Z" />
    </svg>
  );
}

export function LinkedinIcon({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M6.9 8.8H3.8V20h3.1V8.8ZM5.3 3.5a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM20.2 13.6c0-3-1.6-5-4.3-5-1.4 0-2.4.8-2.8 1.5V8.8H10V20h3.1v-5.6c0-1.5.3-2.9 2.1-2.9 1.8 0 1.8 1.6 1.8 3V20h3.2v-6.4Z" />
    </svg>
  );
}

export function YoutubeIcon({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7.2 27 27 0 0 0 2 12a27 27 0 0 0 .4 4.8 2.6 2.6 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8A27 27 0 0 0 22 12a27 27 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function WhatsappIcon({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}
