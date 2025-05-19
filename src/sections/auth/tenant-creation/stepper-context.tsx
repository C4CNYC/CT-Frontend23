import { createContext, useContext, ReactNode, useEffect } from 'react'
import { useState } from 'react'

import { useSnackbar } from 'notistack'
import { FieldErrors, UseFormGetValues, UseFormSetValue, UseFormTrigger } from 'react-hook-form'

import { useAuthContext } from '@/auth/useAuthContext'
import {
  useSetTenantLogoMutation,
  useUpdateTenantInfoMutation,
} from '@/redux/services/tenant/tenant-creation'
import { useTranslate } from '@/utils/translateHelper'

import { TenantFormValuesProps } from './constants'

interface StepperContextType {
  activeStep: number
  isError: boolean
  isLoading: boolean

  handleNext: () => void
  handleBack: () => void
  resetStepper: () => void
  handleValidation: () => void
  handleValidationScreen0: () => void
  handleValidationScreenLogo: () => void
  handleUpdateInfo: () => void
}

const StepperContext = createContext<StepperContextType | undefined>(undefined)

export const StepperProvider = ({
  children,
  errors,
  trigger,
  getValues,
  setValue,
}: {
  children: ReactNode
  errors: FieldErrors<TenantFormValuesProps>
  trigger: UseFormTrigger<TenantFormValuesProps>
  getValues: UseFormGetValues<TenantFormValuesProps>
  setValue: UseFormSetValue<TenantFormValuesProps>
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const translate = useTranslate()
  const [activeStep, setActiveStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [currentInputs, setCurrentInputs] = useState<Array<keyof TenantFormValuesProps>>([])
  const { registerTenant } = useAuthContext()
  const formValues = getValues()
  const [setLogo, { isLoading: isLoadingLogo }] = useSetTenantLogoMutation()
  const [updateInfo, { isLoading: isLoadingUpdateInfo }] = useUpdateTenantInfoMutation()

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
  const handleValidationScreen0 = async () => {
    const isValid = await trigger(['email', 'password'])
    if (isValid) {
      setIsLoading(true)

      try {
        await registerTenant({
          email: formValues?.email,
          password: formValues?.password,
        })
        enqueueSnackbar(translate('register_successfully'))
        setIsLoading(false)
        handleNext()
      } catch (error: any) {
        setIsLoading(false)
        enqueueSnackbar(error.message, { variant: 'error' })
      }
    }
  }

  const handleValidationScreenLogo = async () => {
    const isValid = await trigger(['logo', 'email'])

    if (isValid) {
      setIsLoading(isLoadingLogo)

      try {
        const result = await setLogo({
          email: formValues?.email,
          logo: formValues?.logo,
        }).unwrap()

        setValue('logo', result?.data?.logo)
        enqueueSnackbar(translate('Logo uploaded successfully'))
        setIsLoading(isLoadingLogo)

        handleNext()
      } catch (error: any) {
        setIsLoading(false)
        enqueueSnackbar(error.message, { variant: 'error' })
      }
    }
  }

  const handleUpdateInfo = async () => {
    const isValid = await trigger()

    if (isValid) {
      setIsLoading(isLoadingUpdateInfo)

      try {
        await updateInfo(formValues).unwrap()

        enqueueSnackbar(translate('Info updated successfully'))
        setIsLoading(isLoadingUpdateInfo)

        handleNext()
      } catch (error: any) {
        setIsLoading(false)
        enqueueSnackbar(error.message, { variant: 'error' })
      }
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
      value={{
        activeStep,
        isError,
        handleNext,
        handleBack,
        resetStepper,
        handleValidation,
        handleValidationScreen0,
        handleValidationScreenLogo,
        handleUpdateInfo,
        isLoading,
      }}
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
