import axios from "../lib/axios"

export interface RA_GoogleTranslateResponse {
    trans: string,
    source_language_code: string,
    source_language: string,
    trust_level: number
}

export async function translate(text: string, from: string, to: string)
{
    return await axios.post('/api/v1/translator/text', {from, to, text}).then(res => res.data as RA_GoogleTranslateResponse)
}
