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

test ('Verify User\'s email address is visible', async({page}) => {
    //open the application
    await page.goto("http://localhost:3000/login");
    
    //locate page toolbar
    await page.waitForSelector('nav.navbar');
    
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    
    await page.click('input[type="submit"]');


    await page.waitForURL('http://localhost:3000/catalog');

    const emailAddress = await page.getByText('Welcome, peter@abv.bg');
    
    const isemailAddressVisible = await emailAddress.isVisible()

    expect(isemailAddressVisible).toBe(true)
})

test ('Verify All books link is visible', async({page}) => {
    //open the application
    await page.goto("http://localhost:3000");
    
    //locate page toolbar
    await page.waitForSelector('nav.navbar');
    
    //Get all books link
    const allBooksLink = await page.$('a[href="/catalog"]')
    
    const isElementVisible = await allBooksLink.isVisible();

    expect(isElementVisible).toBe(true)
})

test ('Verify "Login" button is visible', async({page}) => {
    await page.goto("http://localhost:3000");

    await page.waitForSelector('nav.navbar')

    const loginButton = await page.$('a[href="/login"]');

    const isLoginButtonVisible = await loginButton.isVisible();

    expect(isLoginButtonVisible).toBe(true);
})

test('Verify "All Books" link is visible after user login', async ({page}) => {
    await page.goto("http://localhost:3000/login");

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const allBooksLink = await page.$('a[href="/catalog"]');

    const isAllBooksLinkVisible = await allBooksLink.isVisible();

    expect(isAllBooksLinkVisible).toBe(true);
})

test('Verify "My Books" link is visible after user login', async ({page}) => {
    await page.goto("http://localhost:3000/login");

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const myBooksLink = await page.$('a[href="/profile"]');

    const ismyBooksLinkVisible = await myBooksLink.isVisible();

    expect(ismyBooksLinkVisible).toBe(true);
})


test('Verify "Add Book" link is visible after user login', async ({page}) => {
    await page.goto("http://localhost:3000/login");

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const addBookLink = await page.$('a[href="/create"]');

    const isAddBookLinkLinkVisible = await addBookLink.isVisible();

    expect(isAddBookLinkLinkVisible).toBe(true);
})


test('Login with valid credentials', async ({ page }) => {
    await page.goto("http://localhost:3000/login");
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    await page.isVisible('a[href="catalog"]');
    expect(page.url()).toBe('http://localhost:3000/catalog')
})


test('Attempt Login with empty  credentials', async ({ page }) => {
    await page.goto("http://localhost:3000/login");

    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept()
    });
    await page.$('a[href="login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
})



test('Attempt Login with empty email', async ({ page }) => {
    await page.goto("http://localhost:3000/login");
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept()
    });
    await page.$('a[href="login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
})


test('Attempt Login with empty password', async ({ page }) => {
    await page.goto("http://localhost:3000/login");
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept()
    });
    await page.$('a[href="login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
})

test('Submit register form with valid fields', async ({ page }) => {
    await page.goto("http://localhost:3000/register");
    const seconds = new Date().getTime() / 1000;
    await page.fill('input[name="email"]', 'new_user' + seconds + '@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '123456');

    await page.click('input[type="submit"]');

    await page.$('a[href="catalog"]');
    expect(page.url()).toBe('http://localhost:3000/catalog')
})


test('Submit register form with empty fields', async ({ page }) => {
    await page.goto("http://localhost:3000/register");
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type().toContain('alert'));
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="register"]');
    expect(page.url()).toBe('http://localhost:3000/register')
})

test('Submit register form with missing password', async ({ page }) => {
    await page.goto("http://localhost:3000/register");

    const seconds = new Date().getTime() / 1000;
    await page.fill('input[name="email"]', 'new_user' + seconds + '@abv.bg');
    await page.fill('input[name="confirm-pass"]', '1234567');


    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type().toContain('alert'));
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="register"]');
    expect(page.url()).toBe('http://localhost:3000/register')
})

test('Submit register form with missing confirm-password', async ({ page }) => {
    await page.goto("http://localhost:3000/register");

    const seconds = new Date().getTime() / 1000;
    await page.fill('input[name="email"]', 'new_user' + seconds + '@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type().toContain('alert'));
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="register"]');
    expect(page.url()).toBe('http://localhost:3000/register')
})

test('Submit register form with missing email', async ({ page }) => {
    await page.goto("http://localhost:3000/register");

    const seconds = new Date().getTime() / 1000;
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '1234567');

    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type().toContain('alert'));
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="register"]');
    expect(page.url()).toBe('http://localhost:3000/register')
})


test('Submit register form with non-matching passwords', async ({ page }) => {
    await page.goto("http://localhost:3000/register");
    const seconds = new Date().getTime() / 1000;
    await page.fill('input[name="email"]', 'new_user' + seconds + '@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '1234567');

    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type().toContain('alert'));
        expect(dialog.message()).toContain('Passwords don\'t match!');
        await dialog.accept();
    })
    await page.$('a[href="register"]');
    expect(page.url()).toBe('http://localhost:3000/register')
})