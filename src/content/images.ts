/**
 * Banque d'images du site.
 *
 * Toutes les photographies proviennent d'Unsplash (licence Unsplash :
 * utilisation commerciale gratuite, sans attribution obligatoire).
 * Ce sont des VISUELS D'ILLUSTRATION : ils ne représentent ni la flotte,
 * ni les locaux, ni le personnel de Madina Trans.
 *
 * Règle éditoriale : une image = un usage principal, pour éviter les
 * répétitions d'une page à l'autre.
 *
 * ➜ Remplacez-les par les photos officielles de l'entreprise dès qu'elles
 *   sont disponibles (placer les fichiers dans /public/images et indiquer
 *   par exemple src: "/images/flotte-01.jpg").
 */

/** Source Unsplash limitée à 1600 px : l'optimiseur Next.js produit ensuite AVIF/WebP aux bonnes tailles. */
const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=75`;

export interface SiteImage {
  src: string;
  alt: string;
}

export const images = {
  /* ——— Route ——— */
  heroTruck: {
    src: unsplash("photo-1601584115197-04ecc0da31d7"),
    alt: "Camion de transport de marchandises sur une route bordée de savane",
  },
  truckHighway: {
    src: unsplash("photo-1519003722824-194d4455a60c"),
    alt: "Camion chargé sur une route de montagne en paysage aride",
  },
  truckSunset: {
    src: unsplash("photo-1592838064575-70ed626d3a0e"),
    alt: "Camion semi-remorque à l'arrêt au coucher du soleil",
  },
  truckTrailer: {
    src: unsplash("photo-1616432043562-3671ea2e5242"),
    alt: "Remorque de camion stationnée sur une aire logistique",
  },
  truckCab: {
    src: unsplash("photo-1600320254374-ce2d293c324e"),
    alt: "Conducteur au volant d'un poids lourd sur la route",
  },

  /* ——— Ports et maritime ——— */
  portContainers: {
    src: unsplash("photo-1494412574643-ff11b0a5c1c3"),
    alt: "Terminal portuaire avec des milliers de conteneurs empilés",
  },
  portCranes: {
    src: unsplash("photo-1578575437130-527eed3abbec"),
    alt: "Porte-conteneurs à quai sous les grues d'un terminal maritime",
  },
  portTerminal: {
    src: unsplash("photo-1559297434-fae8a1916a79"),
    alt: "Vue aérienne d'un terminal à conteneurs avec camions et portiques",
  },
  portAerial: {
    src: unsplash("photo-1606185540834-d6e7483ee1a4"),
    alt: "Vue aérienne d'un port de commerce et d'un navire en manœuvre",
  },
  containerShip: {
    src: unsplash("photo-1605745341112-85968b19335b"),
    alt: "Navire porte-conteneurs en mer",
  },
  containerShipAerial: {
    src: unsplash("photo-1613690399151-65ea69478674"),
    alt: "Porte-conteneurs vu du ciel naviguant en haute mer",
  },
  containersAerial: {
    src: unsplash("photo-1494412519320-aa613dfb7738"),
    alt: "Vue aérienne de conteneurs alignés dans un port",
  },
  containerStack: {
    src: unsplash("photo-1494961104209-3c223057bd26"),
    alt: "Conteneurs maritimes colorés empilés",
  },

  /* ——— Entrepôt et distribution ——— */
  warehouse: {
    src: unsplash("photo-1586528116311-ad8dd3c8310d"),
    alt: "Entrepôt logistique avec marchandises palettisées",
  },
  warehouseWorker: {
    src: unsplash("photo-1586528116493-a029325540fa"),
    alt: "Préparateur de commandes dans les allées d'un entrepôt",
  },
  warehouseAisles: {
    src: unsplash("photo-1553413077-190dd305871c"),
    alt: "Allées d'un entrepôt de stockage aux rayonnages chargés",
  },
  warehouseRacks: {
    src: unsplash("photo-1587293852726-70cdb56c2866"),
    alt: "Rayonnages de stockage dans un entrepôt de distribution",
  },
  warehouseAerial: {
    src: unsplash("photo-1565891741441-64926e441838"),
    alt: "Vue aérienne d'une plateforme logistique et de ses quais de chargement",
  },
  deliveryVan: {
    src: unsplash("photo-1612630741022-b29ec17d013d"),
    alt: "Livreur chargeant des colis dans un véhicule utilitaire",
  },
  parcels: {
    src: unsplash("photo-1566576721346-d4a3b4eaeb55"),
    alt: "Remise d'un colis entre deux personnes lors d'une livraison",
  },
  tracking: {
    src: unsplash("photo-1548345680-f5475ea5df84"),
    alt: "Suivi d'un itinéraire sur l'écran d'un smartphone",
  },

  /* ——— Relation client ——— */
  meeting: {
    src: unsplash("photo-1600880292203-757bb62b4baf"),
    alt: "Équipe en réunion de travail autour d'une table",
  },
  handshake: {
    src: unsplash("photo-1521791136064-7986c2920216"),
    alt: "Poignée de main entre deux partenaires professionnels",
  },
  logisticsWorker: {
    src: unsplash("photo-1621905251189-08b45d6a269e"),
    alt: "Technicien équipé d'un casque de sécurité au travail",
  },
} satisfies Record<string, SiteImage>;

export const imageCreditNote =
  "Photographies : Unsplash — visuels d'illustration ne représentant pas la flotte, les locaux ni le personnel de Madina Trans.";
