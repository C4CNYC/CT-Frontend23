import { useMemo } from 'react'

import { LoadingButton } from '@mui/lab'
import { Skeleton, Stack, useTheme } from '@mui/material'
import { FaPlus } from '@react-icons/all-files/fa6/FaPlus'
import { useSnackbar } from 'notistack'

import { EmptyContent } from '@root/src/components'
import { useAddLessonStepPreloadFileMutation } from '@root/src/redux/services/manager/lesson-content-manager'
import { useGetLessonSlidePreloadFilesQuery } from '@root/src/redux/services/manager/lesson-content-manager'
import { FileExtension } from '@root/src/types/lessons'
import { useTranslate } from '@root/src/utils/translateHelper'

import { getAssetBtnSx } from './constants'
import { useUniqueFilename } from './hooks/useUniqueFilename'
import PreloadFileItem from './PreloadFileItem'

interface PreloadTabProps {
  lessonId: string
  contentId: string
}

const PreloadTab = ({ lessonId, contentId }: PreloadTabProps) => {
  const theme = useTheme()
  const translate = useTranslate()
  const { enqueueSnackbar } = useSnackbar()

  const isDarkMode = useMemo(() => theme.palette.mode === 'dark', [theme.palette.mode])
  const addAssetSx = useMemo(() => getAssetBtnSx(isDarkMode), [isDarkMode])

  const [postFile, { isLoading: isCreating }] = useAddLessonStepPreloadFileMutation()
  const { getUniqueName } = useUniqueFilename(lessonId, contentId)
  const { data, isLoading } = useGetLessonSlidePreloadFilesQuery({ lessonId, contentId })

  const onCreate = async () => {
    const fileName = await getUniqueName(FileExtension.HTML)

    try {
      await postFile({
        lessonId,
        contentId,
        extension: FileExtensions.HTML,
        name: fileName,
        preloaded_code: '',
      }).unwrap()
      enqueueSnackbar(translate('messages_added'))
    } catch (e: any) {
      enqueueSnackbar(e?.data?.message ?? translate('messages_error'), {
        variant: 'error',
      })
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
              getUniqueName={getUniqueName}
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
          <FaPlus />
          {translate('lesson_file_add_asset')}
        </LoadingButton>
      </Stack>
    </>
  )
}

export default PreloadTab
