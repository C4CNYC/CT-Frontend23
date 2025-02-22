import { useState } from 'react'

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
  Typography,
} from '@mui/material'
import { IoMdInformationCircleOutline } from '@react-icons/all-files/io/IoMdInformationCircleOutline'
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
import { ValidationTestingMethod } from '@root/src/redux/services/interfaces/lessonContentValidation.interface'
import { isValidRegex } from '@root/src/utils/isValidRegex'
interface FormValuesProps {
  regex: string
  name: string
  testing_method: ValidationTestingMethod
}

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
    testing_method: ValidationTestingMethod.Regex,
  },
}: Props): React.ReactElement {
  const [open, setOpenDialog] = useState<boolean>(false)
  const isEdit = Boolean(id)
  const translate = useTranslate()
  const CreateLessonDemonSchema = Yup.object().shape({
    regex: Yup.string().when('testing_method', {
      is: (method: string) => method !== 'manual',
      then: (schema) => schema.required(translate('required_regex')),
      otherwise: (schema) =>
        schema
          .notRequired()
          .test('empty-if-manual', translate('regex_must_be_empty_for_manual'), (value, context) =>
            context.parent.testing_method === 'manual' ? !value : true
          ),
    }),
    name: Yup.string().required(translate('required_name')),
    testing_method: Yup.string().required(),
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
    if (!isValidRegex(data.regex)) {
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
      setOpenDialog(false)
    } catch (e: any) {
      enqueueSnackbar(translate('messages_error'), { variant: 'error' })
    }
  }

  return (
    <>
      <Box
        onClick={() => {
          setOpenDialog(true)
        }}
      >
        {children}
      </Box>
      <Dialog
        open={open}
        onClose={() => {
          setOpenDialog(false)
        }}
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
            onClick={() => {
              setOpenDialog(false)
            }}
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
                  name='regex'
                  label={translate('regex')}
                />
                <Typography
                  variant='h6'
                  sx={TYPO_SX}
                  gutterBottom
                >
                  {translate('rule_testing_method_title')}
                  <Typography variant='caption'>
                    {translate('rule_testing_method_required')}
                  </Typography>
                </Typography>
                <RHFToggleButtonGroup
                  options={TESTING_METHODS}
                  sxGroup={BTN_GROUP_SX}
                  sxButton={BUTTON_SX}
                  name='testing_method'
                  tooltip
                  size='small'
                />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 2,
                    mt: 7,
                  }}
                >
                  <Button
                    onClick={() => {
                      setOpenDialog(false)
                    }}
                  >
                    {translate('actions_close')}
                  </Button>
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
    </>
  )
}

const TESTING_METHODS = [
  {
    key: ValidationTestingMethod.Manual,
    value: 'Manual',
    tooltip: 'rule_manual_tooltip',
    icon: <IoMdInformationCircleOutline size={20} />,
  },
  {
    key: ValidationTestingMethod.Regex,
    value: 'Regex',
    tooltip: 'rule_regex_tooltip',
    icon: <IoMdInformationCircleOutline size={20} />,
  },
  {
    key: ValidationTestingMethod.Mocha,
    value: 'Mocha',
    tooltip: 'rule_mocha_tooltip',
    icon: <IoMdInformationCircleOutline size={20} />,
  },
  {
    key: ValidationTestingMethod.Chai,
    value: 'Chai',
    tooltip: 'rule_chai_tooltip',
    icon: <IoMdInformationCircleOutline size={20} />,
  },
]

const BUTTON_SX = {
  m: '0!important',
  borderRadius: '10px!important',
  gap: 1,
  '&.Mui-selected, &.Mui-selected:hover': {
    background: '#364954',
    color: '#fff',
  },
  '&>svg': { mb: '2px' },
}

const BTN_GROUP_SX = {
  border: '1px solid #364954',
  borderRadius: '10px',
}

const TYPO_SX = {
  pl: 1,
  color: '#5C5C5C',
  display: 'flex',
  alignItems: 'baseline',
  gap: 1,
  fontWeight: 400,
}
