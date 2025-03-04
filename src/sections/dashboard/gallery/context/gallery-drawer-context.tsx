import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react'

const GalleryDrawerContext = createContext<GalleryDrawerContextType | undefined>(undefined)

export const GalleryDrawerProvider = ({ children, projects }: GalleryDrawerProviderType) => {
  const [code, setCode] = useState<string>('')
  const [currentProject, setCurrentProject] = useState<ItemType | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const isDisabledNext = currentIndex === projects.length - 1
  const isDisabledPrev = currentIndex === 0

  const getCurrentProject = (id: string) => {
    const current = projects.find((p) => p.id === id)
    if (current) setCurrentProject(current)
  }

  const handleNextProject = () => {
    if (currentIndex < projects.length - 1) setCurrentProject(projects[currentIndex + 1])
  }

  const handlePrevProject = () => {
    if (currentIndex > 0) setCurrentProject(projects[currentIndex - 1])
  }

  const resetCurrent = () => {
    setCurrentProject(null)
    setCurrentIndex(0)
  }
  useEffect(() => {
    if (!currentProject) return
    setCode(JSON.parse(currentProject.body).body.code)
  }, [currentProject?.body])

  useEffect(() => {
    if (!currentProject) return
    setCurrentIndex(projects.findIndex((p) => p.id === currentProject.id))
  }, [currentProject])

  return (
    <GalleryDrawerContext.Provider
      value={{
        currentProject,
        code,
        setCode,
        getCurrentProject,
        resetCurrent,
        handleNextProject,
        handlePrevProject,
        isDisabledNext,
        isDisabledPrev,
      }}
    >
      {children}
    </GalleryDrawerContext.Provider>
  )
}

export const useGalleryDrawerContext = () => {
  const context = useContext(GalleryDrawerContext)
  if (!context)
    throw new Error('useGalleryDrawerContext must be used within a GalleryDrawerProvider')
  return context
}

interface GalleryDrawerContextType {
  currentProject: ItemType | null
  code: string
  setCode: Dispatch<SetStateAction<string>>
  getCurrentProject: (id: string) => void
  resetCurrent: () => void
  handleNextProject: () => void
  handlePrevProject: () => void
  isDisabledNext: boolean
  isDisabledPrev: boolean
}

interface GalleryDrawerProviderType {
  projects: ItemType[]
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
