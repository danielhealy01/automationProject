// Must not do more than 25 JSON requests per hour. (accidentally did 24 hours ha)

// change to better reflect limits
// need to do seperate downlaod and request max


import dotenv from 'dotenv'
import fs from 'node:fs'
import path from 'node:path'
import sleep from './utils/sleep.js'

dotenv.config({ path: `.env/.env.${process.env.NODE_ENV || 'dev'}` })

const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY
const MAX_COUNT_PER_DAY = 125

const perPage = 30
// const UNSPLASH_API_URL = 'https://api.unsplash.com/photos/random'
const PHOTOS_DIR = 'downloaded_photos'

const headers = {
    Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
    'Accept-Version': 'v1',
    'Content-Type': 'application/json',
}

function fileExists(filePath) {
    try {
        return fs.existsSync(filePath)
    } catch (err) {
        console.error('Error checking file existence:', err)
        return false
    }
}

async function downloadImage(imageUrl, imageName, photosDir) {
    const response = await fetch(imageUrl)
    const buffer = await response.arrayBuffer()
    const imageBuffer = Buffer.from(buffer)
    const filePath = path.join(photosDir, imageName)
    try {
        fs.writeFileSync(filePath, imageBuffer)
        console.log(`Downloaded image: ${imageName}`)
    } catch (err) {
        console.error('Error downloading image:', err)
    }
}

let counterData = {
    lastUpdated: null,
    lastUpdatedReadable: null,
    downloadCount: 0,
    requestCount: 0,
}

function getCounterData() {
    try {
        const data = fs.readFileSync('counter.json', 'utf-8')
        counterData = JSON.parse(data)[0]
    } catch (error) {
        // If the file doesn't exist or is empty, use the default values
    }
}

function updateCounterData() {
    counterData.lastUpdatedReadable = new Date(
        counterData.lastUpdated
    ).toLocaleString()
    fs.writeFileSync(
        'counter.json',
        JSON.stringify([counterData], null, 2),
        'utf-8'
    )
}

function incrementCounter(type) {
    getCounterData()

    const now = new Date()
    const lastUpdated = counterData.lastUpdated
        ? new Date(counterData.lastUpdated)
        : null

    // Check if it's a new day
    if (lastUpdated && now.getDate() !== lastUpdated.getDate()) {
        // Reset the counters
        counterData.downloadCount = 0
        counterData.requestCount = 0
    }

    // Check if the counter has been updated within the last 24 hours
    if (
        lastUpdated &&
        now.getTime() - lastUpdated.getTime() < 24 * 60 * 60 * 1000
    ) {
        // Check if the counter has reached the daily limit
        if (
            (type === 'download' &&
                counterData.downloadCount >= MAX_COUNT_PER_DAY) ||
            (type === 'request' &&
                counterData.requestCount >= MAX_COUNT_PER_DAY)
        ) {
            console.log(
                `Sorry, the ${type} counter has reached the daily limit of ${MAX_COUNT_PER_DAY}.`
            )
            return
        }
    }

    if (type === 'download') {
        counterData.downloadCount++
        console.log(
            `download counter increased ${counterData.downloadCount}/${MAX_COUNT_PER_DAY}`
        )
    } else if (type === 'request') {
        counterData.requestCount++
        console.log(
            `request counter increased ${counterData.requestCount}/${MAX_COUNT_PER_DAY}`
        )
    }

    counterData.lastUpdated = now.toISOString()
    updateCounterData()
}

async function fetchAndDownloadImages(pageN, query, orientation, photosDir) {
    try {
        const UNSPLASH_API_URL = `https://api.unsplash.com/search/photos?query=${query}&orientation=${orientation}&order_by=latest&per_page=${perPage}&page=${pageN}`
        const response = await fetch(`${UNSPLASH_API_URL}`, {
            headers: headers,
        })
        const data = await response.json()
        const results = data.results

        // Increase request counter
        incrementCounter('request')
        if (!Array.isArray(results)) {
            console.log(
                'not returning iterable image download list. Aborting to mitigate flooding requests. Check API key maybe.'
            )
            process.exit(1)
        }
        for (const el of results) {
            const imageUrl = el.urls.regular
            const imageName = `${el.slug}.jpg`
            const filePath = path.join(photosDir, imageName)

            if (!fileExists(filePath)) {
                await sleep(1000) // Wait for 1 second
                await downloadImage(imageUrl, imageName, photosDir)
                // Increase download counter for each download
                incrementCounter('download')
            } else {
                console.log(
                    `Image ${imageName} already exists, skipping download.`
                )
            }
        }
    } catch (err) {
        console.error('Error fetching and downloading images:', err)
    }
}

export default async function forEachPageFetchAndDownload(
    query,
    orientation = 'portrait'
) {
    getCounterData()
    const PHOTOS_DIR =
        orientation === 'portrait'
            ? 'downloaded_photos'
            : 'downloaded_landscape_photos'

    // Create the photos directory if it doesn't exist
    if (!fs.existsSync(PHOTOS_DIR)) {
        fs.mkdirSync(PHOTOS_DIR)
    }

    for (let pageN = 1; pageN < 100000; pageN++) {
        if (
            counterData.downloadCount < MAX_COUNT_PER_DAY &&
            counterData.requestCount < MAX_COUNT_PER_DAY
        ) {
            console.log(`
            -----------------------------------------------------
            ***** Searching for ${orientation} images of ${query}. *****
            -----------------------------------------------------
            `)
            console.log(`***** Starting downloads from page ${pageN}... *****`)
            await sleep()
            await fetchAndDownloadImages(pageN, query, orientation, PHOTOS_DIR)
        } else {
            console.log(`can't scrape page ${pageN}. At the limit for today.`)
            return
        }
    }
}

await forEachPageFetchAndDownload('osaka', 'landscape')
