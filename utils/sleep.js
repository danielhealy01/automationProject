function randomSleep(min, max) {
    return Math.random() * (max - min) + min
}

export default async function sleep() {
    const sleepTime = randomSleep(1000, 1800) // Generate random time between 1 second and 2.5 seconds
    await new Promise((resolve) => setTimeout(resolve, sleepTime))
    return sleepTime
}

export async function longSleep() {
    const sleepTime = randomSleep(3000, 6800) // Generate random time between 1 second and 2.5 seconds
    await new Promise((resolve) => setTimeout(resolve, sleepTime))
    return sleepTime
}

export async function typeSleep() {
    const sleepTime = randomSleep(100, 350) // Generate random time between 1 second and 2.5 seconds
    await new Promise((resolve) => setTimeout(resolve, sleepTime))
    return sleepTime
}