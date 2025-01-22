import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Stack } from '@mui/material'
import { useForm, useWatch } from 'react-hook-form'
import * as Yup from 'yup'

import { FormProvider, RHFCode, RHFSelect, useSnackbar } from '@/components'
import { ModalCodeFullscreen } from '@root/src/components/modal-code-fullscreen'
import { HomePageType } from '@root/src/redux/services/enums/administration.enum'
import { useUpdateOrgMutation } from '@root/src/redux/services/manager/super-admin'
import { useTranslate } from '@root/src/utils/translateHelper'

interface CustomCodeTabProps {
  handleClose: () => void
  code?: string
  id: string
  home_page_type?: HomePageType
}

interface FormValuesProps {
  home_page_body: string
  home_page_type: HomePageType
}

const LandingPageType = ({
  handleClose,
  code,
  id,
  home_page_type,
}: CustomCodeTabProps): React.ReactElement => {
  const translate = useTranslate()
  const { enqueueSnackbar } = useSnackbar()

  const [updateOrg, { isLoading: isUpdating }] = useUpdateOrgMutation()

  const CreateOrgSchema = Yup.object().shape({
    home_page_body: Yup.string(),
    home_page_type: Yup.mixed<HomePageType>()
      .oneOf(Object.values(HomePageType), translate('home_page_type_validation_msg'))
      .required(translate('home_page_type_required_msg')),
  })

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateOrgSchema),
    defaultValues: {
      home_page_type: home_page_type ?? HomePageType.Default,
      home_page_body: code ?? '',
    },
  })

  const pageTypeSelect = useWatch({
    control: methods.control,
    name: 'home_page_type',
    defaultValue: home_page_type ?? HomePageType.Default,
  })

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      if (id) {
        await updateOrg({ id, ...data }).unwrap()
        enqueueSnackbar(translate('messages_update_success'))
        methods.reset()
        handleClose()
      }
    } catch (e: any) {
      enqueueSnackbar(e.data.message ?? translate('message_error'), { variant: 'error' })
    }
  }

  return (
    <FormProvider
      methods={methods}
      onSubmit={methods.handleSubmit(onSubmit)}
      style={{ height: '100%' }}
    >
      <Stack
        justifyContent='space-between'
        height='100%'
      >
        <Stack gap={2}>
          <RHFSelect
            name='home_page_type'
            native
            label={translate('home_page_type')}
          >
            {Object.keys(HomePageType).map((c) => (
              <option
                key={HomePageType[c as keyof typeof HomePageType]}
                value={HomePageType[c as keyof typeof HomePageType]}
              >
                {c}
              </option>
            ))}
          </RHFSelect>
          {(!methods.formState.isDirty && home_page_type === HomePageType.Custom) ||
          pageTypeSelect === HomePageType.Custom ? (
            <Box sx={{ position: 'relative' }}>
              <RHFCode
                placeholder={translate('add_custom_html_code')}
                name='home_page_body'
                height='160px'
                extensions={[]}
              />
              <Box sx={{ position: 'absolute', right: '2px', bottom: '2px' }}>
                <ModalCodeFullscreen
                  title={translate('add_custom_html_code')}
                  name='home_page_body'
                />
              </Box>
            </Box>
          ) : null}
        </Stack>
        <Stack sx={{ flexDirection: 'row', justifyContent: 'flex-end', mt: 4, gap: 1 }}>
          <Button onClick={handleClose}>{translate('actions_close')}</Button>
          <LoadingButton
            type='submit'
            variant='contained'
            loading={isUpdating}
          >
            {translate('actions_update')}
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  )
}

export default LandingPageType
