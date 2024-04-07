import fs from 'node:fs/promises'
import csv from 'csv-parser'
// const csv = require('csv-parser')
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Create IF for csv not existing

function absolutePathBuilder() {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)
    const relativeFilePath = '../../data.csv' // Your relative file path
    const absoluteFilePath = join(__dirname, relativeFilePath)
    console.log('Resolved absolute file path:', absoluteFilePath)
    return absoluteFilePath
}

async function readCsvFile(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8')

        // Process data here
        console.log(`CSV read:
        ${data}`)
    } catch (error) {
        console.error('Error reading file:', error)
    }
}
readCsvFile(absolutePathBuilder())
