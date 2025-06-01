import { test, expect } from "../fixtures/baseFixtures";

test.describe("Home Page Navigation Tests (Suite 1)", () => {
  test("TC1: Verify Home Page Navigation Menu Visibility", async ({ homePage }) => {
    await homePage.verifyNavigationMenuVisibility();
  });

  test("TC2: Verify Navigate to Station List Page", async ({ homePage }) => {
    await homePage.clickStationList();
  });

  test("TC3: Verify Navigate to Payment Partners Page", async ({ homePage }) => {
    await homePage.clickPaymentPartners();
  });

  test("TC4: Verify Navigate to Learn More Page", async ({ homePage }) => {
    await homePage.clickLearnMore();
  });
});
