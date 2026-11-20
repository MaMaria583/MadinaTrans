export type CommitmentIcon = "shield" | "clock" | "users" | "chart" | "lock" | "award" | "smile" | "eye";

export interface Commitment {
  id: string;
  icon: CommitmentIcon;
  title: string;
  subtitle: string;
  text: string;
  points?: string[];
}

/** Les quatre engagements mis en avant sur la page d'accueil. */
export const homeCommitments: Commitment[] = [
  {
    id: "fiabilite",
    icon: "shield",
    title: "Fiabilité",
    subtitle: "Préparer, sécuriser, tenir parole",
    text: "Chaque opération est préparée avec méthode : chargement, itinéraire, documents. L'objectif : une expédition qui se déroule comme prévu.",
  },
  {
    id: "proximite",
    icon: "users",
    title: "Proximité",
    subtitle: "Un dialogue direct",
    text: "Une écoute attentive de vos contraintes et un interlocuteur identifié, ancré à Bamako et au fait des réalités du terrain.",
  },
  {
    id: "reactivite",
    icon: "clock",
    title: "Réactivité",
    subtitle: "Face aux imprévus",
    text: "Des réponses rapides à vos demandes et une information transparente lorsque la situation évolue.",
  },
  {
    id: "qualite",
    icon: "award",
    title: "Qualité de service",
    subtitle: "Une exigence quotidienne",
    text: "Des pratiques simples, appliquées avec constance, de l'étude de la demande jusqu'au contrôle à la livraison.",
  },
];

/** Les engagements détaillés de la page « Nos engagements ». */
export const commitments: Commitment[] = [
  {
    id: "securite",
    icon: "lock",
    title: "La sécurité",
    subtitle: "Des personnes, des marchandises et des opérations",
    text: "La sécurité guide chacune de nos opérations : préparation des chargements, arrimage, choix des itinéraires et respect des règles de circulation.",
    points: [
      "Contrôle des chargements avant départ",
      "Arrimage adapté à la nature des marchandises",
      "Sensibilisation des équipes aux bonnes pratiques",
    ],
  },
  {
    id: "delais",
    icon: "clock",
    title: "Le respect des délais",
    subtitle: "Votre calendrier est notre priorité",
    text: "Nous planifions chaque opération en tenant compte des contraintes réelles du terrain afin de vous annoncer des délais réalistes, et de les tenir.",
    points: [
      "Planification en amont des enlèvements",
      "Anticipation des formalités et des points de passage",
      "Information immédiate en cas d'aléa",
    ],
  },
  {
    id: "qualite",
    icon: "award",
    title: "La qualité de service",
    subtitle: "Une exigence au quotidien",
    text: "De la prise en charge de votre demande jusqu'à la livraison, nous veillons à la rigueur de chaque étape et au soin apporté à vos marchandises.",
    points: [
      "Procédures claires à chaque étape",
      "Contrôle à la réception et à la livraison",
      "Amélioration continue à partir de vos retours",
    ],
  },
  {
    id: "satisfaction",
    icon: "smile",
    title: "La satisfaction client",
    subtitle: "Votre réussite, notre mesure",
    text: "Nous construisons des relations durables, fondées sur l'écoute, la disponibilité et des réponses concrètes à vos besoins.",
    points: ["Écoute et compréhension de vos enjeux", "Disponibilité de nos équipes", "Suivi après chaque opération"],
  },
  {
    id: "transparence",
    icon: "eye",
    title: "La transparence",
    subtitle: "Des engagements clairs",
    text: "Devis détaillés, conditions explicites et informations régulières : vous savez à tout moment ce qui est fait et à quel prix.",
    points: [
      "Devis détaillés et compréhensibles",
      "Information régulière sur l'avancement",
      "Communication honnête en cas de difficulté",
    ],
  },
  {
    id: "accompagnement",
    icon: "users",
    title: "L'accompagnement personnalisé",
    subtitle: "Une organisation pour chaque besoin",
    text: "Chaque client est unique. Nous prenons le temps de comprendre votre activité pour concevoir une organisation sur mesure.",
    points: [
      "Un interlocuteur identifié",
      "Des moyens adaptés à vos volumes",
      "Des conseils sur l'optimisation de vos flux",
    ],
  },
];
