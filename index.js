import dotenv from 'dotenv'
import { run } from './utils/puppeteerController.js'
import Puppeteer from 'puppeteer'

dotenv.config({ path: `.env/.env.${process.env.NODE_ENV || 'dev'}` })

console.log(process.env.TEST)
//  puppeteer.use(StealthPlugin())

await run()
