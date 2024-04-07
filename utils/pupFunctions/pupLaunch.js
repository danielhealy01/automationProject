export default async function pupLaunch(page) {
    try {
        await page.goto('https://chat.openai.com')
        await page.waitForSelector('textarea#prompt-textarea', {
            timeout: 10000,
        })
        console.log('Textarea loaded and interactive.')
        // await sendFirstPrompt(page)
    } catch (error) {
        console.log(`Prompt input field did not load:
        ${error}
        `)
    }
}
