import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  use: { baseURL: 'http://127.0.0.1:5199/', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 } } }
  ],
  webServer: { command: 'python3 -m http.server 5199 --bind 127.0.0.1 --directory site', url: 'http://127.0.0.1:5199/' }
});
