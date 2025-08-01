/**
 * @fileoverview API Utilities
 * @description This file contains the APIUtils class which provides utility methods
 * for API interactions including authentication and order creation.
 * 
 * @createdBy Bhavik Patel
 * @version 1.0.0
 * 
 * @requires @playwright/test
 */

/**
 * APIUtils class provides utility methods for API testing
 * Contains methods for authentication and order management via API calls
 */
class APIUtils {
    /**
     * Constructor for APIUtils
     * @param {APIRequestContext} apiContext - Playwright API request context
     * @param {Object} loginPayLoad - Login payload containing user credentials
     */
    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    /**
     * Authenticates user and retrieves authentication token
     * @async
     * @function getToken
     * @returns {Promise<string>} Authentication token for API requests
     * @description Sends login request to API and extracts the authentication token
     */
    async getToken() {
        // Send POST request to login endpoint
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayLoad
        }); // Expected status codes: 200, 201 
        
        // Parse response JSON
        const loginResponseJson = await loginResponse.json();
        
        // Extract token from response
        const token = loginResponseJson.token;
        
        return token;
    }

    /**
     * Creates a new order via API
     * @async
     * @function createOrder
     * @param {Object} orderPayLoad - Order details payload
     * @returns {Promise<Object>} Response object containing token and order ID
     * @description Creates an order using the API and returns the order details
     */
    async createOrder(orderPayLoad) {
        let response = {};
        
        // Get authentication token
        response.token = await this.getToken();
        
        // Send order creation request with authentication headers
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayLoad,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        });

        // Parse order response
        const orderResponseJson = await orderResponse.json();
        
        // Extract order ID from response
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;

        return response;
    }
}

module.exports = { APIUtils };
