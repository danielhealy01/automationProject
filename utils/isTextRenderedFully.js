export default async function isTextRenderedFully(page, replyTurnSelector) {
    // Replace 'YOUR_SELECTOR_HERE' with the selector for the element where the response text appears

    await page.waitForSelector(replyTurnSelector, { visible: true })
    // Visibility true means on page, not just in code
    const isTextRendered = async () => {
        // Second arg is passed into the first arg arrow fn as an arg!
        const previousText = await page.evaluate((selector) => {
            const element = document.querySelector(selector)
            return element ? element.innerText : null
        }, replyTurnSelector)

        await page.waitForTimeout(2000)

        const currentText = await page.evaluate((selector) => {
            const element = document.querySelector(selector)
            return element ? element.innerText : null
        }, replyTurnSelector)

        return previousText === currentText
    }

    // Wait until the text has finished rendering
    // Waiting for prev text to === current text
    // implies no more changing
    while (!(await isTextRendered())) {
        await page.waitForTimeout(20000)
    }
}
