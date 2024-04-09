import { readFile, writeFile } from 'node:fs/promises'

export default async function writeThreadToJSON(page, sessionID) {
    try {
        const selector = 'div[data-testid="conversation-turn-17"]'
        const reply = await page.waitForSelector(selector)
        const thread = await reply.evaluate((el) => el.textContent)
        console.log('grabbed thread inner text')

        const jsonData = {
            threadID: Date.now(),
            sessionID,
            date: new Date()
                .toISOString()
                .replace(/T/, ' ')
                .replace(/\..+/, ''),
            thread,
        }

        // Read existing data from the file
        let existingData = []
        try {
            const data = await readFile('threads.json', 'utf-8')
            existingData = JSON.parse(data)
        } catch (error) {}

        existingData.push(jsonData)

        // Write the updated data back to the file
        await writeFile(
            'threads.json',
            JSON.stringify(existingData, null, 2),
            'utf-8'
        )

        console.log('Thread appended to threads.json')
    } catch (error) {
        console.error('Error writing data:', error)
    }
}
