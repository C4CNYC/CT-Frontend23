export function isValidRegex(pattern: string): boolean {
  try {
    new RegExp(pattern)
  } catch (e) {
    return false
  }
  return true
}
