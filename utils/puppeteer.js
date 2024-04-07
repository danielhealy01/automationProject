import puppeteer from 'puppeteer'
export async function run() {
    //launch blank page and open new page
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--user-data-dir=./puppeteer_profile'],
    })
    const page = await browser.newPage()
    await page.goto('https://chat.openai.com')
    await page.setViewport({ width: 1080, height: 1024 })
}
