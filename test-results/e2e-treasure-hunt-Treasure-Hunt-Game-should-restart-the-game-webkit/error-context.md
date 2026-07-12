# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/treasure-hunt.spec.ts >> Treasure Hunt Game >> should restart the game
- Location: tests/e2e/treasure-hunt.spec.ts:31:3

# Error details

```
Error: locator.click: Error: strict mode violation: locator('.play-again-btn') resolved to 3 elements:
    1) <button class="play-again-btn mt-6">↺ Play Again</button> aka getByRole('button', { name: '↺ Play Again' })
    2) <button class="play-again-btn mt-6">🏆 Leaderboard</button> aka getByRole('button', { name: '🏆 Leaderboard' })
    3) <button title="Mute sound" class="play-again-btn mt-6">🔊</button> aka getByRole('button', { name: '🔊' })

Call log:
  - waiting for locator('.play-again-btn')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e4]:
    - banner [ref=e5]:
      - generic [ref=e6]: ⚓
      - heading "Treasure Hunt" [level=1] [ref=e7]
      - generic [ref=e8]: ⚓
    - paragraph [ref=e10]: "Hint: Warm 🌡️"
    - generic [ref=e12]:
      - generic [ref=e13]: Clicks
      - generic [ref=e14]: "1"
    - img "map" [ref=e17]
    - generic [ref=e18]:
      - button "↺ Play Again" [ref=e19] [cursor=pointer]
      - button "🏆 Leaderboard" [ref=e20] [cursor=pointer]
      - button "🔊" [ref=e21] [cursor=pointer]
  - button "Open Next.js Dev Tools" [ref=e27] [cursor=pointer]:
    - img [ref=e28]
  - alert [ref=e33]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Treasure Hunt Game', () => {
  4  |   test('should load the game and handle clicks', async ({ page }) => {
  5  |     await page.goto('/');
  6  | 
  7  |     // 1. Verify loading state disappears
  8  |     await expect(page.locator('.loading-overlay')).toBeHidden();
  9  | 
  10 |     // 2. Verify the map image is loaded
  11 |     const map = page.locator('img[alt="map"]');
  12 |     await expect(map).toBeVisible();
  13 | 
  14 |     // 3. Verify initial hint
  15 |     await expect(page.locator('.hint-container')).toContainText('Try to find the treasure!');
  16 | 
  17 |     // 4. Simulate a click on the map to check if the hint updates
  18 |     // We click at a random position to ensure we trigger a hint change
  19 |     await map.click({ position: { x: 100, y: 100 } });
  20 | 
  21 |     // The hint should change from the initial "Try to find the treasure!"
  22 |     // to either "Cold", "Warm", "Very hot", or "Treasure found!"
  23 |     const hintText = await page.locator('.hint-container').innerText();
  24 |     expect(hintText).not.toContain('Try to find the treasure!');
  25 | 
  26 |     // 5. Test "Play Again" button visibility
  27 |     const restartBtn = page.locator('.play-again-btn');
  28 |     await expect(restartBtn).toBeVisible();
  29 |   });
  30 | 
  31 |   test('should restart the game', async ({ page }) => {
  32 |     await page.goto('/');
  33 |     await expect(page.locator('.loading-overlay')).toBeHidden();
  34 | 
  35 |     // Click once to increase click count
  36 |     await page.locator('img[alt="map"]').click();
  37 | 
  38 |     // Click restart
> 39 |     await page.locator('.play-again-btn').click();
     |                                           ^ Error: locator.click: Error: strict mode violation: locator('.play-again-btn') resolved to 3 elements:
  40 | 
  41 |     // Hint should reset to initial state
  42 |     await expect(page.locator('.hint-container')).toContainText('Try to find the treasure!');
  43 |   });
  44 | });
  45 | 
```