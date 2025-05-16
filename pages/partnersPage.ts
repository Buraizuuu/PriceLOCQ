import { Page } from "@playwright/test";

export default class PartnersPage {
  constructor(public page: Page) {}

  async getPaymentPartnerTexts(): Promise<string[]> {
    const locator = this.page.locator("//div[@class='partners-container']/div[@class='partners-labels']/span");
    await locator.first().waitFor();

    const texts = (await locator.allTextContents())
      .map(text => text.replace(/\s+/g, " ").trim())
      .filter(text => text.toLowerCase() !== "view stations >");

    console.log("Filtered partner texts:", texts);

    return texts;
  }
}
