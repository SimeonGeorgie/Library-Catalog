const {test, expect} = require('@playwright/test');

test ('Verify User\'s logout is succesfull', async({page}) => {
    //open the application
    await page.goto("http://localhost:3000/login");
    
    //locate page toolbar
    await page.waitForSelector('nav.navbar');
    
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    
    await page.click('input[type="submit"]');


    await page.waitForURL('http://localhost:3000/catalog');
    await page.click('#logoutBtn');
    await page.waitForSelector('a.button[href="/register"]');

    const registerButton = await page.$('#guest a.button[href="/register"]');

    expect(registerButton).not.toBeNull();

    expect(await registerButton.isVisible()).toBe(true);

})