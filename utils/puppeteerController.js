// import puppeteer from 'puppeteer-extra'
// import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import Puppeteer from 'puppeteer'
import pupLaunch from './pupFunctions/pupLaunch.js'
import {
    sendFirstPrompt,
    sendFirstThreadPrompt,
    sendNPrompt,
    sendCarouselPrompt,
} from './pupFunctions/pupSendPrompt.js'
import writeReplysToJSON from './pupFunctions/writeReplysToJSON.js'
import writeThreadToJSON from './pupFunctions/writeThreadToJSON.js'

export async function run() {
    const sessionID = Date.now()
    const browser = await Puppeteer.launch({
        headless: false,
        args: [
            '--user-data-dir=./puppeteer_profile',
            // '--background',
            // '--start-minimized',
        ],
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
    await writeReplysToJSON(page, sessionID)
    await sendFirstThreadPrompt(page, promptNumber)
    await writeThreadToJSON(page, sessionID)
    await sendCarouselPrompt(page, promptNumber)
    console.log('finished to here')
}

// If Dom bug, opening dev tools to mobile view and close resets
