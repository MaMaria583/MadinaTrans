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
 *   sont disponibles (même dossier /public/images, même nom de fichier ou
 *   nouveau chemin, par exemple src: "/images/flotte-01.jpg").
 */

/**
 * Les photos sont hébergées dans /public/images (téléchargées depuis Unsplash
 * en 1600 px) : affichage rapide et fiable, sans dépendre d'un service tiers.
 * L'optimiseur Next.js génère ensuite les formats AVIF/WebP aux bonnes tailles.
 */

export interface SiteImage {
  src: string;
  alt: string;
}

export const images = {
  /* ——— Route ——— */
  heroTruck: {
    src: "/images/hero-truck.jpg",
    alt: "Camion de transport de marchandises sur une route bordée de savane",
  },
  truckHighway: {
    src: "/images/truck-highway.jpg",
    alt: "Camion chargé sur une route de montagne en paysage aride",
  },
  truckSunset: {
    src: "/images/truck-sunset.jpg",
    alt: "Camion semi-remorque à l'arrêt au coucher du soleil",
  },
  truckTrailer: {
    src: "/images/truck-trailer.jpg",
    alt: "Remorque de camion stationnée sur une aire logistique",
  },
  truckCab: {
    src: "/images/truck-cab.jpg",
    alt: "Conducteur au volant d'un poids lourd sur la route",
  },

  /* ——— Ports et maritime ——— */
  portContainers: {
    src: "/images/port-containers.jpg",
    alt: "Terminal portuaire avec des milliers de conteneurs empilés",
  },
  portCranes: {
    src: "/images/port-cranes.jpg",
    alt: "Porte-conteneurs à quai sous les grues d'un terminal maritime",
  },
  portTerminal: {
    src: "/images/port-terminal.jpg",
    alt: "Vue aérienne d'un terminal à conteneurs avec camions et portiques",
  },
  portAerial: {
    src: "/images/port-aerial.jpg",
    alt: "Vue aérienne d'un port de commerce et d'un navire en manœuvre",
  },
  containerShip: {
    src: "/images/container-ship.jpg",
    alt: "Navire porte-conteneurs en mer",
  },
  containerShipAerial: {
    src: "/images/container-ship-aerial.jpg",
    alt: "Porte-conteneurs vu du ciel naviguant en haute mer",
  },
  containersAerial: {
    src: "/images/containers-aerial.jpg",
    alt: "Vue aérienne de conteneurs alignés dans un port",
  },
  containerStack: {
    src: "/images/container-stack.jpg",
    alt: "Conteneurs maritimes colorés empilés",
  },

  /* ——— Entrepôt et distribution ——— */
  warehouse: {
    src: "/images/warehouse.jpg",
    alt: "Entrepôt logistique avec marchandises palettisées",
  },
  warehouseWorker: {
    src: "/images/warehouse-worker.jpg",
    alt: "Préparateur de commandes dans les allées d'un entrepôt",
  },
  warehouseAisles: {
    src: "/images/warehouse-aisles.jpg",
    alt: "Allées d'un entrepôt de stockage aux rayonnages chargés",
  },
  warehouseRacks: {
    src: "/images/warehouse-racks.jpg",
    alt: "Rayonnages de stockage dans un entrepôt de distribution",
  },
  warehouseAerial: {
    src: "/images/warehouse-aerial.jpg",
    alt: "Vue aérienne d'une plateforme logistique et de ses quais de chargement",
  },
  deliveryVan: {
    src: "/images/delivery-van.jpg",
    alt: "Livreur chargeant des colis dans un véhicule utilitaire",
  },
  parcels: {
    src: "/images/parcels.jpg",
    alt: "Remise d'un colis entre deux personnes lors d'une livraison",
  },
  tracking: {
    src: "/images/tracking.jpg",
    alt: "Suivi d'un itinéraire sur l'écran d'un smartphone",
  },

  /* ——— Relation client ——— */
  meeting: {
    src: "/images/meeting.jpg",
    alt: "Équipe en réunion de travail autour d'une table",
  },
  handshake: {
    src: "/images/handshake.jpg",
    alt: "Poignée de main entre deux partenaires professionnels",
  },
  logisticsWorker: {
    src: "/images/logistics-worker.jpg",
    alt: "Technicien équipé d'un casque de sécurité au travail",
  },
} satisfies Record<string, SiteImage>;

export const imageCreditNote =
  "Photographies : Unsplash — visuels d'illustration ne représentant pas la flotte, les locaux ni le personnel de Madina Trans.";
