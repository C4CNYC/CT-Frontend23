/**
 *  Readonly objects in JavaScript are immutable, meaning their properties cannot be changed.
 * @param obj
 * @returns
 */
export function unfreeze<T>(obj: T): T {
  if (typeof obj !== 'object' || obj === null) return obj

  const clone: any = Array.isArray(obj) ? [] : {}

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = (obj as any)[key]
      clone[key] = unfreeze(value)
    }
  }

  return clone
}
