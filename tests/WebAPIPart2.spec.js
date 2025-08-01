const { test, expect } = require('@playwright/test');
let webContext;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill("bhavik.patel.b@gmail.com");
    await page.locator('#userPassword').fill("Iamking@000");
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: 'state.json' });

    webContext = await browser.newContext({ storageState: 'state.json' });
});



test('@API Session 54: Inject into Browser context', async ({ }) => {

    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client');

    const cardTitlesLocator = page.locator('.card-body b');
    const products = page.locator('.card-body');
    const productName = 'ADIDAS ORIGINAL';
    const headerCart = page.locator('.cart-header');
    const checkOutButton = page.locator('text=Checkout');
    const cvvInput = page.locator('#cvv');
    const nameOnCardInput = page.locator('#nameOnCard');
    const countryInput = page.locator('[placeholder*="Country"]');
    const countrySelect = page.locator(".ta-results");
    const email = 'bhavik.patel.b@gmail.com';
    const placeOrderButton = page.locator(".action__submit");
    const yourOrder = page.locator(".ng-star-inserted")


    //    await cardTitlesLocator.first().waitFor();

    // console.log(await cardTitlesLocator.first().textContent());

    const cardTitles = await cardTitlesLocator.allTextContents();
    //  console.log('Card Titles:', cardTitles);

    const count = await products.count();
    for (let i = 0; i < count; i++) {
        const productTitle = await products.nth(i).locator('b').textContent();

        if (productTitle === productName) {
            await products.nth(i).locator('text= Add to Cart').click();
            break;
        }

    }

    // Step 6: Click on cart icon
    await page.locator("[routerlink*='cart']").click();
    // await page.waitForLoadState('networkidle');
    await page.locator("div li").first().waitFor();
    // Step 7: Verify product in cart
    const boolean = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    await expect(page.locator("h3:has-text('ADIDAS ORIGINAL')")).toBeVisible();

    checkOutButton.click();
    //  cvvInput.fill('123');
    //  nameOnCardInput.fill('Anshika');

    await countryInput.pressSequentially('ind', { delay: 100 });
    await countrySelect.waitFor();

    const options = await countrySelect.locator("button").count();
    for (let i = 0; i < options; i++) {
        const buttonText = await countrySelect.locator("button").nth(i).textContent();
        if (buttonText === ' India') {
            await countrySelect.locator("button").nth(i).click();
            break;
        }

    }

    expect(page.locator(".mt-5 [type='text']").first()).toHaveText(email);
    await placeOrderButton.click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log('Order ID:', orderID);

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();


    const rows = await page.locator("tbody tr");
    console.log('Number of rows:', await rows.count());
    // await myOrders.first().waitFor();

    for (let i = 0; i < await rows.count(); i++) {

        const rowOrderID = await rows.nth(i).locator("th").textContent();
        if (orderID.includes(rowOrderID)) {
            console.log('Order found in My Orders:', rowOrderID);

            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderDetails = await page.locator(".col-text").textContent();
    expect(orderID.includes(orderDetails)).toBeTruthy();


});


