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