// import puppeteer from 'puppeteer-extra'
// import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import Puppeteer from 'puppeteer'
import pupLaunch from './pupFunctions/pupLaunch.js'
import { sendFirstPrompt, sendNPrompt } from './pupFunctions/pupSendPrompt.js'

export async function run() {
    const browser = await Puppeteer.launch({
        headless: false,
        args: ['--user-data-dir=./puppeteer_profile'],
        // get cached previous guest login cookies
    })
    let promptNumber = 1
    const page = await browser.newPage()
    await pupLaunch(page)
    await sendFirstPrompt(page)
    promptNumber++
    while (promptNumber < 8) {
        await sendNPrompt(page, promptNumber)
        promptNumber++
    }
    console.log('finished to here')
}

// If Dom bug, opening dev tools to mobile view and close resets
