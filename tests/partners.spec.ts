import { test, expect } from "@playwright/test";
import HomePage from "../pages/homePage";
import PartnersPage from "../pages/partnersPage";
import paymentData from "../data/paymentPartners.json";

test.describe.serial("Payment Partners Tests (Suite 2)", () => {
  test("TC1: Verify Payment Partners", async ({ page }) => {
    const homePage = new HomePage(page);
    await page.goto("https://new.pricelocq.com/");
    await homePage.clickPaymentPartners();

    const partnersPage = new PartnersPage(page);
    const actualPartners = (await partnersPage.getPaymentPartnerTexts()).sort();
    const expectedPartners = [...paymentData.partners].sort();

    expect(actualPartners).toEqual(expectedPartners);
  });
});
