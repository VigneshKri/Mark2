import { PracticeFormLocators } from "../locators/PracticeFormLocators.js";
class PracticeFormPage {
    constructor(page) {
        this.page = page
        this.firstName = page.locator(PracticeFormLocators.firstName);
        this.lastName = page.locator(PracticeFormLocators.lastName);
        this.email = page.locator(PracticeFormLocators.email);
    }

    //Now the locators are loaded
    //write methods to send keys and all
    async enterFirstName(name) {
        await this.firstName.fill(name);
    }

    async enterLastName(name) {
        await this.lastName.fill(name)
    }

    async enterEmail(email) {
        await this.email.fill(email)
    }
}
module.exports = { PracticeFormPage }