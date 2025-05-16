import { test } from "@playwright/test";
import StationPage from "../pages/stationPage";

// Block the geolcation permission prompt
test.use({
  permissions: [], // Block all permissions including geolocation
});

test.describe.serial("Pricelocq Station Tests", () => {
  test("Find SEA OIL Stations", async ({ page }) => {
    const province = "Pangasinan";
    const city = "Calasiao";
    const products = ["Gas 97"];
    const customers = ["Consumer"];
    await page.goto("https://www.pricelocq.com/pricelocq-stations");
    const stationPage = new StationPage(page);
    await stationPage.filterStations(province, city, products, customers);
    const stationNames = await stationPage.getStationNames();
    console.log("Matching Gas Stations based on Criteria:");
    console.log(`  Province: ${province}`);
    console.log(`  City: ${city}`);
    console.log(`  Products: ${products.join(", ")}`);
    console.log(`  Customer Types: ${customers.join(", ")}`);
    console.log(stationNames);
  });

  test("Print First 10 Stations", async ({ page }) => {
    const stationPage = new StationPage(page);
    await page.goto("https://www.pricelocq.com/pricelocq-stations");
    const stations = await stationPage.getFirstTenStationNames();
    console.log("First 10 stations:", stations);
  });
});
