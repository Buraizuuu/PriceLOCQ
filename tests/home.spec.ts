import { test, expect } from "@playwright/test";
import HomePage from "../pages/homePage";

test.describe.serial("Home Page Navigation Tests (Suite 1)", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    await page.goto("https://new.pricelocq.com/");
    homePage = new HomePage(page);
  });

  test("TC1: Verify Home Page Navigation Menu Visibility", async () => {
    await homePage.verifyNavigationMenuVisibility();
  });

  test("TC2: Verify Navigate to Station List Page", async () => {
    await homePage.clickStationList();
  });

  test("TC3: Verify Navigate to Payment Partners Page", async () => {
    await homePage.clickPaymentPartners();
  });

  test("TC4: Verify Navigate to Learn More Page", async () => {
    await homePage.clickLearnMore();
  });
});
