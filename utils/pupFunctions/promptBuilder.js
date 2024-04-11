import getTopic from '../csvFunctions/getTopic.js'
import getInstruction from '../csvFunctions/getInstruction.js'
import getArticle from '../getArticle.js'

export async function firstPrompt() {
    const topic = await getTopic()
    // Eventually abstract this out to the instructions.csv
    return `Please make me a blog article outline with exactly 6 sections including the introduction and conclusion on ${topic}. Do not include any meta-commentary about the prompting / reply process in your response. Only reply with text pertinent to the instructions provided.`
}

export async function getNPrompt(promptNumber) {
    // replace hardcoded with line from instruction script.
    // const instruction = 'hardcoded instruction'
    return `${await getInstruction(1)} ${promptNumber - 1}. Do not include any meta-commentary about the prompting / reply process in your response. Only reply with text pertinent to the instructions provided. Do not ask me any questions.`
}

export async function getThreadFirstPrompt() {
    // console.log(`prompt number: ${promptNumber} and sessionID: ${sessionID})`)
    return `${await getInstruction(2)}. Do not include any meta-commentary about the prompting / reply process in your response. Only reply with text pertinent to the instructions provided. Do not ask me any questions.`
}

export async function getCarouselPrompt() {
    // console.log(`prompt number: ${promptNumber} and sessionID: ${sessionID})`)
    return `${await getInstruction(3)}. Do not include any meta-commentary about the prompting / reply process in your response. Only reply with text pertinent to the instructions provided. Do not ask me any questions.`
}

export async function getVideoScriptPrompt() {
    // console.log(`prompt number: ${promptNumber} and sessionID: ${sessionID})`)
    return `${await getInstruction(4)}. Do not include any meta-commentary about the prompting / reply process in your response. Only reply with text pertinent to the instructions provided. Do not ask me any questions.`
}

export async function getClaudePrompt() {
    //need to pass in article number
    // Atm defaults to last article gen'd
    return `${await getInstruction(5)} ${await getArticle()}`
}
