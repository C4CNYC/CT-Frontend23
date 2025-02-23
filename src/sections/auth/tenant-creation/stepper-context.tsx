import { createContext, useContext, ReactNode, useEffect } from 'react'
import { useState } from 'react'

import { FieldErrors, UseFormTrigger } from 'react-hook-form'

import { TenantFormValuesProps } from './constants'

interface StepperContextType {
  activeStep: number
  isError: boolean

  handleNext: () => void
  handleBack: () => void
  resetStepper: () => void
  handleValidation: () => void
}

const StepperContext = createContext<StepperContextType | undefined>(undefined)

export const StepperProvider = ({
  children,
  errors,
  trigger,
}: {
  children: ReactNode
  errors: FieldErrors<TenantFormValuesProps>
  trigger: UseFormTrigger<TenantFormValuesProps>
}) => {
  const [activeStep, setActiveStep] = useState(0)
  const [currentInputs, setCurrentInputs] = useState<Array<keyof TenantFormValuesProps>>([])

  const isError = Boolean(Object.keys(errors).length)

  const handleNext = () => setActiveStep((prev) => prev + 1)
  const handleBack = () => setActiveStep((prev) => prev - 1)
  const resetStepper = () => setActiveStep(0)
  const handleValidation = async () => {
    const isValid = await trigger(currentInputs)

    if (isValid) {
      handleNext()
    }
  }

  useEffect(() => {
    const inputs = Array.from(document.querySelectorAll('input, select'))
    const inputNames = inputs
      .map((el) => el.getAttribute('name'))
      .filter((name): name is keyof TenantFormValuesProps => name !== null)

    setCurrentInputs(inputNames)
  }, [activeStep])

  return (
    <StepperContext.Provider
      value={{ activeStep, isError, handleNext, handleBack, resetStepper, handleValidation }}
    >
      {children}
    </StepperContext.Provider>
  )
}

export const useStepperContext = () => {
  const context = useContext(StepperContext)
  if (!context) throw new Error('useStepperContext must be used within a StepperProvider')
  return context
}
