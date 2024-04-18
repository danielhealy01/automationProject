import puppeteer from 'puppeteer'
import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import sleep from './utils/sleep.js'

function absolutePathBuilder(relativeFilePath) {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)
    const absoluteFilePath = path.join(__dirname, relativeFilePath)
    return absoluteFilePath
}

async function scrollToBottom(page) {
    let prevHeight = await page.evaluate('document.body.scrollHeight')
    while (true) {
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
        await sleep()
        await sleep()
        const newHeight = await page.evaluate('document.body.scrollHeight')
        if (newHeight === prevHeight) {
            break
        }
        prevHeight = newHeight
    }
}

async function scrapeData(page) {
    return await page.evaluate(() => {
        const cards = document.querySelectorAll('.e19c29qe8')
        return Array.from(cards).map((card) => {
            const descriptionElement = card.querySelector('.eih2qak0')
            const viewCountElement = card.querySelector('.e148ts222')
            return {
                description: descriptionElement?.textContent.trim(),
                viewCount: viewCountElement?.textContent.trim(),
            }
        })
    })
}

async function writeToJSON(data, filePath) {
    try {
        const existingData = await fs.promises.readFile(filePath, 'utf-8')
        const parsedData = existingData ? JSON.parse(existingData) : []
        const updatedData = [...parsedData, ...data]
        await fs.promises.writeFile(
            filePath,
            JSON.stringify(updatedData, null, 2)
        )
    } catch (err) {
        if (err.code !== 'ENOENT') {
            console.error('Error writing to JSON file:', err)
        } else {
            await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2))
        }
    }
}

export async function run(url) {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--user-data-dir=./puppeteer_profile'],
    })
    const page = await browser.newPage()
    await page.goto(url)

    await scrollToBottom(page)
    const data = await scrapeData(page)

    const jsonFilePath = absolutePathBuilder('scraped_data.json')
    await writeToJSON(data, jsonFilePath)

    // await browser.close()
}

await run('https://www.tiktok.com/@alexniwata')
