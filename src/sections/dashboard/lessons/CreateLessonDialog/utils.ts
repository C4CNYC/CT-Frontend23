export const handleConvertAutoRunToBolean = (value: string | undefined): boolean => {
  if (value === 'true') {
    return true
  } else if (value === 'false') {
    return false
  } else {
    return Boolean(value)
  }
}
