// fixtures/baseFixtures.ts
import { test as base } from "@playwright/test";
import HomePage from "../pages/homePage";

// Define the type for the custom fixtures
type MyFixtures = {
  homePage: HomePage;
};

// Extend Playwright's base test with custom fixtures
export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    await page.goto("https://new.pricelocq.com/"); // or use a value from config/urls.ts
    const homePage = new HomePage(page);
    await use(homePage);
  },
});

// Re-export expect to use in specs
export { expect } from "@playwright/test";
