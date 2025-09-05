import { yupResolver } from '@hookform/resolvers/yup'
import CloseIcon from '@mui/icons-material/Close'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  FormControl,
  FormHelperText,
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { FormProvider, RHFTextField } from '@/components'
import {
  useCreateLessonContentValidationManagerMutation,
  useUpdateLessonContentValidationManagerMutation,
} from '@/redux/services/manager/lesson-content-validation-manager'
import { useTranslate } from '@/utils/translateHelper'
import { RHFToggleButtonGroup } from '@root/src/components/hook-form/RHFToggleButtonGroup'
import { useBoolean } from '@root/src/hooks/use-boolean'
import {
  ILessonContentValidation,
  ILCV_type,
} from '@root/src/redux/services/interfaces/lessonContentValidation.interface'
import { isValidRegex } from '@root/src/utils/isValidRegex'

import { GRADING_METHODS_BTN_SX } from '../../CreateLessonDialog/constants'

interface FormValuesProps extends ILessonContentValidation {}

interface Props {
  children?: React.ReactElement
  stepId: string
  id?: string
  defaultValues?: FormValuesProps
}

export default function CreateEditValidation({
  children,
  stepId,
  id,
  defaultValues = {
    regex: '',
    name: '',
    description: '',
    type: 'regex' as const,
  },
}: Props): React.ReactElement {
  const { value: open, onFalse: openFalse, onTrue: openTrue } = useBoolean(false)
  const isEdit = Boolean(id)
  const translate = useTranslate()
  const CreateLessonDemonSchema = Yup.object().shape({
    regex: Yup.string().when('type', {
      is: (type: string) => type !== 'action' && type !== 'signal',
      then: (schema) => schema.required(translate('required_regex')),
      otherwise: (schema) => schema.notRequired(),
    }),
    name: Yup.string().required(translate('required_name')),
    description: Yup.string(),
    type: Yup.string()
      .oneOf([...ILCV_type])
      .required(),
  })

  const { enqueueSnackbar } = useSnackbar()
  const [updateRule, { isLoading: updateLoading }] =
    useUpdateLessonContentValidationManagerMutation()
  const [createRule, { isLoading: createLoading }] =
    useCreateLessonContentValidationManagerMutation()
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateLessonDemonSchema),
    defaultValues,
  })

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    // Only validate regex format if type is 'regex'
    if (data.type === 'regex' && !isValidRegex(data.regex)) {
      enqueueSnackbar(translate('invalid_regex'), { variant: 'error' })
      return
    }
    try {
      if (isEdit) {
        await updateRule({
          contentId: stepId,
          id: id as string,
          ...data,
        }).unwrap()
      } else {
        await createRule({
          id: stepId,
          ...data,
        }).unwrap()
      }
      enqueueSnackbar(
        id ? translate('validation_rule_updated') : translate('validation_rule_created')
      )
      methods.reset()
      openFalse()
    } catch (e: any) {
      enqueueSnackbar(translate('messages_error'), { variant: 'error' })
    }
  }

  function getLabel(type: string | undefined): string {
    switch (type) {
      case 'regex':
      case 'output':
        return translate('regex')
      case 'execute':
        return translate('code')
      case 'manual':
        return translate('comment')
    }
    return type || ''
  }

  return (
    <>
      <Box onClick={openTrue}> {children} </Box>
      {open ? (
        <Dialog
          open={open}
          onClose={openFalse}
        >
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='flex-end'
          >
            <DialogTitle
              variant='h5'
              sx={{ pb: 1, pt: 2 }}
            >
              {id ? translate('actions_update_rule') : translate('actions_create_rule')}
            </DialogTitle>
            <IconButton
              onClick={openFalse}
              sx={{ mb: '5px', mr: '14px' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <DialogContent sx={{ p: 0 }}>
            <FormProvider
              methods={methods}
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <Grid
                item
                xs={12}
                md={8}
              >
                <Card sx={{ p: 3 }}>
                  <RHFTextField
                    sx={{ mb: 3 }}
                    name='name'
                    label={translate('name')}
                  />
                  <RHFTextField
                    sx={{ mb: 3 }}
                    name='description'
                    label={translate('description')}
                    multiline
                    rows={2}
                  />
                  <FormControl
                    fullWidth
                    sx={{ mb: 3 }}
                  >
                    <RHFToggleButtonGroup
                      name='type'
                      options={ILCV_type.map((type) => ({
                        key: type,
                        value: type,
                        tooltip: type.charAt(0).toUpperCase() + type.slice(1),
                      }))}
                      sxGroup={{
                        width: { xs: '100%', sm: '100%' },
                        border: { xs: 'none', md: '1px solid rgba(145, 158, 171, 0.24)' },
                        margin: '0.8rem 0',
                      }}
                      sxButton={GRADING_METHODS_BTN_SX}
                      tooltip
                    />
                    {methods.formState.errors.type && (
                      <FormHelperText error>{methods.formState.errors.type.message}</FormHelperText>
                    )}
                  </FormControl>
                  <RHFTextField
                    sx={{ mb: 3 }}
                    name='regex'
                    label={getLabel(methods.watch('type'))}
                    helperText={translate(
                      methods.watch('type')
                        ? `checker_type_help.${methods.watch('type')}`
                        : 'pattern_help'
                    )}
                    multiline
                    rows={4}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: 2,
                      mt: 7,
                    }}
                  >
                    <Button onClick={openFalse}>{translate('actions_close')}</Button>
                    <LoadingButton
                      type='submit'
                      variant='contained'
                      loading={updateLoading || createLoading}
                    >
                      {translate('actions_save')}
                    </LoadingButton>
                  </Box>
                </Card>
              </Grid>
            </FormProvider>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  )
}
