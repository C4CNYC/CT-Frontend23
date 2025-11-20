export const convertStringToBool = (value: any): boolean => {
  if (typeof value === 'boolean') return value

  if (typeof value === 'string') {
    const v = value.trim().toLowerCase()
    if (v === 'true') return true
    if (v === 'false') return false
  }

  return Boolean(value)
}
