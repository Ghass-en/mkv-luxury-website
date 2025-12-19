# 🚗 MKV Luxury - Landing Page

## 🎯 Description
Landing page moderne destinée à proposer des améliorations au site officiel : https://www.mkvluxury.com.

Ce dépôt contient une version statique (HTML/CSS/JS) et une API mockée côté client pour simuler l'envoi de suggestions.

---

## 🚀 Lancer le projet

### Méthode simple
1. Double-cliquez sur `index.html` pour l'ouvrir dans votre navigateur.
2. Ou, dans VS Code, installez l'extension `Live Server` → clic droit sur `index.html` → "Open with Live Server" (par défaut `http://localhost:5500`).

### Méthode avec serveur local (Python)
```powershell
python -m http.server 5500
# Puis ouvrez : http://localhost:5500
```

---

## 📁 Structure du projet

```
├── index.html          # Page web principale
├── style.css           # Styles et thème noir/or
├── script.js           # Logique front (validation, mock API)
└── backend/            # (optionnel) petits exemples de 
```

---

## ✨ Fonctionnalités principales

- Design premium noir/or (responsive)
- Formulaire de contact/suggestions avec validation
- Simulation d'API (mock) côté client pour tester UX et délais réseau
- Messages utilisateurs pour succès / erreur et animation de chargement

---

## 📡 API mockée (comportement)

Le projet utilise une API simulée intégrée dans `script.js` qui :

- Simule un délai réseau (ex. 1.5s) pour reproduire l'expérience réelle
- Retourne une réponse de succès dans ~90% des cas et une erreur aléatoire sinon
- Valide les données côté client avant "envoi"

Exemple simplifié (à intégrer dans `script.js`) :

```javascript
async function delay(ms){ return new Promise(r => setTimeout(r, ms)); }

async function mockApiCall(formData){
	await delay(1500);
	const success = Math.random() < 0.9;
	if(success) return { success: true, message: 'Message reçu', reference: 'MKV-' + Date.now() };
	return { success: false, message: 'Erreur serveur. Réessayez.' };
}
```

---

## 3. Réflexion et améliorations

### 1) Ce que j'améliorerais sur le site existant

- Performance et temps de chargement : optimiser images, activer lazy-loading, minifier CSS/JS et utiliser un CDN pour les assets statiques.
- Accessibilité (WCAG) : améliorer le contraste, ajouter des attributs ARIA, s'assurer de la navigation clavier et d'un balisage sémantique correct.
- Structure commerciale : ajouter des appels à l'action (CTA) clairs, formulaires courts (lead capture) et preuve sociale (témoignages, logos clients).
- SEO technique : métadonnées complètes, balises Open Graph, plan du site et amélioration du rendu côté serveur si nécessaire.
- Sécurité : utiliser HTTPS partout, CSP stricte, validation côté serveur et protection anti-spam pour le formulaire.

### 2) Pourquoi une landing-page dédiée est pertinente ici

- Focus commercial : une landing page dédiée permet de diriger et convertir un trafic spécifique (campagnes, publicités, offres).
- Mesurabilité : plus simple d'analyser les conversions et d'A/B tester titres, images et CTA.
- Temps de chargement optimisé : une landing page peut être allégée pour améliorer le taux de conversion.
- Message ciblé : adaptation du contenu selon l'audience (luxury, services, offres spéciales) pour augmenter la qualité des leads.

### 3) Propositions d'évolutions (court et moyen terme)

- Intégration CRM : transmettre automatiquement les leads (via API) à un CRM (HubSpot, Pipedrive) pour suivi commercial.
- Tracking & analytics : implémenter un suivi d'événements, heatmaps et entonnoir de conversion (Google Analytics / GA4 + Hotjar).
- Automatisation : workflow d'e-mails de confirmation et nurturing pour convertir les leads.
- Multi-variantes : A/B testing du hero, formulaire et CTA à travers un outil d'expérimentation.
- Micro-interactions : enrichir l'expérience utilisateur avec animations CSS/JS légères (réduire friction).
- Internationalisation : prendre en charge plusieurs langues si la cible est internationale.

### 4) Améliorations possibles avec plus de temps/expérience

- Rendu côté serveur / JAMstack : migrer vers Next.js / Nuxt.js pour un rendu hybride (SSR/SSG) améliorant SEO et performance.
- Plateforme headless CMS : connecter un CMS (Sanity, Contentful) pour gérer contenus marketing et landing variants.
- Tests automatisés et CI/CD : pipelines pour tests visuels (Percy), linting, builds et déploiement automatique (GitHub Actions).
- Infrastructure scalable : hébergement sur un CDN + functions (Vercel / Netlify / Render) pour gérer montée en charge.
- Personnalisation avancée : personnaliser le contenu selon source de trafic (UTM) et comportement utilisateur.

---

## 🛠 Guide rapide de modification

- Contenu : `index.html`
- Styles : `style.css`
- Scripts / logique : `script.js`
- Backend de démonstration : `backend/server.js` (optionnel)

---

## 🚀 Déploiement recommandé

- Pour une landing page statique simple : GitHub Pages, Netlify ou Vercel (déploiement en un clic). Exemples de commandes git :

```powershell
git add .
git commit -m "Add landing page"
git push origin main
```

- Pour API / fonctions : utiliser Vercel/Netlify Functions ou Render pour héberger des endpoints backend minimalistes.

---

## 🧪 Tests (manuel)

1. Ouvrir la page
2. Remplir le formulaire et valider la gestion des erreurs
3. Vérifier l'UX sur mobile et desktop
4. Simuler latence réseau (devtools) pour voir le loader

---

## 🐛 Dépannage rapide

- Le formulaire ne répond pas : ouvrir la console DevTools (F12) et vérifier les erreurs JS
- Design cassé : vérifier que `style.css` est chargé et que les chemins des assets sont corrects
- Backend absent : si vous attendez une vraie API, lancer `backend/server.js` ou connecter un service externe

---

## Auteur

- **Ghassen** — Test technique MKV Luxury

Date : Décembre 2024

---

## Résumé

1. 4 fichiers principaux : `index.html`, `style.css`, `script.js`, `README.md`
2. API mockée pour prototypage rapide
3. Landing page adaptée à la génération de leads et tests marketing
4. Liste claire d'améliorations court/moyen/long terme

Si vous le souhaitez, j'applique ce README dans votre dépôt maintenant ou j'ajoute un modèle d'e-mail de suivi / un plan de déploiement détaillé pour Render/Vercel.

