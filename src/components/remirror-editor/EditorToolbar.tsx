import { useContext, useState } from 'react'

import {
  Box,
  Button,
  Divider,
  Stack,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import {
  BasicFormattingButtonGroup,
  CommandButtonGroup,
  DecreaseFontSizeButton,
  FloatingToolbar,
  IncreaseFontSizeButton,
  TextAlignmentButtonGroup,
  ToggleBoldButton,
  ToggleOrderedListButton,
  ToggleStrikeButton,
  ToggleSubscriptButton,
  ToggleSuperscriptButton,
  ToggleTaskListButton,
  Toolbar,
} from '@remirror/react'
import { MuiColorInput, matchIsValidColor } from 'mui-color-input'

import { LessonContentContext } from '@/sections/dashboard/lessons/LessonStep/LessonStepContent/LessonContent.context'
import { ThemeProvider } from '@/theme'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'

import { ILessonContent } from '../../redux/services/interfaces/courseUnits.interface'
import { MenuPopover } from '../menu-popover'

import MenuItems from './MenuItems'
import { SaveButton } from './SaveButton'
import {
  FontFamilyButtons,
  FontSizeButtons,
  TextBgColorPicker,
  TextCaseSelect,
  TextColorPicker,
} from './toolbars'
import EmojiPickerBtn from './toolbars/EmojiPicker'

interface Props {
  saveContent: () => void
  data: ILessonContent & BaseResponseInterface
  lessonId: string
  bgColor: string
  setBgColor?: (bgColor: string) => void
}

const STANDARD_COLORS = ['#67dbe6', '#ffdd56', '#ff99cc', '#96ceb4', '#ff6f69']

export default function EditorToolbar({
  saveContent,
  data,
  lessonId,
  bgColor,
  setBgColor,
}: Props): React.ReactElement {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)
  const { locked } = useContext(LessonContentContext)
  const [color, setColor] = useState<string>(bgColor)

  const handleChange = (event: SelectChangeEvent) => {
    setColor(event.target.value as string)
    if (setBgColor) {
      setBgColor(event.target.value as string)
    }
  }

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation()
    event.preventDefault()
    setOpenPopover(event.currentTarget)
  }

  const handleClosePopover = (): void => {
    setOpenPopover(null)
  }

  // const ref = useDetectClickOutside({})

  return (
    <ThemeProvider>
      <Toolbar
        style={{
          position: 'sticky',
          zIndex: 500,
          top: 0,
          padding: '15px',
          overflowX: 'scroll',
          overflowY: 'scroll',
          scrollbarWidth: 'none',
          borderBottom: '1px solid #cbcbcb',
        }}
      >
        <>
          <Stack
            direction='column'
            sx={{ width: '100%', gap: 1 }}
          >
            <Stack
              direction='row'
              justifyContent='space-between'
              gap={1}
            >
              <Stack
                flexDirection='row'
                sx={{
                  flexWrap: 'wrap',
                  gap: 1,
                  alignItems: 'center',
                }}
              >
                <ToggleBoldButton />
                <CommandButtonGroup>
                  <ToggleOrderedListButton />
                </CommandButtonGroup>
                <TextColorPicker />
                <TextBgColorPicker />
                <CommandButtonGroup>
                  <ToggleTaskListButton />
                </CommandButtonGroup>
                <EmojiPickerBtn />
              </Stack>

              <SaveButton onClick={saveContent} />
            </Stack>
            <Box
              display='flex'
              gap={2}
            >
              <MenuItems
                data={data}
                lessonId={lessonId}
              />
              <Button
                onClick={handleOpenPopover}
                sx={{
                  maxHeight: '40px',
                  borderRadius: '20px',
                  border: '2px solid #364954',
                  color: '#364954',
                  textTransform: 'capitalize',
                  gap: 1,
                  '&:hover': {
                    border: '2px solid #364954',
                  },
                }}
              >
                Background Color
              </Button>
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
            </Box>
          </Stack>
        </>
      </Toolbar>
      {!locked ? (
        <FloatingToolbar
          sx={{
            '&>div': {
              borderRadius: '5px',
              boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
            },
          }}
          style={{
            zIndex: 1500,
            padding: 10,
          }}
        >
          <Stack
            borderRadius='5px'
            display='flex'
            flexDirection='row'
            p='5px 10px'
            alignItems='center'
            alignContent='center'
          >
            <BasicFormattingButtonGroup />
            <Divider
              sx={{ ml: 1, mr: 1, mt: 0.5, height: '70%' }}
              orientation='vertical'
              flexItem
            />
            <CommandButtonGroup>
              <DecreaseFontSizeButton />
              <FontSizeButtons />
              <IncreaseFontSizeButton />
            </CommandButtonGroup>
            <Divider
              sx={{ ml: 1, mr: 1, mt: 0.5, height: '70%' }}
              orientation='vertical'
              flexItem
            />
            <Toolbar>
              <ToggleSuperscriptButton />
              <ToggleSubscriptButton />
              <TextCaseSelect />
            </Toolbar>
            <Divider
              sx={{ ml: 1, mr: 1, mt: 0.5, height: '70%' }}
              orientation='vertical'
              flexItem
            />
            <ToggleStrikeButton />
            <Divider
              sx={{ ml: 1, mr: 1, mt: 0.5, height: '70%' }}
              orientation='vertical'
              flexItem
            />
            <TextAlignmentButtonGroup />
            <Divider
              sx={{ ml: 1, mr: 1, mt: 0.5, height: '70%' }}
              orientation='vertical'
              flexItem
            />
            <FontFamilyButtons />
          </Stack>
        </FloatingToolbar>
      ) : null}
    </ThemeProvider>
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
