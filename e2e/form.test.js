import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('Card Validation Form', () => {
  let browser;
  let page;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeEach(async () => {
    server = fork(`${__dirname}/e2e.server.js`);

    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      // slowMo: 100,
      // headless: false,
    });
    page = await browser.newPage();
  });

  test('Card number validation is passed', async () => {
    await page.goto(baseUrl);

    const input = await page.$('#card-widget__input');
    const submit = await page.$('#submit');
    const isValid = await page.$('.is-valid');

    await input.type('4211039223820833');
    await submit.click();

    const result = await page.evaluate((el) => el.textContent, isValid);

    expect(result).toBe('Да');
  });

  test('Card number validation is NOT passed', async () => {
    await page.goto(baseUrl);

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
    server.kill();
  });
});
