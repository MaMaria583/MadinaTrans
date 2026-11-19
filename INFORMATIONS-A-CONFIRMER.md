# Informations à confirmer auprès de Madina Trans

Ce document recense **toutes** les informations du site de démonstration, classées selon leur fiabilité.
Aucune donnée n'a été inventée : tout ce qui n'est pas confirmé est signalé « À confirmer » sur le site
(en mode démonstration) et masqué automatiquement en production.

Fichier de configuration correspondant : `src/config/site.ts`.

## Légende

| Statut | Signification |
| --- | --- |
| ✅ **Vérifiée** | Information publiquement vérifiable (source citée) |
| 📄 **Documentation fournie** | Issue du brief / de la maquette transmis par MD Digital Solutions |
| 🧪 **Démonstration** | Valeur fictive, non opérationnelle, uniquement pour la présentation |
| ❓ **Manquante** | Information à obtenir — rien n'est affiché en production |

## 1. Informations publiquement vérifiées

Une recherche web (18/11/2026) n'a retourné **aucune source publique** concernant Madina Trans (site, annuaire,
presse, registre). **Aucune information n'a donc le statut « vérifiée ».**

## 2. Informations issues de la documentation fournie (à valider)

| Élément | Valeur utilisée | Où |
| --- | --- | --- |
| Nom commercial | Madina Trans | Partout |
| Ville | Bamako, Mali | Barre supérieure, pied de page, contact |
| Activités | Transport routier · Transit et affrètement · Affrètement maritime · Logistique et distribution | Services |
| Signature | « Ensemble, transportons vos ambitions » | Barre supérieure, pied de page |
| Accroche | « Votre partenaire de confiance pour un transport sans frontières » | Hero |

> ⚠️ La maquette visuelle contenait un téléphone (+223 20 22 30 30), un e-mail (contact@madinatransmali.com),
> des chiffres (+15 ans, +100 véhicules, +500 clients) et des logos de partenaires (AFD, BCEAO, Société Générale,
> Orange, Sonapost). **Aucun de ces éléments n'a été repris**, faute de confirmation.

## 3. Éléments de démonstration (fictifs)

| Élément | Valeur fictive | Comportement |
| --- | --- | --- |
| Téléphone | `+223 00 00 00 00` | Texte non cliquable + badge « Fictif » + mention lue par les lecteurs d'écran |
| E-mail | `contact@madinatrans.example` | Domaine `.example` réservé, non fonctionnel, badge « Fictif » |
| WhatsApp | `22300000000` | Bouton « DÉMO » expliquant qu'il n'est pas opérationnel |
| Logo | Concept graphique temporaire (SVG) | Ce n'est **pas** le logo officiel |
| Photographies | Unsplash (illustrations), hébergées dans `public/images` | Ne représentent ni la flotte, ni les locaux, ni le personnel |
| Articles (4) | Contenus pédagogiques généraux | Badge « Article d'exemple », dates fictives |
| Textes des services, présentation, valeurs, vision, mission, engagements, atouts | Rédaction de démonstration (`institutional` dans `site.ts`) | Décrivent des prestations types, sans chiffre ni référence |
| Secteurs d'activité (commerce, construction, agro-alimentaire…) | Capacités présentées, pas des références clients | À valider avec la direction |

## 4. Informations manquantes — à obtenir

### Identité et juridique
- [ ] Raison sociale exacte et forme juridique
- [ ] Numéro RCCM, NIF
- [ ] Directeur de la publication (mentions légales)
- [ ] Logo officiel (vectoriel SVG/AI/PDF) et charte graphique éventuelle
- [ ] Date de création de l'entreprise, historique, étapes clés

### Coordonnées
- [ ] Téléphone principal (et éventuellement par service)
- [ ] Adresse e-mail de contact (et adresse de réception des devis)
- [ ] Numéro WhatsApp Business
- [ ] Adresse postale complète du siège (+ lien Google Maps vérifié pour la carte)
- [ ] Horaires d'ouverture
- [ ] Liens des réseaux sociaux (Facebook, LinkedIn, YouTube, Instagram…)
- [ ] Nom de domaine souhaité (ex. madinatrans.ml / .com)

### Chiffres clés (ne jamais estimer)

> La page d'accueil n'affiche plus d'emplacements « XX » : les chiffres n'apparaissent qu'une fois
> renseignés et confirmés dans `keyFigures`. En attendant, des atouts qualitatifs sont présentés.

- [ ] Années d'expérience
- [ ] Nombre de véhicules (et types : porteurs, semi-remorques, plateaux, citernes…)
- [ ] Pays / corridors desservis
- [ ] Nombre de clients accompagnés

