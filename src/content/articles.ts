import { images, type SiteImage } from "./images";

export type ArticleBlock = { type: "p"; text: string } | { type: "h2"; text: string } | { type: "ul"; items: string[] };

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: "Conseils" | "Transit" | "Maritime" | "Logistique";
  /** Date ISO (AAAA-MM-JJ) */
  date: string;
  readingMinutes: number;
  cover: SiteImage;
  /**
   * true = article d'exemple rédigé pour la démonstration (contenu
   * pédagogique général, aucune actualité de l'entreprise).
   */
  isSample: boolean;
  body: ArticleBlock[];
}

/**
 * ARTICLES D'EXEMPLE — contenus pédagogiques généraux destinés à illustrer
 * l'interface éditoriale. Ils ne relatent aucun fait, événement ou
 * réalisation de Madina Trans. Remplacez-les par les publications
 * officielles de l'entreprise.
 */
export const articles: Article[] = [
  {
    slug: "bien-preparer-une-expedition-routiere",
    title: "Transport routier : 6 points pour bien préparer une expédition",
    excerpt:
      "Une expédition réussie se joue avant le départ du camion. Voici les informations à réunir pour obtenir un devis précis et éviter les mauvaises surprises.",
    category: "Conseils",
    date: "2026-10-28",
    readingMinutes: 4,
    cover: images.truckHighway,
    isSample: true,
    body: [
      {
        type: "p",
        text: "Dans le transport de marchandises, la majorité des retards et des surcoûts trouvent leur origine dans une information incomplète au moment de la commande. Prendre quelques minutes pour préparer son expédition permet de gagner du temps à chaque étape.",
      },
      { type: "h2", text: "1. Décrire précisément la marchandise" },
      {
        type: "p",
        text: "Nature, conditionnement, poids, volume, fragilité : ces éléments déterminent le type de véhicule, la méthode de chargement et les précautions à prendre.",
      },
      { type: "h2", text: "2. Préciser les lieux et les contraintes d'accès" },
      {
        type: "p",
        text: "Adresse d'enlèvement, adresse de livraison, horaires d'ouverture, accès pour un poids lourd, présence ou non de moyens de manutention : autant de détails qui conditionnent le bon déroulement de l'opération.",
      },
      { type: "h2", text: "3. Indiquer le délai souhaité" },
      {
        type: "p",
        text: "Une date impérative de livraison doit être annoncée dès la demande de devis, afin que le transporteur puisse planifier les moyens nécessaires.",
      },
      { type: "h2", text: "4. Rassembler les documents" },
      {
        type: "ul",
        items: [
          "Bon de livraison ou bon de commande",
          "Facture commerciale et liste de colisage",
          "Documents spécifiques selon la nature de la marchandise",
        ],
      },
      { type: "h2", text: "5. Désigner un contact sur place" },
      {
        type: "p",
        text: "Un interlocuteur joignable au départ et à l'arrivée facilite la coordination et permet de réagir rapidement en cas d'imprévu.",
      },
      { type: "h2", text: "6. Penser à l'assurance" },
      {
        type: "p",
        text: "Selon la valeur de la marchandise, il peut être utile d'étudier une couverture d'assurance adaptée. Parlez-en avec votre transporteur dès la demande de devis.",
      },
    ],
  },
  {
    slug: "transit-documents-a-anticiper",
    title: "Transit import-export : les documents à anticiper",
    excerpt:
      "Facture commerciale, liste de colisage, document de transport… Tour d'horizon des pièces généralement demandées lors d'une opération de transit.",
    category: "Transit",
    date: "2026-10-14",
    readingMinutes: 5,
    cover: images.containersAerial,
    isSample: true,
    body: [
      {
        type: "p",
        text: "Une opération de transit mobilise de nombreux acteurs : expéditeur, transporteurs, services administratifs, destinataire. Pour que les marchandises circulent sans blocage, les documents doivent être complets, cohérents et disponibles au bon moment.",
      },
      { type: "h2", text: "Les documents commerciaux" },
      {
        type: "ul",
        items: [
          "La facture commerciale, qui décrit la marchandise et sa valeur",
          "La liste de colisage, qui détaille le contenu de chaque colis",
          "Le certificat d'origine, lorsque celui-ci est requis",
        ],
      },
      { type: "h2", text: "Les documents de transport" },
      {
        type: "p",
        text: "Selon le mode utilisé, le document de transport prend une forme différente : connaissement pour le maritime, lettre de voiture pour le routier. Il atteste de la prise en charge de la marchandise par le transporteur.",
      },
      { type: "h2", text: "Les documents spécifiques" },
      {
        type: "p",
        text: "Certaines marchandises nécessitent des autorisations, des certificats ou des contrôles particuliers. Il est essentiel de vérifier ces exigences avant l'expédition auprès des services compétents.",
      },
      { type: "h2", text: "Le conseil : anticiper" },
      {
        type: "p",
        text: "Les exigences réglementaires évoluent. Avant toute opération, faites le point avec votre partenaire transit pour vérifier la liste à jour des pièces nécessaires à votre dossier.",
      },
    ],
  },
  {
    slug: "conteneur-complet-ou-groupage",
    title: "Affrètement maritime : conteneur complet ou groupage ?",
    excerpt:
      "Faut-il réserver un conteneur entier ou partager l'espace avec d'autres chargeurs ? Les critères pour choisir la solution adaptée à vos volumes.",
    category: "Maritime",
    date: "2026-09-30",
    readingMinutes: 4,
    cover: images.containerShip,
    isSample: true,
    body: [
      {
        type: "p",
        text: "Lorsqu'on expédie des marchandises par la mer, deux grandes options s'offrent à l'expéditeur : le conteneur complet (FCL, Full Container Load) et le groupage (LCL, Less than Container Load).",
      },
      { type: "h2", text: "Le conteneur complet (FCL)" },
      {
        type: "p",
        text: "Le conteneur est réservé à un seul expéditeur. Cette solution convient aux volumes importants et limite les manipulations de la marchandise, ce qui réduit les risques de dommages.",
      },
      { type: "h2", text: "Le groupage (LCL)" },
      {
        type: "p",
        text: "La marchandise partage un conteneur avec celle d'autres chargeurs. Cette solution est souvent pertinente pour les petits volumes, mais implique des étapes de consolidation et de dégroupage.",
      },
      { type: "h2", text: "Comment choisir ?" },
      {
        type: "ul",
        items: [
          "Le volume et le poids de la marchandise",
          "Sa fragilité et sa valeur",
          "Le délai acceptable",
          "Le coût global, y compris le post-acheminement terrestre",
        ],
      },
      {
        type: "p",
        text: "Pour un pays sans littoral, le coût et la durée de l'acheminement entre le port et la destination finale pèsent dans la décision. Une vision globale de la chaîne est indispensable.",
      },
    ],
  },
  {
    slug: "pourquoi-structurer-sa-logistique",
    title: "Logistique : pourquoi structurer sa chaîne d'approvisionnement",
    excerpt:
      "Ruptures de stock, livraisons tardives, coûts cachés : une logistique mieux organisée améliore directement la performance commerciale.",
    category: "Logistique",
    date: "2026-09-16",
    readingMinutes: 3,
    cover: images.warehouseAisles,
    isSample: true,
    body: [
      {
        type: "p",
        text: "La logistique est souvent perçue comme un centre de coûts. Elle est pourtant un levier de compétitivité : une marchandise disponible au bon endroit et au bon moment, c'est une vente réalisée et un client satisfait.",
      },
      { type: "h2", text: "Les signes d'une chaîne à optimiser" },
      {
        type: "ul",
        items: [
          "Des ruptures de stock fréquentes",
          "Des livraisons urgentes et coûteuses",
          "Un manque de visibilité sur les stocks",
          "Des délais de livraison irréguliers",
        ],
      },
      { type: "h2", text: "Les leviers d'amélioration" },
      {
        type: "p",
        text: "Planification des approvisionnements, regroupement des livraisons, organisation du stockage, choix des moyens de transport : chaque maillon peut être optimisé. Un diagnostic de vos flux constitue le point de départ.",
      },
    ],
  },
];

export const articleCategories = Array.from(new Set(articles.map((a) => a.category)));

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
