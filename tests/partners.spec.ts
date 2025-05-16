import { test, expect } from "@playwright/test";
import HomePage from "../pages/homepage";
import PartnersPage from "../pages/partnersPage";
import paymentData from "../data/paymentPartners.json";

test("Verify Payment Partners", async ({ page }) => {
  const homePage = new HomePage(page);
  await page.goto("https://new.pricelocq.com/");
  await homePage.clickPaymentPartners();
  const partnersPage = new PartnersPage(page);
  const actualPartners = await partnersPage.getPaymentPartnerTexts();
  const expectedPartners = paymentData.partners;
  expect(actualPartners.sort()).toEqual(expectedPartners.sort());
});
