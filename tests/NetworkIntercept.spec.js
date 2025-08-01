const {test, expect, request} = require('@playwright/test'); 
const {APIUtils} = require('../utils/APIUtils');
const loginPayLoad = {userEmail:"bhavik.patel.b@gmail.com",userPassword:"Iamking@000"}; 
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"67a8dde5c0d3e6622a297cc8"}]}; 
const fakePayloadOrders = {data:[],message:"No Orders"};
let response; 

test.beforeAll( async()=> 
{ 
    const apiContext = await request.newContext(); 
    const apiUtils = new APIUtils(apiContext,loginPayLoad); 
    response = await apiUtils.createOrder(orderPayLoad); 
  
}) 
  
  
test('Mock No order to display by intercepting network traffic', async ({page})=> 
{  
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token );

await page.goto("https://rahulshettyacademy.com/client"); 

await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route =>
    {
        //intercepting response - API response ->|Intercept to show no orders|->browser->render in front end
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayloadOrders);
        route.fulfill(
            {
                response,
                body,
            }
        )

    }
)
await page.locator("button[routerlink*='myorders']").click(); 
await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
await expect(page.getByText('You have No Orders to show at')).toBeVisible();

}); 