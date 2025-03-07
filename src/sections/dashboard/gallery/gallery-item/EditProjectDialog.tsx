import { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import { IoClose } from '@react-icons/all-files/io5/IoClose'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { FormProvider, RHFSwitch, RHFTextField } from '@/components'
import { APIError } from '@/redux/interfaces/custom-error.interface'
import { useUpdateProjectMutation } from '@/redux/services/manager/gallery-student'
import { useTranslate } from '@root/src/utils/translateHelper'

import { useGalleryContext } from '../context/gallery-context'

interface Props {
  children: React.ReactElement
}
interface FormValuesProps {
  name: string
  description: string
  public: boolean
  language: string
}

export default function EditProjectDialog({ children }: Props): React.ReactElement {
  const translate = useTranslate()
  const { enqueueSnackbar } = useSnackbar()
  const { title, description, public: projectPublic, id } = useGalleryContext()

  const [open, setOpen] = useState<boolean>(false)

  const [updateProject, { isLoading }] = useUpdateProjectMutation()

  const handleClickOpen = (): void => {
    setOpen(true)
  }
  const handleClickClose = (): void => {
    setOpen(false)
  }

  const defaultValues = {
    title,
    description,
    public: projectPublic,
    language: 'html',
  }

  const CreateProjectSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    public: Yup.bool(),
    language: Yup.string(),
  })

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateProjectSchema),
    defaultValues,
  })

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      await updateProject({
        id,
        ...data,
      }).unwrap()
      enqueueSnackbar(translate('messages_success'))
    } catch (error: any) {
      const typedError = error as APIError
      enqueueSnackbar(typedError.data.message, {
        variant: 'error',
      })
    }
    handleClickClose()
  }

  return (
    <>
      <Box onClick={handleClickOpen}>{children}</Box>
      <Dialog
        open={open}
        onClose={handleClickClose}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 1,
          }}
        >
          <Typography variant='h6'>{translate('gallery_edit_dialog_title')}</Typography>
          <IconButton
            onClick={handleClickClose}
            edge='end'
          >
            <IoClose size='22px' />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <FormProvider
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Grid
              item
              xs={12}
              md={12}
              p={2}
            >
              <Box
                rowGap={3}
                display='grid'
              >
                <RHFTextField
                  sx={{ width: { xs: '300px', sm: '350px' } }}
                  name='title'
                  label={translate('gallery_edit_dialog_name')}
                  required
                />

                <RHFTextField
                  name='description'
                  label={translate('gallery_edit_dialog_description')}
                  required
                  multiline
                  rows={5}
                />

                <RHFSwitch
                  name='public'
                  label={translate('gallery_edit_dialog_visibility')}
                />
              </Box>
            </Grid>
            <DialogActions>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 2,
                }}
              >
                <Button
                  onClick={() => {
                    setOpen(false)
                  }}
                >
                  {translate('actions_close')}
                </Button>
                <LoadingButton
                  type='submit'
                  variant='contained'
                  loading={isLoading}
                >
                  {translate('actions_save')}
                </LoadingButton>
              </Box>
            </DialogActions>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  )
}
