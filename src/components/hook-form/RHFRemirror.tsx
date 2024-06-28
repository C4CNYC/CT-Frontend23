import { Button, FormHelperText, Stack, useMediaQuery, useTheme } from '@mui/material'
import { styled } from '@mui/system'
import { FaBold } from '@react-icons/all-files/fa/FaBold'
import { FaItalic } from '@react-icons/all-files/fa/FaItalic'
import { FaUnderline } from '@react-icons/all-files/fa/FaUnderline'
import { IoIosRedo } from '@react-icons/all-files/io/IoIosRedo'
import { IoIosUndo } from '@react-icons/all-files/io/IoIosUndo'
import { EditorComponent, Remirror, useCommands, useRemirror } from '@remirror/react'
import { Controller, useController, useFormContext } from 'react-hook-form'
import {
  BoldExtension,
  ItalicExtension,
  LinkExtension,
  UnderlineExtension,
} from 'remirror/extensions'

import { InitialDescriptionValueType } from '@/types'

export const MenuBtn = styled(Button)({
  color: '#43D4DD',
  whiteSpace: 'nowrap',
  p: 0,
  minWidth: 'auto',
  width: '50px',
})

interface RHFRemirrorProps {
  name: string
  helperText?: React.ReactNode
  initialValue?: InitialDescriptionValueType
}

export function RHFRemirror({
  name,
  helperText,
  initialValue,
}: RHFRemirrorProps): React.ReactElement {
  const theme = useTheme()
  const { control } = useFormContext()
  const { field } = useController({
    name,
    control,
  })

  const { manager, state, setState } = useRemirror({
    extensions: () =>
      [
        new BoldExtension({}),
        new ItalicExtension(),
        new UnderlineExtension(),
        new LinkExtension({ autoLink: true }),
      ] as any,
    content: field.value.doc ?? initialValue,
    stringHandler: 'html',
  })

  return (
    <>
      <style>
        {`
          .remirror-editor-wrapper { padding: 0; }
          .remirror-theme .ProseMirror{
              padding: 8px;
              max-height: 100px;
              min-height: 140px;
              background: ${theme.palette.mode === 'light' ? '#fff' : 'transparent'} ;
              border: ${theme.palette.mode === 'light' ? 'none' : '1px solid #fff'};
              border-radius: 16px;
              overflow-y: scroll;
              &:focus-visible {
                outline: none;
              } 
          }
        `}
      </style>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className='remirror-theme'>
            <Remirror
              manager={manager}
              initialContent={state}
              onChange={(parameter) => {
                field.onChange(parameter.state)
                setState(parameter.state)
              }}
            >
              <Menu />
              <EditorComponent />
            </Remirror>
            {(!!error || helperText) && (
              <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
            )}
          </div>
        )}
      />
    </>
  )
}

const Menu = () => {
  const { toggleBold, toggleItalic, undo, redo, toggleUnderline } = useCommands()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Stack
      direction='row'
      pb={1}
    >
      <MenuBtn
        onClick={() => {
          toggleBold()
        }}
      >
        <FaBold size={isMobile ? 14 : 20} />
      </MenuBtn>
      <MenuBtn
        onClick={() => {
          toggleItalic()
        }}
      >
        <FaItalic size={isMobile ? 14 : 20} />
      </MenuBtn>
      <MenuBtn
        onClick={() => {
          toggleUnderline()
        }}
      >
        <FaUnderline size={isMobile ? 14 : 20} />
      </MenuBtn>
      <MenuBtn
        onClick={() => {
          undo()
        }}
      >
        <IoIosUndo size={isMobile ? 14 : 20} />
      </MenuBtn>
      <MenuBtn
        onClick={() => {
          redo()
        }}
      >
        <IoIosRedo size={isMobile ? 14 : 20} />
      </MenuBtn>
    </Stack>
  )
}
