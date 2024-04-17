import dotenv from 'dotenv'
import { run } from './utils/puppeteerController.js'
import Puppeteer from 'puppeteer'
import getTopic from './utils/csvFunctions/getTopic.js'

dotenv.config({ path: `.env/.env.${process.env.NODE_ENV || 'dev'}` })

console.log(process.env.TEST)
//  puppeteer.use(StealthPlugin())
const topics = await getTopic()
// for (let topic of topics) {
//     // console.log(topic)
//     await run(topic)
// }
for (let i = 0; i < topics.length; i++) {
    await run(topics[i])
    
    // console.log(topics[i])
}


// I swear to god if this doesn't work I will make a shell script that will just run loop the file on execution and will shift and push 





// If I can't get this to work with broswer.disc
// I can to it imperatively.

// for (let i = 0; i < topic.length; i++) {
//     await run()
//     topic.shift()
//     await sleep()
// }