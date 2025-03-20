export function convertDurationToMins(
  duration: { hours: number; minutes: number } | undefined | null | Record<string, number>,
  defaultValue: number = 20
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
