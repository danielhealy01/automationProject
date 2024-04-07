import Puppeteer, { connect } from 'puppeteer'
import { firstPrompt } from './promptBuilder.js'

export async function sendFirstPrompt() {
    try {
        await page.click('textarea#prompt-textarea');
        await page.type('textarea#prompt-textarea', 'hello world')
    }
    catch (error) {
        console.log(error)
    }
}
