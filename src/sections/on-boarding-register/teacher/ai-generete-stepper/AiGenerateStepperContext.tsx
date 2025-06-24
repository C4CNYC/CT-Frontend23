import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

import { Role } from '@root/src/redux/services/enums/role.enum'
import { ILesson } from '@root/src/redux/services/interfaces/courseUnits.interface'
import { useGetLessonsByIdsQuery } from '@root/src/redux/services/manager/lessons-manager'
import { useGetPropertiesQuery } from '@root/src/redux/services/manager/properties-manager'
import { useSelector } from '@root/src/redux/store'

type AiGenerateStepperContextType = {
  activeStep: number
  setActiveStep: (step: number) => void
  isLoading: boolean
  isModal: boolean
  closeModal: () => void
  setIsLoading: (loading: boolean) => void
  aiLessons: ILesson[] | undefined
  nextStep: () => void
  prevStep: () => void
}

const AiGenerateStepperContext = createContext<AiGenerateStepperContextType | undefined>(undefined)
type PropsType = {
  children: ReactNode
  initialStep?: number
  isModal: boolean
  closeModal: () => void
}

export const AiGenerateStepperProvider = ({
  children,
  initialStep = 0,
  isModal = false,
  closeModal = () => {},
}: PropsType) => {
  const [activeStep, setActiveStep] = useState(initialStep)
  const [aiLessons, aiLessonsSet] = useState<ILesson[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const nextStep = () => setActiveStep(activeStep + 1)
  const prevStep = () => setActiveStep(activeStep - 1)
  const profile = useSelector((state) => state.global.user)

  const { data: properties } = useGetPropertiesQuery({
    entityType: 'lesson',
    propertyName: 'aiTemplate',
  })
  const { data: aiTemplates } = useGetLessonsByIdsQuery(
    properties?.data.map((item) => item.entityId) ?? []
  )
  useEffect(() => {
    if (!aiTemplates || aiTemplates.length < 1) return
    if (profile?.role && [Role.SuperAdmin, Role.Admin].includes(profile.role)) {
      aiLessonsSet(aiTemplates)
    } else {
      aiLessonsSet(aiTemplates.filter((t) => t.active))
    }
  }, [aiTemplates])

  return (
    <AiGenerateStepperContext.Provider
      value={{
        activeStep,
        setActiveStep,
        isLoading,
        setIsLoading,
        aiLessons,
        nextStep,
        prevStep,
        isModal,
        closeModal,
      }}
    >
      {children}
    </AiGenerateStepperContext.Provider>
  )
}

export const useAiGenerateStepper = () => {
  const context = useContext(AiGenerateStepperContext)
  if (!context) {
    throw new Error('useAiGenerateStepper must be used within an AiGenerateStepperProvider')
  }
  return context
}
