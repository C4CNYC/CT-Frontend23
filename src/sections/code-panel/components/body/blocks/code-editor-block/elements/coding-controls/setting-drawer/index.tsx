import { useState } from 'react'

import { IconButton, SwipeableDrawer, Typography } from '@mui/material'
import { Box } from '@mui/system'

import { Iconify } from '@/components/iconify'
import { resetLessonEvent, updateLineWrap } from 'src/sections/code-panel/lib/events'

import EditColors from './preferences/EditColors'
import EditorFontSize from './preferences/EditorFontSize'
import EditorWordWrap from './preferences/EditorWordWrap'
import IntroTour from './preferences/IntroTour'
import ResetCode from './preferences/ResetCode'

const SettingDrawer = (): React.ReactElement => {
  const [openDrawer, setDrawer] = useState<boolean>(false)

  const onStartIntro = (): void => {
    setDrawer(false)
  }

  const onResetLesson = () => {
    window.dispatchEvent(resetLessonEvent)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <IconButton
        onClick={() => {
          setDrawer(true)
        }}
      >
        <Iconify icon='ep:setting' />
      </IconButton>
      <SwipeableDrawer
        anchor='right'
        open={openDrawer}
        onClose={() => {
          setDrawer(false)
        }}
        onOpen={() => {
          setDrawer(true)
        }}
      >
        <Box
          width='350px'
          p='30px 20px 40px 20px'
        >
          <Box
            mb='30px'
            display='flex'
            alignItems='center'
          >
            <Iconify
              mr='10px'
              width='35px'
              height='30px'
              icon='ep:setting'
            />
            <Typography variant='h5'>Settings</Typography>
          </Box>
          <Box
            display='grid'
            gap='30px'
          >
            <ResetCode onReset={onResetLesson} />
            <IntroTour onStartIntro={onStartIntro} />
            <Typography variant='body1'>CODING EDITOR:</Typography>
            <EditorFontSize
              onUpdateFontSize={(size: number) => {
                // window.dispatchEvent(updateFontSize({ detail: { size } }))
              }}
            />
            <EditorWordWrap
              onUpdateWordWrap={(wrap: boolean) => {
                window.dispatchEvent(updateLineWrap({ detail: { wrap } }))
              }}
            />
            <Typography variant='body1'>CUSTOMIZE:</Typography>
            <EditColors
              onUpdateColors={(data) => {
                // window.dispatchEvent(updateColorsEvent(data))
              }}
            />
          </Box>
        </Box>
      </SwipeableDrawer>
    </Box>
  )
}

export default SettingDrawer
