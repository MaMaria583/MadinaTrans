# Fonctionnalités — état au 18/11/2026

## ✅ Opérationnelles

| Fonctionnalité | Détail |
| --- | --- |
| Site multipage | 10 pages + 4 fiches services + 4 articles + page 404 |
| Navigation | Menu sticky avec page active, menu mobile (hamburger, Échap, verrouillage du défilement) |
| Responsive | Testé 375 px (mobile), 768 px, 1280 px — aucun débordement horizontal |
| Formulaire de devis | 10 champs + consentement, validation navigateur **et** serveur, messages d'erreur accessibles |
| Pré-sélection du service | `/devis?service=…` et formulaires des fiches services |
| Formulaire de contact | Validation complète, champ anti-robot |
| API `/api/requests` | Validation, anti-spam, transmission webhook (testée), gestion d'erreur |
| Filtre des actualités | Par catégorie, côté navigateur |
| Mode démonstration | Bandeau, badges « À confirmer », valeurs fictives non cliquables |
| Mode production | Masquage automatique de toute donnée non confirmée |
| SEO | Titres, descriptions, canoniques, Open Graph, image de partage, sitemap, robots |
| Données structurées | Activation automatique quand téléphone et adresse sont confirmés |
| Accessibilité | Lien d'évitement, focus visibles, `aria-*`, un `h1` par page, mouvement réduit respecté |
| Sécurité | En-têtes HTTP (nosniff, frame, referrer, permissions), aucun secret dans le code |
| Performance | Pages statiques, images AVIF/WebP lazy-loadées, polices auto-hébergées |

## ⚙️ À configurer (dépend de Madina Trans)

| Fonctionnalité | Action requise | Fichier |
| --- | --- | --- |
| Réception des demandes | Choisir un service (Formspree, Make…) et renseigner `FORM_WEBHOOK_URL` | Vercel / `.env.local` |
| Coordonnées réelles | Téléphone, e-mail, adresse, horaires | `src/config/site.ts` |
| Bouton WhatsApp | Numéro WhatsApp Business confirmé | `src/config/site.ts` |
| Carte de localisation | Adresse vérifiée + URL d'intégration Google Maps | `src/config/site.ts` |
| Chiffres clés | Valeurs officielles | `src/config/site.ts` |
| Partenaires / références | Logos + autorisations écrites | `src/config/site.ts`, `public/partners/` |
| Réseaux sociaux | URLs des pages officielles | `src/config/site.ts` |
| Logo officiel | Fichier vectoriel | `src/components/ui/Logo.tsx`, `src/app/icon.svg` |
| Photos officielles | Flotte, équipes, locaux | `src/content/images.ts`, `public/images/` |
| Actualités réelles | Rédaction des articles | `src/content/articles.ts` |
| Mentions légales | RCCM, NIF, directeur de publication, hébergeur | `src/config/site.ts`, `src/app/mentions-legales/page.tsx` |
| Nom de domaine + indexation | Domaine, `NEXT_PUBLIC_DEMO_MODE=false`, Search Console | Vercel |

## 💡 Évolutions possibles (hors périmètre)

- Suivi d'expédition en ligne (espace client)
- Version anglaise (clients internationaux)
- Gestion des contenus par un CMS (Sanity, Strapi, Decap) pour éditer actualités et services sans code
- Mesure d'audience respectueuse de la vie privée (Vercel Analytics, Plausible)
- Accusé de réception automatique par e-mail au demandeur de devis
