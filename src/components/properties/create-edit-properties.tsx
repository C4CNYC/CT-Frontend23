import React from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material'
import { Box } from '@mui/system'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { FormProvider, RHFSelect, RHFTextField } from '@/components'
import {
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
} from '@/redux/services/manager/properties-manager'
import { useTranslate } from '@/utils/translateHelper'
import { useBoolean } from '@root/src/hooks/useBoolean'
import {
  IProperty,
  PropertyEntityType,
  PropertyEntityTypes,
} from '@root/src/redux/services/interfaces/properties.interface'

export const propertiesSchema = Yup.object().shape({
  entityType: Yup.mixed<PropertyEntityType>()
    .oneOf([...PropertyEntityTypes], 'Invalid entity type')
    .required('Entity type is required'),
  entityId: Yup.string().required('Entity ID is required'),
  propertyName: Yup.string().required('Property name is required'),
  propertyValue: Yup.string().required('Property value is required'),
})

interface propertiesForm extends Partial<IProperty> {}

interface Prop {
  id?: string
  defaultValues?: propertiesForm
  children: React.ReactElement
  isEdit?: boolean
}
export function PropertiesCreateEdit({
  isEdit = false,
  children,
  id,
  defaultValues = {
    entityType: 'lesson',
  },
}: Prop): React.ReactElement {
  const translate = useTranslate()
  const { enqueueSnackbar } = useSnackbar()
  const [open, handleOpen, handleClose] = useBoolean(false)
  const [createproperties, { isLoading: creatLoading }] = useCreatePropertyMutation()
  const [updateproperties, { isLoading: updateLoading }] = useUpdatePropertyMutation()

  const methods = useForm<IProperty>({
    resolver: yupResolver(propertiesSchema),
    defaultValues,
  })

  const onSubmit = async (data: IProperty): Promise<void> => {
    try {
      enqueueSnackbar(
        id ? translate('properties_updated_msg') : translate('properties_created_msg')
      )
    } catch (e: any) {
      enqueueSnackbar(translate('messages_error'), { variant: 'error' })
    }
    if (id) {
      await updateproperties({ ...data, id }).unwrap()
    } else {
      await createproperties(data).unwrap()
    }
    methods.reset()
    handleClose()
  }
  const onCancel = (): void => {
    methods.reset()
    handleClose()
  }

  return (
    <>
      <div onClick={handleOpen}>{children}</div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
      >
        <DialogTitle sx={{ pb: 2 }}>{translate('properties_create_int')}</DialogTitle>
        <FormProvider
          methods={methods}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <DialogContent>
            <Stack gap={2}>
              <Box>
                <RHFSelect
                  placeholder={translate('entityType')}
                  name='entityType'
                  title='lesson, user etc.'
                >
                  {PropertyEntityTypes.map((pet) => (
                    <option
                      key={pet}
                      value={pet}
                    >
                      {pet}
                    </option>
                  ))}
                </RHFSelect>
              </Box>
              <Box>
                <RHFTextField
                  placeholder={translate('entityId')}
                  name='entityId'
                  title='uuid of entity id'
                />
              </Box>
              <Box>
                <RHFTextField
                  placeholder={translate('propertyName')}
                  name='propertyName'
                  title='aiTemplate, lock etc.'
                />
              </Box>
              <Box>
                <RHFTextField
                  placeholder={translate('propertyValue')}
                  name='propertyValue'
                />
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              variant='outlined'
              color='inherit'
              onClick={onCancel}
            >
              {translate('actions_cancel')}
            </Button>
            <LoadingButton
              loading={creatLoading || updateLoading}
              variant='contained'
              color='primary'
              type='submit'
            >
              {translate('actions_save')}
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  )
}
