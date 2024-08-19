import { Telegraf } from "telegraf"
import {message} from "telegraf/filters"
import { generateAboutInfo } from "../lib/utils"
import { getHelpMessage, getWelcomeMessage } from "./bot.utils"
import { InlineQueryResult } from "telegraf/typings/core/types/typegram"
import { translate } from "../api"


const BOT_API_KEY = process.env.BOT_API_KEY ?? ''
const BOT_ATTEMP_COUNT = 3


const bot = new Telegraf(BOT_API_KEY)

bot.start((ctx) => {
   ctx.reply(getWelcomeMessage(ctx.botInfo.first_name))   
})

bot.help((ctx) => {
    ctx.reply(getHelpMessage())
})

bot.command('me', (ctx) => {
    ctx.reply(generateAboutInfo(ctx.from), { parse_mode: 'MarkdownV2' })
})

bot.on('message', async (ctx, next) => {
    console.log(`[+] Message recieve from ${ctx.from.username}`)
    
    next()
})

bot.on(message('text'), async (ctx) => {
    const response = await translate(ctx.message.text, 'auto', 'fr')

    ctx.reply(response.trans)
})

bot.on('inline_query', async (ctx) => {
    const result = [ 'danofred', 'johndoe', 'jeane']
    const query = ctx.inlineQuery.query

    ctx.answerInlineQuery(result.map((title, index) => {
        return {
            type: "article",
            title: title,
            id: String(index),
            input_message_content: {
                message_text: `Message Text - ${title}`
            }
        } as InlineQueryResult
    }))
    

})

// Launch the bot
async function launchBot(retryCount: number, cb: () => void) {
    try {
        await bot.launch(cb)
    } catch (err) {
        if(retryCount <= 0) {
            console.log("[!] Bot failed to start")
        } else {
            launchBot(retryCount - 1, cb)
        }
    }
}

launchBot(BOT_ATTEMP_COUNT, () => {
    console.log("[+] Bot started successfully")
})

// Safe stop
process.on('SIGINT', () => bot.stop('SIGINT'))
process.on('SIGTERM', () => bot.stop('SIGTERM'))