import puppeteer from 'puppeteer'
import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import csv from 'fast-csv'
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
        const elements = document.querySelectorAll('.eih2qak0')
        return Array.from(elements).map((element) => element.textContent.trim())
    })
}

async function writeToCSV(data, filePath) {
    // Check if the CSV file already exists
    const csvExists = await new Promise((resolve) => {
        fs.access(filePath, fs.constants.F_OK, (err) => {
            resolve(!err)
        })
    })

    // Open the CSV file in append mode
    const csvStream = csv.format({ headers: true })
    const writableStream = fs.createWriteStream(filePath, { flags: 'a' })

    csvStream.pipe(writableStream)

    // Write the new data to the CSV file
    for (const item of data) {
        csvStream.write({ data: item })
    }

    csvStream.end()
    await new Promise((resolve) => writableStream.on('finish', resolve))

    // If the CSV file didn't exist before, write the headers
    if (!csvExists) {
        const headerRow = { data: data[0] }
        await writeToCSV([headerRow], filePath)
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

    const csvFilePath = absolutePathBuilder('scraped_data.csv')
    await writeToCSV(data, csvFilePath)

    // await browser.close()
}

run('https://www.tiktok.com/@alexniwata')

// import puppeteer from 'puppeteer'
// import fs from 'fs'
// import path, { dirname } from 'path'
// import { fileURLToPath } from 'url'
// import sleep from './utils/sleep.js'

// function absolutePathBuilder(relativeFilePath) {
//     const __filename = fileURLToPath(import.meta.url)
//     const __dirname = dirname(__filename)
//     const absoluteFilePath = path.join(__dirname, relativeFilePath)
//     return absoluteFilePath
// }

// async function scrollToBottom(page) {
//     let prevHeight = await page.evaluate('document.body.scrollHeight')
//     while (true) {
//         await page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
//         await sleep()
//         await sleep()
//         const newHeight = await page.evaluate('document.body.scrollHeight')
//         if (newHeight === prevHeight) {
//             break
//         }
//         prevHeight = newHeight
//     }
// }

// async function scrapeData(page) {
//     return await page.evaluate(() => {
//         const cards = document.querySelectorAll('.e19c29qe8')
//         return Array.from(cards).map((card) => {
//             const descriptionElement = card.querySelector('.eih2qak0')
//             const viewCountElement = card.querySelector('.e148ts222')
//             return {
//                 description: descriptionElement?.textContent.trim(),
//                 viewCount: viewCountElement?.textContent.trim(),
//             }
//         })
//     })
// }

// async function writeToJSON(data, filePath) {
//     try {
//         const existingData = await fs.promises.readFile(filePath, 'utf-8')
//         const parsedData = existingData ? JSON.parse(existingData) : []
//         const updatedData = [...parsedData, ...data]
//         await fs.promises.writeFile(
//             filePath,
//             JSON.stringify(updatedData, null, 2)
//         )
//     } catch (err) {
//         if (err.code !== 'ENOENT') {
//             console.error('Error writing to JSON file:', err)
//         } else {
//             await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2))
//         }
//     }
// }

// export async function run(url) {
//     const browser = await puppeteer.launch({
//         headless: false,
//         args: ['--user-data-dir=./puppeteer_profile'],
//     })
//     const page = await browser.newPage()
//     await page.goto(url)

//     await scrollToBottom(page)
//     const data = await scrapeData(page)

//     const jsonFilePath = absolutePathBuilder('scraped_data.json')
//     await writeToJSON(data, jsonFilePath)

//     // await browser.close()
// }

// await run('https://www.tiktok.com/@alexniwata')
