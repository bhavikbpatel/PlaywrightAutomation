import {test as baseTest} from '@playwright/test';

interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;
    countryName: string;
};
export const customtest = baseTest.extend <{testDataForOrder: TestDataForOrder;}>({
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