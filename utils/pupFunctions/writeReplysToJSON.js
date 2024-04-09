// import { writeFile } from 'node:fs/promises'

// export default async function writeReplysToJSON(page) {
//     try {
//         const selectors = [
//             // Each of chatGPTs reply divs
//             'div[data-testid="conversation-turn-3"]',
//             'div[data-testid="conversation-turn-5"]',
//             'div[data-testid="conversation-turn-7"]',
//             'div[data-testid="conversation-turn-9"]',
//             'div[data-testid="conversation-turn-11"]',
//             'div[data-testid="conversation-turn-13"]',
//             'div[data-testid="conversation-turn-15"]',
//         ]
//         // Promise all to wait for fulfilled state for each selectors text
//         const conversations = await Promise.all(
//             selectors.map(async (selector) => {
//                 // reply is the div that holds the reply
//                 const reply = await page.waitForSelector(selector)
//                 const text = await reply.evaluate((node) => node.textContent)
//                 return text
//             })
//         )
//         // destructures to jsonData.conversations:conversations[] from above
//         const jsonData = { conversations }

//         await writeFile(
//             'conversations.json',
//             JSON.stringify(jsonData, null, 2),
//             'utf-8'
//         )
//         console.log('Conversations saved to conversations.json')
//     } catch (error) {
//         console.error('Error writing data:', error)
//     }
// }

import { readFile, writeFile } from 'node:fs/promises'

export default async function writeReplysToJSON(page, sessionID) {
    try {
        const selectors = [
            'div[data-testid="conversation-turn-3"]',
            'div[data-testid="conversation-turn-5"]',
            'div[data-testid="conversation-turn-7"]',
            'div[data-testid="conversation-turn-9"]',
            'div[data-testid="conversation-turn-11"]',
            'div[data-testid="conversation-turn-13"]',
            'div[data-testid="conversation-turn-15"]',
        ]

        const conversations = await Promise.all(
            selectors.map(async (selector) => {
                const reply = await page.waitForSelector(selector)
                const text = await reply.evaluate((node) => node.textContent)
                return text
            })
        )

        const jsonData = {
            articleID: Date.now(),
            sessionID,
            date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            conversations,
        }

        // Read existing data from the file
        let existingData = []
        try {
            const data = await readFile('conversations.json', 'utf-8')
            existingData = JSON.parse(data)
        } catch (error) {
        }

        existingData.push(jsonData)

        // Write the updated data back to the file
        await writeFile(
            'conversations.json',
            JSON.stringify(existingData, null, 2),
            'utf-8'
        )

        console.log('Conversations appended to conversations.json')
    } catch (error) {
        console.error('Error writing data:', error)
    }
}