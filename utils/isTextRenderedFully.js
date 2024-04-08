import sleep from "./sleep.js"

export default async function isTextRenderedFully(page, replyTurnSelector) {
  
    await page.waitForSelector(replyTurnSelector, { visible: true })
    // Visibility true means on page, not just in code
    async function check(page, replyTurnSelector) {
        // Second arg is passed into the first arg arrow fn as an arg!
        const previousText = await page.evaluate((selector) => {
            const element = document.querySelector(selector)
            return element ? element.innerText : null
        }, replyTurnSelector)

        // await page.waitForTimeout(2000)
        await sleep()

        const currentText = await page.evaluate((selector) => {
            const element = document.querySelector(selector)
            return element ? element.innerText : null
        }, replyTurnSelector)

        return previousText === currentText
    }

    // Wait until the text has finished rendering
    // Waiting for prev text to === current text
    // implies no more changing
    while (!(await check(page, replyTurnSelector))) {
        // await page.waitForTimeout(1000)
        console.log('ChatGPT still typing...')
        await sleep()
        //delay between checks
    }
    console.log('***ChatGPT has finished***')
    return await check(page, replyTurnSelector)
}
