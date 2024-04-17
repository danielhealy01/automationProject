import getTopic from '../csvFunctions/getTopic.js'
import getInstruction from '../csvFunctions/getInstruction.js'
import getArticle from '../getArticle.js'

export async function firstPrompt(topic) {
    // const topicN = await getTopic(topic)
    return `I want you to act as a blog article writer that speaks and writes fluent English*. Pretend that you have the most accurate and most detailed information about: ${topic}. Write a blog content outline for a post regarding: ${topic}. Include a catchy SEO title and meta description. The content outline should be divided with parent headings listed in roman numerals, and subheadings listed by letters. The blog article outline will have exactly 6 sections including the introduction and conclusion on ${topic}. Do not include any meta-commentary about the prompting / reply process in your response. Only reply with text pertinent to the instructions provided.`
}

export async function getNPrompt(promptNumber) {
    // replace hardcoded with line from instruction script.
    // const instruction = 'hardcoded instruction'
    return `${await getInstruction(1)} ${promptNumber - 1}. Do not include any meta-commentary about the prompting / reply process in your response. Only reply with text pertinent to the instructions provided. Do not ask me any questions. for the section, do not start the paragraph, or any paragraph with a starting symbol to mark it as a particular section, such as a roman numeral, a number or letter. Each paragraph should be formatted as a block of prose text.`
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

export async function getFAQPrompt() {
    return `${await getInstruction(6)} Do not include any meta-commentary about the prompting / reply process in your response. Only reply with text pertinent to the instructions provided. Do not ask me any questions.`
}