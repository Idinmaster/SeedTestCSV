import { type Page, type Locator, expect } from "@playwright/test";

export class TechlisticPage {
  readonly page: Page;
  readonly firstnameTextbox: Locator;
  readonly lastnameTextbox: Locator;
  readonly dateTextbox: Locator;
  readonly manualCheck: Locator;
  readonly automateCheck: Locator;
  readonly uftCheck: Locator;
  readonly protractorCheck: Locator;
  readonly seleniumCheck: Locator;
  readonly continentOption: Locator;
  readonly seleniumOption: Locator;
  readonly photoOption: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstnameTextbox = page.locator('input[name="firstname"]');
    this.lastnameTextbox = page.locator('input[name="lastname"]');
    this.dateTextbox = page.locator('#datepicker');
    this.manualCheck = page.locator('#profession-0');
    this.automateCheck = page.locator('#profession-1');
    this.uftCheck = page.locator('#tool-0');
    this.protractorCheck = page.locator('#tool-1');
    this.seleniumCheck = page.locator('#tool-2');
    this.continentOption = page.locator('#continents');
    this.seleniumOption = page.locator('#selenium_commands');
    this.photoOption = page.locator('#photo');
    this.submitButton = page.getByRole('button', { name: 'Button' });
  }

  async fillFirstname(firstname : string) {
    await this.firstnameTextbox.fill(firstname);
  }

  async fillLastname(lastname : string) {
    await this.lastnameTextbox.fill(lastname);
  }

  async selectGender(gender : string) {
    await this.page.locator('#sex-' + gender).check();
  }

  async selectYearOfExp(year : string) {
    await this.page.locator('#exp-' + year).check();
  }

  async fillDate(date : string) {
    await this.dateTextbox.fill(date);
  }

  async allCheckbox(manual:string,automate:string,uft:string,protrac:string,selenium:string) {
    if(manual == "TRUE"){
        await this.manualCheck.check();
    }
    if(automate == "TRUE"){
        await this.automateCheck.check();
    }
    if(uft == "TRUE"){
        await this.uftCheck.check();
    }
    if(protrac == "TRUE"){
        await this.protractorCheck.check();
    }
    if(selenium == "TRUE"){
        await this.seleniumCheck.check();
    }
  }

  async selectContinent(continent: string) {
    await this.continentOption.selectOption(continent);
  }
  async selectSelenium(selenium: string) {
    await this.seleniumOption.selectOption(selenium);
  }
  async selectPhoto(photo: string){
    await this.photoOption.setInputFiles(photo);
  }

  async submit(){
    await this.submitButton.click();
  }
}

export default TechlisticPage;