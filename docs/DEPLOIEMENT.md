# Guide de déploiement — GitHub + Vercel

> ⚠️ **Rien n'a été publié.** Ce guide décrit les étapes à suivre **après autorisation explicite**.
> Le dépôt est prêt à être créé sous le nom **`madina-trans-demo`**.

## Prérequis

- Node.js ≥ 20.9 et npm installés
- Git installé
- Un compte GitHub
- Un compte Vercel (offre gratuite « Hobby » suffisante pour une démonstration ;
  l'offre Hobby est réservée à un usage non commercial — prévoir l'offre Pro pour le site de production)

## Étape 1 — Vérifier le projet en local

```bash
cd madina-trans-demo
npm install
npm run check        # lint + typecheck + build — doit se terminer sans erreur
```

## Étape 2 — Initialiser le dépôt Git

```bash
git init -b main
git add .
git commit -m "Site de démonstration Madina Trans"
```

Le fichier `.gitignore` exclut déjà `node_modules`, `.next`, les fichiers `.env*` (sauf `.env.example`) et `.vercel`.

## Étape 3 — Créer le dépôt GitHub

**Option A — interface web**
1. github.com → **New repository**
2. Nom : `madina-trans-demo` · Visibilité : **Private** (recommandé pour une proposition commerciale)
3. Ne cochez **pas** « Add README / .gitignore » (déjà présents)
4. Puis :
   ```bash
   git remote add origin https://github.com/<votre-compte>/madina-trans-demo.git
   git push -u origin main
   ```

**Option B — GitHub CLI**
```bash
gh repo create madina-trans-demo --private --source=. --remote=origin --push
```

## Étape 4 — Importer dans Vercel

1. vercel.com → **Add New… → Project**
2. **Import Git Repository** → autoriser l'accès GitHub → choisir `madina-trans-demo`
3. Vercel détecte **Next.js** automatiquement :
   - Build Command : `next build` (par défaut)
   - Output : automatique
   - Install Command : `npm install`
   - Node.js : 20.x ou plus récent (Settings → General → Node.js Version)
4. **Environment Variables** :

   | Nom | Valeur (démonstration) |
   | --- | --- |
   | `NEXT_PUBLIC_DEMO_MODE` | `true` |
   | `NEXT_PUBLIC_SITE_URL` | *(laisser vide : l'URL Vercel est utilisée)* |
   | `FORM_WEBHOOK_URL` | *(laisser vide tant qu'aucun service n'est choisi)* |

5. **Deploy**. Le lien de démonstration `https://madina-trans-demo-xxxx.vercel.app` est prêt en ~1 minute.

**Alternative CLI**
```bash
npm i -g vercel
vercel login
vercel            # déploiement de prévisualisation
vercel --prod     # déploiement de production
```

## Étape 5 — Protéger la démonstration (recommandé)

- Le site est déjà **non indexé** en mode démo (`robots.txt` + `noindex`).
- Pour restreindre l'accès : Vercel → Settings → **Deployment Protection** (Vercel Authentication,
  ou protection par mot de passe selon l'offre).

## Étape 6 — Passage en production (après validation par Madina Trans)

1. Compléter `src/config/site.ts` (voir `INFORMATIONS-A-CONFIRMER.md`).
2. Remplacer les photos et le logo par les éléments officiels.
3. Configurer `FORM_WEBHOOK_URL` (voir README › Formulaires).
4. Dans Vercel : `NEXT_PUBLIC_DEMO_MODE=false`, `NEXT_PUBLIC_SITE_URL=https://www.<domaine>`.
5. Vercel → Settings → **Domains** → ajouter le domaine et suivre les instructions DNS.
6. Redéployer (les variables `NEXT_PUBLIC_*` sont prises en compte au build).
7. Déclarer le site dans **Google Search Console** et soumettre `https://www.<domaine>/sitemap.xml`.
8. Créer / mettre à jour la fiche **Google Business Profile** avec l'adresse vérifiée.

## Mises à jour

Chaque `git push` sur `main` déclenche un nouveau déploiement de production ;
chaque branche / pull request obtient une URL de prévisualisation.

## Dépannage

| Problème | Solution |
| --- | --- |
| Images Unsplash non affichées | Vérifier `images.remotePatterns` dans `next.config.ts` |
| Le mode démo reste actif | Vérifier `NEXT_PUBLIC_DEMO_MODE=false` puis **redéployer** |
| Formulaire « mode démonstration » en production | `FORM_WEBHOOK_URL` absent ou mal orthographié |
| Formulaire en erreur 502 | Le service cible refuse la requête : vérifier l'URL / le jeton |
