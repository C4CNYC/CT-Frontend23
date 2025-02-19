import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Button, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { FormProvider, RHFSelect, RHFTextField, useSnackbar } from '@/components'
import { HomePageType } from '@root/src/redux/services/enums/administration.enum'
import { IAdministration } from '@root/src/redux/services/interfaces/administration'
import {
  useCreateOrgMutation,
  useUpdateOrgMutation,
} from '@root/src/redux/services/manager/super-admin'
import { useTranslate } from '@root/src/utils/translateHelper'

import { FormValuesProps } from './constants'
import { DomainFields } from './DomainFields'

interface MainTabProps {
  handleClose: () => void
  org?: IAdministration
}

const MainTab = ({ handleClose, org }: MainTabProps): React.ReactElement => {
  const translate = useTranslate()
  const { enqueueSnackbar } = useSnackbar()

  const [createOrg, { isLoading }] = useCreateOrgMutation()
  const [updateOrg, { isLoading: isUpdating }] = useUpdateOrgMutation()

  const CreateOrgSchema = Yup.object().shape({
    name: Yup.string().required(translate('name_validation_msg')),
    slug: Yup.string()
      .matches(/^[a-z0-9-]+$/, translate('slug_validation_msg_1'))
      .transform((value) => (value ? value.toLowerCase().trim() : value))
      .required('slug_validation_msg_2'),
    domain: Yup.string()
      .transform((value) => ',' + value.join(',') + ',')
      .required('domain_validation_msg'),
    home_page_type: Yup.mixed<HomePageType>()
      .oneOf(Object.values(HomePageType), translate('home_page_type_validation_msg'))
      .required(translate('home_page_type_required_msg')),
  })

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateOrgSchema),
    defaultValues: {
      name: org?.name,
      slug: org?.slug,
      domain: org?.domain?.split(',').filter(Boolean) ?? [],
      home_page_type: org?.home_page_type ?? HomePageType.Default,
    },
  })

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      let domain = Array.isArray(data.domain) ? data.domain.join(',') : data.domain || ''
      if (org) {
        await updateOrg({ id: org.id, ...data, domain }).unwrap()
        enqueueSnackbar(translate('messages_update_success'))
      } else {
        await createOrg({ ...data, domain }).unwrap()
        enqueueSnackbar(translate('messages_create_success'))
        methods.reset()
        handleClose()
      }
    } catch (e: any) {
      enqueueSnackbar(e?.data?.message ?? translate('message_error'), { variant: 'error' })
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
          <RHFTextField
            name='name'
            label={translate('create_new_name_label')}
            required
          />
          <RHFTextField
            name='slug'
            label={translate('create_new_slug_label')}
            required
          />
          <DomainFields />
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
            gap: 1,
          }}
        >
          <Button onClick={handleClose}>{translate('actions_close')}</Button>
          <LoadingButton
            type='submit'
            variant='contained'
            loading={isLoading || isUpdating}
          >
            {translate(org ? 'actions_update' : 'actions_create')}
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  )
}

export default MainTab
