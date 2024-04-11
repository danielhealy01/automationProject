import Puppeteer from 'puppeteer'
import sleep from './sleep.js'
import { getClaudePrompt } from './pupFunctions/promptBuilder.js'
import writeArticleToDrive from './pupFunctions/writeArticleToDrive.js'

export default async function exportArticle() {
    try {
        //open new puppeteer tab

        const browser = await Puppeteer.launch({
            headless: false,
            args: [
                '--user-data-dir=./puppeteer_profile',
                // '--background',
                // '--start-minimized',
            ],
            // get cached previous guest login cookies
        })

        const page = await browser.newPage()

        // later - refactor nested try catch...

        try {
            await page.goto('https://claude.ai/chats')
            await page.waitForSelector('div[contenteditable="true"]', {
                timeout: 10000,
            })
            console.log('Textarea loaded and interactive.')
            await sleep()
            // Clear existing text
            await page.evaluate(() => {
                const textarea = document.querySelector(
                    'div[contenteditable="true"]'
                )
                textarea.textContent = ''
            })
            await sleep()
            await page.type(
                'div[contenteditable="true"]',
                await getClaudePrompt(),
                // {
                //     delay: await typeSleep(),
                // }
            )
            await sleep()
            // check for button
            // await page.click('div[data-value="new chat"]')
            // await sleep()
            // await isClaudeTextRenderedFully(page)
            await writeArticleToDrive(page)
            console.log('check finished typing finished to here')
        } catch (error) {
            console.log(`Prompt input field did not load:
        ${error}
        `)
        }

    } catch (error) {
        console.log(error)
    }
}

async function isClaudeTextRenderedFully(page) {
    await page.waitForSelector('div .font-claude-message', {
        visible: true,
    })
    // Visibility true means on page, not just in code
    async function check(page) {
        // Second arg is passed into the first arg arrow fn as an arg!
        const previousText = await page.evaluate((selector) => {
            const element = document.querySelector(selector)
            return element ? element.innerText : null
        }, 'div .font-claude-message')

        // await page.waitForTimeout(2000)
        await sleep()

        const currentText = await page.evaluate((selector) => {
            const element = document.querySelector(selector)
            return element ? element.innerText : null
        }, 'div .font-claude-message')

        return previousText === currentText
    }

    // Wait until the text has finished rendering
    while (!(await check(page))) {
        console.log('Claude3 still typing...')
        await sleep()
    }
    console.log('***Claude3 has finished***')
    return await check(page)
}



await exportArticle()
