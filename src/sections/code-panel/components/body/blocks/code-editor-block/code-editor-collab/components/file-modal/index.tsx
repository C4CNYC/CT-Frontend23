import { type FC, useEffect, useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import Close from '@mui/icons-material/Close'
import FolderIcon from '@mui/icons-material/Folder'
import { Button, ClickAwayListener, Stack, Typography, IconButton } from '@mui/material'
import { useTheme } from '@mui/system'
import { useRouter } from 'next/router'

import { useGetLessonStudentWithoutContentsQuery } from '@/redux/services/manager/lesson-student'
import { ConfirmDialog } from '@root/src/components'
import { StudentFile } from '@root/src/redux/services/interfaces/workspace.interface'
import { useTranslate } from '@root/src/utils/translateHelper'

import { useFileManager } from '../../hook/file-manager/useFileManager'
import DevIcon from '../dev-icon'

import AddStudentFileModal from './AddStudentFileModal'
import { useStyles } from './styles'

interface FileModalProps {
  isOpen: boolean
  files: StudentFile[]
  isFileControllerAvailable: boolean

  onDeleteFile: (id: string) => void
  setActiveFile: (id: string) => void
  setIsOpen: (isOpen: boolean) => void
  onAddFile: (fileName: string) => Promise<void>
}

const FileModal: FC<FileModalProps> = ({
  files,
  isOpen,
  isFileControllerAvailable,
  onAddFile,
  setIsOpen,
  onDeleteFile,
  setActiveFile,
}) => {
  const theme = useTheme()
  const translate = useTranslate()
  const styles = useStyles(theme)
  const router = useRouter()
  const fileManager = useFileManager()

  const { data: lesson, isLoading: isLoadingLesson } = useGetLessonStudentWithoutContentsQuery(
    { id: router.query.lessonId as string },
    { skip: !router.query.lessonId }
  )
  const [isDeleteExist, setIsDeleteExist] = useState<boolean>(false)
  const [fileToDelete, setFileToDelete] = useState<Pick<
    StudentFile,
    'id' | 'name' | 'extension'
  > | null>(null)

  const onSubmitDelete = () => {
    if (fileToDelete == null) {
      return
    }

    onDeleteFile(fileToDelete.id as string)
    setFileToDelete(null)
  }

  useEffect(() => {
    if (files.length > 1) {
      setIsDeleteExist(true)
    }
  }, [files])

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <Stack>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          sx={styles.FOLDER_BUTTON_SX}
          disabled={!isFileControllerAvailable}
        >
          <FolderIcon />
        </Button>

        <Stack
          sx={{
            ...styles.STACK_SX,
            ...(isOpen ? styles.STACK_SX_ACTIVE : {}),
          }}
        >
          <Stack
            direction='row'
            alignItems='center'
            gap={1}
          >
            <Typography
              variant='h5'
              color='#e0e3ea'
            >
              {translate('file_manager_title')}
            </Typography>
            <AddStudentFileModal
              onSubmit={onAddFile}
              files={files}
              isAllowMultipleSameType={Boolean(lesson?.meta?.is_allow_multiple_same_type)}
            >
              <IconButton>
                <AddIcon />
              </IconButton>
            </AddStudentFileModal>
          </Stack>

          <Stack>
            {files
              .filter((f) => f.extension.toLocaleLowerCase() !== 'test')
              .map(({ id, name, extension }) => {
                return (
                  <Stack
                    key={id}
                    sx={styles.BUTTON_WRAPPER}
                  >
                    <Button
                      onClick={() => setActiveFile(id ?? '')}
                      sx={styles.BUTTON_FILE_SX}
                      variant='text'
                    >
                      <DevIcon
                        sx={styles.devIcon}
                        fileName={`${name}.${extension}`}
                      />
                      <Typography
                        variant='subtitle2'
                        noWrap
                        textOverflow='ellipsis'
                      >
                        {name}.{extension}
                      </Typography>
                    </Button>

                    {isDeleteExist && (
                      <IconButton
                        size='small'
                        onClick={() => setFileToDelete({ id, name, extension })}
                      >
                        <Close />
                      </IconButton>
                    )}
                  </Stack>
                )
              })}
          </Stack>
        </Stack>

        <ConfirmDialog
          open={fileToDelete != null}
          onClose={() => setFileToDelete(null)}
          title={
            <Typography variant='body1'>
              {translate('delete_file_confirm_1')}{' '}
              <Typography
                variant='h6'
                display='inline-flex'
              >
                {fileToDelete?.name}.{fileToDelete?.extension}
              </Typography>{' '}
              {translate('delete_file_confirm_2')}
            </Typography>
          }
          action={
            <Button
              color='error'
              onClick={onSubmitDelete}
              variant='contained'
            >
              {translate('delete_file_btn')}
            </Button>
          }
        />
      </Stack>
    </ClickAwayListener>
  )
}

export default FileModal
