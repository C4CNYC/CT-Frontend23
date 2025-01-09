import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { FormProvider, RHFSelect, RHFTextField, useSnackbar } from '@/components'
import { useUpdateOwnerOrgMutation } from '@root/src/redux/services/admin/organization-admin'
import { HomePageType } from '@root/src/redux/services/enums/administration.enum'
import { IAdministration } from '@root/src/redux/services/interfaces/administration'
import { useTranslate } from '@root/src/utils/translateHelper'

import { FormValuesProps } from './constants'

interface MainTabProps {
  org?: IAdministration
}

const MainOwnerTab = ({ org }: MainTabProps): React.ReactElement => {
  const translate = useTranslate()
  const { enqueueSnackbar } = useSnackbar()

  const [updateOrg, { isLoading: isUpdating }] = useUpdateOwnerOrgMutation()

  const CreateOrgSchema = Yup.object().shape({
    name: Yup.string().required(translate('name_validation_msg')),
    home_page_type: Yup.mixed<HomePageType>()
      .oneOf(Object.values(HomePageType), translate('home_page_type_validation_msg'))
      .required(translate('home_page_type_required_msg')),
  })

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateOrgSchema),
    defaultValues: {
      name: org?.name,
      home_page_type: org?.home_page_type,
    },
  })

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      if (org) {
        await updateOrg({ id: org.id, ...data }).unwrap()
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
        <Stack gap={4}>
          <RHFTextField
            name='name'
            label={translate('create_new_name_label')}
            required
          />

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
        </Stack>
        <Stack
          sx={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            mt: 5,
          }}
        >
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

export default MainOwnerTab
