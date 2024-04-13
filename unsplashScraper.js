// queries first page of portrait latest japan images and downloads the first image.
// save by slug isntead of id
// for of array to save one by one with sleep
// Must not do more than 25 JSON requests per hour. (accidentally did 24 hours ha)
// Have sleep() between requests and downloads

// change to better reflect limits

// while loop
    // while under hourly request limit, loop function through pages
    // do pagination!

import fs from 'node:fs'
import path from 'node:path'
import sleep from './utils/sleep.js'

// let requestCount = 0
// let downloadCount = 0
const MAX_COUNT_PER_DAY = 25

const query = 'japan'
const page = 3
const perPage = 30
const UNSPLASH_API_KEY = '31HwuKogPouWKWxbmWxzLtj2mr4Jqy2jTj3XylxfOb8'
// const UNSPLASH_API_URL = 'https://api.unsplash.com/photos/random'
const UNSPLASH_API_URL = `https://api.unsplash.com/search/photos?query=${query}&orientation=portrait&order_by=latest&per_page=${perPage}&page=${page}`
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

async function downloadImage(imageUrl, imageName) {
    const response = await fetch(imageUrl)
    const buffer = await response.arrayBuffer()
    const imageBuffer = Buffer.from(buffer)
    const filePath = path.join(PHOTOS_DIR, imageName)
    try {
        fs.writeFileSync(filePath, imageBuffer)
        console.log(`Downloaded image: ${imageName}`)
    } catch (err) {
        console.error('Error downloading image:', err)
    }
}

async function fetchAndDownloadImages() {
    try {
        // Create the photos directory if it doesn't exist
        if (!fs.existsSync(PHOTOS_DIR)) {
            fs.mkdirSync(PHOTOS_DIR)
        }

        // Fetch a random portrait-oriented, free-to-use image from Unsplash
        const response = await fetch(
            // `${UNSPLASH_API_URL}?orientation=portrait&count=1&client_id=${UNSPLASH_API_KEY}`,
            `${UNSPLASH_API_URL}`,
            {
                headers: headers,
            }
        )
        const data = await response.json()
        // console.log(data)

        const results = data.results

        // increase request counter
        incrementCounter('request')

        for (const el of results) {
            const imageUrl = el.urls.regular
            const imageName = `${el.slug}.jpg`
            const filePath = path.join(PHOTOS_DIR, imageName)

            if (!fileExists(filePath)) {
                await sleep()
                await downloadImage(imageUrl, imageName)
                // increase download counter for each download
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

// await fetchAndDownloadImages()

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

await fetchAndDownloadImages()