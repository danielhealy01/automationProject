import getTopic from '../csvFunctions/getTopic.js'
// import getInstruction from '../csvFunctions/getInstruction.js'

export async function firstPrompt() {
    const topic = await getTopic()
    // Eventually abstract this out to the instructions.csv
    return `Please make me a blog article outline with 6 sections on ${topic}`
}

export async function getNPrompt(promptNumber) {
    // replace hardcoded with line from instruction script.
    const instruction = 'hardcoded instruction'
    // return getInstruction(promptNumber)
}
