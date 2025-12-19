import { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose'
import { useForm } from 'react-hook-form'

import { useAuthContext } from '@/auth/useAuthContext'
import { Role } from '@/redux/services/enums/role.enum'
import {
  useCreateCourseMutation,
  useUpdateCourseCoverMutation,
  useUpdateCourseMutation,
} from '@/redux/services/manager/courses-manager'
import { FormProvider, RHFUpload, SingleFilePreview, useSnackbar } from '@root/src/components'
import { useTranslate } from '@root/src/utils/translateHelper'

import {
  CONTROL_BTNS_BOX_SX,
  CreateCourseSchema,
  FormValuesGeneralProps,
  UPLOADED_FILE_CLOSE_SX,
  UPLOADED_TEXT_SX,
} from './constants'
import GeneralTabFields from './GeneralTabFields'

interface GeneralTabProps {
  defaultValues?: FormValuesGeneralProps
  isEdit?: boolean
  id: string
  refetch: () => void
  handleClose: () => void
}

function GeneralTab({ defaultValues, isEdit, id, refetch, handleClose }: GeneralTabProps) {
  const translate = useTranslate()
  const { enqueueSnackbar } = useSnackbar()
  const { user } = useAuthContext()
  const isSuperAdmin = user?.role === Role.SuperAdmin

  const [uploadedFile, setUploadedFile] = useState<null | File>(null)

  const [editCourse, { isLoading: isEditLoading }] = useUpdateCourseMutation()
  const [createCourse, { isLoading: isCreateLoading }] = useCreateCourseMutation()
  const [updateCover] = useUpdateCourseCoverMutation()

  const methods = useForm<FormValuesGeneralProps>({
    resolver: yupResolver(CreateCourseSchema(translate)),
    defaultValues,
  })

  const handleDrop = (files: File[]): void => {
    setUploadedFile(files[0])
  }

  const clearFileHandler = (): void => {
    setUploadedFile(null)
  }

  const onSubmit = async (data: FormValuesGeneralProps): Promise<void> => {
    try {
      const file = new FormData()
      if (isEdit && id) {
        await editCourse({
          id,
          ...data,
        }).unwrap()

        if (uploadedFile) {
          file.append('file', uploadedFile)
          await updateCover({ id, file }).unwrap()
        }
      } else {
        const course = await createCourse(data).unwrap()

        if (uploadedFile) {
          file.append('file', uploadedFile)
          await updateCover({ id: course.id, file }).unwrap()
        }
      }

      enqueueSnackbar(
        !isEdit ? translate('messages_create_success') : translate('messages_update_success')
      )
      if (refetch) refetch()
      methods.reset()
      handleClose()
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: 'error',
      })
    }
  }

  return (
    <>
      <FormProvider
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Stack gap={3}>
          <Box sx={{ position: 'relative' }}>
            {uploadedFile ? (
              <IconButton
                sx={UPLOADED_FILE_CLOSE_SX}
                onClick={clearFileHandler}
              >
                <IoMdClose size='20px' />
              </IconButton>
            ) : null}
            <RHFUpload
              name='course_img'
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant='caption'
                  noWrap
                  width='90px'
                  sx={UPLOADED_TEXT_SX}
                >
                  {uploadedFile?.name}
                </Typography>
              }
            />
            <SingleFilePreview file={uploadedFile ? URL.createObjectURL(uploadedFile) : null} />
          </Box>
          <GeneralTabFields isSuperAdmin={isSuperAdmin} />
        </Stack>
        <Box sx={CONTROL_BTNS_BOX_SX}>
          <Button
            color='error'
            variant='soft'
            onClick={handleClose}
          >
            {translate('actions_close')}
          </Button>
          <LoadingButton
            type='submit'
            variant='contained'
            loading={isEditLoading || isCreateLoading}
          >
            {translate('actions_save')}
          </LoadingButton>
        </Box>
      </FormProvider>
    </>
  )
}

export default GeneralTab
