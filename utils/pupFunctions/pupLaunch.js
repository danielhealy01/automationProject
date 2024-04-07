import Puppeteer from 'puppeteer'

export default async function pupLanuch() {
    //launch blank page and open new page
    // puppeteer.use(StealthPlugin())
    const browser = await Puppeteer.launch({
        headless: false,
        args: ['--user-data-dir=./puppeteer_profile'],
        // caches guest previous login cookies
    })
    const page = await browser.newPage()
    await page.goto('https://chat.openai.com')
}
