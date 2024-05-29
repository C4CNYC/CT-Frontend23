import React, { MouseEventHandler, useCallback, useState } from 'react'

import { IconButton, Stack, Tooltip } from '@mui/material'
import ToggleButton from '@mui/material/ToggleButton'
import { AiOutlineClear } from '@react-icons/all-files/ai/AiOutlineClear'
import { AiOutlineHighlight } from '@react-icons/all-files/ai/AiOutlineHighlight'
import { useCommands } from '@remirror/react'
import { useDetectClickOutside } from 'react-detect-click-outside'

export default function TextColorPicker(): JSX.Element {
  const [edit, setEdit] = useState<boolean>(false)
  const [color, setColor] = useState<string>('#000')
  const commands = useCommands()

  const handleMouseDown: MouseEventHandler<HTMLButtonElement> = useCallback((e: any) => {
    e.preventDefault()
  }, [])

  const handleChange = useCallback(
    (e: any) => {
      e.preventDefault()
      setColor(e.target.value)
      commands.setTextHighlight(color)
    },
    [commands.setTextHighlight, color]
  )

  const closeMenu = (): void => {
    setEdit(false)
  }
  const ref = useDetectClickOutside({ onTriggered: closeMenu })

  return (
    <Stack
      direction='row'
      ref={ref}
    >
      {edit && (
        <div
          style={{
            position: 'absolute',
            top: '29px',
            width: '100px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'white',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            borderRadius: '4px',
            padding: '5px',
            zIndex: 2,
          }}
        >
          <input
            type='color'
            id='favcolor'
            name='favcolor'
            value={color}
            onChange={handleChange}
          />
          <IconButton
            sx={{ p: '10px' }}
            onClick={() => {
              commands.removeTextHighlight()
              setEdit(!edit)
            }}
          >
            <AiOutlineClear size={20} />
          </IconButton>
        </div>
      )}
      <Tooltip title='Text background color'>
        <ToggleButton
          value='left'
          key='left'
          size='small'
          onMouseDown={handleMouseDown}
          onClick={() => {
            setEdit(!edit)
          }}
        >
          <AiOutlineHighlight size={13} />
        </ToggleButton>
      </Tooltip>
    </Stack>
  )
}
