import { useEffect, useState, type FC } from 'react'

import { Stack, Tabs, Tab, IconButton } from '@mui/material'

import { Iconify } from '@root/src/components'
import { StudentFile } from '@root/src/redux/services/interfaces/workspace.interface'

import DevIcon from '../dev-icon'

import { styles } from './styles'

interface FileSwitcherProps {
  activeFile: StudentFile
  onChange: (id: string) => void
  fileList: StudentFile[]
}

const FileSwitcher: FC<FileSwitcherProps> = ({ onChange, activeFile, fileList }) => {
  const [tabsList, setTabList] = useState<StudentFile[]>([])

  const closeTab = (id: string) => {
    if (tabsList.length === 1) return

    const updatedTabs = tabsList.filter((el) => el.id !== id)

    setTabList(updatedTabs)

    if (activeFile?.id === id) {
      const newActiveFile = updatedTabs[0]
      onChange(newActiveFile.id as string)
    }
  }

  useEffect(() => {
    if (!activeFile) return
    const isActiveFileClosed = tabsList.some((tabFile) => tabFile.id === activeFile.id)
    if (!isActiveFileClosed) {
      setTabList([...tabsList, activeFile])
    }
  }, [activeFile])

  useEffect(() => {
    setTabList(fileList)
  }, [fileList])

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
        {tabsList.map(({ name, id, extension }) => (
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
            icon={
              tabsList.length > 1 ? (
                <IconButton
                  sx={{ p: 0 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    closeTab(id ?? '')
                  }}
                >
                  <Iconify
                    icon='jam:close'
                    color='#fff'
                  />
                </IconButton>
              ) : (
                <></>
              )
            }
            iconPosition='end'
            value={id}
          />
        ))}
      </Tabs>
    </Stack>
  )
}

export default FileSwitcher
