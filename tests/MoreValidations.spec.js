const { test, expect } = require('@playwright/test');
/**
 * Playwright configuration file for running tests with specific settings.
 */
test.describe.configure({ mode: 'parallel' });
test("Popup Validations", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.getByRole("button", { name: "Hide" }).click();

    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.on("dialog", dialog => dialog.accept());
    await page.getByRole("button", { name: "Confirm" }).click();

    await page.getByRole("button", { name: "Mouse Hover" }).hover();

    const pageFrame = page.frameLocator("#courses-iframe");
    pageFrame.locator("li a[href='lifetime-access']:visible").click();
    const textcheck = await pageFrame.locator(".text h2").textContent();
    console.log(textcheck.split(" ")[1]);
});

test("Session 63: Screenshot and visual Comparison", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
 //   await page.locator("#displayed-text").screenshot({path: 'partialScreenShot.png'});
    await page.getByRole("button", { name: "Hide" }).click();
    await page.screenshot({ path: 'screenshot.png' });
    await expect(page.locator("#displayed-text")).toBeHidden();
});

test ("Session 64: Visual test to compare Screen shot", async ({ page }) => {
    await page.goto("https://flightware.com");
    expect (await page.screenshot()).toMatchSnapshot('screenshot.png');
});