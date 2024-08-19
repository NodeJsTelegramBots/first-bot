
import dotenv from 'dotenv';

dotenv.config({ path: ['.env', '.env.local'] })

import {bot, launchBot} from "./bot"
import express from 'express'
import path from 'path';

const app = express()
app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.post('/webhook', (req, res) => {
  // bot.handleUpdate(req.body)
  console.log(req.body)
  res.sendStatus(200)
})

const port = process.env.PORT || 3000
const BOT_ATTEMP_COUNT = 3

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
  
    launchBot(BOT_ATTEMP_COUNT, () => {
       console.log("[+] Bot started successfully")
    
       try{
            bot.telegram.setWebhook(`${process.env.BOT_WEBHOOK_URL}/webhook`)
            console.log("[+] Webhook set successfully")
        } catch(err) {
            console.log('[-] Can not set the webhook callback', err)
        }
    
    })
})

// Safe stop
process.on('SIGINT', () => {
    bot.stop('SIGINT')
    process.exit()
})
process.on('SIGTERM', () => {
    bot.stop('SIGTERM')
    process.exit()
})
