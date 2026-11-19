import { DEMO_MODE, agency, company, contact } from "@/config/site";
import { imageCreditNote, images } from "@/content/images";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Section";

export const metadata = pageMetadata({
  title: "Mentions légales",
  description: "Mentions légales, données personnelles et crédits du site Madina Trans.",
  path: "/mentions-legales",
});

export default function LegalPage() {
  return (
    <>
      <PageHero
        title="Mentions légales"
        image={images.warehouseRacks}
        crumbs={[{ label: "Mentions légales" }]}
        path="/mentions-legales"
      />
      <Container className="max-w-3xl section-y-sm">
        <div className="prose-mt">
          {DEMO_MODE && (
            <>
              <h2 id="demonstration">Site de démonstration</h2>
              <p>
                Ce site est une <strong>proposition de conception</strong> réalisée par {agency.name} dans le cadre
                d&apos;une démarche commerciale auprès de {company.name}. Il ne constitue pas le site officiel de
                l&apos;entreprise.
              </p>
              <ul>
                <li>
                  Les coordonnées affichées (téléphone, e-mail, WhatsApp) sont{" "}
                  <strong>fictives et non opérationnelles</strong>.
                </li>
                <li>Les chiffres clés, partenaires, certifications et historique sont des emplacements à compléter.</li>
                <li>
                  Les articles de la rubrique Actualités sont des exemples pédagogiques, sans valeur d&apos;information.
                </li>
                <li>Les photographies sont des visuels d&apos;illustration libres de droits.</li>
                <li>
                  Le logo présenté est un concept graphique temporaire, et non le logo officiel de l&apos;entreprise.
                </li>
                <li>
                  Les formulaires sont validés mais n&apos;envoient aucune donnée tant que le service d&apos;envoi
                  d&apos;e-mails (Resend) n&apos;est pas configuré.
                </li>
              </ul>
            </>
          )}

          <h2>Éditeur du site</h2>
          <p>
            {company.name} — {company.legalName.value}
            <br />
            Siège : {contact.address.value}
            <br />
            Immatriculation (RCCM), NIF et directeur de la publication : à compléter.
          </p>

          <h2>Conception et réalisation</h2>
          <p>{agency.credit}.</p>

          <h2>Hébergement</h2>
          <p>
            Vercel Inc. — 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com (à confirmer selon
            l&apos;hébergement retenu).
          </p>

          <h2>Données personnelles</h2>
          <p>
            Les informations transmises via les formulaires sont utilisées exclusivement pour répondre aux demandes des
            visiteurs. Elles ne sont ni revendues ni cédées à des tiers. Conformément à la réglementation applicable en
            matière de protection des données personnelles, vous disposez d&apos;un droit d&apos;accès, de rectification
            et de suppression de vos données, que vous pouvez exercer en contactant {company.name}.
          </p>

          <p>
            Les demandes envoyées depuis les formulaires sont acheminées par e-mail à {company.name} via le service
            Resend (Resend, Inc.). Aucune donnée n&apos;est conservée sur le site lui-même.
          </p>

          <h2>Cookies</h2>
          <p>Ce site n&apos;utilise aucun cookie publicitaire ni outil de mesure d&apos;audience.</p>

          <h2>Crédits photographiques</h2>
          <p>{imageCreditNote} Licence Unsplash (unsplash.com/license).</p>
        </div>
      </Container>
    </>
  );
}
