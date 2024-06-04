import React, { MouseEventHandler, useCallback, useState } from 'react'

import { Box, Stack, Tooltip } from '@mui/material'
import ToggleButton from '@mui/material/ToggleButton'
import { BsEmojiSmile } from '@react-icons/all-files/bs/BsEmojiSmile'
import { useCommands } from '@remirror/react'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { useDetectClickOutside } from 'react-detect-click-outside'

import { MenuPopover } from '@/components'

import 'remirror/styles/all.css'

export default function EmojiPickerBtn(): React.ReactElement {
  const allCommand = useCommands()

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation()
    event.preventDefault()
    setOpenPopover(event.currentTarget)
  }

  const handleClosePopover = (): void => {
    setOpenPopover(null)
  }

  const handleMouseDown: MouseEventHandler<HTMLButtonElement> = useCallback((e: any) => {
    e.preventDefault()
  }, [])

  const emojiClickHandler = (emojiData: EmojiClickData): void => {
    allCommand.insertText(emojiData.emoji)
  }

  const ref = useDetectClickOutside({ onTriggered: handleClosePopover })

  return (
    <Stack sx={{ position: 'relative', alignItems: 'center' }}>
      {/* <style>
        {`
            aside.EmojiPickerReact.epr-main {
                z-index: 1000;
            }
        `}
      </style> */}
      <Tooltip title='emoji picker'>
        <ToggleButton
          value='left'
          key='left'
          onMouseDown={handleMouseDown}
          onClick={handleOpenPopover}
          sx={{ py: '4px', px: '10px' }}
        >
          <BsEmojiSmile size='20px' />
        </ToggleButton>
      </Tooltip>
      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        disabledArrow
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: -5, horizontal: 5 }}
      >
        <Box>
          <EmojiPicker
            width={300}
            previewConfig={{ showPreview: false }}
            onEmojiClick={(emojiData: EmojiClickData) => {
              emojiClickHandler(emojiData)
            }}
          />
        </Box>
      </MenuPopover>
    </Stack>
  )
}
