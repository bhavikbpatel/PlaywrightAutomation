const { test, expect } = require('@playwright/test');

test('Interactive login test with input prompts', async ({ page }) => {

    const userEmail = page.getByPlaceholder('email@example.com');
    const userPassword = page.getByPlaceholder('enter your passsword');
    const loginButton = page.getByRole('button', { name: 'Login' });
    const cardTitlesLocator = page.locator('.card-body b');
    const products=page.locator('.card-body');
    const productName = 'ADIDAS ORIGINAL';
    const headerCart = page.locator('.cart-header');
    const checkOutButton = page.locator('text=Checkout');
    const cvvInput = page.locator('#cvv');
    const nameOnCardInput = page.locator('#nameOnCard');
    const countryInput = page.getByPlaceholder('Select Country'); 
    const countrySelect = page.getByRole("button")
    const email = 'anshika@gmail.com';
    const placeOrderButton = page.getByText('PLACE ORDER');
    const yourOrder = page.locator (".ng-star-inserted")

    // Step 1: Ask for URL
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    // Step 2: Ask for username
    await userEmail.fill(email);

    // Step 3: Ask for password
    await userPassword.fill('Iamking@000');

    // Step 4: Ask to click login
    await loginButton.click();

    // Step 5: Optionally verify login success
    // Print all card titles after login
    
    await page.waitForLoadState('networkidle');
//    await cardTitlesLocator.first().waitFor();

   // console.log(await cardTitlesLocator.first().textContent());
    
    const cardTitles = await cardTitlesLocator.allTextContents();
  //  console.log('Card Titles:', cardTitles);

    await page.locator('.card-body').filter({ hasText: productName })
        .getByRole('button', { name: 'Add to Cart' }).click();

    await page.waitForLoadState('networkidle');
    // Step 6: Click on cart icon
    await page.getByRole("listitem").getByRole("button", { name: 'Cart' }).click();

   // await page.waitForLoadState('networkidle');
    await page.locator("div li").first().waitFor();
    // Step 7: Verify product in cart
    await expect(page.getByText(productName)).toBeVisible();

    await page.getByRole("button", { name: 'Checkout' }).click();
 
  //  cvvInput.fill('123');
  //  nameOnCardInput.fill('Anshika');

    await countryInput.pressSequentially('ind',{delay: 100});
    await page.getByRole("button", { name: 'India' }).nth(1).click();

    await placeOrderButton.click();

    await expect (page.getByText(" Thankyou for the order. ")).toBeVisible();
//****************************** */

    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log('Order ID:', orderID);

    await page.getByRole("listitem").getByRole("button", { name: 'Orders' }).click();

   // await page.locator("button[routerlink*='myorders']").click();

   await page.getByText("Your Orders").waitFor();
   // await page.locator("tbody").waitFor();
    
  
  
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
    expect (orderID.includes(orderDetails)).toBeTruthy();


});


