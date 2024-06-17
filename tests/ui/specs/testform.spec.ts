import fs from 'fs';
import path from 'path';
import { expect, test } from '@playwright/test';
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
        await testform.clickContinue();
        await testform.clickConfirm();
        await testform.validCheck();
    });
});

test.describe("validate check for fail",() => {
    test('Unfill requirement', async ({ page }) => {
        await testform.clickContinue();
        await expect(page.getByText('Letters, spaces and "-" only.').first()).toHaveText('Letters, spaces and "-" only.');
        await expect(page.getByText('Letters, spaces and "-" only.').nth(1)).toHaveText('Letters, spaces and "-" only.');
        await expect(page.getByText('Email address, like alice@')).toHaveText('Email address, like alice@example.com.');
    });
    test('invalid char on first and last name', async ({ page }) => {
        await testform.fillFirstname("1234");
        await testform.fillLastname("!@&*");
        await testform.fillEmail("test@email.com")
        await testform.clickContinue();
        await expect(page.getByText('Letters, spaces and "-" only.').first()).toHaveText('Letters, spaces and "-" only.');
        await expect(page.getByText('Letters, spaces and "-" only.').nth(1)).toHaveText('Letters, spaces and "-" only.');
    });
    test('wrong email format', async ({ page }) => {
        await testform.fillFirstname("alice");
        await testform.fillLastname("turtle");
        await testform.fillEmail("teste.c")
        await testform.clickContinue();
        await expect(page.getByText('Email address, like alice@')).toHaveText('Email address, like alice@example.com.');
    });
  });
