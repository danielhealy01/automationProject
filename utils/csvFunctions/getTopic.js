// import fs from 'node:fs/promises'
// import csv from 'csv-parser'
// // const csv = require('csv-parser')
// import { fileURLToPath } from 'url'
// import { dirname, join } from 'path'

// // Create IF for csv not existing
// //Write test getTopic is working

// function absolutePathBuilder() {
//     const __filename = fileURLToPath(import.meta.url)
//     const __dirname = dirname(__filename)
//     const relativeFilePath = '../../data.csv' // Your relative file path
//     const absoluteFilePath = join(__dirname, relativeFilePath)
//     // console.log('Resolved absolute file path:', absoluteFilePath)
//     return absoluteFilePath
// }

// async function readCsvFile(filename) {
//     try {
//         const data = await fs.readFile(filename, 'utf8')
//         // console.log(`CSV read:
//         // ${data}`)
//         return data
//     } catch (error) {
//         // console.error('Error reading file:', error)
//     }
// }

// export default async function getTopic() {
//     const parsedData = await readCsvFile(absolutePathBuilder())
//     // CSV rows are delimited by '\n'
//     const rows = parsedData.trim().split('\n')
//     const firstRow = rows[1]
//     return firstRow
// }



import fs from 'node:fs/promises'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

function absolutePathBuilder() {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)
    const relativeFilePath = '../../data.json' // Your relative file path
    const absoluteFilePath = join(__dirname, relativeFilePath)
    return absoluteFilePath
}

export default async function getTopic() {
    try {
        const absoluteFilePath = absolutePathBuilder()
        const data = await fs.readFile(absoluteFilePath, 'utf8')
        const jsonData = JSON.parse(data)
        return jsonData[0].topic[0]
    } catch (error) {
        console.error('Error reading file:', error)
    }
}