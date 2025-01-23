const { test, expect } = require("@playwright/test");
const fs = require('fs');

test("authenticated user can visit profile page", async ({ page }) => {
  const sessionStorageData = JSON.parse(fs.readFileSync('playwright/.auth/session.json', 'utf8'));
  await page.goto("http://localhost:3000/");

  const sessionStorage = JSON.parse(
    fs.readFileSync("playwright/.auth/session.json", "utf-8")
  );

  await page.evaluate((data) => {
    for (const key in data) {
      sessionStorage.setItem(key, data[key]);
    }
  }, sessionStorageData);

  await page.reload();

  await page.locator("div.drawer-content").click();
  await page.locator("text=Profil").click();

  expect(page).toHaveURL("http://localhost:3000/user/profile");
  await expect(page.locator("h1")).toContainText("Zaktualizuj swój profil");
});

test("not authenticated user cannot visit profile page", async ({ page }) => {
  await page.goto("http://localhost:3000/user/profile");

  await expect(page).toHaveURL('http://localhost:3000/user/signin?returnUrl=/user/profile');

  await expect(page.locator('h1')).toHaveText('Zaloguj się!');
  await expect(page.locator('form')).toBeVisible();
});
