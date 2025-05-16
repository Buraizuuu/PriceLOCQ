import { expect, Locator, Page } from "@playwright/test";
export default class PartnersPage {
  constructor(public page: Page) {}

  async getPaymentPartnerTexts(): Promise<string[]> {
    await this.page.waitForSelector(
      "//div[@class='partners-container']/div[@class='partners-labels']/span"
    );
    const partnerSpans = this.page.locator(
      "//div[@class='partners-container']/div[@class='partners-labels']/span"
    );
    let texts = await partnerSpans.allTextContents();

    texts = texts.map((text) =>
      text
        .replace(/\n/g, " ") // replace newlines with space
        .replace(/\s+/g, " ") // collapse multiple spaces
        .trim()
    );

    texts = texts.filter((text) => text.toLowerCase() !== "view stations >");

    return texts;
  }
}
