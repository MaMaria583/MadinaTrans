# Fonctionnalités — état au 19/11/2026 (phase 2)

## ✅ Opérationnelles

| Fonctionnalité | Détail |
| --- | --- |
| Site multipage | 8 pages, 4 fiches services, 4 articles d'exemple, page 404 |
| Identité visuelle | Bleu marine / blanc / or, motif « plan de route », sections numérotées, soulignement doré signature |
| Accueil | Hero avec « devis express », métiers en grille éditoriale, chaîne multimodale + atouts (sans chiffres inventés), à propos avec mission, engagements, devis, secteurs, actualités, appel à l'action |
| Formulaire de devis | 3 étapes, validation par étape et côté serveur, messages explicites, confirmation avec référence |
| Envoi des demandes | **Resend prêt** (e-mail HTML à l'administrateur, réponse directe au client) — testé avec un serveur Resend simulé |
| Anti-spam | Champ piège, délai minimal, limitation de débit, contrôle d'origine, taille limitée, échappement HTML |
| Formulaire de contact | Même validation, même acheminement (destinataire `CONTACT_EMAIL` possible) |
| Page Contact | Cartes d'accès direct (téléphone, e-mail, WhatsApp, adresse), carte affichée seulement après vérification de l'adresse |
| Mobile | Barre d'actions fixe (Devis + Appel/WhatsApp si confirmés), menu plein écran, cibles tactiles ≥ 44 px, aucun débordement de 360 à 430 px |
| Animations | Apparitions au défilement, zoom lent des visuels, fondu entre les pages, désactivées si « mouvement réduit » |
| Mode démonstration / production | Données non confirmées signalées (démo) ou masquées automatiquement (production) |
| SEO | Titres et descriptions par page, Open Graph complet avec image, sitemap, robots, manifeste, fil d'Ariane structuré, schémas `Service` et `WebSite`, référencement local Bamako |
| Images | 24 visuels distincts, optimisés AVIF/WebP, chargement différé, fond d'attente marine |

## ⚙️ À configurer (dépend de Madina Trans)

| Fonctionnalité | Action requise | Où |
| --- | --- | --- |
| **Envoi des devis par e-mail** | Compte Resend, domaine vérifié, clé API, adresse(s) destinataire(s) | Variables Vercel : `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `ADMIN_EMAIL`, `CONTACT_EMAIL` |
| Coordonnées réelles | Téléphone, e-mail, adresse, horaires | `src/config/site.ts` |
| Bouton WhatsApp / appel mobile | Numéros confirmés | `src/config/site.ts` |
| Carte de localisation | Adresse vérifiée + URL d'intégration Google Maps | `src/config/site.ts` |
| Chiffres clés | Valeurs officielles (affichées automatiquement une fois confirmées) | `src/config/site.ts` → `keyFigures` |
| Partenaires / références | Logos + autorisations écrites | `src/config/site.ts` → `partners` |
| Textes institutionnels | Validation de la présentation, vision, mission, valeurs, atouts, secteurs | `src/config/site.ts` → `institutional` |
| Réseaux sociaux | URLs officielles | `src/config/site.ts` |
| Logo, photos, actualités | Fichiers et contenus officiels | voir README |
| Mise en ligne | Domaine, `NEXT_PUBLIC_DEMO_MODE=false`, Search Console | Vercel |

## 💡 Évolutions possibles

- Accusé de réception automatique au demandeur (Resend) — volontairement non activé pour éviter tout envoi vers des adresses saisies par des robots.
- Limitation de débit partagée entre instances (Upstash Redis) si le trafic l'exige.
- Espace client avec suivi d'expédition, version anglaise, CMS pour les actualités.
