import fs from 'fs';
import path from 'path';
import { test } from '@playwright/test';
import { parse } from 'csv-parse/sync';
import {TestFormPage} from '../pages/testform';

const URL = "https://formsmarts.com/form/mfe?mode=h5";
let testform : TestFormPage;

const records = parse(fs.readFileSync('./myRecord.csv'), {
  columns: true,
  skip_empty_lines: true
});

test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    testform = new TestFormPage(page);
});

records.forEach(record => {
    test(`Customer: ${record.Firstname}` ,async ({ page }) => {
        await testform.fillFirstname(record.Firstname);
        await testform.fillLastname(record.Lastname);
        await testform.fillEmail(record.Email);
        await testform.selectCountry(record.Country);
        await testform.oneMonthCheck(record.OneMonthSubscript);
        await testform.sixMonthCheck(record.SixMonthSubscript);
        await testform.oneYearCheck(record.OneYearSubscript);
        await testform.checkClaim(record.ClaimTrial);
        await testform.clickConfirm();
        await testform.validCheck();
    });
});

// test('test', async ({ page }) => {
//     await page.goto('https://formsmarts.com/form/mfe?mode=h5');
//     await page.getByPlaceholder('Please enter your first name.').click();
//     await page.getByPlaceholder('Please enter your first name.').fill('Peera');
//     await page.getByPlaceholder('Please enter your last name.').click();
//     await page.getByPlaceholder('Please enter your last name.').fill('Kuldon');
//     await page.getByPlaceholder('Please enter a valid email').click();
//     await page.getByPlaceholder('Please enter a valid email').fill('Happ@email.com');
//     await page.getByLabel('Country:').selectOption('TZ');
//     await page.getByLabel('Country:').selectOption('ES');
//     await page.getByLabel('1-Month Subscription ($9.99').check()
//     await page.getByLabel('6-Month Subscription Save $7.').check();
//     await page.getByLabel('1-Year Subscription Save $20.').check();
//     await page.getByLabel('Claim a FREE 7-day Trial').check();
//     await page.getByLabel('Claim a FREE 7-day Trial').uncheck();
//     await page.getByRole('button', { name: 'Continue →' }).click();
//     await page.getByRole('button', { name: 'Confirm →' }).click();
//     const page1Promise = page.waitForEvent('popup');
//     await page.getByRole('button', { name: 'Proceed to Payment' }).click();
//     await page.getByRole('heading', { name: 'Subscription Form Demo' })
//   });