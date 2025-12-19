import { useState, useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import StepWizard from 'react-step-wizard'
import * as Yup from 'yup'

import { useAuthContext } from '@/auth/useAuthContext'
import { FormProvider } from '@/components'
import { STUDENT_PATH_PAGE } from '@/routes/student.paths'
import { SingLink } from '@/sections/on-boarding-register/links'
import { useTranslate } from '@/utils/translateHelper'
import { useTenants } from '@root/src/hooks/useTenants'
import { StyledContent } from '@root/src/layouts/login/styles'
import { useGetInviteQuery } from '@root/src/redux/services/manager/invite-system'

import EmailNotFound from './EmailNotFound'
import SignInLogin from './SignInLogin'
import SignInPassword from './SignInPassword'

interface FormValuesProps {
  email: string
  password: string
}
export default function SignInMain(): React.ReactElement {
  const { replace, query, push } = useRouter()
  const { login } = useAuthContext()
  const [isError, setError] = useState('')
  const translate = useTranslate()
  const tenant = useTenants()
  const inviteCode = query.inviteCode as string | undefined

  const { data: inviteData } = useGetInviteQuery(inviteCode as string, { skip: !inviteCode })

  const CreateLoginSchema = Yup.object().shape({
    email: Yup.string()
      .required(translate('required_email'))
      .email(translate('must_be_valid_email')),
    password: Yup.string().required(translate('required_password')),
  })

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateLoginSchema),
    mode: 'all',
  })

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await login(data.email, data.password)
      if (inviteCode && inviteData) {
        push(inviteData.inviteLink)
      } else {
        replace(STUDENT_PATH_PAGE.home)
      }
    } catch (e: any) {
      setError(e.message)
    }
  }

  useEffect(() => {
    if (inviteCode && inviteData && inviteData.email) {
      methods.setValue('email', inviteData.email, { shouldDirty: true })
    }
  }, [inviteCode, inviteData])

  return (
    <StyledContent>
      <Stack
        sx={{
          width: '100%',
          minHeight: !inviteCode && tenant?.meta?.is_enabled_google_auth ? '400px' : '250px',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <FormProvider
          methods={methods}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <StepWizard transitions={custom}>
            <SignInLogin
              isValid={!methods.formState.errors.email && methods.formState.dirtyFields.email}
              stepName='email'
              inviteData={inviteData}
            />
            <SignInPassword
              isSubmiting={methods.formState.isSubmitting}
              isError={isError}
              stepName='password'
              inviteData={inviteData}
            />
            <EmailNotFound setError={setError} />
          </StepWizard>
        </FormProvider>
        <SingLink isRegister />
      </Stack>
    </StyledContent>
  )
}
const custom = {}
