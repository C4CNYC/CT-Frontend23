import { type FC, useState, useMemo } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { useForm } from 'react-hook-form'
import { object, string, boolean } from 'yup'

// eslint-disable-next-line import/order
import {
  usePostProjectMutation,
  useUpdateProjectCoverMutation,
} from '@/redux/services/manager/gallery-student'

// import { getImageFromCode } from "src/lib/utils/getImageFromCode";
import { FormProvider } from '@root/src/components/hook-form/FormProvider'
import { RHFTextField } from '@root/src/components/hook-form/RHFTextField'
import { useSnackbar } from '@root/src/components/snackbar'
import { useTranslate } from '@root/src/utils/translateHelper'

import { DIALOG_SX, BASE_BOX_SX } from './constants'

interface IPublishModal {
  children: React.ReactElement
  code: string
  language: string
  isPublic: boolean
}

interface FormValuesProps {
  title: string
  description: string
  public: boolean
}

const PublishModal: FC<IPublishModal> = ({ children, code, language, isPublic }) => {
  const defaultValues = useMemo(() => getDefaultValues(isPublic), [isPublic])
  const { enqueueSnackbar } = useSnackbar()
  const translate = useTranslate()

  const [open, setOpen] = useState(false)
  const [postProject, { isLoading }] = usePostProjectMutation()
  const [updateCover, { isLoading: isUpdatingCover }] = useUpdateProjectCoverMutation()
  const handleClickOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateProjectSchema),
    defaultValues,
  })

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    const file = new FormData()
    const { getImageFromCode } = await import('@/utils/getImageFromCode')

    const cover = await getImageFromCode()
    try {
      const postedProject = await postProject({
        ...data,
        body: JSON.stringify({
          body: {
            code,
          },
        }),
        language,
      }).unwrap()
      if (cover) {
        file.append('file', cover)
        await updateCover({ id: postedProject.id as string, file }).unwrap()
      }
      enqueueSnackbar('Added successfully!')
      methods.reset()
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: 'error',
      })
    }
    handleClose()
  }

  return (
    <>
      <Box
        onClick={handleClickOpen}
        sx={BASE_BOX_SX}
      >
        {children}
      </Box>

      {open ? (
        <Dialog
          maxWidth='sm'
          open={open}
          keepMounted
          onClose={handleClose}
          fullWidth
          sx={DIALOG_SX}
        >
          <DialogTitle>{isPublic ? 'PUBLISH' : 'SAVE'}</DialogTitle>

          <FormProvider
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <DialogContent>
              <Stack
                gap={3}
                p={1}
              >
                <RHFTextField
                  name='title'
                  label='Title'
                  required
                />

                <RHFTextField
                  multiline
                  rows={5}
                  name='description'
                  label='Description'
                  required
                />
              </Stack>
            </DialogContent>

            <DialogActions>
              <Button
                color='error'
                onClick={handleClose}
                sx={{ textTransform: 'uppercase' }}
              >
                {translate('actions_cancel')}
              </Button>

              <LoadingButton
                type='submit'
                variant='contained'
                loading={isLoading || isUpdatingCover}
                sx={{ textTransform: 'uppercase' }}
              >
                {translate('actions_save')}
              </LoadingButton>
            </DialogActions>
          </FormProvider>
        </Dialog>
      ) : null}
    </>
  )
}

const CreateProjectSchema = object().shape({
  title: string().required('Title is required'),
  description: string().required('Description is required'),
  public: boolean(),
})

const getDefaultValues = (isPublic: boolean): FormValuesProps => ({
  title: '',
  description: '',
  public: isPublic,
})

export default PublishModal
