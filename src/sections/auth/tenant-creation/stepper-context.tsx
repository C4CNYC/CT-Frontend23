import { createContext, useContext, ReactNode, useEffect } from 'react'
import { useState } from 'react'

import { useSnackbar } from 'notistack'
import { FieldErrors } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { useAuthContext } from '@/auth/useAuthContext'
import {
  useSetTenantLogoMutation,
  useUpdateTenantInfoMutation,
  useCheckBrandNameMutation,
  useCheckSubdomainMutation,
} from '@/redux/services/tenant/tenant-creation'
import { useTranslate } from '@/utils/translateHelper'

import { RootState } from '../../../redux/store'

import { TenantFormValuesProps } from './constants'

interface StepperContextType {
  activeStep: number
  isError: boolean
  isLoading: boolean
  subdomain: string

  handleNext: () => void
  handleBack: () => void
  resetStepper: () => void
  handleValidation: () => void
  handleValidationScreen0: () => void
  handleValidationScreenLogo: (uploadedLogo: File | string) => void
  handleUpdateInfo: () => void
  handleCheckBrandInfoStep: () => void
}

const StepperContext = createContext<StepperContextType | undefined>(undefined)

export const StepperProvider = ({
  children,
  errors,
  methods,
}: {
  children: ReactNode
  errors: FieldErrors<TenantFormValuesProps>
  methods: any
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const translate = useTranslate()
  const [activeStep, setActiveStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [currentInputs, setCurrentInputs] = useState<Array<keyof TenantFormValuesProps>>([])
  const { registerTenant } = useAuthContext()
  const [setLogo] = useSetTenantLogoMutation()
  const [updateInfo] = useUpdateTenantInfoMutation()
  const [handleCheckBrandName] = useCheckBrandNameMutation()
  const [handleCheckSubdomain] = useCheckSubdomainMutation()

  const userId = useSelector((state: RootState) => state.global.user?.id)

  const isError = Boolean(Object.keys(errors).length)

  const handleNext = () => setActiveStep((prev) => prev + 1)
  const handleBack = () => setActiveStep((prev) => prev - 1)
  const resetStepper = () => setActiveStep(0)
  const handleValidation = async () => {
    const isValid = await methods.trigger(currentInputs)

    if (isValid) {
      handleNext()
    }
  }
  const handleValidationScreen0 = async () => {
    const isValid = await methods.trigger(['email', 'password'])
    if (isValid) {
      const currentEmail = methods.getValues('email')
      const currentPassword = methods.getValues('password')
      setIsLoading(true)

      try {
        await registerTenant({
          email: currentEmail,
          password: currentPassword,
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

  const handleValidationScreenLogo = async (uploadedLogo: File | string) => {
    const isValid = await methods.trigger(['logo', 'email'])

    if (isValid) {
      setIsLoading(true)
      const currentLogo = methods.getValues()

      try {
        const result = await setLogo({
          userId: userId || '',
          file: uploadedLogo || '',
        }).unwrap()
        methods.setValue('logo', result?.message)
        enqueueSnackbar(translate('Logo uploaded successfully'))
        handleNext()
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: 'error' })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleCheckBrandInfoStep = async () => {
    try {
      const isValid = await methods.trigger(['brandName', 'subdomain'])
      if (!isValid) return

      setIsLoading(true)

      const brandName = methods.getValues('brandName')
      const subdomain = methods.getValues('subdomain')

      const [brandResult, subdomainResult] = await Promise.all([
        handleCheckBrandName({ brandName }).unwrap(),
        handleCheckSubdomain({ subdomain }).unwrap(),
      ])

      if (brandResult.isAvailable && subdomainResult.isAvailable) {
        enqueueSnackbar(translate('Info updated successfully'))
        handleNext()
      } else {
        if (!brandResult.isAvailable) {
          methods.setError('brandName', {
            type: 'manual',
            message: translate(brandResult?.message),
          })
        }
        if (!subdomainResult.isAvailable) {
          methods.setError('subdomain', {
            type: 'manual',
            message: translate(subdomainResult?.message),
          })
        }
      }
    } catch (error: any) {
      enqueueSnackbar(translate('validation_error'), { variant: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateInfo = async () => {
    const isValid = await methods.trigger()
    const data = methods.getValues()

    if (isValid) {
      setIsLoading(true)

      try {
        await updateInfo({
          ...data,
          slug: data.subdomain,
        }).unwrap()

        enqueueSnackbar(translate('Info updated successfully'))
        handleNext()
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: 'error' })
      } finally {
        setIsLoading(false)
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
        handleCheckBrandInfoStep,
        isLoading,
        subdomain: methods.getValues('subdomain') || '',
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
