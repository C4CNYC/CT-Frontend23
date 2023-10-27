import { type FC } from "react"

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

import FileForm from "./file-form";

import { styles } from "./styles";

interface FileModalProps {
  activeFile: string
  setActiveFile: (fileName: string) => void
  isOpen: boolean
  fileList: string[]
  isFileFormOpen: boolean
  setIsFileFormOpen: (fileName: boolean) => void
  setIsOpen: (isOpen: boolean) => void
  onAddFile: (fileName: string) => void
  onDeleteFile: (fileName: string) => void
}

const FileModal: FC<FileModalProps> = ({
  activeFile,
  setActiveFile,
  isOpen,
  fileList,
  isFileFormOpen,
  setIsFileFormOpen,
  onAddFile,
  setIsOpen,
  onDeleteFile
}) => {

  return (
    <>
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

                      <IconButton onClick={() => onDeleteFile(fileName)}>
                        <Close  />
                      </IconButton>
                    </Stack>
                    
                  )
                })}
              </Stack>
            </Stack>

            <FileForm
              isOpen={isFileFormOpen}
              onClose={() => setIsFileFormOpen(false)}
              onSubmit={onAddFile}
            />
          </Stack>
      </ClickAwayListener>
    </>
  )
}


export default FileModal;
