import { images, type SiteImage } from "./images";

export type ServiceIcon = "truck" | "fileCheck" | "ship" | "warehouse";

export interface Service {
  slug: string;
  icon: ServiceIcon;
  title: string;
  shortTitle: string;
  tagline: string;
  excerpt: string;
  description: string[];
  advantages: string[];
  applications: string[];
  steps: Array<{ title: string; text: string }>;
  image: SiteImage;
  secondaryImage: SiteImage;
  seo: { title: string; description: string };
}

/**
 * Descriptions de services rédigées pour la démonstration à partir des
 * domaines d'activité indiqués dans le brief. Elles décrivent des
 * prestations types du secteur et ne mentionnent ni chiffres, ni
 * certifications, ni références. À valider avec Madina Trans.
 */
export const services: Service[] = [
  {
    slug: "transport-routier",
    icon: "truck",
    title: "Transport routier",
    shortTitle: "Transport routier",
    tagline: "Vos marchandises acheminées en toute sécurité",
    excerpt:
      "Acheminement de vos marchandises par la route, au Mali et vers les pays de la sous-région, avec un suivi rigoureux à chaque étape.",
    description: [
      "Le transport routier reste au cœur des échanges commerciaux au Mali. Madina Trans organise l'acheminement de vos marchandises depuis leur point d'enlèvement jusqu'à leur destination finale, en adaptant chaque opération à la nature de la cargaison et aux contraintes du trajet.",
      "Chargement, sécurisation, planification de l'itinéraire, communication avec le destinataire : chaque étape est préparée pour limiter les aléas et garantir une livraison dans les délais convenus.",
    ],
    advantages: [
      "Un interlocuteur unique du chargement à la livraison",
      "Planification des trajets et des délais en amont",
      "Sécurisation et arrimage adaptés à chaque marchandise",
      "Information régulière sur l'avancement du transport",
    ],
    applications: [
      "Approvisionnement de sites industriels et commerciaux",
      "Distribution de marchandises générales",
      "Acheminement de matériaux de construction",
      "Liaisons nationales et transfrontalières",
    ],
    steps: [
      { title: "Analyse du besoin", text: "Nature, volume, origine, destination et délais." },
      { title: "Organisation", text: "Choix du véhicule, itinéraire et documents." },
      { title: "Chargement", text: "Enlèvement, sécurisation et contrôle." },
      { title: "Livraison", text: "Acheminement, suivi et remise au destinataire." },
    ],
    image: images.heroTruck,
    secondaryImage: images.truckHighway,
    seo: {
      title: "Transport routier de marchandises à Bamako et au Mali",
      description:
        "Transport routier Bamako : Madina Trans organise le transport de marchandises au Mali et vers la sous-région. Planification, sécurité et suivi. Demandez un devis.",
    },
  },
  {
    slug: "transit-affretement",
    icon: "fileCheck",
    title: "Transit et affrètement",
    shortTitle: "Transit & affrètement",
    tagline: "Vos formalités prises en charge, vos flux sécurisés",
    excerpt:
      "Accompagnement dans les opérations de transit et l'organisation de vos flux import-export, de la préparation des documents à la livraison.",
    description: [
      "Les opérations d'import et d'export impliquent des formalités précises et de nombreux intervenants. Madina Trans vous accompagne dans l'organisation de vos opérations de transit afin de fluidifier le passage de vos marchandises et d'éviter les retards coûteux.",
      "Nous coordonnons les différentes étapes — documents, formalités, enlèvement, acheminement — et affrétons les moyens de transport adaptés à vos volumes et à vos contraintes.",
    ],
    advantages: [
      "Accompagnement dans la préparation des documents",
      "Coordination des intervenants de la chaîne",
      "Affrètement de moyens adaptés à vos volumes",
      "Anticipation des délais et des points de contrôle",
    ],
    applications: [
      "Importation de marchandises et d'équipements",
      "Exportation de productions locales",
      "Opérations de transit vers ou depuis le Mali",
      "Projets nécessitant des moyens de transport ponctuels",
    ],
    steps: [
      { title: "Étude du dossier", text: "Marchandises, origine, documents disponibles." },
      { title: "Formalités", text: "Préparation et suivi des démarches." },
      { title: "Affrètement", text: "Mobilisation des moyens de transport adaptés." },
      { title: "Remise", text: "Livraison et clôture du dossier." },
    ],
    image: images.containersAerial,
    secondaryImage: images.truckTrailer,
    seo: {
      title: "Transit au Mali : formalités et affrètement",
      description:
        "Transit au Mali avec Madina Trans : accompagnement dans les formalités import-export, coordination des intervenants et affrètement de moyens adaptés.",
    },
  },
  {
    slug: "affretement-maritime",
    icon: "ship",
    title: "Affrètement maritime",
    shortTitle: "Affrètement maritime",
    tagline: "Le lien entre les ports et le cœur du Mali",
    excerpt:
      "Organisation de vos expéditions par voie maritime et coordination du pré- et post-acheminement entre les ports et le Mali.",
    description: [
      "Pays sans littoral, le Mali dépend des ports de la sous-région pour une large part de ses échanges internationaux. L'affrètement maritime ne s'arrête donc pas au quai : il se prolonge par un acheminement terrestre qui doit être parfaitement coordonné.",
      "Madina Trans vous accompagne dans l'organisation de vos expéditions maritimes, en conteneur complet ou en groupage, et dans la coordination de la chaîne jusqu'à destination.",
    ],
    advantages: [
      "Coordination entre transport maritime et terrestre",
      "Solutions en conteneur complet ou en groupage",
      "Suivi de l'expédition du port à la destination",
      "Conseil sur l'emballage et la documentation",
    ],
    applications: [
      "Importation de marchandises conteneurisées",
      "Acheminement d'équipements et de matériel",
      "Expéditions de marchandises en groupage",
      "Flux réguliers entre ports et entrepôts",
    ],
    steps: [
      { title: "Cotation", text: "Volumes, ports, incoterms et calendrier." },
      { title: "Réservation", text: "Organisation de l'expédition maritime." },
      { title: "Coordination", text: "Arrivée au port et formalités." },
      { title: "Post-acheminement", text: "Transport terrestre jusqu'à destination." },
    ],
    image: images.portCranes,
    secondaryImage: images.containerShip,
    seo: {
      title: "Affrètement maritime vers le Mali",
      description:
        "Affrètement maritime et coordination port–Mali : Madina Trans organise vos expéditions en conteneur complet ou en groupage, jusqu'à destination finale.",
    },
  },
  {
    slug: "logistique-distribution",
    icon: "warehouse",
    title: "Logistique et distribution",
    shortTitle: "Logistique & distribution",
    tagline: "Une chaîne logistique maîtrisée de bout en bout",
    excerpt:
      "Solutions de stockage, de préparation et de distribution pour fluidifier votre chaîne d'approvisionnement.",
    description: [
      "Une chaîne logistique performante est un avantage concurrentiel. Madina Trans vous aide à organiser la réception, le stockage, la préparation et la distribution de vos marchandises pour que vos produits soient disponibles au bon endroit, au bon moment.",
      "Nous construisons avec vous une organisation adaptée à vos volumes et à vos points de livraison, afin de réduire les ruptures et de maîtriser vos coûts.",
    ],
    advantages: [
      "Organisation adaptée à vos volumes",
      "Préparation et regroupement des commandes",
      "Distribution vers vos points de vente ou sites",
      "Visibilité sur les flux et les stocks",
    ],
    applications: [
      "Distribution de biens de consommation",
      "Approvisionnement de réseaux de points de vente",
      "Gestion de stocks tampons pour projets",
      "Logistique d'événements et de campagnes",
    ],
    steps: [
      { title: "Diagnostic", text: "Flux, volumes, points de livraison." },
      { title: "Réception", text: "Contrôle et mise en stock." },
      { title: "Préparation", text: "Regroupement et conditionnement." },
      { title: "Distribution", text: "Livraison planifiée vers vos sites." },
    ],
    image: images.warehouse,
    secondaryImage: images.warehouseAisles,
    seo: {
      title: "Logistique et distribution au Mali",
      description:
        "Logistique au Mali : Madina Trans organise la réception, le stockage, la préparation et la distribution de vos marchandises. Une chaîne logistique maîtrisée.",
    },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
