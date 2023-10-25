const cachedRequests = new Map();

export const useLoadIntegration = async (attrs: Record<string, string>, key: string) => {
  const href = attrs[key]
  if (cachedRequests.has(href)) return cachedRequests.get(href)
  try {
    const res = await fetch(href)
    const data = await res.text()
    cachedRequests.set(href, data)
    return data
  } catch (error) {
    return null
  }
}
