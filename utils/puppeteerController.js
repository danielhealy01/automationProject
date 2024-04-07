// import puppeteer from 'puppeteer-extra'
// import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import Puppeteer from 'puppeteer'
import pupLaunch from './pupFunctions/pupLaunch.js'
import { sendFirstPrompt } from './pupFunctions/pupSendPrompt.js'

export async function run() {
    const browser = await Puppeteer.launch({
        headless: false,
        args: ['--user-data-dir=./puppeteer_profile'],
        // caches guest previous login cookies
    })

    const page = await browser.newPage()
    await pupLaunch(page)
    await sendFirstPrompt(page)
}

// If Dom bug, opening dev tools to mobile view and close resets
