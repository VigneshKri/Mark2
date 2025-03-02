import { test } from '@playwright/test'
import { PracticeFormPage } from "../main/page/PracticeFormPage"
test("Sample test", async ({ page }) => {
    const practiceFormPage = new PracticeFormPage(page)

    await page.goto("https://demoqa.com/automation-practice-form")
    await practiceFormPage.enterFirstName("Vignesh")
    await practiceFormPage.enterLastName("Krishnan")
    await practiceFormPage.enterEmail("abc@gamil.com")
    await page.close()
})