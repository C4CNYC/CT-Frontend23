import { useMemo } from 'react'

import { LoadingButton } from '@mui/lab'
import { Skeleton, Stack, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
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

const PreloadTab = () => {
  const { query } = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const translate = useTranslate()
  const theme = useTheme()
  const isDarkMode = useMemo(() => theme.palette.mode === 'dark', [theme.palette.mode])
  const addAssetSx = useMemo(() => getAssetBtnSx(isDarkMode), [isDarkMode])

  const { data, isLoading } = useGetLessonSlidePreloadFilesQuery({
    lessonId: query.lessonId as string,
    contentId: query.stepId as string,
  })
  const [postFile, { isLoading: isCreating }] = useAddLessonStepPreloadFileMutation()

  const onCreate = async () => {
    try {
      await postFile({
        lessonId: query.lessonId as string,
        contentId: query.stepId as string,
        extension: FileExtension.HTML,
        name: 'index',
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

export default PreloadTab
