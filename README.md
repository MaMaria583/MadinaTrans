# Madina Trans — site de démonstration

Dépôt : https://github.com/MaMaria583/MadinaTrans

> **Proposition de refonte web réalisée par MD Digital Solutions.**
> Ce dépôt contient une démonstration complète et fonctionnelle du futur site de Madina Trans
> (transport routier, transit, affrètement maritime, logistique — Bamako, Mali).
> Les informations non confirmées par l'entreprise sont clairement signalées et ne sont jamais présentées comme réelles.

---

## Sommaire

1. [Aperçu](#aperçu)
2. [Stack technique](#stack-technique)
3. [Démarrage rapide](#démarrage-rapide)
4. [Structure du projet](#structure-du-projet)
5. [Modifier les contenus](#modifier-les-contenus)
6. [Mode démonstration](#mode-démonstration)
7. [Formulaires : connecter un service de réception](#formulaires--connecter-un-service-de-réception)
8. [Variables d'environnement](#variables-denvironnement)
9. [SEO](#seo)
10. [Qualité et commandes](#qualité-et-commandes)
11. [Documentation complémentaire](#documentation-complémentaire)

---

## Aperçu

| Page | URL | Contenu |
| --- | --- | --- |
| Accueil | `/` | Hero, 4 métiers, chiffres clés, à propos, devis, engagements, partenaires, CTA |
| Notre groupe (À propos) | `/a-propos` | Présentation, vision & mission, valeurs, expertise, qualité, galerie |
| Nos services | `/services` | Présentation détaillée des 4 services (avantages, applications, visuel, CTA) |
| Fiche service | `/services/[slug]` | 4 pages dédiées (SEO), méthode, devis pré-rempli |
| Nos engagements | `/engagements` | Sécurité, délais, qualité, satisfaction, transparence, accompagnement |
| Actualités | `/actualites` | Liste filtrable par catégorie, articles d'exemple |
| Article | `/actualites/[slug]` | Page de lecture + articles liés |
| Contact | `/contact` | Formulaire, coordonnées, WhatsApp, emplacement carte |
| Devis | `/devis` | Formulaire de devis complet (`?service=` pour pré-sélectionner) |
| Mentions légales | `/mentions-legales` | Éditeur, données personnelles, crédits, avertissement démo |

## Stack technique

| Outil | Rôle |
| --- | --- |
| **Next.js 16** (App Router, Turbopack, Cache Components) | Framework, rendu statique, API |
| **React 19** + **TypeScript** | Interface typée |
| **Tailwind CSS 4** | Design system (tokens dans `src/app/globals.css`) |
| **lucide-react** | Icônes homogènes |
| `next/font` (Inter + Plus Jakarta Sans) | Typographies auto-hébergées, sans requête externe |
| `next/image` | Images optimisées (AVIF/WebP, lazy-loading, tailles adaptatives) |

Trois dépendances d'exécution seulement (`next`, `react`, `react-dom`) + `lucide-react`. Aucun service tiers obligatoire.

## Démarrage rapide

Prérequis : **Node.js ≥ 20.9** (testé avec Node 24) et npm.

```bash
npm install
cp .env.example .env.local      # facultatif en local
npm run dev                     # http://localhost:3000
```

Build de production :

```bash
npm run build
npm run start
```

## Structure du projet

```
src/
├── app/                      # Routes (App Router)
│   ├── page.tsx              # Accueil
│   ├── a-propos/ services/ engagements/ actualites/ contact/ devis/ mentions-legales/
│   ├── api/requests/route.ts # Réception des formulaires (devis + contact)
│   ├── sitemap.ts robots.ts opengraph-image.tsx icon.svg not-found.tsx
│   ├── layout.tsx            # Layout global, métadonnées, polices
│   └── globals.css           # Design tokens (couleurs, ombres, typographies)
├── config/
│   ├── site.ts               # ⭐ CONFIGURATION CENTRALE : coordonnées, chiffres, partenaires, statut
│   └── navigation.ts         # Menu principal
├── content/                  # Contenus éditables
│   ├── services.ts           # 4 services (textes, avantages, applications, étapes, images, SEO)
│   ├── commitments.ts        # Engagements
│   ├── articles.ts           # Articles (actualités)
│   └── images.ts             # Banque d'images centralisée
├── components/
│   ├── layout/               # TopBar, Header (menu mobile), Footer, DemoBanner, WhatsAppButton
│   ├── sections/             # Sections de pages réutilisables
│   ├── forms/                # Formulaires, champs, logique d'envoi
│   ├── seo/                  # Données structurées (conditionnelles)
│   └── ui/                   # Boutons, logo, badges, icônes, animations
└── lib/
    ├── forms.ts              # Règles de validation partagées navigateur / serveur
    ├── seo.ts                # Générateur de métadonnées par page
    └── cn.ts
```

## Modifier les contenus

Tout se modifie **sans toucher aux composants** :

| Je veux modifier… | Fichier |
| --- | --- |
| Téléphone, e-mail, WhatsApp, adresse, carte, horaires, réseaux sociaux | `src/config/site.ts` |
| Chiffres clés (années, véhicules, pays, clients) | `src/config/site.ts` → `keyFigures` |
| Partenaires / références (logos dans `public/partners/`) | `src/config/site.ts` → `partners` |
| Textes des services | `src/content/services.ts` |
| Engagements | `src/content/commitments.ts` |
| Articles | `src/content/articles.ts` |
| Photos | `src/content/images.ts` (déposer les fichiers dans `public/images/`) |
| Menu | `src/config/navigation.ts` |
| Couleurs / typographies | `src/app/globals.css` (`@theme`) |

Chaque donnée de `site.ts` possède un **statut** : `verified`, `provided`, `demo` ou `missing`.
Une fois une information confirmée par Madina Trans, remplacez la valeur **et** passez le statut à `provided`.

## Mode démonstration

Activé par défaut (`NEXT_PUBLIC_DEMO_MODE` absent ou `true`) :

- bandeau « Site de démonstration » en haut de page ;
- badges **« À confirmer »** sur chaque donnée non confirmée ;
- coordonnées fictives affichées en texte simple (**jamais** de lien `tel:` / `mailto:` cliquable) ;
- bouton WhatsApp marqué « DÉMO » qui explique qu'il n'est pas opérationnel ;
- chiffres clés en « XX », emplacements partenaires neutres ;
- **site non indexé** (`robots.txt` → `Disallow: /`, balise `noindex`) ;
- aucune donnée structurée schema.org publiée.

En production (`NEXT_PUBLIC_DEMO_MODE=false`) : tout élément non confirmé est **masqué automatiquement**
(chiffres, partenaires, coordonnées, WhatsApp, carte…). Le site reste cohérent même s'il manque des informations.

## Formulaires : connecter un service de réception

Les formulaires de devis et de contact effectuent une **vraie validation** (navigateur **et** serveur via
`src/lib/forms.ts`), avec champ anti-robot invisible.

- **Sans configuration** : l'API `/api/requests` valide la demande puis répond `demo`. L'utilisateur voit
  clairement « Formulaire validé — mode démonstration : aucune demande n'a été transmise ». Rien n'est stocké.
- **Avec `FORM_WEBHOOK_URL`** : la demande validée est envoyée en `POST` JSON au service indiqué, puis
  l'utilisateur voit « Demande envoyée ». En cas d'échec, un message d'erreur explicite s'affiche (HTTP 502).

Exemple de charge utile envoyée :

```json
{
  "source": "site-madina-trans",
  "type": "Demande de devis",
  "submittedAt": "2026-11-18T15:45:49.303Z",
  "fullName": "…", "company": "…", "email": "…", "phone": "…",
  "service": "transport-routier", "origin": "…", "destination": "…",
  "goods": "…", "message": "…", "consent": "on"
}
```

Services compatibles (au choix, à souscrire par Madina Trans) :

| Service | Procédure |
| --- | --- |
| **Formspree** | Créer un formulaire → copier l'URL `https://formspree.io/f/xxxx` dans `FORM_WEBHOOK_URL` |
| **Make / Zapier / n8n** | Créer un scénario « Webhook » → copier l'URL → router vers e-mail, Google Sheets, CRM… |
| **Google Apps Script** | Déployer un script `doPost(e)` en application web → copier l'URL |
| **API interne / CRM** | Toute URL acceptant un `POST` JSON ; jeton optionnel via `FORM_WEBHOOK_TOKEN` (en-tête `Authorization: Bearer`) |

> Le chemin « envoi réel » a été testé avec un webhook local : voir `docs/RAPPORT-TESTS.md`.

## Variables d'environnement

Voir `.env.example`. Aucune valeur sensible n'est présente dans le code source.

| Variable | Portée | Rôle |
| --- | --- | --- |
| `NEXT_PUBLIC_DEMO_MODE` | Build (public) | `true` (défaut) = démonstration · `false` = production |
| `NEXT_PUBLIC_SITE_URL` | Build (public) | URL publique (canonique, Open Graph, sitemap) |
| `FORM_WEBHOOK_URL` | Serveur (secret) | Destination des formulaires |
| `FORM_WEBHOOK_TOKEN` | Serveur (secret) | Jeton d'authentification facultatif |

> Les variables `NEXT_PUBLIC_*` sont intégrées au moment du build : redéployez après modification.

## SEO

- Titres et meta descriptions personnalisés par page (`%s | Madina Trans`), URL propres en français.
- Balises canoniques, Open Graph et Twitter Card, image de partage générée (`/opengraph-image`).
- `sitemap.xml` et `robots.txt` générés automatiquement.
- HTML sémantique : un seul `h1` par page, `nav`, `main`, `article`, fil d'Ariane, attributs `alt`.
- Mots-clés travaillés naturellement : transport au Mali, transport routier Bamako, transit au Mali,
  logistique au Mali, transport de marchandises, affrètement maritime, société de transport à Bamako.
- Données structurées `LocalBusiness` publiées **uniquement** quand téléphone et adresse sont confirmés
  et le mode démo désactivé (`src/components/seo/OrganizationJsonLd.tsx`).
- Performance : pages pré-rendues statiquement, images AVIF/WebP en lazy-loading, polices auto-hébergées,
  animations CSS légères respectant `prefers-reduced-motion`.

## Qualité et commandes

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run lint` | ESLint (règles Next.js + Core Web Vitals + TypeScript) |
| `npm run typecheck` | Génération des types de routes + `tsc --noEmit` |
| `npm run build` | Build de production |
| `npm run check` | Lint + typecheck + build |

## Documentation complémentaire

- [`INFORMATIONS-A-CONFIRMER.md`](INFORMATIONS-A-CONFIRMER.md) — tout ce qui doit être validé par Madina Trans
- [`docs/DEPLOIEMENT.md`](docs/DEPLOIEMENT.md) — guide GitHub + Vercel pas à pas
- [`docs/FONCTIONNALITES.md`](docs/FONCTIONNALITES.md) — fonctionnalités opérationnelles / à configurer
- [`docs/RAPPORT-TESTS.md`](docs/RAPPORT-TESTS.md) — rapport final de tests

---

Conception & réalisation : **MD Digital Solutions** — proposition de conception pour Madina Trans.
Photographies : Unsplash (licence Unsplash), visuels d'illustration.
