import { type Page, type Locator, expect } from "@playwright/test";

export class TestFormPage {
  readonly page: Page;
  readonly firstnameTextbox: Locator;
  readonly lastnameTextbox: Locator;
  readonly emailTextbox: Locator;
  readonly countryOption: Locator;
  readonly oneMonthSubscript: Locator;
  readonly sixMonthSubscript: Locator;
  readonly oneYearSubscript: Locator;
  readonly claimCheck: Locator;
  readonly continueButton: Locator;
  readonly confirmButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstnameTextbox = page.getByPlaceholder('Please enter your first name.');
    this.lastnameTextbox = page.getByPlaceholder('Please enter your last name.');
    this.emailTextbox = page.getByPlaceholder('Please enter a valid email');
    this.countryOption = page.getByLabel('Country:');
    this.oneMonthSubscript = page.getByLabel('1-Month Subscription ($9.99');
    this.sixMonthSubscript = page.getByLabel('6-Month Subscription Save $7.');
    this.oneYearSubscript = page.getByLabel('1-Year Subscription Save $20.');
    this.claimCheck = page.getByLabel('Claim a FREE 7-day Trial');
    this.continueButton = page.getByRole('button', { name: 'Continue →' });
    this.confirmButton = page.getByRole('button', { name: 'Confirm →' });
  }

  async fillFirstname(firstname : string) {
    await this.firstnameTextbox.fill(firstname);
  }

  async fillLastname(lastname : string) {
    await this.lastnameTextbox.fill(lastname);
  }

  async fillEmail(email : string) {
    await this.emailTextbox.fill(email);
  }

  async selectCountry(country : string) {
    await this.countryOption.selectOption(country);
  }

  async oneMonthCheck(check : string) {
    if(check == "TRUE"){
        await this.oneMonthSubscript.check();
    }
  }
  async sixMonthCheck(check : string) {
    if(check == "TRUE"){
        await this.sixMonthSubscript.check();
    }
  }
  async oneYearCheck(check : string) {
    if(check == "TRUE"){
        await this.oneYearSubscript.check();
    }
  }

  async checkClaim(check : string) {
    if(check == "TRUE"){
        await this.claimCheck.check();
    }
  }

  async clickContinue(){
    await this.continueButton.click();
  }
  async clickConfirm(){
    await this.confirmButton.click();
  }

  async validCheck(){
    await expect(this.page.getByRole('heading', { name: 'Subscription Form Demo' })).toHaveText('Subscription Form Demo');
  }
}

export default TestFormPage;