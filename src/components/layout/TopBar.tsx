import { Mail, MapPin, Phone } from "lucide-react";
import { company, contact, isDisplayable } from "@/config/site";
import { Container } from "@/components/ui/Section";
import { ContactValue } from "@/components/ui/ContactValue";

export function TopBar() {
  return (
    <div className="hidden bg-navy-950 text-[0.82rem] text-navy-100 md:block">
      <Container className="flex h-10 items-center justify-between gap-6">
        <ul className="flex items-center gap-6">
          {isDisplayable(contact.phone) && (
            <li className="flex items-center gap-2">
              <Phone className="size-3.5 text-gold-400" aria-hidden="true" />
              <ContactValue kind="phone" tone="dark" className="hover:text-white" />
            </li>
          )}
          {isDisplayable(contact.email) && (
            <li className="flex items-center gap-2">
              <Mail className="size-3.5 text-gold-400" aria-hidden="true" />
              <ContactValue kind="email" tone="dark" className="hover:text-white" />
            </li>
          )}
          <li className="hidden items-center gap-2 lg:flex">
            <MapPin className="size-3.5 text-gold-400" aria-hidden="true" />
            <span>{contact.city.value}</span>
          </li>
        </ul>
        <p className="font-medium text-gold-200 italic">{company.tagline}</p>
      </Container>
    </div>
  );
}
