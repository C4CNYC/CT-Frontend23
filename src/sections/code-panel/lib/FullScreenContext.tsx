import { createContext, useContext } from 'react'

import { FullScreen, useFullScreenHandle } from 'react-full-screen'

const FullScreenContext = createContext<ReturnType<typeof useFullScreenHandle> | null>(null)

export const FullScreenProvider = ({ children }: { children: React.ReactNode }) => {
  const handle = useFullScreenHandle()

  return (
    <FullScreenContext.Provider value={handle}>
      <FullScreen handle={handle}>{children}</FullScreen>
    </FullScreenContext.Provider>
  )
}

export const useFullScreen = () => {
  const context = useContext(FullScreenContext)
  if (!context) {
    throw new Error('useFullScreen must be used within a FullScreenProvider')
  }
  return context
}
