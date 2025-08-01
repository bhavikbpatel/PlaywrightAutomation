/**
 * @fileoverview Cart Page Object Model
 * @description This file contains the CartPage class which handles interactions
 * with the shopping cart page including product verification and checkout navigation.
 * 
 * @createdBy Bhavik Patel
 * @version 1.0.0
 * 
 * @requires @playwright/test
 */

const { expect } = require('@playwright/test');

/**
 * CartPage class represents the shopping cart page
 * Contains methods for cart verification and checkout operations
 */
class CartPage 
{
    /**
     * Constructor for CartPage
     * @param {Page} page - Playwright page object
     */
    constructor(page) 
    {
        this.page = page;
        // Locator for cart products (first item)
        this.cartProducts = page.locator("div li").first();
        // Locator for checkout button
        this.checkOutButton = page.locator('text=Checkout');
    }

    /**
     * Gets the locator for a specific product in the cart
     * @function getProductlocator
     * @param {string} productName - Name of the product to locate
     * @returns {Locator} Playwright locator for the specified product
     * @description Returns a locator that targets the product with the given name
     */
    async getProductlocator(productName)
    {   
        return this.page.locator("h3:has-text('"+productName+"')");
    }

    /**
     * Verifies that a specific product is present in the cart
     * @async
     * @function verifyProductisPresent
     * @param {string} productName - Name of the product to verify
     * @description Checks if the specified product exists in the cart
     */
    async verifyProductisPresent(productName)
    {
        // Wait for cart products to load
        await this.cartProducts.waitFor();
        // Get the product locator for verification
        const bool = await this.getProductlocator(productName);
    }

    /**
     * Clicks the checkout button to proceed to checkout
     * @async
     * @function clickCheckOut
     * @description Navigates from cart page to checkout page
     */
    async clickCheckOut() {
        await this.checkOutButton.click();
    }
}

module.exports = { CartPage };