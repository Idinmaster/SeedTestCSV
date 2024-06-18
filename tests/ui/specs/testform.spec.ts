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
    test.describe(`Viewport 1280 x 720: ${record.Firstname}`,() => {
        test.use({viewport:{width:1280,height:720}})
        test(`Customer: ${record.Firstname}` ,async ({ page }) => {
            await testform.fillAll(record.Firstname,record.Lastname,record.Email,record.Country,
                record.OneMonthSubscript,record.SixMonthSubscript,record.OneYearSubscript,record.ClaimTrial
            )
            await testform.clickContinue();
            await testform.clickConfirm();
            await testform.validCheck();
        });
    });
    test.describe(`Viewport 1024 x 576: ${record.Firstname}`,() => {
        test.use({viewport:{width:1024,height:576}})
        test(`Customer: ${record.Firstname}` ,async ({ page }) => {
            await testform.fillAll(record.Firstname,record.Lastname,record.Email,record.Country,
                record.OneMonthSubscript,record.SixMonthSubscript,record.OneYearSubscript,record.ClaimTrial
            )
            await testform.clickContinue();
            await testform.clickConfirm();
            await testform.validCheck();
        });
    });
    test.describe(`Viewport 640 x 398: ${record.Firstname}`,() => {
        test.use({viewport:{width:640,height:398}})
        test(`Customer: ${record.Firstname}` ,async ({ page }) => {
            await testform.fillAll(record.Firstname,record.Lastname,record.Email,record.Country,
                record.OneMonthSubscript,record.SixMonthSubscript,record.OneYearSubscript,record.ClaimTrial
            )
            await testform.clickContinue();
            await testform.clickConfirm();
            await testform.validCheck();
        });
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
