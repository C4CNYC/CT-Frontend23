import { type FC, useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import Close from '@mui/icons-material/Close'
import FolderIcon from '@mui/icons-material/Folder'
import { Button, ClickAwayListener, Stack, Typography, IconButton } from '@mui/material'
import { useTheme } from '@mui/system'

import { EditorMode } from '../../hook/constants'
import { File } from '../../hook/requests'
import DevIcon from '../dev-icon'

import ConfirmModalWrapper from './confirm-wrapper-modal'
import FileForm from './file-form'
import { useStyles } from './styles'

interface FileModalProps {
  setActiveFile: (fileName: File) => void
  isOpen: boolean
  fileList: File[]
  isFileFormOpen: boolean
  setIsFileFormOpen: (fileName: boolean) => void
  setIsOpen: (isOpen: boolean) => void
  onAddFile: (fileName: string) => Promise<void>
  onDeleteFile: (fileName: File) => void
  mode: EditorMode
  isMultipleExtensionFiles: boolean
}

const FileModal: FC<FileModalProps> = ({
  setActiveFile,
  isOpen,
  fileList,
  isFileFormOpen,
  setIsFileFormOpen,
  onAddFile,
  setIsOpen,
  onDeleteFile,
  mode,
  isMultipleExtensionFiles,
}) => {
  const theme = useTheme()
  const styles = useStyles(theme)
  const [fileToDelete, setFileToDelete] = useState<File | null>(null)

  const onSubmitDelete = () => {
    if (fileToDelete == null) {
      return
    }

    onDeleteFile(fileToDelete)
    setFileToDelete(null)
  }

  const isDeleteExist = fileList.length > 1 && mode === EditorMode.Owner

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <Stack>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          sx={styles.FOLDER_BUTTON_SX}
        >
          <FolderIcon />
        </Button>

        <Stack
          sx={{
            ...styles.STACK_SX,
            ...(isOpen ? styles.STACK_SX_ACTIVE : {}),
          }}
        >
          <Typography
            variant='h5'
            color='#e0e3ea'
          >
            Files
            <IconButton onClick={() => setIsFileFormOpen(true)}>
              <AddIcon />
            </IconButton>
          </Typography>

          <Stack>
            {fileList.map((file) => {
              return (
                <Stack
                  key={file._id}
                  sx={styles.BUTTON_WRAPPER}
                >
                  <Button
                    onClick={() => setActiveFile(file)}
                    sx={styles.BUTTON_FILE_SX}
                    variant='text'
                  >
                    <DevIcon
                      sx={styles.devIcon}
                      fileName={`${file.name}.${file.extension}`}
                    />
                    {file.name}.{file.extension}
                  </Button>

                  {isDeleteExist && (
                    <IconButton onClick={() => setFileToDelete(file)}>
                      <Close />
                    </IconButton>
                  )}
                </Stack>
              )
            })}
          </Stack>
        </Stack>

        <FileForm
          isOpen={isFileFormOpen}
          onClose={() => setIsFileFormOpen(false)}
          onSubmit={onAddFile}
          fileList={fileList}
          isMultipleExtensionFiles={isMultipleExtensionFiles}
        />

        <ConfirmModalWrapper
          isOpen={fileToDelete != null}
          onClose={() => setFileToDelete(null)}
          title='Delete file'
        >
          <Stack sx={styles.REMOVE_FILE_CONTENT}>
            Are you sure you want to delete{' '}
            <span>
              {fileToDelete?.name}.{fileToDelete?.extension}
            </span>{' '}
            file ?
          </Stack>

          <Button
            onClick={onSubmitDelete}
            sx={styles.REMOVE_BUTTON}
            variant='contained'
          >
            Delete file
          </Button>
        </ConfirmModalWrapper>
      </Stack>
    </ClickAwayListener>
  )
}

export default FileModal
