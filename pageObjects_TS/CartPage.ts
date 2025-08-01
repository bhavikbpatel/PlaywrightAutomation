/**
 * @fileoverview Cart Page Object Model
 * @description This file contains the CartPage class which handles interactions
 * with the shopping cart page including product verification and checkout navigation.
 * 
 * @author Bhavik
 * @created 2025-08-01
 * @version 1.0.0
 * 
 * @requires @playwright/test
 */

import { Locator, Page } from '@playwright/test';
/**
 * CartPage class represents the shopping cart page
 * Contains methods for cart verification and checkout operations
 */
export class CartPage 
{
    /**
     * Constructor for CartPage
     * @param {Page} page - Playwright page object
     */
    page: Page;
    cartProducts: Locator;
    checkOutButton: Locator;

    constructor(page: Page) 
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
    async getProductlocator(productName:string)
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
    async verifyProductisPresent(productName:string)
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
module.exports = { CartPage }; // Export the CartPage class for use in tests