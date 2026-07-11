# 🏴‍☠️ Treasure Hunt

[![CI/CD Pipeline](https://github.com/iTosia/treasure-hunt/actions/workflows/ci.yml/badge.svg)](https://github.com/iTosia/treasure-hunt/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748)](https://www.prisma.io/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF)](https://clerk.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A professionally engineered, interactive "Hot or Cold" treasure hunting game built with **Next.js 16**, **React 19**, and **TypeScript**. This project demonstrates a full-cycle frontend development approach, emphasizing **type safety, architectural scalability, and automated quality assurance**.

![Game Preview](./assets/screenshots/screenshot.png)

## 🚀 Live Demo

[🌐 **Play the Game**](https://treasure-game-sand.vercel.app/) — Deployed on Vercel

## 🎯 Engineering Excellence

Beyond the game mechanics, this project serves as a showcase of modern software engineering practices:

### 🛠️ Technical Implementation

- **Type-Safe Architecture**: Fully migrated to **TypeScript**, ensuring robust data structures and reducing runtime errors through strict typing of game state and event handlers.
- **Separation of Concerns**: Decoupled game logic from the UI by implementing a **custom React hook (`useTreasureHunt`)** and a layer of **pure utility functions**. This ensures the business logic is independent of the presentation layer.
- **AI-Powered Hints**: Integrated **Anthropic Claude** via the Vercel AI SDK to generate thematic pirate-style hints every 3rd click, providing an engaging, dynamic hint system.
- **Authentication & Leaderboard**: Full authentication flow with **Clerk** and a global leaderboard powered by **Prisma** + **Neon PostgreSQL**.
- **TDD (Test-Driven Development)**:
  - **Unit Testing**: Comprehensive suite using **Vitest** and **React Testing Library** to verify proximity algorithms and state transitions.
  - **E2E Testing**: Implemented **Playwright** to simulate real user journeys, ensuring the critical "Happy Path" (loading → searching → winning) is always functional.
- **Automated CI/CD Pipeline**: Integrated **GitHub Actions** to run linting, unit tests, build, and E2E tests on every push, preventing regressions and ensuring production-ready code.

## 🌟 Features

- **Dynamic Proximity System**: Real-time distance calculation using Euclidean geometry:
  - ❄️ **Cold**: Far from the treasure.
  - 🌡️ **Warm**: Getting closer.
  - 🔥 **Very Hot**: Almost there!
  - 🎉 **Found**: Treasure discovered!
- **AI Pirate Hints**: Every 3rd click, a salty pirate captain (powered by Claude AI) gives you a thematic hint about your direction.
- **GTA-Style Rewards**: High-energy "Mission Passed" animation with the iconic Pricedown font and sound effects.
- **Global Leaderboard**: Sign in with Clerk to submit your score and compete with players worldwide.
- **Sound Toggle**: Mute/unmute the victory sound effect.
- **Click Ripple Animation**: Visual feedback when clicking the map.
- **Score Tracking**: Persistent high-score tracking using `localStorage`.
- **Responsive Design**: Fully optimized for desktop and mobile devices using Tailwind CSS.
- **Performance Optimized**: Custom loading lifecycle to ensure map assets are fully rendered before gameplay begins.

## 🛠️ Tech Stack

| Layer          | Technology                                |
| :------------- | :---------------------------------------- |
| **Language**   | TypeScript                                |
| **Framework**  | Next.js 16 (App Router)                   |
| **UI Library** | React 19                                  |
| **Styling**    | Tailwind CSS & SCSS                       |
| **Database**   | Neon PostgreSQL via Prisma                |
| **Auth**       | Clerk                                     |
| **AI**         | Anthropic Claude (Vercel AI SDK)          |
| **Testing**    | Vitest, React Testing Library, Playwright |
| **CI/CD**      | GitHub Actions → Vercel                   |

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- A [Clerk](https://clerk.com) account for authentication
- A [Neon](https://neon.tech) PostgreSQL database
- An [Anthropic](https://console.anthropic.com) API key (for AI hints)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/itosya/treasure-hunt.git
   cd treasure-hunt
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env.local
   ```

   Then fill in your credentials in `.env.local`:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` from [Clerk Dashboard](https://dashboard.clerk.com)
   - `DATABASE_URL` from [Neon Console](https://console.neon.tech)
   - `ANTHROPIC_API_KEY` from [Anthropic Console](https://console.anthropic.com)

4. Set up the database:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Running Tests

- **Unit Tests**: `npm test`
- **E2E Tests**: `npm run test:e2e`

## 📁 Project Structure

```text
src/
├── app/
│   ├── actions/
│   │   ├── aiHints.ts        # Server action for AI-powered pirate hints
│   │   └── leaderboard.ts    # Server action for leaderboard CRUD
│   ├── globals.scss          # Global styles & CSS variables
│   ├── layout.tsx            # Root layout with Clerk provider
│   └── page.tsx              # Main page entry point
├── components/
│   ├── AuthHUD.tsx           # Authentication UI (sign in / user menu)
│   ├── Game.tsx              # Main game component
│   └── LeaderboardModal.tsx  # Global leaderboard modal
├── hooks/
│   ├── useTreasureHunt.ts    # Core game logic hook
│   └── useTreasureHunt.test.ts
├── lib/
│   └── db.ts                 # Prisma client singleton
└── utils/
    ├── gameLogic.ts          # Pure functions for distance & hints
    └── gameLogic.test.ts
tests/
└── e2e/
    └── treasure-hunt.spec.ts # Playwright E2E tests
```

## 🧪 Test Coverage

| Test Suite                | Type | What It Verifies                                 |
| :------------------------ | :--- | :----------------------------------------------- |
| `gameLogic.test.ts`       | Unit | Distance calculation, hint thresholds            |
| `useTreasureHunt.test.ts` | Unit | Hook initialization, map loading, click handling |
| `treasure-hunt.spec.ts`   | E2E  | Full user journey: load → search → win           |

## 🔗 Related

- [GitHub Profile](https://github.com/iTosia)

---

_Developed by [iTosia](https://github.com/iTosia)_
