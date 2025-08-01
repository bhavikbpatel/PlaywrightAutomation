const {test, expect, response}=require ('@playwright/test');
const { networkInterfaces } = require('node:os');

test('First Test', async ({page}) =>
{
    const username = page.locator("#username");
    const password = page.locator("[type='password']"); 
    const signInBtn = page.locator("#signInBtn");
    const alertMessage = page.locator("[style*='block']");
    const cardTitles = page.locator(".card-body a");
    const dropdown = page.locator("select.form-control");
    const radio = page.locator(".radiotextsty");
    const okButton = page.locator("#okayBtn");
    const termsCheckbox = page.locator("#terms");
    const blinkText = page.locator("[href*='documents-request']");

    await page.goto ('https://rahulshettyacademy.com/loginpagePractise');
 /*    await username.fill("learning");
    await password.fill("password");
    await signInBtn.click();
    console.log (await alertMessage.textContent());
    expect (await alertMessage.textContent()).toContain("Incorrect username/password");
 */
    await username.fill("rahulshettyacademy");
    await password.fill("learning");

    await dropdown.selectOption("consult");
    await radio.last().click();
    await okButton.click();

    expect (await radio.last()).toBeChecked();
    await termsCheckbox.click();
    expect (await termsCheckbox).toBeChecked();
    await termsCheckbox.uncheck();
    expect (await termsCheckbox.isChecked()).toBeFalsy();

    await expect (blinkText).toHaveAttribute("class", "blinkingText");
    await blinkText.click();
    await signInBtn.click();
    //await cardTitles.first().click();

 //   await page.waitForLoadState('networkidle');
 //   console.log(await cardTitles.first().textContent());
    await page.waitForLoadState('networkidle');
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});

test('Parent and Child Page', async ({browser}) =>
{
    
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator("#username");

    const blinkText = page.locator("[href*='documents-request']");

    await page.goto ('https://rahulshettyacademy.com/loginpagePractise');
    //await expect (blinkText).toHaveAttribute("class", "blinkingText");
    
    const [newPage]=await Promise.all([
        context.waitForEvent('page'),
        blinkText.click(), //new page is opening here, so we need a promise all to set context to new page
    ])
    const text = await newPage.locator(".red").textContent();
    await newPage.waitForLoadState('networkidle');
    console.log(text);

    const arrText = text.split("@");
    const domain= arrText[1].split(" ")[0];
    console.log(domain);

    await page.locator("#username").fill(domain);
 //   await page.pause();
});

test('Session 62: Stop calls to reach browser and get all URL and status on Logs', async ({page}) =>
{
    const username = page.locator("#username");
    const password = page.locator("[type='password']"); 
    const signInBtn = page.locator("#signInBtn");
    const alertMessage = page.locator("[style*='block']");
    const cardTitles = page.locator(".card-body a");
    const dropdown = page.locator("select.form-control");
    const radio = page.locator(".radiotextsty");
    const okButton = page.locator("#okayBtn");
    const termsCheckbox = page.locator("#terms");
    const blinkText = page.locator("[href*='documents-request']");
   
    page.route('**/*.{jpg,png,jpeg}',route => route.abort());
    await page.goto ('https://rahulshettyacademy.com/loginpagePractise');
 
    await username.fill("rahulshettyacademy");
    await password.fill("learning");
    await signInBtn.click();
    //await cardTitles.first().click();
   page.on('request',request=> console.log(request.url()));
   page.on('response',response => console.log(response.url(), response.status()));

});
