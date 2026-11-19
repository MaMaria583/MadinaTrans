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
7. [Formulaires : envoi par e-mail avec Resend](#formulaires--envoi-par-e-mail-avec-resend)
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
│   ├── layout/               # TopBar, Header (menu mobile), Footer, DemoBanner, WhatsAppButton, MobileActionBar
│   ├── sections/             # Sections de pages réutilisables
│   ├── forms/                # Formulaires, champs, logique d'envoi
│   ├── seo/                  # Données structurées (conditionnelles)
│   └── ui/                   # Boutons, logo, badges, icônes, animations
└── lib/
    ├── server/               # delivery.ts (Resend / webhook), rate-limit.ts — serveur uniquement
    ├── forms.ts              # Règles de validation partagées navigateur / serveur
    ├── seo.ts                # Générateur de métadonnées par page
    └── cn.ts
```

## Modifier les contenus

Tout se modifie **sans toucher aux composants** :

| Je veux modifier… | Fichier |
| --- | --- |
| Téléphone, e-mail, WhatsApp, adresse, carte, horaires, réseaux sociaux | `src/config/site.ts` |
| Présentation, vision, mission, valeurs, atouts, secteurs | `src/config/site.ts` → `institutional` |
| Chiffres clés (années, véhicules, pays, clients) | `src/config/site.ts` → `keyFigures` |
| Partenaires / références (logos dans `public/partners/`) | `src/config/site.ts` → `partners` |
| Textes des services + points à confirmer (`verification`) | `src/content/services.ts` |
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
- coordonnées fictives affichées en texte simple avec le badge **« Fictif »** (**jamais** de lien `tel:` / `mailto:`),
  et un avertissement sur la page Contact ;
- détail des prestations non validé signalé « Périmètre à confirmer » ;
- bouton WhatsApp marqué « DÉMO » qui explique qu'il n'est pas opérationnel ;
- aucun chiffre ni partenaire affiché tant qu'ils ne sont pas confirmés (section « Qualité de service » à la place) ;
- **site non indexé** (`robots.txt` → `Disallow: /`, balise `noindex`) ;
- aucune donnée structurée schema.org publiée.

En production (`NEXT_PUBLIC_DEMO_MODE=false`) : tout élément non confirmé est **masqué automatiquement**
(chiffres, partenaires, coordonnées, WhatsApp, carte, détail des prestations…). Le site reste cohérent même s'il manque des informations.

## Formulaires : envoi par e-mail avec Resend

### Le formulaire de devis (outil de génération de prospects)

Formulaire en **3 étapes** (`src/components/forms/QuoteForm.tsx`) :

1. **Service** — grandes cartes tactiles (pré-sélection possible : `/devis?service=transport-routier`) ;
2. **Trajet & marchandise** — départ, destination, marchandise, poids/volume, date souhaitée ;
3. **Coordonnées** — nom, entreprise, e-mail, téléphone, description, consentement.

- Validation à chaque étape (navigateur) **et** côté serveur, avec les mêmes règles (`src/lib/forms.ts`).
- Messages d'erreur explicites : format e-mail, numéro malien (+223 + 8 chiffres) ou international, nombre de caractères manquants.
- Barre de progression, retour arrière sans perte de saisie, focus automatique sur le premier champ en erreur.
- Confirmation après envoi avec **référence de suivi** (ex. `MT-261119-K7Q2`) et prochaines étapes.

### Protection anti-spam (API `/api/requests`)

| Protection | Détail |
| --- | --- |
| Champ piège invisible | Un robot qui le remplit est ignoré silencieusement |
| Délai minimal | Envoi en moins de 3 s après affichage → ignoré |
| Limitation de débit | 5 envois / 10 min / IP (mémoire de l'instance) |
| Origine | Requêtes d'un autre site refusées (403) |
| Taille | Corps limité à 16 Ko (413) |
| Validation serveur | Champs inconnus supprimés, longueurs bornées, sauts de ligne neutralisés |
| E-mail | Contenu échappé (aucune injection HTML possible) |

### Acheminement des demandes

`src/lib/server/delivery.ts` choisit automatiquement le canal :

1. **Resend** si `RESEND_API_KEY`, `RESEND_FROM_EMAIL` et `ADMIN_EMAIL` sont définis : e-mail HTML + texte
   à l'administrateur, `reply_to` = adresse du client (on répond directement), en-tête d'idempotence ;
2. sinon **webhook JSON** si `FORM_WEBHOOK_URL` est défini ;
3. sinon **mode démonstration** : la demande est validée mais **rien n'est envoyé**, et l'utilisateur en est clairement informé.

Aucune clé n'est dans le code. En cas d'échec d'envoi, l'utilisateur voit un message d'erreur (HTTP 502) et l'erreur est journalisée côté serveur.

### Configurer Resend

1. Créer un compte sur resend.com (à souscrire par Madina Trans).
2. **Domains → Add Domain** : ajouter le domaine de l'entreprise et créer les enregistrements DNS indiqués (SPF / DKIM).
3. **API Keys → Create API Key** (permission « Sending access »).
4. Renseigner dans Vercel (ou `.env.local`) :

   ```
   RESEND_API_KEY=re_xxxxxxxx
   RESEND_FROM_EMAIL=Madina Trans <devis@domaine-verifie.ml>
   ADMIN_EMAIL=commercial@domaine.ml,direction@domaine.ml
   CONTACT_EMAIL=contact@domaine.ml
   ```

5. **Test réel avant toute présentation de la fonctionnalité** :

   ```bash
   npm run test:resend   # lit .env.local et envoie un e-mail de test à ADMIN_EMAIL
   ```

   Puis, après déploiement, envoyer une demande depuis `/devis` : l'e-mail doit arriver avec la référence dans l'objet.

> ⚠️ À ce jour, l'envoi n'a été testé qu'avec un **serveur Resend simulé** : il ne doit pas être présenté comme
> opérationnel tant que `npm run test:resend` n'a pas réussi avec les vraies clés.

## Variables d'environnement

Voir `.env.example`. Aucune valeur sensible n'est présente dans le code source.

| Variable | Portée | Rôle |
| --- | --- | --- |
| `NEXT_PUBLIC_DEMO_MODE` | Build (public) | `true` (défaut) = démonstration · `false` = production |
| `NEXT_PUBLIC_SITE_URL` | Build (public) | URL publique (canonique, Open Graph, sitemap) |
| `RESEND_API_KEY` | Serveur (secret) | Clé API Resend |
| `RESEND_FROM_EMAIL` | Serveur | Expéditeur sur un domaine vérifié dans Resend |
| `ADMIN_EMAIL` | Serveur | Destinataire(s) des devis (séparés par des virgules) |
| `CONTACT_EMAIL` | Serveur | Destinataire des messages de contact (sinon `ADMIN_EMAIL`) |
| `FORM_WEBHOOK_URL` / `FORM_WEBHOOK_TOKEN` | Serveur (secret) | Alternative webhook si Resend n'est pas utilisé |

> Les variables `NEXT_PUBLIC_*` sont intégrées au moment du build : redéployez après modification.

## SEO

- Titres et meta descriptions personnalisés par page (`%s | Madina Trans`), URL propres en français.
- Balises canoniques, Open Graph et Twitter Card, image de partage générée (`/opengraph-image`).
- `sitemap.xml`, `robots.txt` et `manifest.webmanifest` générés automatiquement.
- Référencement local : balises `geo.region` / `geo.placename` (Bamako), mots-clés locaux dans les contenus.
- Image de partage propre à chaque fiche service et article (1200 × 630).
- HTML sémantique : un seul `h1` par page, `nav`, `main`, `article`, fil d'Ariane, attributs `alt`.
- Mots-clés travaillés naturellement : transport au Mali, transport routier Bamako, transit au Mali,
  logistique au Mali, transport de marchandises, affrètement maritime, société de transport à Bamako.
- Données structurées `WebSite`, `BreadcrumbList` et `Service` (sans donnée d'entreprise non vérifiée) ;
  `LocalBusiness` publié **uniquement** quand téléphone et adresse sont confirmés
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
| `npm run test:resend` | Envoi d'un e-mail de test réel via Resend (nécessite `.env.local`) |

## Documentation complémentaire

- [`INFORMATIONS-A-CONFIRMER.md`](INFORMATIONS-A-CONFIRMER.md) — tout ce qui doit être validé par Madina Trans
- [`docs/DEPLOIEMENT.md`](docs/DEPLOIEMENT.md) — guide GitHub + Vercel pas à pas
- [`docs/FONCTIONNALITES.md`](docs/FONCTIONNALITES.md) — fonctionnalités opérationnelles / à configurer
- [`docs/RAPPORT-TESTS.md`](docs/RAPPORT-TESTS.md) — rapport final de tests

---

Conception & réalisation : **MD Digital Solutions** — proposition de conception pour Madina Trans.
Photographies : Unsplash (licence Unsplash), visuels d'illustration.
