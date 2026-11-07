import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 45_000,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:4173', trace: 'retain-on-failure',
    // Use an installed browser when needed: PLAYWRIGHT_CHANNEL=msedge (or chrome).
    launchOptions: { channel: process.env.PLAYWRIGHT_CHANNEL || undefined },
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  // Tests run against the production build. The API is mocked inside the tests (page.route),
  // so no database or email credentials are needed.
  // An explicit URL supports an already-running preview without owning its process lifecycle.
  webServer: process.env.PLAYWRIGHT_BASE_URL ? undefined : { command: 'npm run build && npm run preview -- --port 4173 --strictPort', port: 4173, reuseExistingServer: true, timeout: 180_000 },
});
