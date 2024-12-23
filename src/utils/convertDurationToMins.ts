export function convertDurationToMins(
  duration: { hours: number; minutes: number } | undefined | Record<string, number>,
  defaultValue: number = 30
): number {
  let minutes = 0
  if (!duration) return defaultValue
  if (duration.hours) {
    minutes = duration.hours * 60
  }
  if (duration.minutes) {
    minutes += duration.minutes
  }

  return minutes ? minutes : defaultValue
}
