import { useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

import { useUpdateModuleMutation } from '@/redux/services/manager/modules-manager'
import { FormProvider, RHFSelect, RHFTextField, useSnackbar } from '@root/src/components'
import { AGE, GRADING, LEVEL } from '@root/src/redux/services/interfaces/courseUnits.interface'
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
  const onlyNeedDefaultValues = {
    level: defaultValues?.level || LEVEL.BEGINNER,
    customLevel: defaultValues?.customLevel || '',
    customAge: defaultValues?.customAge || '',
    brief: defaultValues?.brief || '',
    audience: defaultValues?.audience || '',
    age: defaultValues?.age || AGE.GRADE_1,
    grading: defaultValues?.grading || GRADING.AUTO,
  }

  const [editModule, { isLoading: isEditLoading }] = useUpdateModuleMutation()

  const methods = useForm<FormValuesDetailsProps>({
    resolver: yupResolver(CreateDetailsSchema()),
    defaultValues: onlyNeedDefaultValues,
  })

  const onSubmit = async (data: FormValuesDetailsProps) => {
    try {
      if (!id) return
      // @ts-expect-error
      await editModule({
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
  const selectedGrading = methods.watch('grading')

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
        <Stack gap={2}>
          <RHFSelect
            native
            name='level'
            label={translate('modules_module_level')}
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
            label={translate('modules_module_other_level')}
          />
          <RHFSelect
            native
            name='age'
            label={translate('modules_module_age')}
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
            label={translate('modules_module_other_age')}
          />
          <RHFTextField
            sx={{ width: '100%' }}
            name='brief'
            multiline
            rows={2}
            label={translate('modules_module_brief')}
          />
          <RHFTextField
            sx={{ width: '100%' }}
            name='audience'
            multiline
            rows={4}
            label={translate('modules_module_audience')}
          />
          <Stack>
            <RHFSelect
              native
              name='grading'
              label={translate('modules_module_grading')}
            >
              {Object.keys(GRADING).map((g) => (
                <option
                  value={GRADING[g as keyof typeof GRADING]}
                  key={GRADING[g as keyof typeof GRADING]}
                >
                  {capitalizeFirstSymbol(GRADING[g as keyof typeof GRADING])}
                </option>
              ))}
            </RHFSelect>
            <Typography
              pl={1}
              pt={0.5}
              variant='caption'
            >
              {translate(`grading_tooltip_${selectedGrading?.toLowerCase()}`)}
            </Typography>
          </Stack>
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
