import getTopic from '../csvFunctions/getTopic.js'

export async function firstPrompt() {
    const topic = await getTopic()
    return `Please make me a blog article on ${topic}`    
}
