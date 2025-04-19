import { expect, test } from '@playwright/test'
import { PracticeFormPage } from "../main/page/PracticeFormPage.js"

test("Sample test", async ({ page }) => {
    const practiceFormPage = new PracticeFormPage(page)

    await page.goto("https://demoqa.com/automation-practice-form")
    await practiceFormPage.enterFirstName("Vignesh")
    await practiceFormPage.enterLastName("Krishnan")
    await practiceFormPage.enterEmail("abc@gmail.com")
    await page.close()
})

test('Sample test 2', async ({ page }) => {
    await page.goto("https://ufc.com/")
    const text = await page.getByText('Events').innerText()
    console.log(text)
    expect(text).toBe("EVENTS")
    expect(await page.getByText('Events').isVisible()).toBeTruthy()
    await page.close()

})


test("Negative Login Test", async ({ page }) => {
    await page.goto("https://qa-practice.netlify.app/")
    await page.locator("//a[@id='forms' and text()='Forms']").click()
    await page.locator("//ul[@id='homeSubmenu']/descendant::a[@id='login']").click()
    const text = await page.locator("//div[@id='loginSection']/descendant::h2").innerText()
    expect(text).toBe("Login - Shop")
    await page.locator("//input[@id='email']").fill("abc.gmail.com")
    await page.locator("//input[@id='password']").fill("123456")
    await page.locator("//button[@id='submitLoginBtn']").click()
    const errorMesssage = await page.locator("//div[@id='message' and @role='alert']").innerText()
    expect(errorMesssage).toBe("Bad credentials! Please try again! Make sure that you've registered.")
    await page.close()
})


test("Positive Login Test", async ({ page }) => {
    const baseURL = "https://qa-practice.netlify.app/"
    const forms = "//a[@id='forms' and text()='Forms']"
    const loginForm = "//ul[@id='homeSubmenu']/descendant::a[@id='login']"
    const email = "//input[@id='email']"
    const password = "//input[@id='password']"
    const submitButton = "//button[@id='submitLoginBtn']"
    const errorMessage = "//div[@id='message' and @role='alert']"

    await page.goto(baseURL)
    await page.locator(forms).click()
    await page.locator(loginForm).click()
    const text = await page.locator("//div[@id='loginSection']/descendant::h2").innerText()
    expect(text).toBe("Login - Shop")
    await page.locator(email).fill("admin@admin.com")
    await page.locator(password).fill("admin123")
    await page.locator(submitButton).click()

    expect(await page.locator(errorMessage).isVisible()).toBeFalsy()
    const successMessage = await page.locator("//div[@id='prooood']/descendant::h2").innerText()
    expect(successMessage).toBe('SHOPPING CART')
    expect(await page.locator("//button[text()='PROCEED TO CHECKOUT']").isVisible()).toBeTruthy()
    expect(await page.locator("#Log Out").isVisible).toBeTruthy()
})

test('Speed test', async ({ page }) => {
    await page.goto("https://thelab.boozang.com/")
    await page.locator("//div[@class='menu_btn']/child::button").click()
    await page.getByText('Speed Game').click()
    const introMessage = await page.locator('//section[@class="intro_section"]/child::h1').innerText()
    expect(introMessage).toBe("Speed Game")

    const startGame = page.locator("//button[@class='form_btn add' and text()='Start Game']")
    const endGame = page.locator("//button[@class='form_btn delete' and text()='End Game']")
    const successMessage = page.locator("//div[@class='result_wrapper show']/descendant::p[@data-testid='message']")
    const reactionTime = page.locator("//div[@class='result_wrapper show']/descendant::p[@class='sub_message']")

    await startGame.click()
    await endGame.click()
    const message = await successMessage.innerText()
    expect(message).toBe("Success")
    expect(message).not.toBe("Succsss")
    const reactionTimeText = await reactionTime.innerText()
    console.log(reactionTimeText)
})

test('Rest API Test', async ({ page }) => {
    const response = await page.request.get('https://jsonplaceholder.typicode.com/posts/1')
    const responseBody = await response.json()
    console.log(responseBody)
})

test('API test', async ({ page }) => {
    const response1 = await page.request.get('https://jsonplaceholder.typicode.com/posts')
    const ans = await response1.json()
    console.log(ans)
    expect(response1.status()).toBe(200)
    expect(response1.ok()).toBeTruthy()
    expect(ans[0].userId).toBe(1)
})