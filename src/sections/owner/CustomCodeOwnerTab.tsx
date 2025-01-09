import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Box, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { FormProvider, RHFCode, useSnackbar } from '@/components'
import { useUpdateOrgMutation } from '@root/src/redux/services/manager/super-admin'
import { useTranslate } from '@root/src/utils/translateHelper'

interface CustomCodeOwnerTabProps {
  code?: string
  id: string
}

interface FormValuesProps {
  home_page_body: string
}

const CustomCodeOwnerTab = ({ code, id }: CustomCodeOwnerTabProps): React.ReactElement => {
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
              height='65vh'
              extensions={[]}
            />
          </Box>
        </Stack>
        <Stack sx={{ flexDirection: 'row', justifyContent: 'flex-end', mt: 4, gap: 1 }}>
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

export default CustomCodeOwnerTab
