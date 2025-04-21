/**
 * Generates a UUID (Universally Unique Identifier) based on the current timestamp.
 * 
 */
export function generateUUID() {
  const timestamp = new Date().getTime()
  const timestampHex = timestamp.toString(16).padStart(16, '0')
  const randomPart1 = Math.floor((timestamp & 0xffff) * Math.random())
    .toString(16)
    .padStart(4, '0')
  const randomPart2 = Math.floor((timestamp >> 16) * Math.random())
    .toString(16)
    .padStart(4, '0')

  const timePart1 = timestampHex.substring(0, 8)
  const timePart2 = timestampHex.substring(8, 12)
  const versionPart = '4' + timestampHex.substring(12, 15)
  const variants = ['8', '9', 'a', 'b']
  const variantPart = variants[timestamp % 4] + randomPart1.substring(1, 4)
  const finalPart = randomPart2 + timestampHex.substring(12)

  return `${timePart1}-${timePart2}-${versionPart}-${variantPart}-${finalPart}`
}
