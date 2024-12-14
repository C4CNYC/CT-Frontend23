type LocalStorageTabIds = string[]

export function tabsLocalStorageManger(rootKey: string) {
  const getLocalStorageTabIds = (key: string = rootKey): LocalStorageTabIds => {
    try {
      const LocalStorageTabIds = localStorage.getItem(key)

      if (LocalStorageTabIds) {
        return JSON.parse(LocalStorageTabIds) as LocalStorageTabIds
      }

      return []
    } catch (e) {
      return []
    }
  }

  const setLocalStorageTabIds = (Tabs: LocalStorageTabIds) => {
    localStorage.setItem(rootKey, JSON.stringify(Tabs))
  }

  const _getTabs = () => {
    return getLocalStorageTabIds()
  }

  const _addTab = (tabId: string) => {
    const tabs = getLocalStorageTabIds()

    if (tabs.includes(tabId)) {
      return
    }

    tabs.push(tabId)

    setLocalStorageTabIds(tabs)

    return tabs
  }

  const _removeTab = (id: string) => {
    const Tabs = getLocalStorageTabIds()

    if (!Tabs.includes(id)) {
      return
    }

    setLocalStorageTabIds(Tabs.slice(Tabs.indexOf(id), 1))
  }

  return {
    addTab: _addTab,
    getTabs: _getTabs,
    removeTab: _removeTab,
  }
}
