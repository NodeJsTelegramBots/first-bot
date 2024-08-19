
export function getWelcomeMessage(botName: string): string
{
    return [
        `📩 Welcome to ${botName}!`,
        `I can help you with a lot of things, just type /help to get started.`,
    ].join('\n')
}

export function getHelpMessage(): string
{
    return [
        `📚 Here are the commands I can help you with:`,
        `/me - Get information about yourself`,
        `/help - Get this help message`,
    ].join('\n')
}