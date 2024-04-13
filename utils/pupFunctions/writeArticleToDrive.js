import sleep, { longSleep } from '../sleep.js'
import clipboard from 'clipboardy'

export default async function writeArticleToDrive(page) {
    // try highlight text while still in claude 3

    await page.evaluate(async() => {
        const textarea = document.querySelector('div .font-claude-message')

        // Set the selection range to select all text
        const range = document.createRange()
        range.selectNodeContents(textarea)
        const selection = window.getSelection()
        selection.removeAllRanges()
        selection.addRange(range)
        // deprecated, but only method that copies styling
        document.execCommand('copy')
        try {
            await clipboard.writeSync(selection)
        } catch (error) {
            console.log(error)
        }
    })

    await sleep()

    await page.goto(
        'https://docs.google.com/document/create?usp=drive_web&ouid=111731898747045148694&folder=10JegdF1l32KDZqy76qQSo70xU7ujoYsj'
    )
    await sleep()
    await page.click('.kix-canvas-tile-content')
    await sleep()

    // works no styles
    await page.keyboard.type(
        clipboard.readSync()
        // {
        //     delay: await typeSleep(),
        // }
    )
    await sleep()

    await page.click('.docs-title-input')
    await sleep()
    await page.click('.kix-canvas-tile-content')

    // wait for page
    // paste in correct way.
    // remove formating - (I think keeps the h1, h2 and spacing!)
    // try set google doc title, if not, default to ${topic} + 'article'
}
