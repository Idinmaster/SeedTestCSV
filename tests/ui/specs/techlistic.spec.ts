import fs from 'fs';
import path from 'path';
import { expect, test } from '@playwright/test';
import { parse } from 'csv-parse/sync';
import {TechlisticPage} from '../pages/techlistic';

const URL = "https://www.techlistic.com/p/selenium-practice-form.html";
let techlistic : TechlisticPage;

const records2 = parse(fs.readFileSync('./myRecord2.csv'), {
  columns: true,
  skip_empty_lines: true
});

test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    techlistic = new TechlisticPage(page);
});

records2.forEach(record => {
    test(`User: ${record.Lastname}` ,async ({ page }) => {
        await techlistic.fillFirstname(record.Firstname);
        await techlistic.fillLastname(record.Lastname);
        await techlistic.selectGender(record.Gender);
        await techlistic.selectYearOfExp(record.YearOfExp);
        await techlistic.fillDate(record.Date);
        await techlistic.allCheckbox(record.Manual,record.Automate,record.Uft,record.Protrac,record.Selenium);
        await techlistic.selectContinent(record.Continent);
        await techlistic.selectSelenium(record.SelectSelenium);
        await techlistic.selectPhoto(record.Photo);
        await techlistic.submit();
    });
});

// test('test', async ({ page }) => {
//     await page.goto('https://www.techlistic.com/p/selenium-practice-form.html');
//     await page.locator('input[name="firstname"]').click();
//     await page.locator('input[name="firstname"]').fill('Good');
//     await page.locator('input[name="lastname"]').click();
//     await page.locator('input[name="lastname"]').fill('Morning');
//     await page.locator('#sex-0').check();
//     await page.locator('#sex-1').check();
//     await page.locator('#exp-0').check();
//     await page.locator('#exp-6').check();
//     await page.getByText('Years of Experience 1 2 3 4 5 6').click();
//     await page.locator('#datepicker').click();
//     await page.locator('#datepicker').fill('12/01/2548');
//     await page.locator('#profession-0').check();
//     await page.locator('#profession-1').check();
//     await page.locator('#tool-0').check();
//     await page.locator('#tool-1').check();
//     await page.locator('#tool-2').check();
//     await page.locator('#continents').selectOption('North America');
//     await page.locator('#continents').selectOption('Asia');
//     await page.locator('#selenium_commands').selectOption('WebElement Commands');
//     await page.locator('#selenium_commands').selectOption('Browser Commands');
//     await page.locator('#photo').click();
//     await page.locator('#photo').setInputFiles('RhythianLogo.ico');
//     await page.getByRole('button', { name: 'Button' }).click();
//     await page.getByRole('link', { name: 'Click here to Download File' }).click();
//     await page.frameLocator('[id="google_ads_iframe_\\/1254144\\,22662382379\\/techlistic_com-pixel1_0"]').frameLocator('iframe[name="ad_iframe"]').getByLabel('Close ad').click();
//   });
