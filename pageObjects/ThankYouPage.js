/**
 * @fileoverview Thank You Page Object Model
 * @description This file contains the ThankYouPage class which handles interactions
 * with the thank you/order confirmation page after placing an order.
 * 
 * @createdBy Bhavik Patel
 * @version 1.0.0
 * 
 * @requires @playwright/test
 */

const { test, expect } = require('@playwright/test');

/**
 * ThankYouPage class represents the order confirmation page
 * Contains methods to verify order confirmation messages and details
 */
class ThankYouPage {
    /**
     * Constructor for ThankYouPage
     * @param {Page} page - Playwright page object
     */
    constructor(page) {
        this.page = page;
        // Locator for the main thank you message
        this.thankYou = page.locator(".hero-primary");
        // Locator for order details text
        this.colText = page.locator(".col-text");
    }

    /**
     * Verifies the thank you message is displayed correctly
     * @async
     * @function verifyThankYouMessage
     * @description Asserts that the thank you message displays the expected text
     * @throws {Error} If the thank you message doesn't match expected text
     */
    async verifyThankYouMessage() {
        await expect(this.thankYou).toHaveText(" Thankyou for the order. ");
    }

    /**
     * Verifies order details match the provided order ID
     * @async
     * @function verifyOrderDetails
     * @param {string} orderID - The order ID to verify against
     * @description Checks if the order details contain the provided order ID
     * @throws {Error} If order details don't contain the expected order ID
     */
    async verifyOrderDetails(orderID) {
        const orderDetails = await (this.colText).textContent();
        expect(orderID.includes(orderDetails)).toBeTruthy();
    }

}
module.exports = { ThankYouPage };