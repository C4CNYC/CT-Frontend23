import { useMemo, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Stack, useTheme } from '@mui/material'
import { IoCloseOutline } from '@react-icons/all-files/io5/IoCloseOutline'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { FormProvider, RHFTextField, RHFSelect } from '@/components'
import { StudentFile } from '@root/src/redux/services/interfaces/workspace.interface'
import { FileExtension } from '@root/src/types/lessons'
import { useTranslate } from '@root/src/utils/translateHelper'

interface AddStudentFileModalProps {
  children?: React.ReactElement
  onSubmit: (fileName: string) => Promise<void>
  files: StudentFile[]
}

interface FormValuesProps {
  fileName: string
  fileExtension: FileExtension
}

const AddStudentFileModal = ({ children, onSubmit, files }: AddStudentFileModalProps) => {
  const theme = useTheme()
  const translate = useTranslate()
  const { enqueueSnackbar } = useSnackbar()

  const [open, setOpenDialog] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const isDarkMode = useMemo(() => theme.palette.mode === 'dark', [theme.palette.mode])

  const CreateStudentFileSchema = Yup.object().shape({
    fileName: Yup.string()
      .required(translate('required_title'))
      .test(
        'no-dots',
        translate('file_name_should_not_contain_dots'),
        (value) => !value?.includes('.')
      )
      .test(
        'unique-file',
        translate('file_with_same_name_and_extension_exists'),
        (value, context) => {
          const extension = context.parent.fileExtension
          return !files.some((file) => file.name === value && file.extension === extension)
        }
      ),
    fileExtension: Yup.string(),
  })

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateStudentFileSchema),
    defaultValues: {
      fileName: '',
      fileExtension: FileExtension.HTML,
    },
  })

  const onAdd = async (data: FormValuesProps) => {
    setIsLoading(true)

    try {
      await onSubmit(`${data.fileName.trim()}.${data.fileExtension}`)
    } catch (e) {
      enqueueSnackbar({ message: translate('messages_error'), variant: 'error' })
      return
    } finally {
      setIsLoading(false)
      methods.reset()
    }

    enqueueSnackbar(translate('messages_added'))
    setOpenDialog(false)
  }

  return (
    <>
      <Box
        onClick={() => {
          setOpenDialog(true)
        }}
      >
        {children}
      </Box>
      <Dialog
        fullWidth
        maxWidth='xs'
        open={open}
        onClose={() => {
          setOpenDialog(false)
        }}
      >
        <DialogTitle>
          {translate('add_file_madal_title')}
          <IconButton
            sx={{
              position: 'absolute',
              top: 18,
              right: 12,
            }}
          >
            <IoCloseOutline
              size={20}
              onClick={() => setOpenDialog(false)}
            />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <FormProvider
            onSubmit={methods.handleSubmit(onAdd)}
            methods={methods}
          >
            <Stack
              direction='row'
              gap={2}
            >
              <Stack gap={1}>
                <RHFTextField
                  label={translate('file_name_label')}
                  name='fileName'
                  size='small'
                  autoFocus
                  sx={{
                    mt: 1,
                    color: '#333',
                    '& .MuiOutlinedInput-root': {
                      background: isDarkMode ? theme.palette.background.default : '#fff',
                    },
                  }}
                />
              </Stack>
              <Stack
                width='100%'
                maxWidth='150px'
                gap={1}
              >
                <RHFSelect
                  native
                  label={translate('file_extension_label')}
                  name='fileExtension'
                  size='small'
                  sx={{
                    mt: 1,
                    '& .MuiInputBase-root': {
                      background: isDarkMode ? 'initial' : '#fff',
                    },
                  }}
                >
                  {Object.keys(FileExtension).map((t) => (
                    <option
                      key={FileExtension[t as keyof typeof FileExtension]}
                      value={FileExtension[t as keyof typeof FileExtension]}
                    >
                      {t}
                    </option>
                  ))}
                </RHFSelect>
              </Stack>
            </Stack>
            <LoadingButton
              type='submit'
              fullWidth
              loading={isLoading}
              sx={{
                mt: 3,
                mb: 3,
                background: '#212B36',
                color: '#fff',
                '&:hover': {
                  background: '#34414F',
                },
              }}
            >
              {translate('add_file_btn')}
            </LoadingButton>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  )
}
export default AddStudentFileModal
