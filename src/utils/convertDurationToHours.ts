export function convertDurationToHours(mins: number, H = 'H'): string {
  const hours = Math.round((mins / 60) * 2) / 2
  return `${hours} ${H}`
}
