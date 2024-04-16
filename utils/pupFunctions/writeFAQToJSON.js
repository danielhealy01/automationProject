import { readFile, writeFile } from 'node:fs/promises'

export default async function writeFAQToJSON(page, sessionID) {
    try {
        const selector = 'div[data-testid="conversation-turn-23"]' // change turn for each format
        const reply = await page.waitForSelector(selector)
        const faq = await reply.evaluate((el) => el.textContent)
        console.log('grabbed faq inner text')

        const jsonData = {
            faqID: Date.now(),
            sessionID,
            date: new Date()
                .toISOString()
                .replace(/T/, ' ')
                .replace(/\..+/, ''),
            faq: faq.replace('ChatGPTChatGPT', ''),
        }

        // Read existing data from the file
        let existingData = []
        try {
            const data = await readFile('faqs.json', 'utf-8')
            existingData = JSON.parse(data)
        } catch (error) {}

        existingData.push(jsonData)

        // Write the updated data back to the file
        await writeFile(
            'faqs.json',
            JSON.stringify(existingData, null, 2),
            'utf-8'
        )

        console.log('faqs appended to faqs.json')
    } catch (error) {
        console.error('Error writing data:', error)
    }
}
