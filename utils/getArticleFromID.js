import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

function absolutePathBuilder() {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)
    const relativeFilePath = '../conversations.json' // Your relative file path
    const absoluteFilePath = join(__dirname, relativeFilePath)
    return absoluteFilePath
}

export default async function getArticleFromID() {
    try {
        // Read the JSON file
        const jsonData = await readFile(absolutePathBuilder(), 'utf-8')

        // Parse the JSON data
        const articleList = JSON.parse(jsonData)

        const article = articleList[articleList.length - 1].conversations.join(' ')

        return article
    } catch (error) {
        console.error('Error reading mapping file:', error)
        return null
    }
}

// console.log(await getArticleFromID())

// export default async function getArticleFromID() {
//     try {
//         // Fetch the json file
//         const response = await fetch('file://conversations.json')

//         // Check if the response is successful
//         if (!response.ok) {
//             throw new Error('Failed to fetch json file')
//         }

//         // Parse the JSON response
//         const articleList = await response.json()

//         // Retrieve the object corresponding to the provided ID
//         // const article = articleList[sessionID]
//         const article = articleList[0][conversations].join(' ')

//         return article
//     } catch (error) {
//         console.error('Error fetching mapping file:', error)
//         return null
//     }
// }

// console.log(await getArticleFromID())

// // Usage example
// // ;(async () => {
// //     const objectId = 'article2'
// //     const object = await getObjectById(objectId)
// //     if (object) {
// //         console.log(object)
// //     } else {
// //         console.log(`Object with ID '${objectId}' not found.`)
// //     }
// // })()
