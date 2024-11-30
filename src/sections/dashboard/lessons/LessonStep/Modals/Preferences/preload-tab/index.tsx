import { useMemo } from 'react'

import { LoadingButton } from '@mui/lab'
import { Skeleton, Stack, useTheme } from '@mui/material'
import { useSnackbar } from 'notistack'

import { EmptyContent, Iconify } from '@root/src/components'
import {
  useAddLessonStepPreloadFileMutation,
  useGetLessonSlidePreloadFilesQuery,
} from '@root/src/redux/services/manager/lesson-content-manager'
import { FileExtension } from '@root/src/types/lessons'
import { useTranslate } from '@root/src/utils/translateHelper'

import { getAssetBtnSx } from './constants'
import PreloadFileItem from './PreloadFileItem'

interface PreloadTabProps {
  lessonId: string
  contentId: string
}

const PreloadTab = ({ lessonId, contentId }: PreloadTabProps) => {
  const { enqueueSnackbar } = useSnackbar()
  const translate = useTranslate()
  const theme = useTheme()
  const isDarkMode = useMemo(() => theme.palette.mode === 'dark', [theme.palette.mode])
  const addAssetSx = useMemo(() => getAssetBtnSx(isDarkMode), [isDarkMode])

  const { data, isLoading } = useGetLessonSlidePreloadFilesQuery({
    lessonId,
    contentId,
  })
  const [postFile, { isLoading: isCreating }] = useAddLessonStepPreloadFileMutation()

  const onCreate = async () => {
    try {
      await postFile({
        lessonId,
        contentId,
        extension: FileExtension.HTML,
        name: generateRandomName(),
        preloaded_code: '',
      }).unwrap()
      enqueueSnackbar(translate('messages_added'))
    } catch (e) {
      enqueueSnackbar(translate('messages_error'), { variant: 'error' })
    }
  }

  if (isLoading) {
    return (
      <Skeleton
        variant='rectangular'
        width='100%'
        height='400px'
      />
    )
  }

  return (
    <>
      <Stack gap={3}>
        {!data?.length ? (
          <EmptyContent title='Add Preload' />
        ) : (
          data.map((el) => (
            <PreloadFileItem
              name={el.name}
              extension={el.extension as FileExtension}
              preloaded_code={el.preloaded_code}
              id={el.id}
              lessonId={lessonId}
              contentId={contentId}
              key={el.id}
            />
          ))
        )}
      </Stack>
      <Stack sx={{ position: 'absolute', bottom: '24px', right: '24px' }}>
        <LoadingButton
          onClick={onCreate}
          loading={isCreating}
          sx={addAssetSx}
        >
          <Iconify icon='humbleicons:plus' />
          {translate('lesson_file_add_asset')}
        </LoadingButton>
      </Stack>
    </>
  )
}

function generateRandomName() {
  return Math.random().toString(36).substring(7)
}

export default PreloadTab
