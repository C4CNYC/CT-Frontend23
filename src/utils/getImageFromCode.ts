import html2canvas from 'html2canvas'

export const getImageFromCode = async () => {
  try {
    const element = document.getElementById('view_user_code_block')
    if (element) {
      const canvas = await html2canvas(element)
      const response = await fetch(canvas.toDataURL('image/png'))
      const blob = await response.blob()
      return new File([blob], 'cover.png', { type: 'image/png' })
    }
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log(error.data.message)
    return null
  }
}
