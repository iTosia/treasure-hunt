# 🏴‍☠️ Treasure Hunt

[![CI/CD Pipeline](https://github.com/iTosia/treasure-hunt/actions/workflows/ci.yml/badge.svg)](https://github.com/iTosia/treasure-hunt/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748)](https://www.prisma.io/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF)](https://clerk.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

An interactive "Hot or Cold" treasure hunting game built to showcase modern full-stack engineering. This project is a key piece of my professional portfolio, demonstrating my ability to integrate **generative AI**, **type-safe database architectures**, and **automated quality assurance** into a polished, user-centric product.

![Game Preview](./assets/screenshots/screenshot.png)

## 🚀 Live Demo

[🌐 **Play the Game**](https://treasure-game-sand.vercel.app/) — Deployed on Vercel

---

## 🛠️ Engineering Deep Dive

This project goes beyond simple game mechanics to implement industry-standard software engineering patterns:

### 🧠 AI-Powered Engagement
Instead of static text, the game integrates **Google Gemini** via the **Vercel AI SDK**. 
- **Thematic Prompting**: Every click triggers a server action that calculates the user's relative position to the treasure and generates a "salty pirate" hint in real-time.
- **Robust Fallbacks**: Implemented a dual-layered hint system where the AI provides the flavor, but a deterministic geometric algorithm ensures the user always receives accurate proximity feedback, even if the AI API fails.

### 🏗️ Architectural Decisions
- **Encapsulated Game Logic**: All game state and side effects are managed within a custom `useTreasureHunt` hook. This keeps the UI components purely presentational and makes the business logic easily testable in isolation.
- **Type-Safe Infrastructure**: Leveraging **TypeScript** across the entire stack—from Prisma schema definitions to Server Action responses—eliminating an entire class of runtime errors.
- **Server-Side Orchestration**: Used **Next.js Server Actions** to handle sensitive AI API keys and database mutations, ensuring zero exposure of secrets to the client.

### 🧪 Quality Assurance & CI/CD
I adopted a "Test-First" mentality to ensure stability:
- **Unit Testing**: Used **Vitest** to verify the Euclidean distance calculations and hint threshold logic.
- **End-to-End (E2E) Testing**: Implemented **Playwright** to automate the "Happy Path" (Load $\rightarrow$ Search $\rightarrow$ Win), ensuring the core user experience never regresses.
- **Automated Pipeline**: A **GitHub Actions** workflow runs linting, unit tests, and E2E tests on every push, enforcing a production-ready standard for every commit.

---

## 🌟 Key Features

- **Dynamic Proximity System**: Real-time distance calculation using Euclidean geometry:
  - ❄️ **Cold** $\rightarrow$ 🌡️ **Warm** $\rightarrow$ 🔥 **Very Hot** $\rightarrow$ 🎉 **Found**
- **AI Pirate Captain**: A dynamic NPC that guides you using thematic, AI-generated clues based on your actual coordinates.
- **GTA-Style Rewards**: High-energy "Mission Passed" animation with the iconic Pricedown font and sound effects for maximum dopamine.
- **Competitive Layer**: Full authentication flow via **Clerk** and a global leaderboard powered by **Neon PostgreSQL**, allowing players to compete for the lowest click count.
- **Polished UX**: Responsive design, click-ripple animations, and a custom asset-loading lifecycle to prevent "layout shift" before the game starts.

## 🛠️ Tech Stack

| Layer          | Technology                                |
| :------------- | :---------------------------------------- |
| **Language**   | TypeScript                                |
| **Framework**  | Next.js 16 (App Router)                   |
| **UI Library** | React 19                                  |
| **Styling**    | Tailwind CSS & SCSS                       |
| **Database**   | Neon PostgreSQL via Prisma                |
| **Auth**       | Clerk                                     |
| **AI**         | Google Gemini (Vercel AI SDK)          |
| **Testing**    | Vitest, React Testing Library, Playwright |
| **CI/CD**      | GitHub Actions $\rightarrow$ Vercel                   |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Clerk Account, Neon PostgreSQL DB, and Google AI Studio API Key.

### Installation
1. **Clone & Install**:
   ```bash
   git clone https://github.com/itosya/treasure-hunt.git
   cd treasure-hunt
   npm install
   ```
2. **Environment Setup**:
   ```bash
   cp .env.example .env.local
   # Fill in Clerk, Neon, and Google AI keys in .env.local
   ```
3. **Database Init**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
4. **Run**:
   ```bash
   npm run dev
   ```

### Testing
- **Unit**: `npm test`
- **E2E**: `npm run test:e2e`

## 📁 Project Structure
```text
src/
├── app/
│   ├── actions/       # Server Actions (AI, Leaderboard)
│   ├── globals.scss   # Thematic styles & animations
│   └── page.tsx       # Game entry point
├── components/       # Pure UI components
├── hooks/            # useTreasureHunt (The "Brain" of the game)
├── lib/             # Shared clients (Prisma)
└── utils/            # Pure math & game logic
```

## 🔗 Connect with Me
- [GitHub Profile](https://github.com/iTosia)

---
_Developed by [iTosia](https://github.com/iTosia) as a portfolio showcase of full-stack engineering excellence._
