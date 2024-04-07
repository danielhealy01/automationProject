import { firstPrompt } from './promptBuilder.js'
import sleep from '../sleep.js'

export async function sendFirstPrompt(page) {
    try {
        await sleep()
        await page.click('textarea#prompt-textarea')
        await sleep()
        await page.type('textarea#prompt-textarea', await firstPrompt())
        await sleep()
        await page.click('textarea#prompt-textarea')
        await sleep()
        // await page.click('button[data-testid="send-button"]')
        await sleep()
    } catch (error) {
        console.log(error)
    }
}
