import { type FC, useEffect, useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import Close from '@mui/icons-material/Close'
import FolderIcon from '@mui/icons-material/Folder'
import { Button, ClickAwayListener, Stack, Typography, IconButton } from '@mui/material'
import { useTheme } from '@mui/system'

import { StudentFile } from '@root/src/redux/services/interfaces/workspace.interface'

import { EditorMode } from '../../hook/constants'
import DevIcon from '../dev-icon'

import ConfirmModalWrapper from './confirm-wrapper-modal'
import FileForm from './file-form'
import { useStyles } from './styles'

interface FileModalProps {
  isOpen: boolean
  mode: EditorMode
  files: StudentFile[]
  isFileControllerAvailable: boolean
  isMultipleExtensionFiles: boolean

  onDeleteFile: (id: string) => void
  setActiveFile: (id: string) => void
  setIsOpen: (isOpen: boolean) => void
  onAddFile: (fileName: string) => Promise<void>
}

const FileModal: FC<FileModalProps> = ({
  mode,
  files,
  isOpen,
  isFileControllerAvailable,
  isMultipleExtensionFiles,
  onAddFile,
  setIsOpen,
  onDeleteFile,
  setActiveFile,
}) => {
  const theme = useTheme()
  const styles = useStyles(theme)

  const [isDeleteExist, setIsDeleteExist] = useState<boolean>(false)
  const [isFileFormOpen, setIsFileFormOpen] = useState<boolean>(false)
  const [fileToDelete, setFileToDelete] = useState<Pick<StudentFile, 'id' | 'name'> | null>(null)

  const onSubmitDelete = () => {
    if (fileToDelete == null) {
      return
    }

    onDeleteFile(fileToDelete.id as string)
    setFileToDelete(null)
  }

  useEffect(() => {
    if (files.length > 1 && mode === EditorMode.Owner) {
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
            {files.map(({ id, name, extension }) => {
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
                    {name}.{extension}
                  </Button>

                  {isDeleteExist && (
                    <IconButton
                      size='small'
                      onClick={() => setFileToDelete({ id, name })}
                    >
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
          files={files}
          isMultipleExtensionFiles={isMultipleExtensionFiles}
        />

        <ConfirmModalWrapper
          isOpen={fileToDelete != null}
          onClose={() => setFileToDelete(null)}
          title='Delete file'
        >
          <Stack sx={styles.REMOVE_FILE_CONTENT}>
            Are you sure you want to delete <span>{fileToDelete?.name}</span> file ?
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
