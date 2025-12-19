import { useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'

import { useUpdateCourseMutation } from '@/redux/services/manager/courses-manager'
import { FormProvider, RHFSelect, RHFTextField, useSnackbar } from '@root/src/components'
import { AGE, LEVEL } from '@root/src/redux/services/interfaces/courseUnits.interface'
import { capitalizeFirstSymbol } from '@root/src/utils/capitalizeFirstSymbol'
import { useTranslate } from '@root/src/utils/translateHelper'

import {
  CONTROL_BTNS_BOX_SX,
  CreateDetailsSchema,
  DetailsTabProps,
  FormValuesDetailsProps,
} from './constants'

function DetailsTab({ defaultValues, handleClose, refetch, id }: DetailsTabProps) {
  const translate = useTranslate()
  const { enqueueSnackbar } = useSnackbar()
  const onlyNeededDefaultValues = {
    level: defaultValues?.level || LEVEL.BEGINNER,
    age: defaultValues?.age || AGE.GRADE_1,
    customLevel: defaultValues?.customLevel || '',
    customAge: defaultValues?.customAge || '',
    audience: defaultValues?.audience || '',
    for_teachers: defaultValues?.for_teachers || '',
  }

  const [editCourse, { isLoading: isEditLoading }] = useUpdateCourseMutation()

  const methods = useForm<FormValuesDetailsProps>({
    resolver: yupResolver(CreateDetailsSchema()),
    defaultValues: onlyNeededDefaultValues,
  })

  const onSubmit = async (data: FormValuesDetailsProps) => {
    try {
      if (!id) return

      await editCourse({
        id,
        ...data,
      }).unwrap()

      enqueueSnackbar(translate('messages_update_success'))
      if (refetch) refetch()
      methods.reset()
      handleClose()
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: 'error',
      })
    }
  }

  const customLevel = methods.watch('customLevel')
  const customAge = methods.watch('customAge')

  useEffect(() => {
    if (!!customLevel) {
      methods.setValue('level', defaultValues?.level || LEVEL.BEGINNER)
    }
  }, [customLevel])

  useEffect(() => {
    if (!!customAge) {
      methods.setValue('age', defaultValues?.age || AGE.GRADE_1)
    }
  }, [customAge])

  return (
    <>
      <FormProvider methods={methods}>
        <Stack gap={3}>
          <RHFSelect
            native
            name='level'
            label={translate('courses_course_level')}
          >
            <option value=''></option>
            {Object.keys(LEVEL).map((l) => (
              <option
                value={LEVEL[l as keyof typeof LEVEL]}
                key={LEVEL[l as keyof typeof LEVEL]}
              >
                {capitalizeFirstSymbol(LEVEL[l as keyof typeof LEVEL])}
              </option>
            ))}
          </RHFSelect>
          <RHFTextField
            sx={{ width: '100%' }}
            name='customLevel'
            label={translate('courses_course_other_level')}
          />
          <RHFSelect
            native
            name='age'
            label={translate('courses_course_age')}
          >
            <option value=''></option>
            {Object.keys(AGE).map((a) => (
              <option
                value={AGE[a as keyof typeof AGE]}
                key={AGE[a as keyof typeof AGE]}
              >
                {capitalizeFirstSymbol(AGE[a as keyof typeof AGE])}
              </option>
            ))}
          </RHFSelect>
          <RHFTextField
            sx={{ width: '100%' }}
            name='customAge'
            label={translate('courses_course_other_other')}
          />
          <RHFTextField
            sx={{ width: '100%' }}
            name='audience'
            multiline
            rows={4}
            label={translate('courses_modal_audience')}
          />
          <RHFTextField
            sx={{ width: '100%' }}
            name='for_teachers'
            multiline
            rows={4}
            label={translate('courses_modal_for_teachers')}
          />
        </Stack>
      </FormProvider>
      <Box sx={CONTROL_BTNS_BOX_SX}>
        <Button
          color='error'
          variant='soft'
          onClick={handleClose}
        >
          {translate('actions_close')}
        </Button>
        <LoadingButton
          onClick={methods.handleSubmit(onSubmit)}
          variant='contained'
          loading={isEditLoading}
        >
          {translate('actions_save')}
        </LoadingButton>
      </Box>
    </>
  )
}

export default DetailsTab
