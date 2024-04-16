import { readFile, writeFile } from 'node:fs/promises'

export default async function writeVideoScriptToJSON(page, sessionID) {
    try {
        const selector = 'div[data-testid="conversation-turn-21"]' // change turn for each format
        const reply = await page.waitForSelector(selector)
        const videoScript = await reply.evaluate((el) => el.textContent)
        console.log('grabbed video script inner text')

        const jsonData = {
            videoScriptID: Date.now(),
            sessionID,
            date: new Date()
                .toISOString()
                .replace(/T/, ' ')
                .replace(/\..+/, ''),
            videoScript: videoScript.replace('ChatGPTChatGPT', ''),
        }

        // Read existing data from the file
        let existingData = []
        try {
            const data = await readFile('videoScripts.json', 'utf-8')
            existingData = JSON.parse(data)
        } catch (error) {}

        existingData.push(jsonData)

        // Write the updated data back to the file
        await writeFile(
            'videoScripts.json',
            JSON.stringify(existingData, null, 2),
            'utf-8'
        )

        console.log('Video script appended to carousels.json')
    } catch (error) {
        console.error('Error writing data:', error)
    }
}
