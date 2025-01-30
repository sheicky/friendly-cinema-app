# 🚀 Next.js Modern Application

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
</div>

## 📋 Description

A modern application built with Next.js 14, leveraging the latest features and development best practices. This project is optimized for performance and follows a robust architecture.

## ✨ Features

- ⚡️ **Next.js 14** with App Router
- 🎨 **Modern Styling** with TailwindCSS
- 📱 **Responsive Design** for all devices
- 🔤 **Geist Font** optimized by next/font
- 🛠 **TypeScript** for safer code
- 🗃 **Prisma** for database management

## 🚀 Quick Start

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd <project-name>
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Initialize and sync database**
```bash
# Generate database tables
npx prisma db push

# Generate Prisma client
npx prisma generate

# Launch Prisma Studio interface
npx prisma studio
```
Open [http://localhost:5555](http://localhost:5555) to access Prisma Studio interface.

4. **Start the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🔧 Configuration

The project uses several tools and technologies:

- [Next.js](https://nextjs.org/) - React Framework
- [TypeScript](https://www.typescriptlang.org/) - Static Typing
- [Prisma](https://www.prisma.io/) - Modern ORM
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS Framework

## 📚 Project Structure

```
├── src/
│   ├── app/          # App Router pages
│   ├── components/   # Reusable components
│   ├── lib/         # Utilities and configurations
│   └── styles/      # Global styles
├── prisma/          # Prisma configuration
├── public/          # Static assets
└── ...
```

## 📖 Documentation

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TypeScript Guide](https://www.typescriptlang.org/docs/)



---

<div align="center">
  <sub>Built with ❤️ by Sheick</sub>
</div>
