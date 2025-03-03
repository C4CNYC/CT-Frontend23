export function isJson(data: string | undefined): boolean {
  if (typeof data !== 'string') return false
  try {
    JSON.parse(data)
    return true
  } catch (e: any) {
    return false
  }
}
