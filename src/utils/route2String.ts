export function route2String(route: string | string[] | undefined): string {
  if (Array.isArray(route)) {
    return route.join('/')
  }
  return route || ''
}

export function route2Number(route: string | string[] | undefined): number {
  if (Array.isArray(route)) {
    return Number(route[0]) || 0
  }
  return Number(route) || 0
}
