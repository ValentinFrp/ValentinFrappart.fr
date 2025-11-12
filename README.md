# ValentinFrappart.fr

Portfolio personnel de Valentin Frappart - Software Engineer & MLOps spécialisé en développement web moderne et intelligence artificielle.

## Site Web

Le portfolio est déployé et accessible à l'adresse : **[valfrp-dev.com](https://valfrp-dev.com)**

## À Propos

Ce repository contient le code source de mon portfolio personnel, une application web moderne qui présente mes compétences, projets et expériences en tant que Software Engineer spécialisé en MLOps.

### Qui suis-je ?

- **Valentin Frappart** - Software Engineer | MLOps
- **Localisation** : Lille, France
- **Email** : valentinn.frappart@gmail.com
- **LinkedIn** : [valentin-frappart](https://www.linkedin.com/in/valentin-frappart-a73b252b4/)
- **GitHub** : [ValentinFrp](https://github.com/ValentinFrp)

## Technologies Utilisées

### Frontend
- **React 18** avec TypeScript
- **Vite** pour le build et le développement
- **Tailwind CSS** pour le design moderne et responsive
- **Three.js** pour les effets 3D interactifs
- **GSAP** pour les animations fluides
- **Lucide React** pour les icônes

### Déploiement & CI/CD
- **GitHub Pages** pour l'hébergement
- **GitHub Actions** pour le déploiement automatique
- **Domaine personnalisé** avec CNAME

## Structure du Projet

```
ValentinFrappart.fr/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Pipeline de déploiement automatique
├── Portfolio/                  # Application React principale
│   ├── src/
│   │   ├── components/         # Composants React réutilisables
│   │   ├── hooks/             # Hooks personnalisés
│   │   ├── utils/             # Fonctions utilitaires
│   │   ├── App.tsx            # Composant principal
│   │   └── main.tsx           # Point d'entrée
│   ├── assets/                # Images et ressources
│   ├── dist/                  # Build de production
│   ├── package.json           # Dépendances du projet
│   ├── vite.config.ts         # Configuration Vite
│   ├── tailwind.config.js     # Configuration Tailwind
│   └── tsconfig.json          # Configuration TypeScript
├── CNAME                      # Configuration domaine personnalisé
└── README.md                  # Ce fichier
```

## Fonctionnalités

### Design & UX
- **Interface moderne** avec thème sombre et accents violets
- **Design responsive** optimisé pour tous les appareils
- **Animations interactives** avec GSAP et CSS
- **Effets 3D** avec Three.js
- **Système de particules** interactif

### Sections du Portfolio
- **Hero Section** avec animation de frappe
- **À Propos** avec mes compétences et expertise
- **Projets** avec showcase interactif
- **Expérience** et formations
- **Contact** avec formulaire intégré

### Performance
- **Lazy loading** des composants et images
- **Code splitting** pour optimiser le chargement
- **Bundle optimisé** avec Vite et Terser
- **SEO optimisé** avec meta tags appropriés

## Installation et Développement

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation

1. **Cloner le repository**
```bash
git clone https://github.com/ValentinFrp/ValentinFrappart.fr.git
cd ValentinFrappart.fr
```

2. **Installer les dépendances**
```bash
cd Portfolio
npm install
```

3. **Lancer le serveur de développement**
```bash
npm run dev
```

4. **Ouvrir dans le navigateur**
```
http://localhost:5173
```

### Scripts Disponibles

```bash
# Développement
npm run dev              # Serveur de développement avec hot-reload
npm run preview          # Prévisualiser le build de production

# Build et déploiement
npm run build            # Build de production
npm run build:prod       # Build avec vérifications (types + lint)

# Qualité du code
npm run lint             # Vérifier le code avec ESLint
npm run lint:fix         # Corriger automatiquement les erreurs ESLint
npm run type-check       # Vérifier les types TypeScript

# Maintenance
npm run clean            # Nettoyer les fichiers de build
npm run analyze          # Analyser la taille du bundle
```

## Déploiement

Le déploiement est **entièrement automatisé** via GitHub Actions :

1. **Push sur la branche `main`**
2. **GitHub Actions** déclenche automatiquement le workflow
3. **Build** de l'application en production
4. **Déploiement** sur GitHub Pages
5. **Mise à jour** du site sur [valfrp-dev.com](https://valfrp-dev.com)

### Configuration du déploiement

Le workflow utilise les variables d'environnement suivantes (configurées dans les secrets GitHub) :
- `EMAILJS_SERVICE_ID` - ID du service EmailJS pour le formulaire de contact
- `EMAILJS_TEMPLATE_ID` - Template EmailJS
- `EMAILJS_PUBLIC_KEY` - Clé publique EmailJS

## Personnalisation

### Informations personnelles
Les informations sont centralisées dans `Portfolio/src/App.tsx` :

```typescript
const personalInfo = {
  name: "Valentin Frappart",
  title: "SOFTWARE ENGINEER | MLOPS",
  location: "Lille, France",
  email: "valentinn.frappart@gmail.com",
  social: {
    linkedin: "https://www.linkedin.com/in/valentin-frappart-a73b252b4/",
    github: "https://github.com/ValentinFrp",
  },
};
```

### Thème et couleurs
Le thème peut être modifié dans `Portfolio/tailwind.config.js` et les CSS custom properties dans `Portfolio/src/index.css`.

## Projets Mis en Avant

Le portfolio présente plusieurs projets techniques :

- **MLOps Pipeline** - Pipeline complet de déploiement de modèles ML
- **API REST avancée** - Architecture microservices moderne
- **Data Drift Detection** - Système de détection de dérive des données
- **CI/CD Automation** - Pipelines DevOps automatisés

## Contact

Pour toute question sur le projet ou collaboration :

- **Email** : valentinn.frappart@gmail.com
- **LinkedIn** : [Valentin Frappart](https://www.linkedin.com/in/valentin-frappart-a73b252b4/)
- **GitHub** : [ValentinFrp](https://github.com/ValentinFrp)
- **Portfolio** : [valfrp-dev.com](https://valfrp-dev.com)

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

**N'hésitez pas à star ce repository si vous le trouvez utile !**

Développé avec ❤️ par [Valentin Frappart](https://valfrp-dev.com)
