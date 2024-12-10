import { useEffect, useMemo, useState } from 'react'

import { javascript } from '@codemirror/lang-javascript'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Box, Button, InputLabel, Stack, useTheme } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import {
  ConfirmDialog,
  FormProvider,
  RHFCode,
  RHFSelect,
  RHFTextField,
  useSnackbar,
} from '@/components'
import { ModalCodeFullscreen } from '@/components/modal-code-fullscreen'
import {
  useRemoveLessonStepPreloadFileMutation,
  useUpdateLessonStepPreloadFileMutation,
} from '@root/src/redux/services/manager/lesson-content-manager'
import { FileExtension } from '@root/src/types/lessons'
import { useTranslate } from '@root/src/utils/translateHelper'

import { INPUT_NAME_CONT_SX, INPUTS_CONT_SX, UPDATE_BOX_SX } from './constants'

interface FormValuesProps {
  name: string
  preloaded_code: string
  extension: FileExtension
}

interface PreloadFileItemProps {
  id: string
  name: string
  preloaded_code: string
  extension: FileExtension
  lessonId: string
  contentId: string
}

const PreloadFileItem = ({
  id,
  name,
  extension,
  preloaded_code,
  lessonId,
  contentId,
}: PreloadFileItemProps) => {
  const theme = useTheme()
  const translate = useTranslate()
  const { enqueueSnackbar } = useSnackbar()

  const [confirm, setConfirm] = useState<boolean>(false)

  const isDarkMode = useMemo(() => theme.palette.mode === 'dark', [theme.palette.mode])

  const [updateFile, { isLoading }] = useUpdateLessonStepPreloadFileMutation()
  const [removeFile] = useRemoveLessonStepPreloadFileMutation()

  const FileSchema = Yup.object().shape({
    name: Yup.string().required().trim(),
    extension: Yup.string().required(),
    preloaded_code: Yup.string(),
  })

  const defaultValues = {
    name: name ?? 'index',
    extension: (extension as FileExtension) ?? FileExtension.HTML,
    preloaded_code: preloaded_code ?? '',
  }

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(FileSchema),
    defaultValues,
  })

  const onSubmit = async (formData: FormValuesProps) => {
    function dirtyValues(dirtyFields: object | boolean, allValues: object): object {
      if (dirtyFields === true || Array.isArray(dirtyFields)) return allValues

      return Object.fromEntries(
        // @ts-ignore
        Object.keys(dirtyFields).map((key) => [key, dirtyValues(dirtyFields[key], allValues[key])])
      )
    }

    const updatedValues = dirtyValues(methods.formState.dirtyFields, formData)

    try {
      if (id) {
        await updateFile({
          lessonId,
          contentId,
          fileId: id,
          ...updatedValues,
        }).unwrap()
        enqueueSnackbar(translate('messages_edited'))
      }
    } catch (e: any) {
      enqueueSnackbar(e?.data?.message ?? translate('messages_error'), {
        variant: 'error',
      })
    }
  }

  const onRemuve = async () => {
    try {
      if (id) {
        removeFile({
          lessonId,
          contentId,
          fileId: id,
        }).unwrap()
        enqueueSnackbar(translate('messages_deleted'))
      }
    } catch (e: any) {
      enqueueSnackbar(translate('messages_error'))
    }
  }

  useEffect(() => {
    methods.reset({
      preloaded_code,
      name,
      extension,
    })
  }, [name, preloaded_code, extension])

  return (
    <>
      <FormProvider methods={methods}>
        <Stack sx={INPUTS_CONT_SX}>
          <Stack sx={INPUT_NAME_CONT_SX}>
            <InputLabel
              htmlFor='fileNameId'
              sx={{ color: isDarkMode ? '#fff' : '#333' }}
            >
              {translate('lesson_file_name')}
            </InputLabel>
            <RHFTextField
              sx={{
                maxWidth: '150px',
                '& .MuiInputBase-root': {
                  background: isDarkMode ? 'initial' : '#fff',
                },
              }}
              size='small'
              id='fileNameId'
              name='name'
            />
          </Stack>
          <RHFSelect
            native
            name='extension'
            size='small'
            sx={{
              maxWidth: '150px',
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
        <ModalCodeFullscreen
          title={translate('code_will_preload')}
          name='preloaded_code'
        />
        <RHFCode
          placeholder={translate('code_will_preload')}
          name='preloaded_code'
          height='150px'
          extensions={[javascript({ jsx: true })]}
        />
        <Box sx={UPDATE_BOX_SX}>
          <LoadingButton
            variant='contained'
            type='button'
            onClick={methods.handleSubmit(onSubmit)}
            loading={isLoading}
            disabled={!methods.formState.isDirty}
          >
            {translate('messages_lesson_file_update')}
          </LoadingButton>
          <Button
            onClick={() => setConfirm(true)}
            color='error'
          >
            {translate('messages_lesson_file_delete')}
          </Button>
        </Box>
      </FormProvider>
      <ConfirmDialog
        open={confirm}
        onClose={() => setConfirm(false)}
        title={`${translate('messages_lesson_file_delete')} ${methods.getValues('name')}?`}
        content={translate('messages_delete_question')}
        action={
          <Button
            variant='contained'
            color='error'
            onClick={() => {
              onRemuve().then(() => setConfirm(false))
            }}
          >
            {translate('messages_lesson_file_delete')}
          </Button>
        }
      />
    </>
  )
}

export default PreloadFileItem
