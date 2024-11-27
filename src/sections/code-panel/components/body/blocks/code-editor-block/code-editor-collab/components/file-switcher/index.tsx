import { type FC } from 'react'

import { Stack, Tabs, Tab } from '@mui/material'

import { StudentFile } from '@root/src/redux/services/interfaces/workspace.interface'

import DevIcon from '../dev-icon'

import { styles } from './styles'

interface FileSwitcherProps {
  activeFile: StudentFile
  onChange: (id: string) => void
  fileList: StudentFile[]
}

const FileSwitcher: FC<FileSwitcherProps> = ({ onChange, activeFile, fileList }) => {
  return (
    <Stack sx={styles.WRAPPER_STACK_SX}>
      <Tabs
        sx={styles.TABS}
        value={activeFile?.id}
        onChange={(_, id) => {
          onChange(id)
        }}
        variant='scrollable'
        scrollButtons={false}
        aria-label='scrollable prevent tabs example'
      >
        {fileList.map(({ name, id, extension }) => (
          <Tab
            sx={styles.TAB}
            key={id}
            label={
              <>
                <DevIcon
                  sx={styles.DEV_ICON}
                  fileName={`${name}.${extension}`}
                />
                {`${name}.${extension}`}
              </>
            }
            value={id}
          />
        ))}
      </Tabs>
    </Stack>
  )
}

export default FileSwitcher
