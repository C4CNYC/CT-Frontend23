export async function imageResize(
  img: HTMLImageElement,
  maxDimention = 1080 // 1080 instagram
): Promise<Blob> {
  let ratio = 1
  let width = maxDimention
  let height = maxDimention
  if (img.naturalWidth > img.naturalHeight) {
    ratio = maxDimention / img.naturalWidth
    height = Math.round(ratio * img.naturalHeight)
  } else {
    ratio = maxDimention / img.naturalHeight
    width = Math.round(ratio * img.naturalWidth)
  }
  let canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  let ctx = canvas.getContext('2d')
  if (!ctx) {
    return new Promise((_resolve, reject) => {
      reject()
    })
  }
  ctx.drawImage(img, 0, 0, width, height)
  return await new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return reject()
        resolve(blob)
      },
      'image/webp',
      0.9
    )
  })
}
