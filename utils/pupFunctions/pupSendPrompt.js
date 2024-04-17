import {
    firstPrompt,
    getNPrompt,
    getThreadFirstPrompt,
    getCarouselPrompt,
    getVideoScriptPrompt,
    getFAQPrompt,
} from './promptBuilder.js'
import isTextRenderedFully from '../isTextRenderedFully.js'
import sleep, { longSleep, typeSleep } from '../sleep.js'

export async function sendFirstPrompt(page, topic) {
    try {
        await sleep()
        await page.click('textarea#prompt-textarea')
        await sleep()
        await sleep()
        // Change name of firstPrompt() to getFirstPrompt()
        await page.type('textarea#prompt-textarea', await firstPrompt(topic), {
            delay: await typeSleep(),
        })
        await sleep()
        await page.click('textarea#prompt-textarea')
        await sleep()
        await page.click('button[data-testid="send-button"]')
        await longSleep()
        await isTextRenderedFully(
            page,
            'div[data-testid="conversation-turn-3"]'
        )
    } catch (error) {
        console.log(error)
    }
}

export async function sendNPrompt(page, promptNumber) {
    try {
        await sleep()
        await page.click('textarea#prompt-textarea')
        await sleep()
        // add delay option to mimic more realistic typing
        // random time between 0.2 and 0.8 for each keystroke sleep()
        await page.type(
            'textarea#prompt-textarea',
            await getNPrompt(promptNumber),
            {
                delay: await typeSleep(),
            }
        )
        await sleep()
        await page.click('textarea#prompt-textarea')
        await longSleep()
        await longSleep()
        await longSleep()
        await page.click('button[data-testid="send-button"]')
        await longSleep()
        console.log(`I think this is conversation turn ${promptNumber * 2 - 1}`)
        await isTextRenderedFully(
            page,
            `div[data-testid="conversation-turn-${promptNumber * 2 + 1}"]`
        )
    } catch (error) {
        console.log(error)
    }
}

export async function sendFirstThreadPrompt(page, promptNumber) {
    try {
        await sleep()
        await page.click('textarea#prompt-textarea')
        await sleep()
        // add delay option to mimic more realistic typing
        // random time between 0.2 and 0.8 for each keystroke sleep()
        await page.type(
            'textarea#prompt-textarea',
            await getThreadFirstPrompt()
        )
        await sleep()
        console.log('sleep end')
        await page.click('textarea#prompt-textarea')
        await sleep()
        await page.click('button[data-testid="send-button"]')
        await longSleep()
        console.log(`I think this is conversation turn ${promptNumber * 2 - 1}`)
        await isTextRenderedFully(
            page,
            `div[data-testid="conversation-turn-${promptNumber * 2 + 1}"]`
        )
    } catch (error) {
        console.log(error)
    }
}

export async function sendCarouselPrompt(page, promptNumber) {
    try {
        await sleep()
        await page.click('textarea#prompt-textarea')
        await sleep()
        // add delay option to mimic more realistic typing
        // random time between 0.2 and 0.8 for each keystroke sleep()
        await page.type('textarea#prompt-textarea', await getCarouselPrompt())
        await sleep()
        console.log('sleep end')
        await page.click('textarea#prompt-textarea')
        await sleep()
        await page.click('button[data-testid="send-button"]')
        await longSleep()
        console.log(`I think this is conversation turn ${promptNumber * 2 - 1}`)
        await isTextRenderedFully(
            page,
            `div[data-testid="conversation-turn-${promptNumber * 2 + 1}"]`
        )
    } catch (error) {
        console.log(error)
    }
}

export async function sendVideoScriptPrompt(page, promptNumber) {
    try {
        await sleep()
        await page.click('textarea#prompt-textarea')
        await sleep()
        // add delay option to mimic more realistic typing
        // random time between 0.2 and 0.8 for each keystroke sleep()
        await page.type(
            'textarea#prompt-textarea',
            await getVideoScriptPrompt()
        )
        await sleep()
        console.log('sleep end')
        await page.click('textarea#prompt-textarea')
        await sleep()
        await page.click('button[data-testid="send-button"]')
        await longSleep()
        console.log(`I think this is conversation turn ${promptNumber * 2 - 1}`)
        await isTextRenderedFully(
            page,
            `div[data-testid="conversation-turn-${promptNumber * 2 + 1}"]`
        )
    } catch (error) {
        console.log(error)
    }
}

export async function sendFAQPrompt(page, promptNumber) {
    try {
        await sleep()
        await page.click('textarea#prompt-textarea')
        await sleep()
        // add delay option to mimic more realistic typing
        // random time between 0.2 and 0.8 for each keystroke sleep()
        await page.type('textarea#prompt-textarea', await getFAQPrompt())
        await sleep()
        console.log('sleep end - faq gen start')
        await page.click('textarea#prompt-textarea')
        await sleep()
        await page.click('button[data-testid="send-button"]')
        await longSleep()
        console.log(`I think this is conversation turn ${promptNumber * 2 - 1}`)
        await isTextRenderedFully(
            page,
            `div[data-testid="conversation-turn-${promptNumber * 2 + 1}"]`
        )
    } catch (error) {
        console.log(error)
    }
}
