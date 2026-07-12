import { test, expect } from '@playwright/test';

test.describe('Treasure Hunt Game', () => {
  test('should load the game and handle clicks', async ({ page }) => {
    await page.goto('/');

    // 1. Verify loading state disappears
    await expect(page.locator('.loading-overlay')).toBeHidden();

    // 2. Verify the map image is loaded
    const map = page.locator('img[alt="map"]');
    await expect(map).toBeVisible();

    // 3. Verify initial hint
    await expect(page.locator('.hint-container')).toContainText('Try to find the treasure!');

    // 4. Simulate a click on the map to check if the hint updates
    // We click at a random position to ensure we trigger a hint change
    await map.click({ position: { x: 100, y: 100 } });

    // The hint should change from the initial "Try to find the treasure!"
    // to either "Cold", "Warm", "Very hot", or "Treasure found!"
    const hintText = await page.locator('.hint-container').innerText();
    expect(hintText).not.toContain('Try to find the treasure!');

    // 5. Test "Play Again" button visibility
    const restartBtn = page.getByRole('button', { name: '↺ Play Again' });
    await expect(restartBtn).toBeVisible();
  });

  test('should restart the game', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.loading-overlay')).toBeHidden();

    // Click once to increase click count
    await page.locator('img[alt="map"]').click();

    // Click restart
    await page.getByRole('button', { name: '↺ Play Again' }).click();

    // Hint should reset to initial state
    await expect(page.locator('.hint-container')).toContainText('Try to find the treasure!');
  });
});
