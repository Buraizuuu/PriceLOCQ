import { test as base } from "@playwright/test";
import HomePage from "../pages/homePage";

type MyFixtures = {
  homePage: HomePage;
};

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    await page.goto("https://new.pricelocq.com/");
    const homePage = new HomePage(page);
    await use(homePage);
  },
});

export { expect } from "@playwright/test";
