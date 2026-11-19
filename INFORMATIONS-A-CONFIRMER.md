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
| Téléphone | `+223 00 00 00 00` | Texte non cliquable + badge « Démo » |
| E-mail | `contact@madinatrans.example` | Domaine `.example` réservé, non fonctionnel |
| WhatsApp | `22300000000` | Bouton « DÉMO » expliquant qu'il n'est pas opérationnel |
| Logo | Concept graphique temporaire (SVG) | Ce n'est **pas** le logo officiel |
| Photographies | Unsplash (illustrations) | Ne représentent ni la flotte, ni les locaux, ni le personnel |
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
