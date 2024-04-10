// let startTime = Date.now()

export default function getElapsedTime(startTime) {
    const elapsedTime = Date.now() - startTime
    const seconds = Math.floor(elapsedTime / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    let elapsed = {
        seconds: seconds % 60,
        minutes: minutes % 60,
        hours: hours,
    }

    return `Script finished. Elapsed time: ${elapsed.hours}h ${elapsed.minutes}m ${elapsed.seconds}s`
}

// // Example usage
// async function runScript() {
//     console.log('Script started')

//     // Your script code here

//     const elapsedTime = getElapsedTime()
    
// }
