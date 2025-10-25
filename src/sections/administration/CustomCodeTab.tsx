import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { FormProvider, RHFCode, useSnackbar } from '@/components'
import { ModalCodeFullscreen } from '@root/src/components/modal-code-fullscreen'
import { useUpdateOrgMutation } from '@root/src/redux/services/manager/super-admin'
import { useTranslate } from '@root/src/utils/translateHelper'

interface CustomCodeTabProps {
  handleClose: () => void
  code?: string
  id: string
}

interface FormValuesProps {
  home_page_body: string
}

const CustomCodeTab = ({ handleClose, code, id }: CustomCodeTabProps): React.ReactElement => {
  const translate = useTranslate()
  const { enqueueSnackbar } = useSnackbar()

  const [updateOrg, { isLoading: isUpdating }] = useUpdateOrgMutation()

  const CreateOrgSchema = Yup.object().shape({
    home_page_body: Yup.string(),
  })

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateOrgSchema),
    defaultValues: {
      home_page_body: code ?? '',
    },
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
          <Box sx={{ position: 'relative' }}>
            <RHFCode
              placeholder={translate('add_custom_html_code')}
              name='home_page_body'
              height='180px'
              extensions={[]}
            />
            <Box sx={{ position: 'absolute', right: '2px', bottom: '2px' }}>
              <ModalCodeFullscreen
                title={translate('add_custom_html_code')}
                name='home_page_body'
              />
            </Box>
          </Box>
        </Stack>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '100%',
            padding: '15px 25px',
            background: '#F6F9FC',
          }}
        >
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
        </div>
      </Stack>
    </FormProvider>
  )
}

export default CustomCodeTab
