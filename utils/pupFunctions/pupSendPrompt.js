import { firstPrompt, getNPrompt } from './promptBuilder.js'
import isTextRenderedFully from '../isTextRenderedFully.js'
import sleep, { longSleep, typeSleep } from '../sleep.js'

export async function sendFirstPrompt(page) {
    try {
        await sleep()
        await page.click('textarea#prompt-textarea')
        await sleep()
        // add delay option to mimic more realistic typing
        // random time between 0.2 and 0.8 for each keystroke sleep()
        await page.type('textarea#prompt-textarea', await firstPrompt(), {
            delay: await typeSleep(),
        })
        // Change name of firstPrompt() to getFirstPrompt()
        await sleep()
        await page.click('textarea#prompt-textarea')
        await sleep()
        // await page.click('button[data-testid="send-button"]')
        // await longSleep()
        // await isTextRenderedFully(
        //     page,
        //     'div[data-testid="conversation-turn-3"]'
        // )
    } catch (error) {
        console.log(error)
    }
}

// export async function sendNPrompt(page, promptNumber) {
//     try {
//         await sleep()
//         await page.click('textarea#prompt-textarea')
//         await sleep()
//         // add delay option to mimic more realistic typing
//         // random time between 0.2 and 0.8 for each keystroke sleep()
//         await page.type('textarea#prompt-textarea', await getNPrompt(promptNumber), {
//          delay: await typeSleep(),
//          })
//         // Change name of firstPrompt() to getFirstPrompt()
//         await sleep()
//         await page.click('textarea#prompt-textarea')
//         await sleep()
//         // await page.click('button[data-testid="send-button"]')
//         // await longSleep()
//         // await isTextRenderedFully(
//         //     page,
//         //     `div[data-testid="conversation-turn-${(promptNumber * 2) + 1}"]`
//         // )
//     } catch (error) {
//         console.log(error)
//     }
// }

// check reply[n] finished populating
// send reply[n]
