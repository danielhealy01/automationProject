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
    
    try {
        await page.goto('https://chat.openai.com')
        await page.waitForSelector('textarea#prompt-textarea', {
            timeout: 10000,
        })
        console.log('Textarea loaded and interactive.')
    } catch (error) {
        console.log(`Prompt input field did not load:
        ${error}
        `)
    }
}
