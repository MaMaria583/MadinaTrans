# Guide de déploiement — GitHub + Vercel

> Dépôt GitHub : **https://github.com/MaMaria583/MadinaTrans** (branche `main`).
> ⚠️ Le dépôt est **public** : le code et la documentation sont visibles par tous.
> Aucun déploiement Vercel n'a encore été effectué.

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

## Étapes 2 et 3 — Dépôt Git et GitHub ✅ (déjà fait)

Le dépôt local est relié à `https://github.com/MaMaria583/MadinaTrans.git`.
Pour publier une modification :

```bash
git add .
git commit -m "Description de la modification"
git push
```

Le fichier `.gitignore` exclut `node_modules`, `.next`, les fichiers `.env*` (sauf `.env.example`) et `.vercel`.
Pour rendre le dépôt privé : GitHub → Settings → General → *Danger Zone* → **Change visibility**.

## Étape 4 — Importer dans Vercel

1. vercel.com → **Add New… → Project**
2. **Import Git Repository** → autoriser l'accès GitHub → choisir `MadinaTrans`
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
   | `RESEND_API_KEY` | *(vide tant que Resend n'est pas configuré → mode démonstration)* |
   | `RESEND_FROM_EMAIL` | *(ex. `Madina Trans <devis@domaine.ml>`)* |
   | `ADMIN_EMAIL` | *(adresse(s) qui reçoivent les devis)* |

5. **Deploy**. Le lien de démonstration `https://<nom-du-projet>.vercel.app` est prêt en ~1 minute.

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
3. Configurer Resend : `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `ADMIN_EMAIL` (voir README › Formulaires).
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
| Formulaire « mode démonstration » en production | Une des 3 variables Resend est absente ou mal orthographiée |
| Formulaire en erreur 502 avec Resend | Domaine expéditeur non vérifié ou clé invalide : voir Vercel → Logs |
| Formulaire en erreur 502 | Le service cible refuse la requête : vérifier l'URL / le jeton |
