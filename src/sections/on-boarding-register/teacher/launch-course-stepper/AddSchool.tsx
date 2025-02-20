import { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { countries } from '@/assets/data'
import { FormProvider, RHFSelect, RHFTextField, useSnackbar } from '@/components'
import { SchoolType } from '@/redux/services/enums/school-type.enum'
import {
  useGetMySchoolsQuery,
  useUpdateSchoolProfileMutation,
} from '@/redux/services/manager/schools-manager'
import { capitalize } from '@/utils'
import { useTranslate } from '@/utils/translateHelper'
import { useCreateLessonMutation } from '@root/src/redux/services/manager/lessons-manager'
import { STUDENT_PATH_DASHBOARD } from '@root/src/routes/student.paths'
import { localStorageAvailable } from '@root/src/utils'
import { AiGenerate } from '@root/src/utils/ai-generate'

import { styledRegisterInput } from '../../styles'
import { SUBMIT_BTN_SX } from '../constants'

interface SchoolFormProps {
  schoolName: string
  type: SchoolType
  city: string
  zip: string
  country: string
}

export default function AddSchool(): React.ReactElement {
  const { reload, push } = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const { data, isLoading } = useGetMySchoolsQuery({})
  const [aiLessonReady, aiLessonReadySet] = useState('')
  const [createLesson] = useCreateLessonMutation()
  const [updateSchool, { isLoading: isUpdating }] = useUpdateSchoolProfileMutation()
  const translate = useTranslate()
  const [createAILesson] = AiGenerate()

  const AiGenerateLessonData = localStorageAvailable()
    ? localStorage.getItem('AiGenerateLessonData')
    : null
  const defaultCountry = countries.find((ct) => ct.code === 'US') ?? countries[0]

  const CreateSchoolSchema = Yup.object().shape({
    schoolName: Yup.string().required(translate('required_name')),
    type: Yup.string().required(translate('choose_school_type')),
    city: Yup.string().required(translate('choose_your_city')),
    zip: Yup.string(),
    country: Yup.string().required(translate('choose_school_country')),
  })

  useEffect(() => {
    if (!!AiGenerateLessonData) {
      let lessonDataToCreate = JSON.parse(AiGenerateLessonData)
      localStorage.removeItem('AiGenerateLessonData')
      createLesson({ name: 'Ai Lesson', description: '', duration: '20', active: true })
        .unwrap()
        .then((payload) => {
          aiLessonReadySet(payload.id)
          lessonDataToCreate.newLessonId = payload.id
          createAILesson(lessonDataToCreate)
        })
        .catch((err) => {
          enqueueSnackbar(err.data.message, { variant: 'error' })
        })
    }
  }, [])

  useEffect(() => {
    if (!isLoading && data) {
      methods.reset({
        schoolName: data?.data?.[0].name ?? '',
        city: data?.data?.[0].city ?? 'New York City',
        zip: data?.data?.[0].zip ?? '',
        country: data?.data?.[0].country ?? defaultCountry.code.toLowerCase(),
      })
    }
  }, [isLoading])

  let aiLessonWaiting = !(!AiGenerateLessonData || !!aiLessonReady)

  const methods = useForm<SchoolFormProps>({
    resolver: yupResolver(CreateSchoolSchema),
    mode: 'all',
    defaultValues: {
      schoolName: '',
      type: capitalize(SchoolType.Middle_School) as SchoolType,
    },
  })

  const onSubmit = async (schoolData: SchoolFormProps) => {
    try {
      await updateSchool({
        schoolId: data?.data[0].id as string,
        name: schoolData.schoolName,
        type: schoolData.type,
        zip: schoolData.zip,
        country: schoolData.country,
        city: schoolData.city,
      }).unwrap()
      localStorage.setItem('ON-BOARDING', 'on-boarding')
      if (aiLessonReady) {
        push(
          `${STUDENT_PATH_DASHBOARD.myLessons}?${new URLSearchParams({ lessonId: aiLessonReady })}`,
          undefined,
          {
            shallow: true,
          }
        )
      } else {
        reload()
      }
    } catch (error: any) {
      enqueueSnackbar(error?.message ?? 'Something went wrong', { variant: 'error' })
    }
  }

  return (
    <Stack
      minHeight={500}
      mb={1}
    >
      <FormProvider
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Stack
          direction='row'
          sx={{ ml: { xs: 3, sm: 3, md: 0 } }}
        >
          <Typography
            variant='h3'
            sx={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}
          >
            {translate('schools_add_school')}
            <Typography
              sx={{ display: 'inline-flex' }}
              variant='h2'
            >
              🏫
            </Typography>
          </Typography>
        </Stack>
        <Typography
          variant='body1'
          sx={{ pb: 3, ml: { xs: 3, sm: 3, md: 0 } }}
        >
          {translate('register_school_name_see')}
        </Typography>
        <Stack gap={3}>
          <RHFTextField
            name='schoolName'
            label={translate('add_school_name')}
            sx={(theme) => ({ ...styledRegisterInput(theme) })}
          />
          <RHFSelect
            native
            name='type'
            label={translate('register_school_type')}
            sx={(theme) => ({ ...styledRegisterInput(theme) })}
          >
            {Object.values(SchoolType).map((c) => (
              <option
                key={capitalize(c)}
                value={capitalize(c)}
              >
                {capitalize(c)}
              </option>
            ))}
          </RHFSelect>
          <Stack
            direction='row'
            sx={{ gap: 2 }}
          >
            <RHFTextField
              name='city'
              focused
              label={translate('city')}
              sx={(theme) => ({ ...styledRegisterInput(theme) })}
            />
            <RHFTextField
              name='zip'
              label={translate('zip_code')}
              type='number'
              sx={(theme) => ({ ...styledRegisterInput(theme) })}
            />
          </Stack>
          <RHFSelect
            native
            name='country'
            label={translate('country')}
            sx={(theme) => ({ ...styledRegisterInput(theme) })}
          >
            <option
              key={defaultCountry.code}
              value={defaultCountry.code.toLowerCase()}
            >
              {defaultCountry.label}
            </option>
            <option disabled>─────────────────────────</option>
            {countries
              .filter((el) => el.code !== 'US')
              .sort((a, b) => a.label.localeCompare(b.label))
              .map((country) => (
                <option
                  key={country.code}
                  value={country.code.toLowerCase()}
                >
                  {country.label}
                </option>
              ))}
          </RHFSelect>
        </Stack>
        <LoadingButton
          type='submit'
          sx={SUBMIT_BTN_SX}
          loading={isUpdating && aiLessonWaiting}
        >
          {translate('register_all_done')}
        </LoadingButton>
      </FormProvider>
    </Stack>
  )
}
