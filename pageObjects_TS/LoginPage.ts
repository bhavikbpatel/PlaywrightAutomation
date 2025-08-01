/**
 * @fileoverview Login Page Object Model
 * @description This file contains the LoginPage class which handles all login-related
 * interactions including navigation to login page and user authentication.
 * 
 * @author Bhavik
 * @created 2025-08-01
 * @version 1.0.0
 * 
 * @requires @playwright/test
 */

/**
 * LoginPage class represents the login page of the application
 * Contains methods for user authentication and page navigation
 */
import { Page,Locator} from '@playwright/test';

export class LoginPage {
    /**
     * Constructor for LoginPage
     * @param {Page} page - Playwright page object
     */
    page: Page;
    signInButton: Locator;
    userName: Locator;
    password: Locator;
    constructor(page: Page) {
        this.page = page;
        // Locator for the sign-in button
        this.signInButton = page.locator('#login');
        // Locator for the username/email input field
        this.userName = page.locator('#userEmail');
        // Locator for the password input field
        this.password = page.locator('#userPassword');
    }

    /**
     * Navigates to the login page
     * @async
     * @function goto
     * @description Navigates the browser to the login page URL
     */
    async goto() {
        await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    }

    /**
     * Performs user login with provided credentials
     * @async
     * @function validLogin
     * @param {string} username - User email address
     * @param {string} password - User password
     * @description Fills in login credentials and submits the form
     */
    async validLogin(username:string, password:string) {
        await this.userName.type(username);
        await this.password.type(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = { LoginPage }; // Export the LoginPage class for use in tests