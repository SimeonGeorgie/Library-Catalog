const {test, expect} = require('@playwright/test');

//<span>Welcome, peter@abv.bg</span>
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

    await page.$('a[href="catalog"]');
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

test('Login and verify no books are displayed', async ( { page } ) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    const noBooksMessage = await page.textContent('.no-books');
    expect(noBooksMessage).toBe('No books in database!');
})

test('Add book with correct data', async ( { page } ) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    expect(page.url()).toBe('http://localhost:3000/create');

    await page.fill('#title', 'Test Book');
    await page.fill('#description', 'This is a test book description');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');

    await page.waitForURL('http://localhost:3000/catalog');
    expect(page.url()).toBe('http://localhost:3000/catalog');
})


test('Add book with empty title field', async ( { page } ) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    expect(page.url()).toBe('http://localhost:3000/create');

    await page.fill('#description', 'This is a test book description');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept()
    });
    await page.$('a[href="create"]');
    expect(page.url()).toBe('http://localhost:3000/create');
})


test('Add book with empty image field', async ( { page } ) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    expect(page.url()).toBe('http://localhost:3000/create');

    await page.fill('#title', 'Test Book');
    await page.fill('#description', 'This is a test book description');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept()
    });
    await page.$('a[href="create"]');
    expect(page.url()).toBe('http://localhost:3000/create');
})


test('Add book with empty description field', async ( { page } ) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    expect(page.url()).toBe('http://localhost:3000/create');

    await page.fill('#title', 'Test Book');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept()
    });
    await page.$('a[href="create"]');
    expect(page.url()).toBe('http://localhost:3000/create');
})

test('Login and verify all books are displayed', async ( { page } ) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);
    await page.waitForSelector("#dashboard-page");

    const bookElements = await page.$$('.other-books-list li')

    expect(bookElements.length).toBeGreaterThan(0)
})

test('Login and navigate to Details page', async ({ page}) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('a[href="/catalog"]');

    await page.waitForSelector('.otherBooks');

    await page.click('.otherBooks a.button');

    await page.waitForSelector('.book-information');
    
    const detailsPageTitle = await page.textContent('.book-information h3');

    expect(detailsPageTitle).toBe('Test Book');
})


test('Verify guest user sees Details button and works correctly', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');


    await page.click('a[href="/catalog"]');

    await page.waitForSelector('.otherBooks');

    await page.click('.otherBooks a.button');

    await page.waitForSelector('.book-information');
    
    const detailsPageTitle = await page.textContent('.book-information h3');

    expect(detailsPageTitle).toBe('Test Book');
})

test('Check all book information', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');


    await page.click('a[href="/catalog"]');

    await page.waitForSelector('.otherBooks');

    await page.click('.otherBooks a.button');

    await page.waitForSelector('.book-information');
    
    const detailsPageTitle = await page.textContent('.book-information h3');
    const bookType = await page.textContent('.book-information .type');

    const imgSrc = await page.getAttribute('.book-information > p.img > img', 'src');

    expect(bookType).toContain('Fiction')
    expect(detailsPageTitle).toBe('Test Book');
    expect(imgSrc).toContain('https://example.com/book-image.jpg')
})



test('Login check Details page buttons', async ({ page}) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('a[href="/catalog"]');

    await page.waitForSelector('.otherBooks');

    await page.click('.otherBooks a.button');

    await page.waitForSelector('.book-information');
    
    const detailsPageEdit = await page.textContent('.book-information .actions a.button');
    const expectedText = 'Edit';
    expect(detailsPageEdit).toContain(expectedText);
})