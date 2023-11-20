export const getFileExtension = (fileName: string): string | null => {
  const splitedString = fileName.split('.');
  const extension = splitedString[splitedString.length - 1];

  return extension ?? null
}
