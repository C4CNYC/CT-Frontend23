const localStorageDontClearThose = ['HAS_SEEN', 'i18', 'iconify', 'tenant', 'tenantName']

export function localStorageClear(): void {
  for (let i = localStorage.length - 1; i > -1; i--)
    if (!localStorageDontClearThose.some((x) => localStorage.key(i)?.includes(x)))
      localStorage.removeItem(localStorage.key(i)!)
}
