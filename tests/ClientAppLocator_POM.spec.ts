
import {test, expect} from '@playwright/test';
import { POManager } from '../pageObjects_TS/POManager';
import { customtest } from '../utils_TS/test-base';

const dataset = JSON.parse(JSON.stringify(require('../utils/placeOrderTestData.json')));

for (const data of dataset) {
    /**
     * Test for placing an order with multiple test data
     */
    test(`@Web Multiple TestData and POM Test ${data.productName}`, async ({ page }) => {

        const username = data.username;
        const password = data.password;
        const productName = data.productName;
        const countryName = data.countryName;

        const poManager = new POManager(page);

        const loginPage = poManager.getLoginPage();
        const dashboardPage = poManager.getDashboardPage();
        const cartPage = poManager.getCartPage();
        const checkOutPage = poManager.getCheckOutPage();
        const myOrderPage = poManager.getMyOrderPage();
        const thankYouPage = poManager.getThankYouPage();

        await loginPage.goto();
        await loginPage.validLogin(username, password);

        await dashboardPage.searchProductAndAddtoCart(productName);
        await dashboardPage.navigateToCart();

        await cartPage.verifyProductisPresent(productName);
        await cartPage.clickCheckOut();

        await checkOutPage.enterDetails(countryName);
        await checkOutPage.verifyUserOnCheckOutPage(username);
        const orderID = await checkOutPage.placeOrderandGetOrderID();

        await thankYouPage.verifyThankYouMessage();

        await myOrderPage.clickMyOrder();
        await myOrderPage.checkOrderDetailsandClickView(orderID);

        await thankYouPage.verifyOrderDetails(orderID);
    });
}


customtest(`@Web Custom Test Multiple TestData and POM Test`, async ({ page,testDataForOrder }) => {

        const username = testDataForOrder.username;
        const password = testDataForOrder.password;
        const productName = testDataForOrder.productName;
        const countryName = testDataForOrder.countryName;

        const poManager = new POManager(page);

        const loginPage = poManager.getLoginPage();
        const dashboardPage = poManager.getDashboardPage();
        const cartPage = poManager.getCartPage();
        const checkOutPage = poManager.getCheckOutPage();
        const myOrderPage = poManager.getMyOrderPage();
        const thankYouPage = poManager.getThankYouPage();

        await loginPage.goto();
        await loginPage.validLogin(username, password);

        await dashboardPage.searchProductAndAddtoCart(productName);
        await dashboardPage.navigateToCart();

        await cartPage.verifyProductisPresent(productName);
        await cartPage.clickCheckOut();

        await checkOutPage.enterDetails(countryName);
        await checkOutPage.verifyUserOnCheckOutPage(username);
        let orderID: any = await checkOutPage.placeOrderandGetOrderID();

        await thankYouPage.verifyThankYouMessage();
        
        await myOrderPage.clickMyOrder();
        await myOrderPage.checkOrderDetailsandClickView(orderID);

        await thankYouPage.verifyOrderDetails(orderID);
    });
