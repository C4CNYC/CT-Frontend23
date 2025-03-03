import { createContext, useContext, ReactNode } from 'react'

const GalleryContext = createContext<ItemType | undefined>(undefined)

export const GalleryProvider = ({ children, project }: GalleryProviderType) => {
  return <GalleryContext.Provider value={{ ...project }}>{children}</GalleryContext.Provider>
}

export const useGalleryContext = () => {
  const context = useContext(GalleryContext)
  if (!context) throw new Error('useGalleryContext must be used within a GalleryProvider')
  return context
}

interface GalleryProviderType {
  project: ItemType
  children: ReactNode
}

interface ItemType {
  title: string
  description: string
  body: string
  language: string
  public?: boolean
  cover?: string | null
  avatar?: string | null
  id: string
}
