import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

export default async function jpgToAvifConvert(directoryPath) {
    try {
        // Check if the directory exists
        if (!fs.existsSync(directoryPath)) {
            console.error(`Directory ${directoryPath} does not exist.`)
            return
        }

        // Get a list of all files in the directory
        const files = await fs.promises.readdir(directoryPath)

        // Filter for JPEG and PNG files
        const imageFiles = files.filter((file) => {
            const ext = path.extname(file).toLowerCase()
            return ext === '.jpg' || ext === '.jpeg' || ext === '.png'
        })

        // Create the AVIF directory if it doesn't exist
        const avifDirectory = path.join(directoryPath, 'avif')
        if (!fs.existsSync(avifDirectory)) {
            await fs.promises.mkdir(avifDirectory)
        }

        // Convert each image to AVIF format
        for (const file of imageFiles) {
            const inputFilePath = path.join(directoryPath, file)
            const outputFilePath = path.join(
                avifDirectory,
                `${path.basename(file, path.extname(file))}.avif`
            )

            // Check if the AVIF file already exists
            if (fs.existsSync(outputFilePath)) {
                console.log(
                    `AVIF file ${outputFilePath} already exists. Skipping conversion.`
                )
                continue
            }

            try {
                await sharp(inputFilePath)
                    .avif({
                        quality: 50,
                        speed: 1,
                    })
                    .toFile(outputFilePath)

                console.log(`Converted ${file} to AVIF format.`)
            } catch (err) {
                console.error(`Error converting ${file} to AVIF format:`, err)
            }
        }

        console.log(
            `***** -- Image conversion to AVIF completed. Nothing left to convert! -- *****`
        )
    } catch (err) {
        console.error('Error processing directory:', err)
    }
}

await jpgToAvifConvert('./downloaded_landscape_photos')
