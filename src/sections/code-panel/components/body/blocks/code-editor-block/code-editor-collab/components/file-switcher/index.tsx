import { type FC } from 'react'

import Close from '@mui/icons-material/Close'
import { Stack, Tabs, Tab } from '@mui/material'

import type { File } from '../../hook/requests'
import DevIcon from '../dev-icon'

import { styles } from './styles'

interface FileSwitcherProps {
  activeFile?: File | null
  onChange: (fileName: File) => void
  onClose: (fileId: string) => void
  fileList: File[]
}

const FileSwitcher: FC<FileSwitcherProps> = ({ onChange, onClose, activeFile, fileList }) => {
  if (!activeFile) {
    return null
  }

  return (
    <Stack sx={styles.WRAPPER_STACK_SX}>
      <Tabs
        sx={styles.TABS}
        value={activeFile?._id}
        onChange={(_, newId) => {
          onChange(fileList.find(({ _id }) => newId === _id) as File)
        }}
        variant='scrollable'
        scrollButtons={false}
        aria-label='scrollable prevent tabs example'
      >
        {fileList.map(({ name, extension, _id }) => (
          <Tab
            sx={styles.TAB}
            key={_id}
            label={
              <>
                <DevIcon
                  sx={styles.DEV_ICON}
                  fileName={`${name}.${extension}`}
                />
                {name}.{extension}
                {fileList.length > 1 && (
                  <Close
                    fontSize='small'
                    onClick={(e) => {
                      e.stopPropagation()
                      onClose(_id)
                    }}
                  />
                )}
              </>
            }
            value={_id}
          />
        ))}
      </Tabs>
    </Stack>
  )
}

export default FileSwitcher
