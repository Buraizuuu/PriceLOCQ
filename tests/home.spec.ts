import { test, expect } from "@playwright/test";
import HomePage from "../pages/homepage";
import paymentData from "../data/paymentPartners.json";

test.describe.serial("Home Page Navigation Tests", () => {
  test("Verify Home Page Navigation Menu Visibility", async ({ page }) => {
    const homePage = new HomePage(page);
    await page.goto("https://new.pricelocq.com/");
    await expect(homePage.homeNav).toBeVisible();
    await expect(homePage.aboutUsNav).toBeVisible();
    await expect(homePage.gettingStartedNav).toBeVisible();
    await expect(homePage.helpCenterNav).toBeVisible();
  });

  test("Verify Navigate to Station List Page", async ({ page }) => {
    await page.goto("https://new.pricelocq.com/");
    const homePage = new HomePage(page);
    await homePage.clickStationList();
  });

  test("Verify Navigate to Payment Partners Page", async ({ page }) => {
    await page.goto("https://new.pricelocq.com/");
    const homePage = new HomePage(page);
    await homePage.clickPaymentPartners();
  });

  test("Verify Navigate to Learn More Page", async ({ page }) => {
    await page.goto("https://new.pricelocq.com/");
    const homePage = new HomePage(page);
    await homePage.clickLearnMore();
  });
});
