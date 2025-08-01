const { test, expect } = require('@playwright/test');


test('@Sec Session: 60 Security Test request Intercept', async ({ page }) => {
    // Step 1: Ask for URL
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    // Step 2: Ask for username
    await page.locator('#userEmail').fill('bhavik.patel.b@gmail.com');

    // Step 3: Ask for password
    await page.locator('#userPassword').fill('Iamking@000');

    // Step 4: Ask to click login
    await page.locator('#login').click();

    // Step 5: Optionally verify login success
    // Print all card titles after login

    await page.waitForLoadState('networkidle');
    await page.locator("button[routerlink*='myorders']").click();
    //await page.getByRole("button", { name: "View" }).click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        async route => route.continue
            (
                { url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6" }
            )
    );

    await page.locator("button:has-text('View')").first().click();

    await expect(page.getByText('You are not authorize to view this order')).toBeVisible();
});