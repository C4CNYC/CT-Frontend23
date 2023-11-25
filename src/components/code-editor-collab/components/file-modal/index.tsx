import { type FC, useState } from "react";

import { useTheme } from "@mui/system";
import Close from "@mui/icons-material/Close";
import FolderIcon from '@mui/icons-material/Folder';
import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  ClickAwayListener,
  Stack,
  Typography,
  IconButton
} from "@mui/material";

import ConfirmModalWrapper from "./confirm-wrapper-modal";
import FileForm from "./file-form";

import { EditorMode } from "../../hook/constants";
import { useStyles } from "./styles";

interface FileModalProps {
  setActiveFile: (fileName: string) => void
  isOpen: boolean
  fileList: string[]
  isFileFormOpen: boolean
  setIsFileFormOpen: (fileName: boolean) => void
  setIsOpen: (isOpen: boolean) => void
  onAddFile: (fileName: string) => void
  onDeleteFile: (fileName: string) => void
  mode: EditorMode
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
  mode
}) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);

  const onSubmitDelete = () => {
    if (fileToDelete == null) {
      return
    }

    onDeleteFile(fileToDelete);
    setFileToDelete(null);
  }

  const isDeleteExist = fileList.length > 1 && mode === EditorMode.Owner

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
        <Stack>
          <Button onClick={() => setIsOpen(!isOpen)} sx={styles.FOLDER_BUTTON_SX}>
            <FolderIcon />
          </Button>

          <Stack
            sx={{
              ...styles.STACK_SX,
              ...(isOpen ? styles.STACK_SX_ACTIVE : {})
            }}
          >
            <Typography variant="h5" color="#e0e3ea">
              Files

              <IconButton onClick={() => setIsFileFormOpen(true)}>
                <AddIcon />
              </IconButton>
            </Typography>

            <Stack>
              {fileList.map((fileName: string) => {
                return (
                  <Stack sx={styles.BUTTON_WRAPPER}>
                    <Button
                      onClick={() => setActiveFile(fileName)}
                      sx={styles.BUTTON_FILE_SX}
                      key={fileName}
                      variant="text"
                    >
                      {fileName}
                    </Button>

                    {isDeleteExist && (
                      <IconButton onClick={() => setFileToDelete(fileName)}>
                        <Close  />
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
          />

          <ConfirmModalWrapper
            isOpen={fileToDelete != null}
            onClose={() => setFileToDelete(null)}
            title="Delete file"
          >
            <Stack sx={styles.REMOVE_FILE_CONTENT}>
              Are you sure you want to delete <span>{fileToDelete}</span> file ?
            </Stack>

            <Button
              onClick={onSubmitDelete}
              sx={styles.REMOVE_BUTTON}
              variant="contained"
            >
              Delete file
            </Button>
          </ConfirmModalWrapper>
        </Stack>
    </ClickAwayListener>
  )
}

export default FileModal;
