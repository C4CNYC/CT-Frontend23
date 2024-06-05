import { useState } from 'react'

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ToggleButton,
  Tooltip,
} from '@mui/material'
import { MuiColorInput, matchIsValidColor } from 'mui-color-input'

import { MenuPopover } from '../../menu-popover'

import SlideBgColorIcon from './SlideBgColorIcon'

interface IBgColorToggleBtn {
  bgColor: string
  setBgColor?: (bgColor: string) => void
}

const STANDARD_COLORS = ['#67dbe6', '#ffdd56', '#ff99cc', '#96ceb4', '#ff6f69']

export default function BgColorToggleBtn({ bgColor, setBgColor }: IBgColorToggleBtn) {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)
  const [color, setColor] = useState<string>(bgColor)

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation()
    event.preventDefault()
    setOpenPopover(event.currentTarget)
  }

  const handleClosePopover = (): void => {
    setOpenPopover(null)
  }

  const handleChange = (event: SelectChangeEvent) => {
    setColor(event.target.value as string)
    if (setBgColor) {
      setBgColor(event.target.value as string)
    }
  }

  return (
    <>
      <Tooltip title='Slide background color'>
        <ToggleButton
          value='left'
          key='left'
          onClick={handleOpenPopover}
          sx={{ py: '4px', px: '10px' }}
        >
          <SlideBgColorIcon size={20} />
        </ToggleButton>
      </Tooltip>
      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        disabledArrow
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: -5, horizontal: 5 }}
        sx={{ p: 2, width: 200 }}
      >
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl
            fullWidth
            sx={{ flex: 1 }}
          >
            <InputLabel id='demo-simple-select-label'>Color</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={color}
              label='Color'
              onChange={handleChange}
              defaultValue={color}
            >
              {STANDARD_COLORS.map((color, index) => (
                <MenuItem
                  value={color}
                  key={index}
                >
                  <ColorBox color={color} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <MuiColorInput
            sx={{
              '& .MuiInputBase-input': {
                opacity: 0,
                width: 0,
                padding: '8.5px 3px',
                height: 40,
              },
            }}
            format='hex'
            value={matchIsValidColor(bgColor) ? bgColor : ''}
            onChange={(data) => {
              if (setBgColor) {
                setBgColor(data)
              }
            }}
          />
        </Box>
      </MenuPopover>
    </>
  )
}

const ColorBox = ({ color }: { color: string }) => {
  return (
    <Box
      bgcolor={color}
      sx={{ width: '100%', height: 20, borderRadius: 1, boxShadow: 3 }}
    />
  )
}
