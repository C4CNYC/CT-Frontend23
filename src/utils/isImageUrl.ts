export const isImageURL = (avatar: string | undefined): boolean => {
  if (!avatar) {
    return false
  }

  try {
    const url = new URL(avatar)

    return (
      (url.protocol === 'http:' || url.protocol === 'https:') &&
      /\.(jpeg|jpg|gif|png|svg|webp|bmp|tiff)$/i.test(url.pathname)
    )
  } catch (e) {
    return false
  }
}
