# Rapport de tests — Madina Trans (démonstration)

**Date :** 18/11/2026 · **Environnement :** Windows 11, Node.js 24.18, npm 11.16, Next.js 16.4.6
**Résultat global :** ✅ build de production réussi, 0 erreur TypeScript, 0 erreur ESLint, aucune erreur serveur ou console applicative.

## 1. Contrôles automatisés

| Contrôle | Commande | Résultat |
| --- | --- | --- |
| Lint | `npm run lint` | ✅ 0 erreur, 0 avertissement |
| Types | `npm run typecheck` | ✅ 0 erreur |
| Build production (mode démo) | `npm run build` | ✅ 25 routes générées |
| Build production (mode production) | `NEXT_PUBLIC_DEMO_MODE=false npm run build` | ✅ 25 routes générées |
| Chaîne complète | `npm run check` | ✅ |

## 2. Pages et liens

Toutes les pages ont été chargées et contrôlées (titre, `h1` unique, rendu) :
`/`, `/a-propos`, `/services`, `/services/transport-routier`, `/services/transit-affretement`,
`/services/affretement-maritime`, `/services/logistique-distribution`, `/engagements`, `/actualites`,
4 articles, `/contact`, `/devis`, `/mentions-legales`.

| Test | Résultat |
| --- | --- |
| Exploration de tous les liens internes (20 URL distinctes, y compris `?service=`) | ✅ 20/20 en HTTP 200 |
| Un seul `h1` par page | ✅ |
| Page inexistante | ✅ page 404 personnalisée (HTTP 404 sur les URL hors routes) |
| Slug inconnu sous `/services/…` ou `/actualites/…` | ⚠️ page 404 affichée avec `noindex`, mais statut HTTP 200 (comportement du pré-rendu partiel de Next 16) |
| `robots.txt`, `sitemap.xml`, `/opengraph-image`, `icon.svg` | ✅ HTTP 200 |
| En-têtes de sécurité (nosniff, X-Frame-Options, Referrer-Policy) | ✅ présents |

## 3. Navigation

| Test | Résultat |
| --- | --- |
| Menu desktop : page active soulignée, pas de retour à la ligne à 1280 px | ✅ (corrigé pendant les tests) |
| Menu mobile : ouverture, fermeture, verrouillage du défilement, fermeture au clic sur un lien | ✅ |
| Menu mobile affiché en plein écran sous l'en-tête | ✅ (bug corrigé : le flou d'arrière-plan de l'en-tête confinait le menu) |
| Fermeture par la touche Échap, fermeture au passage en desktop | Implémenté, non testé manuellement |
| Navigation côté client vers une fiche service | ✅ contenu complet affiché |
| Ancres de la page Services (barre d'accès rapide) | ✅ |
| Filtre des actualités par catégorie | ✅ |

## 4. Formulaires

| Test | Résultat |
| --- | --- |
| Envoi vide du devis | ✅ 8 messages d'erreur, focus sur le premier champ en erreur |
| E-mail invalide / téléphone trop court / description < 20 caractères | ✅ messages spécifiques |
| Envoi valide sans service configuré | ✅ panneau « Formulaire validé — mode démonstration : aucune demande n'a été transmise » + récapitulatif |
| Pré-sélection `/devis?service=affretement-maritime` | ✅ (bug corrigé : la version initiale à base de `<Suspense>` ne s'affichait pas) |
| API : JSON invalide | ✅ HTTP 400 |
| API : type de formulaire inconnu | ✅ HTTP 400 |
| API : champs invalides | ✅ HTTP 422 + erreurs par champ |
| API : champ anti-robot rempli | ✅ ignoré silencieusement |
| **Envoi réel** avec `FORM_WEBHOOK_URL` vers un webhook local | ✅ `{"status":"sent"}`, charge JSON reçue complète, en-tête `Authorization: Bearer` transmis |
| Webhook indisponible | ✅ HTTP 502 + message d'erreur clair |
| Formulaire de contact : envoi vide (5 erreurs) puis envoi valide (panneau démo) | ✅ |

## 5. Responsive

Contrôle automatisé de la largeur de défilement sur toutes les pages + captures d'écran.

| Largeur | Résultat |
| --- | --- |
| 320 px (petit Android) | ✅ aucun débordement (logo réduit pendant les tests) |
| 360 / 375 px (smartphones) | ✅ |
| 768 px (tablette) | ✅ |
| 1024 px (tablette paysage / petit portable) | ✅ |
| 1280 / 1440 px (desktop) | ✅ |

Points vérifiés : boutons ≥ 44 px de haut, champs de 48 px, textes ≥ 16 px dans les formulaires (pas de zoom iOS),
grilles qui passent à une colonne, images recadrées correctement.

## 6. Images

| Test | Résultat |
| --- | --- |
| 16 photos Unsplash retenues, vérifiées une à une (chargement + pertinence du sujet) | ✅ ; 3 photos hors sujet écartées (caddie de supermarché, image abstraite, chantier) |
| Optimisation `next/image` (AVIF/WebP, tailles adaptatives, lazy-loading hors écran) | ✅ |
| Aucune image cassée observée à l'écran | ✅ |

## 7. Mode démonstration / mode production

| Élément | Mode démo | Mode production (données non confirmées) |
| --- | --- | --- |
| Bandeau « Site de démonstration » | Affiché | Masqué ✅ |
| Badges « À confirmer » | Affichés | 0 occurrence ✅ |
| Téléphone / e-mail fictifs | Affichés, non cliquables | Masqués ✅ |
| Bouton WhatsApp | « DÉMO » + explication | Masqué ✅ |
| Chiffres clés, partenaires | Emplacements neutres | Sections masquées ✅ |
| `robots.txt` | `Disallow: /` | `Allow: /` + sitemap ✅ |
| Balise `noindex` | Présente | Absente ✅ |
| Données structurées | Absentes | Absentes tant que téléphone + adresse non confirmés ✅ |

## 8. Console et serveur

- Console navigateur : aucune erreur applicative (seules apparaissent les réponses 400/422/404 provoquées volontairement par les tests).
- Serveur : avertissement Next 16 « instant navigation » sur les routes dynamiques corrigé (frontière `<Suspense>`), 0 erreur après redémarrage.

## 9. Limites connues

- Les contrôles Core Web Vitals (Lighthouse / PageSpeed) n'ont pas été mesurés : ils seront à exécuter sur l'URL Vercel.
  L'architecture est optimisée (pages statiques, images optimisées, polices locales, JS client limité).
- Tests réalisés sur un moteur Chromium ; Safari iOS et Firefox restent à contrôler visuellement après déploiement.
- Les photos sont chargées depuis Unsplash via l'optimiseur Next.js : elles seront à remplacer par des fichiers locaux officiels.
