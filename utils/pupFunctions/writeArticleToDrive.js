import sleep from '../sleep.js'

export default async function writeArticleToDrive(page) {
    // try highlight text while still in claude 3

    await page.evaluate(() => {
        const textarea = document.querySelector('div .font-claude-message')

        // Set the selection range to select all text
        const range = document.createRange()
        range.selectNodeContents(textarea)
        const selection = window.getSelection()
        selection.removeAllRanges()
        selection.addRange(range)
        // deprecated, but only method that copies styling
        document.execCommand('copy')
    })

    await sleep()

    await page.goto('https://www.bbc.co.uk')

    // new tab to google drive
    // wait for selector button>new, click
    // wait for selector div>innertext Google Docs
    // wait for page
    // paste in correct way.
    // remove formating - (I think keeps the h1, h2 and spacing!)
    // try set google doc title, if not, default to ${topic} + 'article'
}
