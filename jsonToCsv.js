import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'

function absolutePathBuilder(fileNamePath) {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)
    const relativeFilePath = `/${fileNamePath}` // Your relative file path
    const absoluteFilePath = join(__dirname, relativeFilePath)
    // console.log('Resolved absolute file path:', absoluteFilePath);
    return absoluteFilePath
}

const scrapedDataFile = absolutePathBuilder('scraped_data.json')
const translatedDataFile = absolutePathBuilder('translatedData.csv')

// console.log(jsonFilePath)
function readFile() {
    // Read the JSON file
    fs.readFile(scrapedDataFile, 'utf8', (err, jsonData) => {
        if (err) {
            console.error('Error reading the JSON file:', err)
            return
        }

        try {
            // Parse the JSON data
            const data = JSON.parse(jsonData)
            // console.log(data)

            // // Convert the JSON data to CSV format
            const csvData = convertToCSV(data)

            // Write the CSV data to a file
            fs.writeFile(translatedDataFile, csvData, (err) => {
                if (err) {
                    console.error('Error writing the CSV file:', err)
                } else {
                    console.log('CSV file created successfully.')
                }
            })
        } catch (err) {
            console.error('Error parsing the JSON file:', err)
        }
    })

}

// Function to convert JSON data to CSV format
function convertToCSV(data) {
    const rows = []

    // Add header row
    rows.push('"viewCount","description"')

    // Add data rows
    data.forEach((item) => {
        const viewCount = item.viewCount
        const description = item.description
            ? `"${item.description.replace(/"/g, '""')}"`
            : '""'
        rows.push(`${viewCount},${description}`)
    })

    return rows.join('\n')
}

readFile()