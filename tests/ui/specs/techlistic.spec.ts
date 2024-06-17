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
