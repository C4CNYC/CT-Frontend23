/**
 *  Converts minutes to hours and minutes string, with  given translations
 * @param mins
 * @param H
 * @returns 13 saat 29 dakika
 *
 * example convertMinsToString(minutes, translate('hours'), translate('minutes'))
 */
export function convertMinsToString(mins: number, H = 'H'): string {
  const hours = Math.round((mins / 60) * 2) / 2
  return `${hours} ${H}`
}
