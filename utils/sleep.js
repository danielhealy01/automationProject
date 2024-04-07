function randomSleep(min, max) {
    return Math.random() * (max - min) + min
}

export default async function sleep() {
    const sleepTime = randomSleep(1000, 2500) // Generate random time between 1 second and 2.5 seconds
    await new Promise((resolve) => setTimeout(resolve, sleepTime))
    return sleepTime
}

// Call the function
console.log(await sleep())
