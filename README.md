# 🏴‍☠️ Treasure Hunt

A polished, interactive "Hot or Cold" treasure hunting game built with React. Players must locate a hidden treasure on a mysterious map, guided by proximity hints that change as they get closer to the target.

![Game Preview](./assets/screenshots/screenshot.png)

## 🌟 Features

- **Dynamic Proximity System**: Real-time distance calculation using Euclidean geometry to provide intuitive hints:
  - ❄️ **Cold**: Far from the treasure.
  - 🌡️ **Warm**: Getting closer.
  - 🔥 **Very Hot**: Almost there!
  - 🎉 **Found**: Treasure discovered!
- **GTA-Style Rewards**: Features a high-energy "Mission Passed" animation with the iconic Pricedown font and sound effects, rewarding the player for their victory.
- **Score Tracking**: Persistent high-score tracking using `localStorage` to keep a record of the best (lowest) click count.
- **Responsive Design**: Fully responsive layout that works seamlessly across desktop and mobile devices.
- **Performance Optimized**: Implemented a custom loading screen to ensure the game map is fully rendered before interaction begins.

## 🛠️ Technologies Used

- **Frontend Framework**: [React](https://react.dev/) (Functional components, Hooks)
- **Styling**: [SCSS](https://sass-lang.com/) & [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React `useState` and `useRef`
- **Animations**: CSS Keyframes & Transitions
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Deployment**: GitHub Pages / Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/itosya/treasure-hunt.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🕹️ How to Play

1. Open the game in your browser.
2. Click anywhere on the map to search for the treasure.
3. Observe the **Hint** label at the top:
   - If it says **Cold**, keep searching.
   - As it changes to **Warm** and then **Very Hot**, you are closing in.
4. Once you find the treasure, you'll be greeted with the "Mission Passed" screen and your final score.
5. Try to find the treasure in the fewest clicks possible to beat your best score!

## 📁 Project Structure

```text
src/
├── assets/             # Map images, sound effects, and custom fonts
├── App.jsx             # Main game logic and UI
├── index.scss          # Custom GTA-style animations and Tailwind styles
└── main.jsx            # Entry point
```

---

_Developed by [iTosya](https://github.com/itosya)_
