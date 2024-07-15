import { useContext } from 'react'

import { Box, Divider, Stack } from '@mui/material'
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
  ToggleCodeButton,
  Toolbar,
} from '@remirror/react'

import { LessonContentContext } from '@/sections/dashboard/lessons/LessonStep/LessonStepContent/LessonContent.context'
import { ThemeProvider } from '@/theme'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'

import { ILessonContent } from '../../redux/services/interfaces/courseUnits.interface'

import { MediaBtn } from './controls-btn'
import MenuItems from './MenuItems'
import { SaveButton } from './SaveButton'
import {
  FontFamilyButtons,
  FontSizeButtons,
  TextBgColorPicker,
  TextCaseSelect,
  TextColorPicker,
  TemplateSelector,
  BgColorToggleBtn,
  EmojiPickerBtn,
} from './toolbars'

interface Props {
  saveContent: () => void
  data: ILessonContent & BaseResponseInterface
  lessonId: string
  bgColor: string
  setBgColor?: (bgColor: string) => void
}

export default function EditorToolbar({
  saveContent,
  data,
  lessonId,
  bgColor,
  setBgColor,
}: Props): React.ReactElement {
  const { locked } = useContext(LessonContentContext)

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
                  p: 1,
                  bgcolor: '#f1f1f1',
                  borderRadius: 1,
                }}
              >
                <ToggleBoldButton />
                <ToggleCodeButton />
                <ToggleOrderedListButton />
                <TextColorPicker />
                <TextBgColorPicker />
                <ToggleTaskListButton />
                <EmojiPickerBtn />
                <BgColorToggleBtn
                  bgColor={bgColor}
                  setBgColor={setBgColor}
                />
                <MediaBtn />
              </Stack>

              <SaveButton onClick={saveContent} />
            </Stack>
            <Box
              display='flex'
              gap={2}
            >
              <TemplateSelector />

              <MenuItems
                data={data}
                lessonId={lessonId}
              />
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
            zIndex: 1300,
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
            <ToggleCodeButton />
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
