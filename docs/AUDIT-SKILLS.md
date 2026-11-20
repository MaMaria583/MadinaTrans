# Audit des Skills et contributions concrètes (phase 5)

Date : 20/11/2026. Ce document trace honnêtement quels Skills ont été identifiés, quelles instructions ont été
réellement lues, ce qui a été appliqué au site et ce qui a été écarté (et pourquoi).

## 1. Inventaire

Aucun ensemble nommé exactement « 6 Skills de création de sites » n'a été trouvé dans l'environnement.
Les Skills réellement liés à la création de sites, retenus comme les six Skills professionnels :

| #   | Skill                  | Spécialité                                                   | Source               |
| --- | ---------------------- | ------------------------------------------------------------ | -------------------- |
| 1   | `scroll-craft`         | Narration au défilement, goût visuel, ressenti, vérification | Plugin installé      |
| 2   | `design-system`        | Jetons, composants, audit de cohérence                       | Plugin « design »    |
| 3   | `design-critique`      | Critique structurée (impression, hiérarchie, cohérence)      | Plugin « design »    |
| 4   | `accessibility-review` | Audit WCAG 2.1 AA                                            | Plugin « design »    |
| 5   | `ux-copy`              | Microcopie, CTA, messages d'erreur                           | Plugin « design »    |
| 6   | `seo-audit`            | SEO on-page et technique                                     | Plugin « marketing » |

Plus le Skill **`10k-websites`** (`10k-websites-skill.zip`, extrait dans un dossier temporaire hors projet),
et, dans l'espace `WEB-AGENCY-AI`, les Skills `cinematic-websites` (cadre d'utilisation de 10k-websites),
`motionsites-web-builder`, `client-analysis` et `skill-auditor`.

## 2. Instructions effectivement lues

| Skill                                                         | Lu intégralement                                | Références lues                                                                                                                                                                 | Non lu                                                                                            |
| ------------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| 10k-websites                                                  | `SKILL.md`                                      | `scrub-pipeline.md` (lisibilité, chorégraphie, mouvement, moment interactif, direction de design, socle qualité, checklist), `design-package.md`, `troubleshooting.md` (titres) | `prompt-laws.md`, `ffmpeg-recipes.md`, `deploy.md` (génération vidéo et hébergement non utilisés) |
| scroll-craft                                                  | `SKILL.md`                                      | `taste.md` (intégral), `feel.md` (§1-2)                                                                                                                                         | `devices.md`, `uniqueness.md`, `hero-depth.md`, `verify.md`, `worlds.md`, `assets.md`             |
| design-system, design-critique, accessibility-review, ux-copy | `SKILL.md`                                      | n/a                                                                                                                                                                             | n/a                                                                                               |
| seo-audit                                                     | `SKILL.md` (sections 1 à 4 et format de sortie) | n/a                                                                                                                                                                             | n/a                                                                                               |
| cinematic-websites, skill-auditor, client-analysis            | `SKILL.md`                                      | n/a                                                                                                                                                                             | n/a                                                                                               |
| motionsites-web-builder                                       | `SKILL.md` (workflow)                           | n/a                                                                                                                                                                             | exemples, médiathèque                                                                             |

## 3. Règles écartées (conflits signalés)

| Règle                                                          | Skill        | Décision                                         | Raison                                                                    |
| -------------------------------------------------------------- | ------------ | ------------------------------------------------ | ------------------------------------------------------------------------- |
| Générer la vidéo hero avec Higgsfield, héberger chez Hostinger | 10k-websites | Écartée                                          | Service payant non autorisé ; `cinematic-websites` neutralise ce pipeline |
| Liens partenaires / d'affiliation                              | 10k-websites | Écartée                                          | Neutralisé par `cinematic-websites` ; aucun lien ajouté                   |
| « Architecture non négociable » : HTML/JS sans framework       | 10k-websites | Écartée                                          | Le projet Next.js existant doit être conservé                             |
| Génération d'images via l'API KIE                              | scroll-craft | Écartée                                          | Payant, non autorisé ; photos existantes conservées                       |
| Hero en couches détourées (profondeur)                         | scroll-craft | Non réalisé                                      | Nécessite des détourages générés ou des photos officielles                |
| Extraction automatique du zip                                  | 10k-websites | Appliquée dans un dossier temporaire hors projet | Écart signalé à la règle de `cinematic-websites`                          |

## 4. Contributions concrètes au site

### 10k-websites

- **Signature et moment interactif** : « la route d'or » (`RouteJourney.tsx`). Sur ordinateur, la section se fige ;
  une route dorée se trace au défilement, un repère la suit, chaque étape s'allume. Boucle `requestAnimationFrame`
  qui se repose, écriture DOM uniquement au changement, lissage (lerp), seuls `transform`, `opacity` et
  `stroke-dashoffset` animés.
- **Mouvement réduit en direct** : la route se fige entièrement tracée quand l'utilisateur active le mouvement
  réduit en cours de visite (mesuré : 100 %, 5 étapes allumées).
- **Audit de lisibilité au pire pixel** (méthode « preferred ») : texte masqué, capture de la page composée,
  pixel le plus clair sous chaque ligne. Résultat final : **24/24 mesures ≥ 3,5:1** (ordinateur et mobile).
