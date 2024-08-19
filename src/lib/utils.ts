import { TgUser } from "../bot/types";

export function generateAboutInfo(user: TgUser): string
{
    const id = `🥷 ID: ${user.id}`
    const username = `Username: @${user.username}`
    const name = `Name: ${user.first_name}`

    return ['*__USER INFO__ :* ', id, username, name].join('\n')
}