import puppeteer from 'puppeteer';

describe('Card Validation Form', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      slowMo: 100,
      headless: false,
    });
    page = await browser.newPage();
  });

  test('Card number validation is passed', async () => {
    await page.goto('http://localhost:8084');

    const input = await page.$('#card-widget__input');
    const submit = await page.$('#submit');
    const isValid = await page.$('.is-valid');

    await input.type('4211039223820833');
    await submit.click();

    const result = await page.evaluate((el) => el.textContent, isValid);

    expect(result).toBe('Да');
  });

  test('Card number validation is NOT passed', async () => {
    await page.goto('http://localhost:8084');

    const input = await page.$('#card-widget__input');
    const submit = await page.$('#submit');
    const isValid = await page.$('.is-valid');

    await input.type('4211039223820835');
    await submit.click();

    const result = await page.evaluate((el) => el.textContent, isValid);

    expect(result).toBe('Нет');
  });

  afterEach(async () => {
    await browser.close();
  });
});
