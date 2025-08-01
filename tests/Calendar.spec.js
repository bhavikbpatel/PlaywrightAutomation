const {test,expect} = require('@playwright/test');

test('Calendar Validations', async ({page}) => {

    const monthNumber = "6";
    const yearNumber = "2023";
    const dateNumber = "15";
    const expectedList = [monthNumber,dateNumber,yearNumber];
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');

    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();

    await page.getByText(yearNumber).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber) - 1).click();
    await page.locator("//abbr[text()='" + dateNumber + "']").click();

    const inputs = await page.locator(".react-date-picker__inputGroup__input input");

    for (let i = 0; i < inputs.length; i++) {
        const value = await inputs[i].getAttribute('value');
        expect(value).toEqual(expectedList[i]);
    }
});