# Rapport de tests — Madina Trans (phase 2)

**Date :** 19/11/2026 · **Environnement :** Windows 11, Node.js 24.18, Next.js 16.4.6 (Turbopack)
**Résultat global :** ✅ build de production réussi (26 routes), 0 erreur TypeScript, 0 erreur ESLint.

## 1. Contrôles automatisés

| Contrôle | Commande | Résultat |
| --- | --- | --- |
| Lint | `npm run lint` | ✅ 0 erreur, 0 avertissement |
| Types | `npm run typecheck` | ✅ 0 erreur |
| Build (mode démo) | `npm run build` | ✅ 26 routes |
| Build (mode production) | `NEXT_PUBLIC_DEMO_MODE=false npm run build` | ✅ 26 routes |

## 2. Liens et SEO (serveur de production local)

| Test | Résultat |
| --- | --- |
| Liens internes (24 URL distinctes) | ✅ 24/24 en HTTP 200 |
| `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, `/opengraph-image`, `icon.svg` | ✅ HTTP 200 |
| Un seul `h1` par page | ✅ |
| Open Graph propre aux fiches services et articles | ✅ image 1200 × 630 |
| Données structurées (WebSite, BreadcrumbList, Service) | ✅ présentes ; LocalBusiness absente tant que les coordonnées ne sont pas confirmées |
| Mode démo : `noindex` + `Disallow: /` | ✅ |
| Mode production : indexable, sitemap déclaré | ✅ |

## 3. Formulaire de devis (navigateur, 390 px)

| Test | Résultat |
| --- | --- |
| Étape 1 sans choix | ✅ « Veuillez sélectionner une option. » |
| Étape 2 vide | ✅ 3 erreurs nommées, focus sur le premier champ |
| Saisie au clavier, Entrée pour passer à l'étape suivante | ✅ |
| E-mail `awa@exemple` | ✅ « Adresse e-mail invalide : vérifiez le format… » |
| Téléphone `+223 70 12` | ✅ « Un numéro malien comporte 8 chiffres après +223… » |
| Description trop courte | ✅ « Encore 15 caractères minimum… » |
| Consentement manquant | ✅ message explicite |
| Envoi valide sans Resend | ✅ panneau « mode démonstration : aucune demande n'a été transmise » + récapitulatif |
| Pré-sélection `/devis?service=…` | ✅ |

## 4. Envoi Resend et sécurité (serveur Resend simulé localement, aucune vraie clé)

| Test | Résultat |
| --- | --- |
| Envoi valide | ✅ `sent` + référence `MT-261119-…` |
| Requête reçue par « Resend » | ✅ clé en en-tête `Authorization`, expéditeur, 2 destinataires, `reply_to` = client, objet avec service + nom + référence, en-tête d'idempotence |
| Injection HTML (`<b>` dans un champ) | ✅ échappée dans l'e-mail HTML |
| Envoi en moins de 3 s | ✅ filtré, rien n'est transmis |
| Champ piège rempli | ✅ filtré, rien n'est transmis |
| Origine étrangère | ✅ HTTP 403 |
| Téléphone invalide (contournement du navigateur) | ✅ HTTP 422 avec message |
| 6 envois depuis la même IP | ✅ 5 acceptés, 6ᵉ refusé (HTTP 429) |
| Resend en erreur | ✅ HTTP 502 + message clair à l'utilisateur |
| Formulaire de contact, envoi réel simulé | ✅ écran « Message envoyé » avec référence (vérifié à l'écran) |
| Formulaire de contact, échec d'envoi | ✅ message d'erreur affiché (vérifié à l'écran) |

## 5. Responsive

| Largeur | Pages testées | Débordement horizontal |
| --- | --- | --- |
| 360 px | 10 pages | ✅ aucun (débordement de la page Contact corrigé) |
| 390 px | 10 pages | ✅ aucun |
| 430 px | 10 pages | ✅ aucun |
| 1440 px | accueil, contact, devis | ✅ revue visuelle |

Corrections apportées pendant les tests : titre de la carte « Transport routier » masqué par l'icône sur mobile,
cartes de contact trop larges à 360 px, ligne verticale parasite dans le hero, lisibilité du « devis express »,
numérotation des sections, encadrés « à compléter » visibles en mode production (désormais limités au mode démo).

## 6. Mode production

Build avec `NEXT_PUBLIC_DEMO_MODE=false` : 0 coordonnée fictive, 0 badge « À confirmer », 0 « XX »,
0 encadré « Références à fournir » sur l'accueil, le contact, le devis et la page À propos.

## 7. Limites connues

- Resend n'a pas été testé avec un vrai compte (aucune clé fournie) : le format de requête suit l'API officielle et a été vérifié sur un serveur simulé.
- La limitation de débit est propre à chaque instance serveur (mémoire) : protection « au mieux » sur Vercel.
- Scores Lighthouse / Core Web Vitals à mesurer sur l'URL Vercel ; tests effectués sur moteur Chromium uniquement.
- Une adresse inexistante sous `/services/…` ou `/actualites/…` affiche la page 404 (`noindex`) avec un statut HTTP 200 (pré-rendu partiel de Next 16).

## Phase 3 — finalisation (19/11/2026)

| Contrôle | Résultat |
| --- | --- |
| `npm run lint` | ✅ 0 erreur, 0 avertissement |
| `npm run typecheck` | ✅ 0 erreur |
| `npm run build` (démo) | ✅ 26 routes générées |
| `NEXT_PUBLIC_DEMO_MODE=false npm run build` | ✅ 26 routes générées |
| Recherche de « XX », « Partenaire 1… », « Références à fournir » sur l'accueil | ✅ aucune occurrence |
| Liens internes (24 URL) | ✅ 24/24 en HTTP 200 |
| Métadonnées des 8 pages principales | ✅ titre, description (145–163 caractères), canonique, `og:image`, un seul `h1` |
| API sans configuration | ✅ `demo` (rien n'est transmis) |
| API avec Resend simulé | ✅ `sent` + référence ; envoi trop rapide filtré |
| `npm run test:resend` sans clés | ✅ refuse avec la liste des variables manquantes |
| `npm run test:resend` vers le serveur simulé | ✅ e-mail accepté (HTTP 200) |
| Mode production : coordonnées fictives, badges, « Périmètre à confirmer », avantages/méthode non validés | ✅ 0 occurrence (6 pages vérifiées) |
| Débordement horizontal à 360 / 390 / 430 px (7 pages) | ✅ aucun |
| Menu mobile : ouverture, mention « Fictif », fermeture par Échap | ✅ |

**Point d'attention :** pendant les tests, la connexion de ce poste vers Unsplash était très lente
(≈ 87 s pour une image de 550 Ko), ce qui a provoqué deux images non chargées en développement (504 de
l'optimiseur). Correctif : images sources allégées (1600 px, qualité 75) et cache des images optimisées
porté à 31 jours. Recommandation : héberger les photos dans `/public/images` avant la présentation, ou
vérifier l'affichage sur l'URL Vercel.

**Non testé :** envoi Resend avec un vrai compte (aucune clé disponible) — à valider avec `npm run test:resend`.

## Phase 4 — refonte premium (19/11/2026)

| Contrôle | Résultat |
| --- | --- |
| `npm run lint` | ✅ 0 erreur, 0 avertissement |
| `npm run typecheck` | ✅ 0 erreur |
| `npm run build` (démo) | ✅ 26 routes générées |
| `NEXT_PUBLIC_DEMO_MODE=false npm run build` | ✅ 26 routes ; 0 coordonnée fictive, 0 badge, 0 mention « Périmètre à confirmer » sur 7 pages |
| Liens internes (24 URL) | ✅ 24/24 en HTTP 200 |
| Un seul `h1` par page, titres et `og:image` | ✅ 8 pages vérifiées |
| Images locales optimisées (AVIF) | ✅ 40 à 90 Ko par visuel plein écran, servies en ~0,3 s |
| Aucune requête vers Unsplash depuis les pages | ✅ |
| Débordement horizontal à 360 / 390 / 430 px (7 pages) | ✅ aucun (titre « L'accompagnement personnalisé » corrigé à 360 px) |
| Header intelligent : masqué en descendant, réaffiché en remontant, visible menu ouvert | ✅ |
| Menu mobile plein écran : 7 liens, fermeture par Échap | ✅ |
| Explorateur d'expertises : survol / focus clavier change le visuel et la description | ✅ |
| API devis sans configuration | ✅ `demo` (rien n'est transmis) |

**Problème rencontré :** depuis ce réseau, Unsplash répondait en 30 à 120 s par image ; l'optimiseur
d'images expirait (504) et plusieurs visuels ne s'affichaient pas. **Correctif (autorisé) :** les 24 photos
ont été téléchargées dans `public/images` (8,4 Mo de fichiers sources) ; le site ne dépend plus d'Unsplash.
