import { Page, Locator, expect } from '@playwright/test';

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
    this.stationSearchField = page.getByPlaceholder('Search station name');
    this.stationResults = page.locator('.station-list_stationLabel__1VCja');
  }

  async filterStations(province: string, city: string, products: string[], customerTypes: string[]) {
    await this.filtersButton.click();
    await this.provinceDropdown.fill(province);
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
    await this.cityDropdown.fill(city);
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');

    for (const product of products) {
      switch (product) {
        case 'Diesel': await this.dieselCheckbox.check(); break;
        case 'Gas 91': await this.gas91Checkbox.check(); break;
        case 'Gas 95': await this.gas95Checkbox.check(); break;
        case 'Gas 97': await this.gas97Checkbox.check(); break;
      }
    }
    await this.page.waitForTimeout(5000);
    for (const type of customerTypes) {
      if (type === 'Consumer') await this.consumerCheckbox.check();
      if (type === 'Business') await this.businessCheckbox.check();
    }

    await this.applyFiltersButton.click();
    await this.page.waitForTimeout(3000);
  }

async getStationNames(): Promise<string[]> {
  await expect(this.stationResults.first()).toBeVisible();
  const stations = await this.stationResults.allTextContents();
  const cleanedStations = stations
    .map(name => name.trim().replace(/Get Direction$/, '').trim())
    .filter(Boolean);

  console.log(`Total stations found: ${cleanedStations.length}`);

  return cleanedStations;
}


async getFirstTenStationNames(): Promise<string[]> {
  await expect(this.stationResults.first()).toBeVisible();
  const allStations = await this.stationResults.allTextContents();
  const firstTen = allStations
    .slice(0, 10)
    .map(name => name.trim().replace(/Get Direction$/, '').trim())
    .filter(Boolean);
  return firstTen;
}



}
