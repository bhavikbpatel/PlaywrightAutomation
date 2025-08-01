/**
 * @fileoverview Playwright Configuration
 * @description Configuration file for Playwright test automation framework.
 * Defines test settings, browser configurations, and execution parameters.
 * 
 * @author Bhavik
 * @created 2025-08-01
 * @version 1.0.0
 * 
 * @requires @playwright/test
 * @see https://playwright.dev/docs/test-configuration
 */

// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Playwright Test Configuration
 * @description Main configuration object for Playwright test execution
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Directory containing test files
  testDir: './tests',
  // Global timeout for each test (30 seconds)
  timeout: 30000,
  // Timeout configuration for expect assertions
  expect: {
    timeout: 50000
  },
  // Disable parallel execution for better stability
  fullyParallel: false,
  // Fail build if test.only is accidentally left in CI
  forbidOnly: !!process.env.CI,
  // Retry configuration: 2 retries on CI, none locally
  retries: 1,
  // Worker configuration: 1 worker on CI, default locally
  workers: 5,
  // HTML reporter for test results
  reporter: 'html',
  
  // Global test configuration options
  use: {
    // Base URL for relative navigation (currently disabled)
    // baseURL: 'http://localhost:3000',

    // Trace collection for failed test debugging
    trace: 'retain-on-failure',
    // Run tests in headed mode (browser visible)
    headless: false,
    // Take screenshots on test completion
    screenshot: 'on',
  },

  // Browser project configurations
  projects: [
    {
      // Chrome browser configuration
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    /* Additional browser configurations (currently commented out)
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }, */

    /* Mobile browser configurations (currently commented out)
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    }, */

    /* Branded browser configurations (currently commented out)
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    }, */
  ],

  /* Local development server configuration (currently commented out)
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  }, */
});

