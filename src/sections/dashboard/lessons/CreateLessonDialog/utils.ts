export const handleConvertAutoRunToBolean = (value: string | undefined): boolean => {
  if (value === 'true') {
    return true
  } else if (value === 'false') {
    return false
  } else {
    return Boolean(value)
  }
}

export const timeConvertorToSeconds = (time: Record<string, number> | null | undefined) => {
  if (time) {
    return Object.entries(time).reduce((acc, [timeType, time]) => {
      if (timeType === 'minutes') {
        return (acc += time)
      }
      return (acc += time * 60 + acc * 60)
    }, 0)
  }
  return 0
}
