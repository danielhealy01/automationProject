// import puppeteer from 'puppeteer-extra'
// import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import Puppeteer from "puppeteer"
import pupLanuch from "./pupFunctions/pupLaunch.js"

export async function run() {
    await pupLanuch()
}

// If Dom bug, opening dev tools to mobile view and close resets