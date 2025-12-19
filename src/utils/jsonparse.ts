export function jsonparse<T>(str: string | undefined, def: T): T {
  if (typeof str !== 'string') return def
  try {
    return JSON.parse(str)
  } catch {
    return def
  }
}
