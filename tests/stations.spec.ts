import { test } from "@playwright/test";
import StationPage from "../pages/stationPage";

test.use({
  permissions: [], // Block all permissions including geolocation
});

test.describe.serial("Pricelocq Station Tests (Suite 3)", () => {
  let stationPage: StationPage;

  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.pricelocq.com/pricelocq-stations");
    stationPage = new StationPage(page);
  });

test("TC1: Find SEA OIL Stations based on the search criteria", async () => {
  const province = "Pangasinan";
  const city = "Calasiao";
  const products = ["Gas 97"];
  const customers = ["Consumer"];

  await stationPage.filterStations(province, city, products, customers);
  const stationNames = await stationPage.getStationNames();

  console.log("Matching Gas Stations based on Search Criteria:");
  console.log(`  Province: ${province}`);
  console.log(`  City: ${city}`);
  console.log(`  Products: ${products.join(", ")}`);
  console.log(`  Customer Types: ${customers.join(", ")}`);

stationNames.forEach((name, index) => {
  console.log('\x1b[32m%s\x1b[0m', `#${index + 1} ${name}`);
});

});


  test("TC2: Print First 10 Stations", async () => {
    const stations = await stationPage.getFirstTenStationNames();
    console.log("First 10 stations:", stations);
  });
});
