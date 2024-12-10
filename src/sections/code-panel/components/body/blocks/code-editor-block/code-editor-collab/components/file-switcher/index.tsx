import { useEffect, useRef, useState, type FC } from 'react'

import { Stack, Tabs, Tab, IconButton } from '@mui/material'

import { Iconify } from '@root/src/components'
import { StudentFile } from '@root/src/redux/services/interfaces/workspace.interface'

import DevIcon from '../dev-icon'

import { styles } from './styles'

interface FileSwitcherProps {
  activeFile: StudentFile
  onChange: (id: string) => void
  closeTab: (id: string) => void
  fileList: StudentFile[]
}
const MIN_WIDTH = 200

const FileSwitcher: FC<FileSwitcherProps> = ({ onChange, closeTab, activeFile, fileList }) => {
  const [contWidth, setContWidth] = useState(0)
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!editorRef.current) return
    const resizeObserver = new ResizeObserver(() => {
      setContWidth(editorRef.current?.getBoundingClientRect().width ?? MIN_WIDTH)
    })
    resizeObserver.observe(editorRef.current)
    return () => resizeObserver.disconnect()
  }, [editorRef])

  return (
    <Stack
      sx={{ ...styles.WRAPPER_STACK_SX, maxWidth: `${contWidth}px` }}
      ref={editorRef}
    >
      <Tabs
        sx={styles.TABS}
        value={activeFile?.id}
        onChange={(_, id) => {
          onChange(id)
        }}
        variant='scrollable'
        scrollButtons={fileList.length < 2 ? false : 'auto'}
        selectionFollowsFocus
        TabScrollButtonProps={{
          sx: {
            color: '#fff',
            width: '30px!important',
          },
          disableRipple: true,
        }}
        aria-label='scrollable prevent tabs example'
      >
        {fileList?.map(({ name, id, extension }) => (
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
              fileList.length > 1 ? (
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
