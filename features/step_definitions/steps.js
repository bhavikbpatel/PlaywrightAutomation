const { When, Then, Given } = require('@cucumber/cucumber');
const { customtest } = require('../../utils/test-base.js');
const { expect } = require('allure-playwright');


Given('a login to ecommerce application with {string} and {string}', { timeout: 10000 }, async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    this.username = username;
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.validLogin(this.username, password);
});

When('Add {string} to the cart', { timeout: 10000 }, async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAndAddtoCart(productName);
    await this.dashboardPage.navigateToCart();
    this.cartPage = this.poManager.getCartPage();
    await this.cartPage.verifyProductisPresent(productName);
});

Then('Verify that {string} is displayed in the cart', { timeout: 10000 }, async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    await this.cartPage.verifyProductisPresent(productName);
    await this.cartPage.clickCheckOut();
});

When('Enter valid details and Place Order', { timeout: 10000 }, async function () {
    // Write code here that turns the phrase above into concrete actions
    this.checkOutPage = this.poManager.getCheckOutPage();
    await this.checkOutPage.enterDetails("India");
    await this.checkOutPage.verifyUserOnCheckOutPage(this.username);
    this.orderID = await this.checkOutPage.placeOrderandGetOrderID();
    console.log("Order ID: ", this.orderID);

});

Then('Verify order is present in the OrderHistory', { timeout: 10000 }, async function () {
    // Write code here that turns the phrase above into concrete actions
    const myOrderPage = this.poManager.getMyOrderPage();
    const thankYouPage = this.poManager.getThankYouPage();
    await thankYouPage.verifyThankYouMessage();
    await myOrderPage.clickMyOrder(this.orderID);
    await myOrderPage.checkOrderDetailsandClickView(this.orderID);
    await thankYouPage.verifyOrderDetails(this.orderID);
});


Given('a login to ecommerce2 application with {string} and {string}', async function (username, password) {
    const userName = this.page.locator("#username");
    const userPassword = this.page.locator("[type='password']");
    const signInBtn = this.page.locator("#signInBtn");

    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise');
    await userName.fill(username);
    await userPassword.fill(password);
    await signInBtn.click();

});

Then('Verify Error message is displayed', async function () {
    console.log(await this.page.locator("[style*='block']").textContent());
    expect(await this.page.locator("[style*='block']").textContent()).toContain("Incorrect username/password");
    return 'pending';
});