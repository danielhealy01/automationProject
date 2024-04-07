import puppeteer from 'puppeteer'
;(async () => {
    //launch blank page and open new page
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto('https://developer.chrome.com/')
    await page.setViewport({ width: 1080, height: 1024 })
    await browser.close()
})()
