export const getExtension = (fileName: string): string | null => {
  const splitedString = fileName.split('.');
  const extension = splitedString[splitedString.length - 1];

  return extension ?? null
}

const iconMap = {
  css: 'css',
  html: 'html',
  js: 'html'
}

const getIcon = (fileName: string) => {
  const extension = getExtension(fileName)

  if (extension != null && iconMap[extension as keyof typeof iconMap] != null) {
    return iconMap[extension as keyof typeof iconMap]
  }

  return null
}