### Activité
- [ ] Validation des descriptions des 4 services
- [ ] Zones géographiques réellement couvertes (corridors, ports partenaires : Dakar, Abidjan, Lomé, Cotonou… ?)
- [ ] Types de marchandises acceptées / exclues
- [ ] Capacités de stockage (entrepôts, surfaces) si logistique proposée
- [ ] Agréments (commissionnaire en douane, transitaire…), certifications, assurances — **sur justificatifs**

### Références et contenus
- [ ] Partenaires / clients pouvant être cités, **avec autorisation écrite** et logos fournis
- [ ] Témoignages clients authentiques (nom, fonction, accord écrit)
- [ ] Photographies officielles : flotte, équipes, locaux, opérations
- [ ] Actualités réelles à publier

### Technique
- [ ] Compte Resend + domaine d'envoi vérifié (DNS SPF/DKIM) + clé API
- [ ] Adresse(s) e-mail qui recevront les devis (`ADMIN_EMAIL`) et les messages de contact (`CONTACT_EMAIL`)
- [ ] Compte GitHub et compte Vercel (ou autre hébergeur) au nom de l'entreprise

## 5. Comment intégrer une information confirmée

1. Ouvrir `src/config/site.ts`.
2. Remplacer la valeur, par exemple :
   ```ts
   phone: { value: "+223 XX XX XX XX", status: "provided", note: "Confirmé par M. X le JJ/MM/AAAA" },
   ```
3. Pour un chiffre clé : `figure: { value: "15+", status: "provided" }`.
4. Pour un partenaire : déposer le logo dans `public/partners/` puis l'ajouter au tableau `partners`.
5. Une fois tout validé : `NEXT_PUBLIC_DEMO_MODE=false` dans Vercel, puis redéployer.

## 6. Prestations à faire confirmer

Les **domaines d'activité** (transport routier, transit et affrètement, affrètement maritime, logistique et
distribution) proviennent du brief. Le **détail** de chaque prestation (descriptions, avantages, applications,
méthode) est une proposition de rédaction : il est signalé « Périmètre à confirmer » en démonstration et
**masqué automatiquement en production** tant qu'il n'est pas validé.

Fichier : `src/content/services.ts` → champ `verification` de chaque service
(`details: "demo"` → passer à `"provided"` une fois validé).

### Transport routier
- [ ] Liaisons réellement assurées : national uniquement ou aussi transfrontalier (quels pays / corridors) ?
- [ ] Flotte propre ou affrétée ? Types de véhicules (porteurs, semi-remorques, plateaux, citernes…)
- [ ] Marchandises acceptées / exclues (dangereuses, réfrigérées, hors gabarit…)
- [ ] Modalités de suivi et d'information du client
- [ ] Assurance marchandises proposée ou non

### Transit et affrètement
- [ ] Madina Trans dispose-t-elle d'un agrément de commissionnaire en douane / transitaire ?
- [ ] Formalités prises en charge directement ou via un partenaire agréé
- [ ] Bureaux de douane et frontières habituellement traités
- [ ] Affrètement : moyens propres ou sous-traités

### Affrètement maritime
- [ ] Activité réellement exercée (organisation de fret maritime) ou simple coordination avec des transitaires ?
- [ ] Ports de la sous-région utilisés (Dakar, Abidjan, Lomé, Cotonou, Conakry…)
- [ ] Conteneur complet (FCL) et/ou groupage (LCL)
- [ ] Prise en charge du post-acheminement port → Mali

### Logistique et distribution
- [ ] Entrepôts disponibles ? (propres ou partenaires, localisation, surface) — à ne pas annoncer sans confirmation
- [ ] Préparation de commandes et gestion de stocks réellement proposées ?
- [ ] Zones de distribution couvertes
- [ ] Outils de suivi des stocks proposés au client

### Contenus institutionnels
- [ ] Accroche « Nous connectons les routes, les marchés et les opportunités » et positionnement international
- [ ] Chaîne intégrée (collecte, transport, transit, acheminement, livraison) : étapes réellement assurées
- [ ] Axes d'engagement (fiabilité, proximité, réactivité, qualité de service)
- [ ] Présentation, vision, mission, valeurs (`institutional` dans `src/config/site.ts`)
- [ ] Atouts mis en avant sur l'accueil (« chaîne multimodale », « interlocuteur unique », « ancrage à Bamako », « devis détaillés »)
- [ ] Démarche qualité (4 étapes) et engagements (sécurité, délais, qualité, transparence…)
- [ ] Secteurs d'activité ciblés (liste conservée dans la configuration, non affichée)
