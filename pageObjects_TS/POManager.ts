/**
 * @fileoverview Page Object Manager
 * @description This file contains the POManager class which acts as a central manager
 * for all page objects, providing easy access to different page instances.
 * 
 * @author Bhavik
 * @created 2025-08-01
 * @version 1.0.0
 * 
 * @requires ../pageObjects/LoginPage
 * @requires ../pageObjects/DashboardPage
 * @requires ../pageObjects/CartPage
 * @requires ../pageObjects/CheckOutPage
 * @requires ../pageObjects/MyOrderPage
 * @requires ../pageObjects/ThankYouPage
 */

// Import all page object classes
import { LoginPage } from "../pageObjects/LoginPage";
import { DashboardPage } from "../pageObjects/DashboardPage";
import { CartPage } from "../pageObjects/CartPage";
import { CheckOutPage } from "../pageObjects/CheckOutPage";
import { MyOrderPage } from "../pageObjects/MyOrderPage";
import { ThankYouPage } from "../pageObjects/ThankYouPage";
import { Page } from '@playwright/test';

/**
 * POManager (Page Object Manager) class serves as a central factory
 * for creating and managing all page object instances
 */
export class POManager {
    /**
     * Constructor for POManager
     * @param {Page} page - Playwright page object
     * @description Initializes all page objects with the provided page instance
     */

    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    cartPage: CartPage;
    checkoutPage: CheckOutPage;
    myorderPage: MyOrderPage;
    thankYouPage: ThankYouPage;
    page: Page;

    constructor(page: Page) {
        this.page = page;
        // Initialize all page object instances
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckOutPage(this.page);
        this.myorderPage = new MyOrderPage(this.page);
        this.thankYouPage = new ThankYouPage(this.page);
    }

    /**
     * Gets the LoginPage instance
     * @function getLoginPage
     * @returns {LoginPage} Instance of LoginPage
     * @description Returns the login page object for authentication operations
     */
    getLoginPage() {
        return this.loginPage;
    }

    /**
     * Gets the DashboardPage instance
     * @function getDashboardPage
     * @returns {DashboardPage} Instance of DashboardPage
     * @description Returns the dashboard page object for product browsing operations
     */
    getDashboardPage() {
        return this.dashboardPage;
    }

    /**
     * Gets the CartPage instance
     * @function getCartPage
     * @returns {CartPage} Instance of CartPage
     * @description Returns the cart page object for cart management operations
     */
    getCartPage() {
        return this.cartPage;
    }

    /**
     * Gets the CheckOutPage instance
     * @function getcheckOutPage
     * @returns {CheckOutPage} Instance of CheckOutPage
     * @description Returns the checkout page object for order placement operations
     */
    getCheckOutPage() {
        return this.checkoutPage;
    }

    /**
     * Gets the MyOrderPage instance
     * @function getmyOrderPage
     * @returns {MyOrderPage} Instance of MyOrderPage
     * @description Returns the my orders page object for order history operations
     */
    getMyOrderPage() {
        return this.myorderPage;
    }

    /**
     * Gets the ThankYouPage instance
     * @function getThankYouPage
     * @returns {ThankYouPage} Instance of ThankYouPage
     * @description Returns the thank you page object for order confirmation operations
     */
    getThankYouPage() {
        return this.thankYouPage;
    }
}
module.exports = { POManager }; // Export the POManager class for use in tests