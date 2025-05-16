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

  async clickPaymentPartners() {
    await this.page.click("//div[@id='w-dropdown-toggle-1']");
    await this.page.click(
      "//nav[@id='w-dropdown-list-1']//a[text()='Payment Partners']"
    );
    await expect(this.page).toHaveURL(
      "https://www.pricelocq.com/payment-partners"
    );
  }

  async clickStationList() {
    await this.page.click("//div[@id='w-dropdown-toggle-1']");
    await this.page.click(
      "//nav[@id='w-dropdown-list-1']//a[text()='Station List']"
    );
    await expect(this.page).toHaveURL(
      "https://www.pricelocq.com/pricelocq-stations"
    );
  }

  async clickLearnMore() {
    const [newTab] = await Promise.all([
      this.page.waitForEvent("popup"),
      this.page.click(
        "//a[normalize-space(text())='Learn more about PriceLOCQ for Business']"
      ),
    ]);
    await newTab.waitForLoadState();
    await expect(newTab).toHaveURL("https://sample-locq-site.webflow.io/");
  }
}