- **Copy gate** : 0 tiret cadratin visible ; tournures de remplissage réécrites (« plus qu'une promesse »,
  « au cœur de », « solution » répété hors libellés imposés par le brief, « Excellence » → « Exigence »).
- **Environnement unique** : grain fixe très léger sur toute la page ; canevas jamais blanc pur (`#fdfcf9`).
- **Checklist d'auto-test** : captures 1440×900, 1280×800, 375×812, 375×667 ; console sans erreur ;
  débordement forcé de 320 à 640 px ; passe « œil neuf » (voir design-critique).

### scroll-craft

- **Règles strictes appliquées** : aucun indicateur « Défiler », aucune bande lieu/heure dans le hero,
  plus de compteurs de section 01/02, sur-titres limités à un pour trois sections, aucun `transition: all`,
  hero limité à 4 éléments de texte.
- **Texte sur image** : plus de voile plein cadre ; voile en colonne ou en bande sous le texte, et surtout
  **photo écartée du texte** dans le hero (masque) : la colonne de texte reste sur bleu nuit, le camion entier
  à droite. Contraste du titre hero passé de 1,04:1 à 5,58:1.
- **Pas de grilles de cartes identiques** : valeurs et expertises de la page À propos en listes typographiques.
- **Micro-interactions** : retour au clic `scale(0.98)`, transitions UI ≤ 200 ms, courbe `ease-out` dédiée.
- **Ressenti** : la chaîne logistique est le moment fort (plus grande durée de défilement, section figée).

### design-critique (passe « œil neuf » sur captures réelles)

| Constat                                                                       | Correction                                                |
| ----------------------------------------------------------------------------- | --------------------------------------------------------- |
| Titre du hero sur ciel clair et camion                                        | Photo masquée côté texte, camion visible à droite         |
| Photo du hero quasi invisible sur mobile                                      | Voile mobile allégé en haut (ciel visible, titre à 5,6:1) |
| Deux appels « devis » à la suite (section devis + invitation du pied de page) | Invitation masquée sur l'accueil et la page Devis         |

### accessibility-review (WCAG 2.1 AA, mesuré)

| Critère                            | Résultat                                                                                 |
| ---------------------------------- | ---------------------------------------------------------------------------------------- |
| 1.4.3 Contraste du texte sur photo | 24/24 ≥ 3,5:1 au pire pixel                                                              |
| 2.4.7 Focus visible                | 40 tabulations sur l'accueil, 0 élément sans focus visible ; lien d'évitement en premier |
| 1.3.1 Structure                    | 1 seul `h1` par page, 0 saut de niveau (Actualités corrigé : h1 → h2)                    |
| 3.3.2 Libellés                     | 0 champ sans libellé                                                                     |
| 4.1.2 Nom accessible               | 0 lien ou bouton sans nom                                                                |
| 2.5.5 Cibles tactiles              | Liens isolés portés à 44 px ; liens du pied de page agrandis                             |
| Zoom 200 % (640 px)                | Aucun défilement horizontal (débordement Actualités corrigé)                             |

### seo-audit (on-page)

| Contrôle                                    | Résultat                                                                                                                                              |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Titres 50-60 caractères avec mot-clé métier | Corrigé pour À propos, Engagements, fiche Transport routier                                                                                           |
| Meta descriptions 140-163 caractères        | ✅ toutes les pages principales                                                                                                                       |
| Images sans `alt`                           | 0                                                                                                                                                     |
| Canonique, `og:image`, `lang="fr"`          | ✅                                                                                                                                                    |
| Limite assumée                              | Le `h1` de l'accueil (accroche imposée par le brief) ne contient pas « transport » ; le mot-clé est porté par le titre, le sur-titre et le sous-titre |

### design-system

| Constat                                    | Correction                                                                                                                              |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| Couleur WhatsApp codée en dur (3 fichiers) | Jeton `--color-whatsapp`                                                                                                                |
| Ombre utilisant l'ancienne teinte marine   | Teinte bleu nuit actuelle                                                                                                               |
| Couleurs du logo en hexadécimal            | Conservées : marque SVG autonome (aussi utilisée hors CSS)                                                                              |
| Jetons                                     | Couleurs, rayons, ombres, polices, courbes et utilitaires (`scrim-*`, `card`, `label-caps`, `rule-gold`) centralisés dans `globals.css` |

### ux-copy

- Un libellé par intention : « Demander un devis » partout ; « Découvrir nos solutions » conservé (imposé par le brief).
- Messages d'erreur du formulaire déjà conformes (quoi, pourquoi, comment corriger).
- Étape de méthode « Proposition de solution » → « Proposition chiffrée ».

### Espace agence

- `cinematic-websites` : appliqué comme garde-fou (pas de pipeline payant, pas d'affiliation, pas de déploiement).
- `motionsites-web-builder` : sa règle « regarder et corriger » est appliquée via les planches de captures.
- `skill-auditor` : le présent document en reprend la forme (rôle, pertinence, limites, conflits, décision).

## 5. Outils de vérification

Bancs Playwright (Chrome local) écrits pour cette phase, hors dépôt :
`contrast.mjs` (pire pixel par ligne), `audit.mjs` (route, mouvement réduit, débordements, console, captures),
`audits.mjs` (WCAG, SEO, CTA, rédaction), `strip.mjs` et `sheet.mjs` (planches de défilement).
