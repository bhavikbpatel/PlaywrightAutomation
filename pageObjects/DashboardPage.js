/**
 * @fileoverview Dashboard Page Object Model
 * @description This file contains the DashboardPage class which handles interactions
 * with the main dashboard/product listing page including product search and cart operations.
 * 
 * @author Bhavik
 * @created 2025-08-01
 * @version 1.0.0
 * 
 * @requires @playwright/test
 */

/**
 * DashboardPage class represents the main dashboard/product listing page
 * Contains methods for product search, selection, and cart navigation
 */
class DashboardPage {
    /**
     * Constructor for DashboardPage
     * @param {Page} page - Playwright page object
     */
    constructor(page) 
    {
        this.page = page;
        // Locator for product card titles
        this.cardTitlesLocator = page.locator('.card-body b');
        // Locator for product cards
        this.products = page.locator('.card-body');
        // Locator for cart header/navigation
        this.headerCart = page.locator("[routerlink*='cart']");
    }

    /**
     * Searches for a specific product and adds it to cart
     * @async
     * @function searchProductAndAddtoCart
     * @param {string} productname - Name of the product to search and add to cart
     * @description Iterates through all products to find the specified product and adds it to cart
     */
    async searchProductAndAddtoCart(productname)
    {
        // Get all card titles for reference
        const cardTitles = await this.cardTitlesLocator.allTextContents();

        // Count total products available
        const count = await this.products.count();
        
        // Loop through each product to find the target product
        for (let i = 0; i < count; i++) {
            // Check if current product matches the target product name
            if (await this.products.nth(i).locator('b').textContent() === productname) 
            {
                // Click "Add to Cart" button for the matching product
                await this.products.nth(i).locator('text= Add to Cart').click();
                break;
            }
        }
    }

    /**
     * Navigates to the shopping cart page
     * @async
     * @function navigateToCart
     * @description Clicks on cart icon and waits for cart page to load
     */
    async navigateToCart()
    {
        await this.headerCart.click();
        // Wait for the first cart item to be visible
        await this.page.locator("div li").first().waitFor();
    }
}
module.exports={DashboardPage}