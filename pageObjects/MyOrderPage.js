/**
 * @fileoverview My Orders Page Object Model
 * @description This file contains the MyOrderPage class which handles interactions
 * with the my orders page including order history viewing and order detail navigation.
 * 
 * @author Bhavik
 * @created 2025-08-01
 * @version 1.0.0
 * 
 * @requires @playwright/test
 */

/**
 * MyOrderPage class represents the user's order history page
 * Contains methods for viewing order history and navigating to specific order details
 */
class MyOrderPage {
    /**
     * Constructor for MyOrderPage
     * @param {Page} page - Playwright page object
     */
    constructor(page) {
        this.page = page;
        // Locator for my orders navigation link
        this.myOrderLink = page.locator("button[routerlink*='myorders']");
        // Locator to verify orders table has loaded
        this.checkMyorderLoad = page.locator("tbody");
    }

    /**
     * Navigates to the my orders page
     * @async
     * @function clickMyOrder
     * @description Clicks on my orders link and waits for the orders table to load
     */
    async clickMyOrder() {
        await this.myOrderLink.click();
        await this.checkMyorderLoad.waitFor();
    }

    /**
     * Searches for a specific order and clicks view details
     * @async
     * @function checkOrderDetailsandClickView
     * @param {string} orderID - The order ID to search for in the orders list
     * @description Iterates through order rows to find matching order ID and clicks view button
     */
    async checkOrderDetailsandClickView(orderID) {
        // Get all order rows from the table
        const rows = await this.page.locator("tbody tr");
        console.log('Number of rows:', await rows.count());

        // Loop through each order row
        for (let i = 0; i < await rows.count(); i++) {
            console.log("func Order", orderID);
            // Get the order ID from current row
            const rowOrderID = await rows.nth(i).locator("th").textContent();
            
            // Check if current row contains the target order ID
            if (orderID.includes(rowOrderID)) {
                console.log('Order found in My Orders:', rowOrderID);
                // Click the view button for this order
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }
    }
}
module.exports = { MyOrderPage }