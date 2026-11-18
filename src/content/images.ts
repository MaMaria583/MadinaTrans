/**
 * Banque d'images du site.
 *
 * Toutes les photographies proviennent d'Unsplash (licence Unsplash :
 * utilisation commerciale gratuite, sans attribution obligatoire).
 * Ce sont des VISUELS D'ILLUSTRATION : ils ne représentent ni la flotte,
 * ni les locaux, ni le personnel de Madina Trans.
 *
 * ➜ Remplacez-les par les photos officielles de l'entreprise dès qu'elles
 *   sont disponibles (placer les fichiers dans /public/images et indiquer
 *   par exemple src: "/images/flotte-01.jpg").
 */

const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=80`;

export interface SiteImage {
  src: string;
  alt: string;
}

export const images = {
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
  portContainers: {
    src: unsplash("photo-1494412574643-ff11b0a5c1c3"),
    alt: "Terminal portuaire avec des milliers de conteneurs empilés",
  },
  portCranes: {
    src: unsplash("photo-1578575437130-527eed3abbec"),
    alt: "Porte-conteneurs à quai sous les grues d'un terminal maritime",
  },
  containerShip: {
    src: unsplash("photo-1605745341112-85968b19335b"),
    alt: "Navire porte-conteneurs en mer",
  },
  containersAerial: {
    src: unsplash("photo-1494412519320-aa613dfb7738"),
    alt: "Vue aérienne de conteneurs alignés dans un port",
  },
  warehouse: {
    src: unsplash("photo-1586528116311-ad8dd3c8310d"),
    alt: "Entrepôt logistique avec marchandises palettisées",
  },
  warehouseAisles: {
    src: unsplash("photo-1553413077-190dd305871c"),
    alt: "Allées d'un entrepôt de stockage aux rayonnages chargés",
  },
  warehouseRacks: {
    src: unsplash("photo-1587293852726-70cdb56c2866"),
    alt: "Rayonnages de stockage dans un entrepôt de distribution",
  },
  parcels: {
    src: unsplash("photo-1566576721346-d4a3b4eaeb55"),
    alt: "Remise d'un colis entre deux personnes lors d'une livraison",
  },
  delivery: {
    src: unsplash("photo-1580674285054-bed31e145f59"),
    alt: "Cartons et colis stockés avant expédition",
  },
  logisticsWorker: {
    src: unsplash("photo-1621905251189-08b45d6a269e"),
    alt: "Technicien équipé d'un casque de sécurité au travail",
  },
  meeting: {
    src: unsplash("photo-1600880292203-757bb62b4baf"),
    alt: "Équipe en réunion de travail autour d'une table",
  },
  handshake: {
    src: unsplash("photo-1521791136064-7986c2920216"),
    alt: "Poignée de main entre deux partenaires professionnels",
  },
} satisfies Record<string, SiteImage>;

export const imageCreditNote =
  "Photographies : Unsplash — visuels d'illustration ne représentant pas la flotte, les locaux ni le personnel de Madina Trans.";
