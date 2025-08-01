const { test } = require('@playwright/test');

exports.customtest = test.extend({
    testDataForOrder: async ({}, use) => {
        const testData = {
            username: "anshika@gmail.com",
            password: "Iamking@000",
            productName: "ADIDAS ORIGINAL",
            countryName: "India"
        };
        await use(testData);
    }
});