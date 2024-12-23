/**
 *  Converts minutes to hours and minutes string, with  given translations
 * @param mins
 * @param H
 * @param M empty string will return only hours
 * @returns 13 saat 29 dakika
 *
 * example convertMinsToString(minutes, translate('hours'), translate('minutes'))
 */
export function convertMinsToString(mins: number, H = 'H', M = 'M'): string {
  const hours = Math.floor(mins / 60)
  const minutes = mins % 60
  return M ? `${hours} ${H} ${minutes} ${M}` : `${hours}${H}`
}
