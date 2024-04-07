// import puppeteer from 'puppeteer-extra'
// import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import Puppeteer from 'puppeteer'
import pupLaunch from './pupFunctions/pupLaunch.js'
// import { sendFirstPrompt } from './pupFunctions/pupSendPrompt.js'

export async function run() {
    await pupLaunch()
    // await sendFirstPrompt()
}

// If Dom bug, opening dev tools to mobile view and close resets
