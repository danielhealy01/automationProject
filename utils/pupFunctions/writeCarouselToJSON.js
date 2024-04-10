import { readFile, writeFile } from 'node:fs/promises'

export default async function writeCarouselToJSON(page, sessionID) {
    try {
        const selector = 'div[data-testid="conversation-turn-19"]'
        const reply = await page.waitForSelector(selector)
        const carousel = await reply.evaluate((el) => el.textContent)
        console.log('grabbed carousel inner text')

        const jsonData = {
            carouselID: Date.now(),
            sessionID,
            date: new Date()
                .toISOString()
                .replace(/T/, ' ')
                .replace(/\..+/, ''),
            carousel,
        }

        // Read existing data from the file
        let existingData = []
        try {
            const data = await readFile('carousels.json', 'utf-8')
            existingData = JSON.parse(data)
        } catch (error) {}

        existingData.push(jsonData)

        // Write the updated data back to the file
        await writeFile(
            'carousels.json',
            JSON.stringify(existingData, null, 2),
            'utf-8'
        )

        console.log('Carousel appended to carousels.json')
    } catch (error) {
        console.error('Error writing data:', error)
    }
}
