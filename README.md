# 🚀 Next.js Modern Application

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
</div>

## 📋 Description

Une application moderne construite avec Next.js 14, utilisant les dernières fonctionnalités et les meilleures pratiques de développement. Ce projet est optimisé pour la performance et suit une architecture robuste.

## ✨ Fonctionnalités

- ⚡️ **Next.js 14** avec App Router
- 🎨 **Styling moderne** avec TailwindCSS
- 📱 **Responsive Design** pour tous les appareils
- 🔤 **Police Geist** optimisée par next/font
- 🛠 **TypeScript** pour un code plus sûr
- 🗃 **Prisma** pour la gestion de la base de données

## 🚀 Démarrage Rapide

1. **Clonez le repository**
```bash
git clone <votre-repo-url>
cd <nom-du-projet>
```

2. **Installez les dépendances**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Initialisez et synchronisez la base de données**
```bash
# Générer les tables de la base de données
npx prisma db push

# Générer le client Prisma
npx prisma generate

# Lancer l'interface Prisma Studio
npx prisma studio
```
Ouvrez [http://localhost:5555](http://localhost:5555) pour accéder à l'interface Prisma Studio.

4. **Lancez le serveur de développement**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir l'application.

## 🔧 Configuration

Le projet utilise plusieurs outils et technologies :

- [Next.js](https://nextjs.org/) - Framework React
- [TypeScript](https://www.typescriptlang.org/) - Typage statique
- [Prisma](https://www.prisma.io/) - ORM moderne
- [TailwindCSS](https://tailwindcss.com/) - Framework CSS utilitaire

## 📚 Structure du Projet

```
├── src/
│   ├── app/          # App Router pages
│   ├── components/   # Composants réutilisables
│   ├── lib/         # Utilitaires et configurations
│   └── styles/      # Styles globaux
├── prisma/          # Configuration Prisma
├── public/          # Assets statiques
└── ...
```

## 📖 Documentation

Pour en savoir plus sur les technologies utilisées :

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Prisma](https://www.prisma.io/docs)
- [Guide TypeScript](https://www.typescriptlang.org/docs/)

## 🚀 Déploiement

Le moyen le plus simple de déployer cette application est d'utiliser la [Plateforme Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

[![Déployer avec Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/packages/create-next-app)

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

<div align="center">
  <sub>Built with ❤️ by Sheick</sub>
</div>
