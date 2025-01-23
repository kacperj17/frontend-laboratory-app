const { test, expect } = require('@playwright/test');
test('has link do login page', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.locator('div.drawer-content').click();
  await page.locator('text=Zaloguj się').click();
  // Sprawdzenie, czy została otwarta strona ze ścieżką do formularza logowania
  expect(page).toHaveURL('http://localhost:3000/user/signin');
  // Sprawdzenie, czy na stronie logowania jest nagłówek z tekstem Login to App
  await expect(page.locator('h1')).toContainText('Zaloguj się!');

  const textLocator = page.locator('text=Aby uzyskać dostęp do swojego konta');
  await expect(textLocator).toBeVisible();
});
