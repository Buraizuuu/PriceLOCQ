import { expect, Locator, Page } from "@playwright/test";

export default class HomePage {
  readonly homeNav: Locator;
  readonly aboutUsNav: Locator;
  readonly gettingStartedNav: Locator;
  readonly helpCenterNav: Locator;

  constructor(public page: Page) {
    this.homeNav = page
      .locator(
        "//a[@href='https://new.pricelocq.com/' and normalize-space(text())='Home']"
      )
      .first();
    this.aboutUsNav = page
      .locator(
        "//a[@href='https://www.pricelocq.com/about-us' and normalize-space(text())='About us']"
      )
      .first();
    this.gettingStartedNav = page
      .locator(
        "//a[@href='https://www.pricelocq.com/getting-started' and normalize-space(text())='Get started']"
      )
      .first();
    this.helpCenterNav = page
      .locator(
        "//a[@href='https://help.pricelocq.com/support/home' and normalize-space(text())='Help Center']"
      )
      .first();
  }

  async verifyNavigationMenuVisibility() {
    const checks = [
      { name: "Home Nav", locator: this.homeNav },
      { name: "About Us Nav", locator: this.aboutUsNav },
      { name: "Getting Started Nav", locator: this.gettingStartedNav },
      { name: "Help Center Nav", locator: this.helpCenterNav },
    ];

    for (const check of checks) {
      const visible = await check.locator.isVisible();
      if (visible) {
        console.log(`✅ ${check.name} is visible`);
      } else {
        console.error(`❌ ${check.name} is NOT visible`);
      }
      expect(visible, `${check.name} should be visible`).toBe(true);
    }
  }

  async clickPaymentPartners() {
    await this.page.click("//div[@id='w-dropdown-toggle-1']");
    await this.page.click(
      "//nav[@id='w-dropdown-list-1']//a[text()='Payment Partners']"
    );
    try {
      await expect(this.page).toHaveURL(
        "https://www.pricelocq.com/payment-partners"
      );
      console.log("✅ Navigated to Payment Partners page successfully");
    } catch (error) {
      console.error("❌ Navigation to Payment Partners page failed", error);
      throw error; // re-throw so test still fails
    }
  }

  async clickStationList() {
    await this.page.click("//div[@id='w-dropdown-toggle-1']");
    await this.page.click(
      "//nav[@id='w-dropdown-list-1']//a[text()='Station List']"
    );
    try {
      await expect(this.page).toHaveURL(
        "https://www.pricelocq.com/pricelocq-stations"
      );
      console.log("✅ Navigated to Station List page successfully");
    } catch (error) {
      console.error("❌ Navigation to Station List page failed", error);
      throw error;
    }
  }

  async clickLearnMore() {
    const [newTab] = await Promise.all([
      this.page.waitForEvent("popup"),
      this.page.click(
        "//a[normalize-space(text())='Learn more about PriceLOCQ for Business']"
      ),
    ]);
    await newTab.waitForLoadState();
    try {
      await expect(newTab).toHaveURL("https://sample-locq-site.webflow.io/");
      console.log("✅ Navigated to Learn More page successfully (in new tab)");
    } catch (error) {
      console.error(
        "❌ Navigation to Learn More page failed (in new tab)",
        error
      );
      throw error;
    }
  }
}
