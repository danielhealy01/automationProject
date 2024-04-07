import dotenv from 'dotenv'
import { run } from './utils/puppeteer.js'

dotenv.config({ path: `.env/.env.${process.env.NODE_ENV || 'dev'}` })

console.log(process.env.TEST)
await run()
