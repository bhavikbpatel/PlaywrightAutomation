/**
 * @fileoverview Checkout Page Object Model
 * @description This file contains the CheckOutPage class which handles interactions
 * with the checkout page including country selection, order placement, and user verification.
 * 
 * @author Bhavik
 * @created 2025-08-01
 * @version 1.0.0
 * 
 * @requires @playwright/test
 */

const { test, expect } = require('@playwright/test');

/**
 * CheckOutPage class represents the checkout/payment page
 * Contains methods for entering shipping details, placing orders, and verification
 */
class CheckOutPage {
    /**
     * Constructor for CheckOutPage
     * @param {Page} page - Playwright page object
     */
    constructor(page) {
        this.page = page;
        // Locator for country input field
        this.countryInput = page.locator('[placeholder*="Country"]');
        // Locator for country selection dropdown
        this.countrySelect = page.locator(".ta-results");
        // Locator for place order button
        this.placeOrderButton = page.locator(".action__submit");
        // Locator for order ID display
        this.orderID = page.locator(".em-spacer-1 .ng-star-inserted");
        // Locator for user email verification
        this.userEmail = page.locator(".mt-5 [type='text']");
    }

    /**
     * Enters shipping details including country selection
     * @async
     * @function enterDetails
     * @param {string} countryName - Name of the country to select (e.g., "India")
     * @description Types country name and selects from dropdown options
     */
    async enterDetails(countryName) 
    { 
        // Type country name with delay for better interaction
        await this.countryInput.pressSequentially(countryName, { delay: 100 });
        // Wait for country dropdown to appear
        await this.countrySelect.waitFor();

        // Get count of available country options
        const options = await this.countrySelect.locator("button").count();
        
        // Loop through options to find matching country
        for (let i = 0; i < options; i++) {
            const buttonText = await this.countrySelect.locator("button").nth(i).textContent();
            // Check if option matches the desired country (with space prefix)
            if (buttonText === (" " + countryName)) {
                await this.countrySelect.locator("button").nth(i).click();
                break;
            }
        }
    }

    /**
     * Places the order and retrieves the order ID
     * @async
     * @function placeOrderandGetOrderID
     * @returns {Promise<string>} The generated order ID
     * @description Clicks place order button and returns the order ID
     */
    async placeOrderandGetOrderID()
    {
        await this.placeOrderButton.click();
        return this.orderID.textContent();
    }

    /**
     * Verifies the user email on checkout page
     * @async
     * @function verifyUserOnCheckOutPage
     * @param {string} username - Expected username/email to verify
     * @description Asserts that the displayed email matches the expected username
     */
    async verifyUserOnCheckOutPage(username)
    {
        expect(this.userEmail.first()).toHaveText(username);
    }
}
module.exports = { CheckOutPage };