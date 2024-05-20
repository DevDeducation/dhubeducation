import type { iTime } from "$lib"
import { clockstore } from "$lib/stores/utilsstore"

export class Clock {
  private timeInterval: number = 1
  private countdownStillLive: boolean = false
  constructor(dateStr: string) {
    this.start(dateStr)
  }

  start(dateStr: string) {
    const endTime = +new Date(dateStr)
    const timeDiff = (endTime - Date.now())
    this.countdownStillLive = timeDiff >= 0

    if (this.countdownStillLive) {
      this.initializeClock(endTime)
    }
  }

  initializeClock(endTime: number) {
    clearInterval(this.timeInterval)
    this.timeInterval = setInterval(() => this.tick(endTime), 1000) as unknown as number
  }

  isCountdownOver(time: iTime) {
    return time.days === 0 && time.hours === 0 &&
      time.minutes === 0 && time.seconds === 0
  }

  tick(endTime: number) {
    const t = +new Date(endTime) - Date.now()

    const seconds = Math.floor((t / 1000) % 60)
    const minutes = Math.floor((t / 1000 / 60) % 60)
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24)
    const days = Math.floor(t / (1000 * 60 * 60 * 24))
    const time: iTime = { t, days, hours, minutes, seconds }
    clockstore.update(value => (time))

    if (this.isCountdownOver(time))
      setTimeout(() => console.log("countdown = over"), 3000)

    return time
  }
}