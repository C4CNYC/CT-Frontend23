import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Button, Stack } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { FormProvider } from '@root/src/components'
import { OrgOwnerAutocomplete } from '@root/src/components/org-owner-autocomplete'
import { IOwnerType } from '@root/src/components/org-owner-autocomplete/OrgOwnerAutocomplete'
import { useTranslate } from '@root/src/utils/translateHelper'

interface OwnerTabProps {
  handleClose: () => void
  orgId: string
  owner: IOwnerType | null
}

interface FormValuesProps {
  ownerId: string
}

const OwnerTab = ({ handleClose, orgId, owner }: OwnerTabProps): React.ReactElement => {
  const translate = useTranslate()
  const { enqueueSnackbar } = useSnackbar()

  const CreateOrgSchema = Yup.object().shape({
    home_page_body: Yup.string(),
  })

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateOrgSchema),
    defaultValues: {
      ownerId: '',
    },
  })

  // const onSubmit = async (data: FormValuesProps): Promise<void> => {
  //   try {
  //     if (orgId) {
  //       enqueueSnackbar(translate('messages_update_success'))
  //       methods.reset()
  //       handleClose()
  //     }
  //   } catch (e: any) {
  //     enqueueSnackbar(e.data.message ?? translate('message_error'), { variant: 'error' })
  //   }
  // }

  return (
    <FormProvider
      methods={methods}
      // onSubmit={methods.handleSubmit(onSubmit)}
      style={{ height: '100%' }}
    >
      <Stack
        justifyContent='space-between'
        height='100%'
      >
        <Stack>
          <OrgOwnerAutocomplete
            orgId={orgId}
            owner={owner}
          />
        </Stack>
        <Stack sx={{ flexDirection: 'row', justifyContent: 'flex-end', mt: 4, gap: 1 }}>
          <Button onClick={handleClose}>{translate('actions_close')}</Button>
          <LoadingButton
            type='submit'
            variant='contained'
            loading={false}
          >
            {translate('actions_update')}
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  )
}

export default OwnerTab
