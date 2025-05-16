import { Page, Locator, expect } from "@playwright/test";
export default class StationPage {
  readonly page: Page;
  readonly filtersButton: Locator;
  readonly provinceDropdown: Locator;
  readonly cityDropdown: Locator;
  readonly dieselCheckbox: Locator;
  readonly gas91Checkbox: Locator;
  readonly gas95Checkbox: Locator;
  readonly gas97Checkbox: Locator;
  readonly consumerCheckbox: Locator;
  readonly businessCheckbox: Locator;
  readonly applyFiltersButton: Locator;
  readonly stationSearchField: Locator;
  readonly stationResults: Locator;
  private productCheckboxes: Record<string, Locator>;

  constructor(page: Page) {
    this.page = page;
    this.filtersButton = page.locator('//button[.//text()="Filters"]');
    this.provinceDropdown = page.locator('//p[text()="Province"]/..//input');
    this.cityDropdown = page.locator('//p[text()="City"]/..//input');
    this.dieselCheckbox = page.locator('//span[text()="Diesel"]/../..//input');
    this.gas91Checkbox = page.locator('//span[text()="Gas 91"]/../..//input');
    this.gas95Checkbox = page.locator('//span[text()="Gas 95"]/../..//input');
    this.gas97Checkbox = page.locator('//span[text()="Gas 97"]/../..//input');
    this.consumerCheckbox = page.locator('//p[text()="PriceLOCQ for Consumer"]/..//input');
    this.businessCheckbox = page.locator('//p[text()="PriceLOCQ for Business"]/..//input');
    this.applyFiltersButton = page.locator('//button[.//text()="Apply Filters"]');
    this.stationSearchField = page.getByPlaceholder("Search station name");
    this.stationResults = page.locator(".station-list_stationLabel__1VCja");
    this.productCheckboxes = {
      "Diesel": this.dieselCheckbox,
      "Gas 91": this.gas91Checkbox,
      "Gas 95": this.gas95Checkbox,
      "Gas 97": this.gas97Checkbox,
    };
  }

  private cleanStationName(name: string): string {
    return name.trim().replace(/Get Direction$/, "").trim();
  }

  async filterStations(province: string, city: string, products: string[], customerTypes: string[]) {
    await this.filtersButton.click();
    await this.provinceDropdown.fill(province);
    await this.page.keyboard.press("ArrowDown");
    await this.page.keyboard.press("Enter");
    await this.cityDropdown.fill(city);
    await this.page.keyboard.press("ArrowDown");
    await this.page.keyboard.press("Enter");
    for (const product of products) {
      const checkbox = this.productCheckboxes[product];
      if (checkbox) await checkbox.check();
    }
    if (customerTypes.includes("Consumer")) await this.consumerCheckbox.check();
    if (customerTypes.includes("Business")) await this.businessCheckbox.check();
    await this.applyFiltersButton.click();
    await this.page.waitForResponse((response) => response.url().includes("/ms-fleet/station") && response.status() === 200);
  }

  async getStationNames(): Promise<string[]> {
    await expect(this.stationResults.first()).toBeVisible();
    const stations = await this.stationResults.allTextContents();
    const cleaned = stations.map(this.cleanStationName).filter(Boolean);
    console.log(`Total stations found: ${cleaned.length}`);
    return cleaned;
  }

async getFirstTenStationNames(): Promise<string[]> {
  await expect(this.stationResults.first()).toBeVisible();
  const allStations = await this.stationResults.allTextContents();

  return allStations
    .slice(0, 10)
    .map((name, index) => `#${index + 1} ${this.cleanStationName(name)}`)
    .filter(Boolean);
  }

}
