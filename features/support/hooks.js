/**
 * @fileoverview Cucumber Hooks
 * @createdBy Bhavik Patel
 */
const { POManager } = require('../../pageObjects/POManager');
const playwright= require('playwright/test');
const {Before, After, AfterStep, Status} = require('@cucumber/cucumber');

Before (async function () {
    const browser = await playwright.chromium.launch(
       { headless: false } // Set to true for headless mode
    );

    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

AfterStep(async function ({result}) {
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: '../screenshot/failed-step.png' });
    }
});

After(async function () {
    console.log("Test completed, closing browser...");
});