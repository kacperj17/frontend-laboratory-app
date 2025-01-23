require('dotenv').config();
const fs = require('fs');

import { test as setup } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('http://localhost:3000/user/signin');

  await page.fill('input[name="email"]', process.env.EMAIL);
  await page.fill('input[name="password"]', process.env.PASSWORD);


  await page.click('button[type="submit"]');

  await page.waitForURL('http://localhost:3000/user/myalbums');

  // Get session storage and store as env variable
  const sessionStorage = await page.evaluate(() => JSON.stringify(sessionStorage));
  fs.writeFileSync('playwright/.auth/session.json', sessionStorage, 'utf-8');
});

